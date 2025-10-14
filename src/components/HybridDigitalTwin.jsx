import { useState } from 'react';
import SVGDigitalTwin from './SVGDigitalTwin';
import AdvancedDigitalTwin3D from './AdvancedDigitalTwin3D';

/**
 * Hybrid Digital Twin Component
 * Switches between SVG (lightweight), Three.js (medium), and Unity (high-end)
 */
const HybridDigitalTwin = () => {
  const [renderMode, setRenderMode] = useState('svg'); // 'svg', '3d', 'unity'
  const [showControls, setShowControls] = useState(true);

  const modes = [
    {
      id: 'svg',
      name: 'SVG + GSAP',
      icon: '⚡',
      description: 'Ultra-fast, crystal-clear 2D visualization',
      performance: 'Excellent',
      quality: 'High',
      compatibility: '100%',
      recommended: 'All devices'
    },
    {
      id: '3d',
      name: 'Three.js 3D',
      icon: '🎮',
      description: 'Interactive 3D with good performance',
      performance: 'Good',
      quality: 'Very High',
      compatibility: '95%',
      recommended: 'Desktop & tablets'
    },
    {
      id: 'unity',
      name: 'Unity WebGL',
      icon: '🚀',
      description: 'Photorealistic high-end graphics',
      performance: 'Medium',
      quality: 'Ultra High',
      compatibility: '80%',
      recommended: 'High-end desktop only'
    }
  ];

  const currentMode = modes.find(m => m.id === renderMode);

  return (
    <div className="relative w-full">
      {/* Mode Selector */}
      {showControls && (
        <div className="mb-6 bg-zinc-900/95 backdrop-blur-xl border-2 border-cyan-500/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
              <span className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></span>
              Digital Twin Rendering Mode
            </h2>
            <button
              onClick={() => setShowControls(false)}
              className="text-zinc-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setRenderMode(mode.id)}
                className={`text-left p-6 rounded-2xl transition-all border-2 ${
                  renderMode === mode.id
                    ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/30'
                    : 'bg-zinc-800/50 border-zinc-700 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{mode.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{mode.name}</h3>
                    <p className="text-xs text-zinc-400">{mode.description}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Performance:</span>
                    <span className={`font-semibold ${
                      mode.performance === 'Excellent' ? 'text-green-400' :
                      mode.performance === 'Good' ? 'text-blue-400' : 'text-yellow-400'
                    }`}>
                      {mode.performance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Quality:</span>
                    <span className="text-white font-semibold">{mode.quality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Compatibility:</span>
                    <span className="text-cyan-400 font-semibold">{mode.compatibility}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <div className="text-xs text-zinc-500">
                    <span className="font-semibold text-zinc-400">Best for:</span> {mode.recommended}
                  </div>
                </div>

                {renderMode === mode.id && (
                  <div className="mt-3 px-3 py-2 bg-cyan-500 rounded-lg text-center text-white text-sm font-bold">
                    ✓ ACTIVE
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Current Mode Info */}
          <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentMode.icon}</span>
              <div className="flex-1">
                <div className="text-sm text-zinc-400">Currently using:</div>
                <div className="text-lg font-bold text-white">{currentMode.name}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-500">Rendering Engine</div>
                <div className={`text-sm font-bold ${
                  renderMode === 'svg' ? 'text-green-400' :
                  renderMode === '3d' ? 'text-blue-400' : 'text-purple-400'
                }`}>
                  {renderMode === 'svg' ? 'SVG + GSAP' :
                   renderMode === '3d' ? 'Three.js + React Three Fiber' : 'Unity WebGL'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show Controls Button (when hidden) */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="mb-4 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold shadow-lg transition-all"
        >
          ⚙️ Show Rendering Options
        </button>
      )}

      {/* Render Selected Mode */}
      <div className="relative">
        {/* Performance Warning for Unity */}
        {renderMode === 'unity' && (
          <div className="mb-4 p-4 bg-yellow-500/20 border-2 border-yellow-500 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-bold text-yellow-400">High-Performance Mode</div>
                <div className="text-sm text-yellow-200">
                  Unity WebGL requires a powerful device. If loading fails, switch to SVG or Three.js mode.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SVG Mode */}
        {renderMode === 'svg' && (
          <div className="animate-fadeIn">
            <SVGDigitalTwin />
          </div>
        )}

        {/* Three.js Mode */}
        {renderMode === '3d' && (
          <div className="animate-fadeIn">
            <AdvancedDigitalTwin3D />
          </div>
        )}

        {/* Unity Mode */}
        {renderMode === 'unity' && (
          <div className="animate-fadeIn">
            <div className="w-full h-[800px] bg-zinc-900 rounded-3xl flex items-center justify-center border-2 border-yellow-500">
              <div className="text-center p-8 max-w-2xl">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Unity WebGL Mode</h3>
                <p className="text-zinc-300 mb-6">
                  Unity mode requires a Unity WebGL build to be placed in the <code className="bg-zinc-800 px-2 py-1 rounded">public/unity-builds/</code> directory.
                </p>
                <div className="bg-zinc-800/50 rounded-xl p-6 text-left text-sm text-zinc-400 mb-6">
                  <p className="font-semibold text-white mb-2">To enable Unity mode:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Build your Unity project for WebGL</li>
                    <li>Copy the build folder to <code className="bg-zinc-700 px-1 rounded">public/unity-builds/</code></li>
                    <li>Update the UnityDigitalTwin component with your build name</li>
                    <li>Refresh the page</li>
                  </ol>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setRenderMode('svg')}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold transition-all"
                  >
                    ⚡ Use SVG Mode Instead
                  </button>
                  <button
                    onClick={() => setRenderMode('3d')}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all"
                  >
                    🎮 Use Three.js Mode Instead
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mode Comparison Table */}
      {showControls && (
        <div className="mt-6 bg-zinc-900/95 backdrop-blur-xl border-2 border-zinc-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Feature Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left p-3 text-zinc-400 font-semibold">Feature</th>
                  <th className="text-center p-3 text-cyan-400 font-semibold">SVG + GSAP</th>
                  <th className="text-center p-3 text-blue-400 font-semibold">Three.js 3D</th>
                  <th className="text-center p-3 text-purple-400 font-semibold">Unity WebGL</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800">
                  <td className="p-3">Load Time</td>
                  <td className="text-center p-3 text-green-400 font-bold">Instant</td>
                  <td className="text-center p-3 text-blue-400 font-bold">2-3s</td>
                  <td className="text-center p-3 text-yellow-400 font-bold">5-10s</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="p-3">Frame Rate</td>
                  <td className="text-center p-3">60 FPS</td>
                  <td className="text-center p-3">60 FPS</td>
                  <td className="text-center p-3">30-60 FPS</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="p-3">File Size</td>
                  <td className="text-center p-3 text-green-400">~50 KB</td>
                  <td className="text-center p-3 text-blue-400">~500 KB</td>
                  <td className="text-center p-3 text-red-400">~10 MB</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="p-3">Mobile Support</td>
                  <td className="text-center p-3">✅ Excellent</td>
                  <td className="text-center p-3">✅ Good</td>
                  <td className="text-center p-3">⚠️ Limited</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="p-3">Interactivity</td>
                  <td className="text-center p-3">✅ High</td>
                  <td className="text-center p-3">✅ Very High</td>
                  <td className="text-center p-3">✅ Ultra High</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="p-3">Visual Quality</td>
                  <td className="text-center p-3">⭐⭐⭐⭐</td>
                  <td className="text-center p-3">⭐⭐⭐⭐⭐</td>
                  <td className="text-center p-3">⭐⭐⭐⭐⭐⭐</td>
                </tr>
                <tr>
                  <td className="p-3">Recommended Use</td>
                  <td className="text-center p-3 text-xs">Presentations, Mobile, Demos</td>
                  <td className="text-center p-3 text-xs">Desktop Apps, Training</td>
                  <td className="text-center p-3 text-xs">High-end Showcases</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HybridDigitalTwin;
