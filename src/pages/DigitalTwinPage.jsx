import { useState } from 'react';
import { Factory, Info, Settings, Download } from 'lucide-react';
import AdaptiveDigitalTwin from '../components/AdaptiveDigitalTwin';

/**
 * Digital Twin Page Component
 * Complete page example showing how to integrate the digital twin
 */

const DigitalTwinPage = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Factory className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Production Plant Digital Twin</h1>
                <p className="text-sm text-zinc-400">Real-time 3D Simulation & Monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-white text-sm transition-colors"
              >
                <Info className="w-4 h-4" />
                Info
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Info Panel */}
        {showInfo && (
          <div className="mb-6 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400">About This Digital Twin</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  This is an advanced digital twin simulation of a large-scale production plant. 
                  The system automatically adapts to your device capabilities, selecting the optimal 
                  rendering mode for the best performance and visual quality.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-3">
                    <h4 className="text-cyan-400 font-semibold text-sm mb-1">Components</h4>
                    <p className="text-zinc-400 text-xs">15+ industrial elements including silos, boilers, cooling towers, and storage tanks</p>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-3">
                    <h4 className="text-cyan-400 font-semibold text-sm mb-1">Real-time Metrics</h4>
                    <p className="text-zinc-400 text-xs">Live production tracking, OEE calculations, and environmental monitoring</p>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-3">
                    <h4 className="text-cyan-400 font-semibold text-sm mb-1">Adaptive Quality</h4>
                    <p className="text-zinc-400 text-xs">Automatically optimizes for your device - from mobile to high-end desktop</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Digital Twin Viewer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Live Simulation</h2>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Active</span>
            </div>
          </div>

          {/* Main Digital Twin Component */}
          <AdaptiveDigitalTwin showControls={true} />
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-400" />
              System Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                <span className="text-zinc-400 text-sm">Total Components</span>
                <span className="text-white font-semibold">15+</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                <span className="text-zinc-400 text-sm">Rendering Modes</span>
                <span className="text-white font-semibold">3 (Adaptive)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                <span className="text-zinc-400 text-sm">Supported Devices</span>
                <span className="text-white font-semibold">All (Mobile to Desktop)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-zinc-400 text-sm">Performance Target</span>
                <span className="text-white font-semibold">60 FPS (Desktop)</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
            <ul className="space-y-2">
              {[
                'Real-time production monitoring',
                'OEE calculations and analytics',
                'Interactive 3D visualization',
                'Touch and mouse controls',
                'Automatic device optimization',
                'Unity WebGL support (optional)',
                'Mobile-responsive design',
                'High-performance rendering'
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="mt-8 bg-gradient-to-r from-cyan-950/20 to-purple-950/20 border border-cyan-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Documentation & Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/QUICK_START_DIGITAL_TWIN.md"
              className="block p-4 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-700 rounded-lg transition-colors"
            >
              <h4 className="text-cyan-400 font-semibold mb-1">Quick Start Guide</h4>
              <p className="text-zinc-400 text-xs">Get started in 5 minutes</p>
            </a>
            <a 
              href="/DIGITAL_TWIN_README.md"
              className="block p-4 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-700 rounded-lg transition-colors"
            >
              <h4 className="text-cyan-400 font-semibold mb-1">Full Documentation</h4>
              <p className="text-zinc-400 text-xs">Complete feature guide</p>
            </a>
            <a 
              href="/UNITY_INTEGRATION_GUIDE.md"
              className="block p-4 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-700 rounded-lg transition-colors"
            >
              <h4 className="text-cyan-400 font-semibold mb-1">Unity Integration</h4>
              <p className="text-zinc-400 text-xs">Enhanced graphics setup</p>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-zinc-400">
              Digital Twin Simulation System v1.0.0
            </div>
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <span>Built with React + Three.js</span>
              <span>•</span>
              <span>Unity WebGL Ready</span>
              <span>•</span>
              <span>Mobile Optimized</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DigitalTwinPage;
