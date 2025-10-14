import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AlertCircle, Loader2, Monitor, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

/**
 * Unity WebGL Digital Twin Component
 * Embeds Unity-built production plant simulation with adaptive loading for mobile/desktop
 */

// Device detection utility
const getDeviceCapabilities = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  // Check for GPU capabilities
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  const hasWebGL = !!gl;
  
  // Estimate device performance tier
  const isMobile = isMobileDevice || screenWidth < 768;
  const isTablet = isMobileDevice && screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = !isMobileDevice && screenWidth >= 1024;
  
  // Memory estimation (if available)
  const deviceMemory = navigator.deviceMemory || 4; // GB, default to 4GB if not available
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    hasWebGL,
    deviceMemory,
    screenWidth,
    screenHeight,
    // Performance tier: 'low', 'medium', 'high'
    performanceTier: isDesktop && deviceMemory >= 8 ? 'high' : 
                     (isTablet || (isDesktop && deviceMemory >= 4)) ? 'medium' : 'low'
  };
};

const UnityDigitalTwin = ({ 
  className = '',
  showControls = true,
  autoStart = true 
}) => {
  const unityContainerRef = useRef(null);
  const unityInstanceRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [unityLoaded, setUnityLoaded] = useState(false);
  
  // Device capabilities
  const deviceCapabilities = useMemo(() => getDeviceCapabilities(), []);
  
  // Determine which Unity build to load
  const buildConfig = useMemo(() => {
    const { performanceTier, isMobile } = deviceCapabilities;
    
    if (performanceTier === 'high') {
      return {
        buildPath: '/unity-builds/desktop-hq',
        buildName: 'ProductionPlantHQ',
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'DigitalTwin',
        productName: 'ProductionPlant',
        productVersion: '1.0',
        description: 'High-Quality Production Plant Simulation'
      };
    } else if (performanceTier === 'medium' || !isMobile) {
      return {
        buildPath: '/unity-builds/desktop',
        buildName: 'ProductionPlant',
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'DigitalTwin',
        productName: 'ProductionPlant',
        productVersion: '1.0',
        description: 'Standard Production Plant Simulation'
      };
    } else {
      return {
        buildPath: '/unity-builds/mobile',
        buildName: 'ProductionPlantMobile',
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'DigitalTwin',
        productName: 'ProductionPlantMobile',
        productVersion: '1.0',
        description: 'Mobile-Optimized Production Plant Simulation'
      };
    }
  }, [deviceCapabilities]);

  // Load Unity WebGL loader script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${buildConfig.buildPath}/Build/${buildConfig.buildName}.loader.js`;
    script.async = true;
    script.onload = () => {
      console.log('Unity loader script loaded successfully');
    };
    script.onerror = () => {
      setError('Failed to load Unity loader script. Please ensure Unity build files are in the correct location.');
      setIsLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [buildConfig]);

  // Initialize Unity instance
  const initializeUnity = useCallback(async () => {
    if (!window.createUnityInstance || !unityContainerRef.current) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const canvas = document.createElement('canvas');
      canvas.id = 'unity-canvas';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      
      // Clear container and add canvas
      unityContainerRef.current.innerHTML = '';
      unityContainerRef.current.appendChild(canvas);

      const config = {
        dataUrl: `${buildConfig.buildPath}/Build/${buildConfig.buildName}.data`,
        frameworkUrl: `${buildConfig.buildPath}/Build/${buildConfig.buildName}.framework.js`,
        codeUrl: `${buildConfig.buildPath}/Build/${buildConfig.buildName}.wasm`,
        streamingAssetsUrl: buildConfig.streamingAssetsUrl,
        companyName: buildConfig.companyName,
        productName: buildConfig.productName,
        productVersion: buildConfig.productVersion,
      };

      // Add progress callback
      const progressCallback = (progress) => {
        setLoadingProgress(Math.round(progress * 100));
      };

      // Create Unity instance
      const unityInstance = await window.createUnityInstance(canvas, config, progressCallback);
      unityInstanceRef.current = unityInstance;
      setUnityLoaded(true);
      setIsLoading(false);
      
      console.log('Unity instance created successfully');
    } catch (err) {
      console.error('Unity initialization error:', err);
      setError(`Failed to initialize Unity: ${err.message}`);
      setIsLoading(false);
    }
  }, [buildConfig]);

  // Auto-start Unity when loader is ready
  useEffect(() => {
    if (autoStart && window.createUnityInstance && !unityLoaded && !error) {
      const timer = setTimeout(() => {
        initializeUnity();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoStart, initializeUnity, unityLoaded, error]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!unityInstanceRef.current) return;

    try {
      if (!isFullscreen) {
        unityInstanceRef.current.SetFullscreen(1);
        setIsFullscreen(true);
      } else {
        unityInstanceRef.current.SetFullscreen(0);
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen toggle error:', err);
    }
  }, [isFullscreen]);

  // Send message to Unity
  const sendMessageToUnity = useCallback((objectName, methodName, value) => {
    if (unityInstanceRef.current) {
      try {
        unityInstanceRef.current.SendMessage(objectName, methodName, value);
      } catch (err) {
        console.error('Error sending message to Unity:', err);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (unityInstanceRef.current) {
        try {
          unityInstanceRef.current.Quit();
        } catch (err) {
          console.error('Error quitting Unity:', err);
        }
      }
    };
  }, []);

  // Render device info badge
  const DeviceInfoBadge = () => (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 text-xs">
      {deviceCapabilities.isMobile ? (
        <Smartphone className="w-4 h-4 text-cyan-400" />
      ) : (
        <Monitor className="w-4 h-4 text-purple-400" />
      )}
      <span className="text-white font-medium">
        {deviceCapabilities.performanceTier.toUpperCase()} Quality
      </span>
      <span className="text-zinc-400">|</span>
      <span className="text-zinc-300">
        {deviceCapabilities.isMobile ? 'Mobile' : deviceCapabilities.isTablet ? 'Tablet' : 'Desktop'}
      </span>
    </div>
  );

  return (
    <div className={`relative w-full h-full bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl ${className}`}>
      {/* Device Info Badge */}
      {showControls && <DeviceInfoBadge />}

      {/* Fullscreen Toggle */}
      {showControls && unityLoaded && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-2 hover:bg-black/90 transition-colors"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-cyan-400" />
          ) : (
            <Maximize2 className="w-5 h-5 text-cyan-400" />
          )}
        </button>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950">
          <div className="flex flex-col items-center space-y-6 max-w-md px-6">
            {/* Animated Logo/Icon */}
            <div className="relative">
              <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
              <Loader2 className="absolute inset-0 m-auto w-10 h-10 text-cyan-400 animate-pulse" />
            </div>

            {/* Loading Text */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-white">
                Loading Production Plant
              </h3>
              <p className="text-sm text-zinc-400">
                {buildConfig.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-xs text-zinc-400 mb-2">
                <span>Progress</span>
                <span>{loadingProgress}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Loading Tips */}
            <div className="text-xs text-zinc-500 text-center max-w-sm">
              <p>Loading optimized {deviceCapabilities.isMobile ? 'mobile' : 'desktop'} version...</p>
              <p className="mt-1">This may take a moment on first load</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950 p-6">
          <div className="max-w-md bg-red-950/20 border border-red-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-red-400">Loading Error</h3>
            </div>
            <p className="text-sm text-zinc-300">{error}</p>
            <div className="pt-2">
              <button
                onClick={initializeUnity}
                className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                Retry Loading
              </button>
            </div>
            <div className="text-xs text-zinc-500 space-y-1">
              <p>• Ensure Unity build files are placed in <code className="bg-zinc-800 px-1 rounded">/public/unity-builds/</code></p>
              <p>• Check browser console for detailed errors</p>
              <p>• Verify WebGL support in your browser</p>
            </div>
          </div>
        </div>
      )}

      {/* Unity Container */}
      <div
        ref={unityContainerRef}
        className="w-full h-full"
        style={{ 
          visibility: isLoading || error ? 'hidden' : 'visible',
          backgroundColor: '#000000'
        }}
      />

      {/* Info Footer */}
      {showControls && unityLoaded && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2 text-xs text-zinc-300">
          <span className="font-medium text-cyan-400">Unity WebGL</span> • Production Plant Digital Twin
        </div>
      )}
    </div>
  );
};

export default UnityDigitalTwin;
