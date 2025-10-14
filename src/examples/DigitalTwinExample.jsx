import { useState } from 'react';
import { Play, Pause, RotateCcw, Zap, Cpu, Smartphone } from 'lucide-react';
import AdaptiveDigitalTwin from '../components/AdaptiveDigitalTwin';
import UnityDigitalTwin from '../components/UnityDigitalTwin';
import AdvancedDigitalTwin3D from '../components/AdvancedDigitalTwin3D';
import MobileDigitalTwin3D from '../components/MobileDigitalTwin3D';

/**
 * Digital Twin Example Usage
 * Demonstrates different ways to use the digital twin components
 */

const DigitalTwinExample = () => {
  const [selectedExample, setSelectedExample] = useState('adaptive');

  const examples = [
    {
      id: 'adaptive',
      name: 'Adaptive Mode (Recommended)',
      description: 'Automatically selects the best rendering mode based on device capabilities',
      icon: Cpu,
      component: <AdaptiveDigitalTwin showControls={true} />
    },
    {
      id: 'unity',
      name: 'Unity WebGL Mode',
      description: 'High-fidelity Unity-based simulation (requires Unity build files)',
      icon: Zap,
      component: <UnityDigitalTwin showControls={true} />
    },
    {
      id: 'advanced',
      name: 'Advanced Three.js Mode',
      description: 'Full-featured Three.js simulation with all components',
      icon: Cpu,
      component: <AdvancedDigitalTwin3D />
    },
    {
      id: 'mobile',
      name: 'Mobile-Optimized Mode',
      description: 'Lightweight simulation optimized for mobile devices',
      icon: Smartphone,
      component: <MobileDigitalTwin3D />
    }
  ];

  const currentExample = examples.find(ex => ex.id === selectedExample);
  const Icon = currentExample?.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-white">
            Digital Twin Simulation
          </h1>
          <p className="text-lg text-zinc-400">
            Advanced production plant visualization with adaptive rendering
          </p>
        </div>

        {/* Mode Selector */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Select Rendering Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {examples.map((example) => {
              const ExampleIcon = example.icon;
              return (
                <button
                  key={example.id}
                  onClick={() => setSelectedExample(example.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedExample === example.id
                      ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/20'
                      : 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  <ExampleIcon className={`w-8 h-8 mb-3 ${
                    selectedExample === example.id ? 'text-cyan-400' : 'text-zinc-400'
                  }`} />
                  <h3 className={`font-semibold mb-2 ${
                    selectedExample === example.id ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {example.name}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {example.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Mode Info */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-cyan-400" />
            <div>
              <h3 className="text-white font-semibold">{currentExample?.name}</h3>
              <p className="text-sm text-zinc-400">{currentExample?.description}</p>
            </div>
          </div>
        </div>

        {/* Digital Twin Viewer */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
          {currentExample?.component}
        </div>

        {/* Usage Instructions */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Usage Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-cyan-400 font-semibold flex items-center gap-2">
                <Play className="w-4 h-4" />
                Camera Controls
              </h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Rotate:</strong> Click and drag (or touch and drag on mobile)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Zoom:</strong> Mouse wheel or pinch gesture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong>Pan:</strong> Right-click drag (desktop only)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-purple-400 font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                System Controls
              </h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span><strong>Start Systems:</strong> Click individual system buttons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span><strong>Emergency Stop:</strong> Red emergency button</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span><strong>Reset:</strong> Reset button to clear metrics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Code Examples</h2>
          
          <div className="space-y-4">
            {/* Example 1 */}
            <div>
              <h3 className="text-cyan-400 font-semibold mb-2">1. Adaptive Mode (Recommended)</h3>
              <pre className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-zinc-300">
{`import AdaptiveDigitalTwin from './components/AdaptiveDigitalTwin';

function App() {
  return (
    <AdaptiveDigitalTwin showControls={true} />
  );
}`}
                </code>
              </pre>
            </div>

            {/* Example 2 */}
            <div>
              <h3 className="text-cyan-400 font-semibold mb-2">2. Force Specific Mode</h3>
              <pre className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-zinc-300">
{`// Force Unity WebGL mode
<AdaptiveDigitalTwin forceMode="unity" showControls={true} />

// Force Advanced Three.js mode
<AdaptiveDigitalTwin forceMode="advanced" showControls={true} />

// Force Mobile-optimized mode
<AdaptiveDigitalTwin forceMode="mobile" showControls={true} />`}
                </code>
              </pre>
            </div>

            {/* Example 3 */}
            <div>
              <h3 className="text-cyan-400 font-semibold mb-2">3. Use Individual Components</h3>
              <pre className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-zinc-300">
{`import UnityDigitalTwin from './components/UnityDigitalTwin';
import AdvancedDigitalTwin3D from './components/AdvancedDigitalTwin3D';
import MobileDigitalTwin3D from './components/MobileDigitalTwin3D';

// Use Unity component directly
<UnityDigitalTwin showControls={true} />

// Use Advanced Three.js component
<AdvancedDigitalTwin3D />

// Use Mobile component
<MobileDigitalTwin3D />`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-6">
            <Zap className="w-10 h-10 text-cyan-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">High Performance</h3>
            <p className="text-sm text-zinc-400">
              Optimized rendering with adaptive quality settings for smooth 60 FPS on desktop
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-xl p-6">
            <Cpu className="w-10 h-10 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Smart Detection</h3>
            <p className="text-sm text-zinc-400">
              Automatically detects device capabilities and selects optimal rendering mode
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-6">
            <Smartphone className="w-10 h-10 text-green-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Mobile Ready</h3>
            <p className="text-sm text-zinc-400">
              Fully optimized for mobile devices with touch controls and reduced resource usage
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-zinc-500 pt-6 border-t border-zinc-800">
          <p>Digital Twin Simulation System v1.0.0</p>
          <p className="mt-1">Built with React, Three.js, and Unity WebGL</p>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinExample;
