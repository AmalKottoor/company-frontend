import { useState } from 'react';
import { Vector3 } from 'three';

/**
 * Camera Preset Controls
 * Quick navigation to different facility areas
 */
const CameraPresets = ({ controlsRef, cameraRef }) => {
  const [activePreset, setActivePreset] = useState(null);

  const presets = [
    {
      id: 'overview',
      name: 'Overview',
      icon: '🏭',
      position: [70, 40, 70],
      target: [0, 5, 0],
      description: 'Full facility view'
    },
    {
      id: 'production',
      name: 'Production',
      icon: '⚙️',
      position: [-40, 15, -30],
      target: [-40, 3, -30],
      description: 'Production building interior'
    },
    {
      id: 'silos',
      name: 'Silos',
      icon: '🏗️',
      position: [-50, 20, 20],
      target: [-50, 10, 20],
      description: 'Raw material silos'
    },
    {
      id: 'utilities',
      name: 'Utilities',
      icon: '🔥',
      position: [40, 15, 30],
      target: [40, 8, 30],
      description: 'Boiler & cooling tower'
    },
    {
      id: 'control',
      name: 'Control Room',
      icon: '🎛️',
      position: [50, 10, -30],
      target: [50, 4, -30],
      description: 'Control room panels'
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      icon: '📊',
      position: [50, 10, 10],
      target: [50, 4, 10],
      description: 'Analytics dashboard'
    },
    {
      id: 'tanks',
      name: 'Storage',
      icon: '🛢️',
      position: [-50, 15, -30],
      target: [-50, 5, -30],
      description: 'Storage tanks'
    },
    {
      id: 'topdown',
      name: 'Top View',
      icon: '🔝',
      position: [0, 100, 0],
      target: [0, 0, 0],
      description: 'Bird\'s eye view'
    }
  ];

  const animateCamera = (targetPos, targetLookAt, duration = 1500) => {
    if (!cameraRef?.current || !controlsRef?.current) return;
    
    const camera = cameraRef.current;
    const startPos = camera.position.clone();
    const endPos = new Vector3(...targetPos);
    const startTarget = controlsRef.current.target.clone();
    const endTarget = new Vector3(...targetLookAt);
    
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      camera.position.lerpVectors(startPos, endPos, eased);
      
      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(startTarget, endTarget, eased);
        controlsRef.current.update();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const handlePresetClick = (preset) => {
    setActivePreset(preset.id);
    animateCamera(preset.position, preset.target);
  };

  return (
    <div className="absolute top-4 left-4 z-10 space-y-2">
      <div className="bg-zinc-900/95 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl p-4 shadow-2xl">
        <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
          <span className="text-xl">📷</span>
          Camera Views
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              className={`group relative px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activePreset === preset.id
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
              title={preset.description}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{preset.icon}</span>
                <span className="text-xs">{preset.name}</span>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {preset.description}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-zinc-700">
          <div className="text-xs text-zinc-400 text-center">
            Click any view to navigate
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraPresets;
