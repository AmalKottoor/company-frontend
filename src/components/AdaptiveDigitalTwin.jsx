import { useState, useEffect, useMemo } from 'react';
import { Monitor, Smartphone, Tablet, Cpu, Zap } from 'lucide-react';
import UnityDigitalTwin from './UnityDigitalTwin';
import AdvancedDigitalTwin3D from './AdvancedDigitalTwin3D';
import MobileDigitalTwin3D from './MobileDigitalTwin3D';

/**
 * Adaptive Digital Twin Component
 * Intelligently switches between Unity WebGL, Advanced Three.js, and Mobile versions
 * based on device capabilities and performance
 */

// Enhanced device detection with performance profiling
const detectDeviceCapabilities = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  // Check for GPU capabilities
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  const hasWebGL = !!gl;
  const hasWebGL2 = !!canvas.getContext('webgl2');
  
  // Get GPU info if available
  let gpuTier = 'unknown';
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      // Simple GPU tier detection
      if (renderer.includes('NVIDIA') || renderer.includes('AMD') || renderer.includes('Radeon')) {
        gpuTier = 'high';
      } else if (renderer.includes('Intel')) {
        gpuTier = 'medium';
      } else {
        gpuTier = 'low';
      }
    }
  }
  
  // Device classification
  const isMobile = isMobileDevice || screenWidth < 768;
  const isTablet = isMobileDevice && screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = !isMobileDevice && screenWidth >= 1024;
  
  // Memory estimation
  const deviceMemory = navigator.deviceMemory || 4;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  
  // Connection speed (if available)
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const effectiveType = connection?.effectiveType || '4g';
  
  // Calculate performance score (0-100)
  let performanceScore = 50; // Base score
  
  if (isDesktop) performanceScore += 20;
  else if (isTablet) performanceScore += 10;
  
  if (hasWebGL2) performanceScore += 15;
  else if (hasWebGL) performanceScore += 10;
  
  if (deviceMemory >= 8) performanceScore += 15;
  else if (deviceMemory >= 4) performanceScore += 10;
  else if (deviceMemory >= 2) performanceScore += 5;
  
  if (hardwareConcurrency >= 8) performanceScore += 10;
  else if (hardwareConcurrency >= 4) performanceScore += 5;
  
  if (gpuTier === 'high') performanceScore += 15;
  else if (gpuTier === 'medium') performanceScore += 8;
  
  // Determine rendering mode
  let renderMode = 'mobile'; // Default to most compatible
  
  if (performanceScore >= 80 && isDesktop && hasWebGL2) {
    renderMode = 'unity'; // Best quality - Unity WebGL
  } else if (performanceScore >= 60 && !isMobile) {
    renderMode = 'advanced'; // Advanced Three.js
  } else if (performanceScore >= 40) {
    renderMode = 'standard'; // Standard Three.js (mobile-optimized)
  }
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    hasWebGL,
    hasWebGL2,
    gpuTier,
    deviceMemory,
    hardwareConcurrency,
    effectiveType,
    performanceScore,
    renderMode,
    screenWidth,
    screenHeight
  };
};

const AdaptiveDigitalTwin = ({ 
  forceMode = null, // 'unity', 'advanced', 'mobile', or null for auto
  showControls = true,
  className = ''
}) => {
  const [capabilities, setCapabilities] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // Detect device capabilities on mount
  useEffect(() => {
    const analyze = async () => {
      setIsAnalyzing(true);
      
      // Simulate analysis time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const caps = detectDeviceCapabilities();
      setCapabilities(caps);
      setSelectedMode(forceMode || caps.renderMode);
      setIsAnalyzing(false);
    };

    analyze();
  }, [forceMode]);

  // Memoize the selected component
  const DigitalTwinComponent = useMemo(() => {
    if (!selectedMode || !capabilities) return null;

    switch (selectedMode) {
      case 'unity':
        return UnityDigitalTwin;
      case 'advanced':
        return AdvancedDigitalTwin3D;
      case 'mobile':
      case 'standard':
      default:
        return MobileDigitalTwin3D;
    }
  }, [selectedMode, capabilities]);

  // Get mode display info
  const getModeInfo = (mode) => {
    switch (mode) {
      case 'unity':
        return {
          name: 'Unity WebGL',
          description: 'High-fidelity simulation with advanced graphics',
          icon: Zap,
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/20',
          borderColor: 'border-purple-500/50'
        };
      case 'advanced':
        return {
          name: 'Advanced 3D',
          description: 'Full-featured Three.js simulation',
          icon: Cpu,
          color: 'text-cyan-400',
          bgColor: 'bg-cyan-500/20',
          borderColor: 'border-cyan-500/50'
        };
      case 'mobile':
      case 'standard':
        return {
          name: 'Mobile Optimized',
          description: 'Lightweight simulation for mobile devices',
          icon: Smartphone,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/50'
        };
      default:
        return {
          name: 'Standard',
          description: 'Standard simulation',
          icon: Monitor,
          color: 'text-zinc-400',
          bgColor: 'bg-zinc-500/20',
          borderColor: 'border-zinc-500/50'
        };
    }
  };

  // Manual mode selection
  const handleModeChange = (mode) => {
    setSelectedMode(mode);
  };

  if (isAnalyzing) {
    return (
      <div className={`w-full h-[600px] flex items-center justify-center bg-zinc-950 rounded-3xl border border-zinc-800/50 ${className}`}>
        <div className="flex flex-col items-center space-y-4 text-white">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <Cpu className="absolute inset-0 m-auto w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Analyzing Device Capabilities</h3>
            <p className="text-sm text-zinc-400">Optimizing simulation for your device...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!capabilities || !DigitalTwinComponent) {
    return (
      <div className={`w-full h-[600px] flex items-center justify-center bg-zinc-950 rounded-3xl border border-zinc-800/50 ${className}`}>
        <div className="text-white text-center">
          <p className="text-lg">Unable to load Digital Twin</p>
          <p className="text-sm text-zinc-400 mt-2">Please refresh the page</p>
        </div>
      </div>
    );
  }

  const currentModeInfo = getModeInfo(selectedMode);
  const ModeIcon = currentModeInfo.icon;

  return (
    <div className={`relative ${className}`}>
      {/* Mode Selector (if controls enabled) */}
      {showControls && !forceMode && (
        <div className="mb-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <ModeIcon className={`w-5 h-5 ${currentModeInfo.color}`} />
              <div>
                <h3 className="text-sm font-semibold text-white">{currentModeInfo.name}</h3>
                <p className="text-xs text-zinc-400">{currentModeInfo.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="flex items-center gap-1">
                {capabilities.isDesktop && <Monitor className="w-4 h-4" />}
                {capabilities.isTablet && <Tablet className="w-4 h-4" />}
                {capabilities.isMobile && <Smartphone className="w-4 h-4" />}
                <span>{capabilities.deviceMemory}GB RAM</span>
              </div>
              <span>•</span>
              <span>Score: {capabilities.performanceScore}/100</span>
            </div>
          </div>

          {/* Mode Selection Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleModeChange('unity')}
              disabled={!capabilities.hasWebGL2 || capabilities.performanceScore < 60}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedMode === 'unity'
                  ? 'bg-purple-500/30 border-purple-500 text-purple-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
              } border ${
                !capabilities.hasWebGL2 || capabilities.performanceScore < 60
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <Zap className="w-3 h-3 inline mr-1" />
              Unity (High-End)
            </button>
            <button
              onClick={() => handleModeChange('advanced')}
              disabled={capabilities.performanceScore < 40}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedMode === 'advanced'
                  ? 'bg-cyan-500/30 border-cyan-500 text-cyan-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
              } border ${
                capabilities.performanceScore < 40 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Cpu className="w-3 h-3 inline mr-1" />
              Advanced 3D
            </button>
            <button
              onClick={() => handleModeChange('mobile')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedMode === 'mobile' || selectedMode === 'standard'
                  ? 'bg-green-500/30 border-green-500 text-green-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
              } border`}
            >
              <Smartphone className="w-3 h-3 inline mr-1" />
              Mobile Optimized
            </button>
          </div>
        </div>
      )}

      {/* Performance Warning */}
      {showControls && selectedMode === 'unity' && capabilities.performanceScore < 80 && (
        <div className="mb-4 bg-yellow-950/20 border border-yellow-500/30 rounded-xl p-3 flex items-start gap-3">
          <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-yellow-400 font-medium">Performance Notice</p>
            <p className="text-yellow-200/80 text-xs mt-1">
              Unity mode may experience reduced performance on your device. Consider using Advanced 3D mode for better experience.
            </p>
          </div>
        </div>
      )}

      {/* Render Selected Component */}
      <DigitalTwinComponent showControls={showControls} />

      {/* Device Info Footer */}
      {showControls && (
        <div className="mt-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-3 text-xs text-zinc-400">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <span className="text-zinc-500">WebGL:</span>
              <span className="ml-2 text-white">{capabilities.hasWebGL2 ? 'v2' : capabilities.hasWebGL ? 'v1' : 'None'}</span>
            </div>
            <div>
              <span className="text-zinc-500">GPU:</span>
              <span className="ml-2 text-white capitalize">{capabilities.gpuTier}</span>
            </div>
            <div>
              <span className="text-zinc-500">Cores:</span>
              <span className="ml-2 text-white">{capabilities.hardwareConcurrency}</span>
            </div>
            <div>
              <span className="text-zinc-500">Network:</span>
              <span className="ml-2 text-white uppercase">{capabilities.effectiveType}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdaptiveDigitalTwin;
