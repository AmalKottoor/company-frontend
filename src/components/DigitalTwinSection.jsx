import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, RotateCcw, Zap } from 'lucide-react';

// Lazy load the hybrid digital twin component
const HybridDigitalTwin = lazy(() => import('./HybridDigitalTwin'));

const DigitalTwinSection = () => {
  const features = [
    {
      icon: Cpu,
      title: 'Real-time Simulation',
      description: 'Live data synchronization with physical systems for accurate digital representation'
    },
    {
      icon: Play,
      title: 'Interactive Controls',
      description: 'Control and monitor industrial equipment through intuitive 3D interfaces'
    },
    {
      icon: RotateCcw,
      title: 'Predictive Analytics',
      description: 'AI-powered predictions for maintenance and process optimization'
    },
    {
      icon: Zap,
      title: 'Performance Monitoring',
      description: 'Real-time KPI tracking and system performance visualization'
    }
  ];

  return (
    <section id="digital-twin" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6 text-white tracking-tight" data-testid="digital-twin-section-title">
            Digital Twin Technology
          </h2>
          <p className="text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed font-light">
            Experience our interactive 3D Digital Twin showcasing industrial automation systems with real-time control and monitoring capabilities
          </p>
        </motion.div>

        {/* 3D Digital Twin Viewer */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="relative bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800/50">
            {/* Lazy-loaded Hybrid Digital Twin */}
            <Suspense fallback={
              <div className="w-full h-[600px] flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800/50">
                <div className="text-center text-zinc-400 px-4">
                  <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="font-light text-sm md:text-base">Loading Digital Twin System...</p>
                  <p className="text-xs text-zinc-600 mt-2">Preparing Three.js 3D rendering engine...</p>
                </div>
              </div>
            }>
              <HybridDigitalTwin />
            </Suspense>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-8 bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              data-testid={`digital-twin-feature-${index}`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-zinc-800/80 border border-zinc-700/50 rounded-2xl mb-5">
                <feature.icon size={24} className="text-neon-cyan" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Capabilities */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-10 border border-zinc-800/50">
            <h3 className="text-2xl font-semibold text-white mb-8 tracking-tight">
              Digital Twin Capabilities
            </h3>
            <ul className="space-y-4">
              {[
                'Triple rendering modes: SVG+GSAP, Three.js 3D, Unity WebGL',
                'Crystal-clear SVG graphics with GSAP animations (TagDynamix-style)',
                'Interactive 3D models with camera presets and component selection',
                'Real-time OEE calculations and comprehensive production metrics',
                'Hybrid approach: Choose best rendering for your device',
                'Professional SCADA-level visualization and controls'
              ].map((capability, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(0,255,255,0.6)]"></div>
                  <span className="text-zinc-400 font-light">{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-10 border border-zinc-800/50">
            <h3 className="text-2xl font-semibold text-white mb-8 tracking-tight">
              Technologies Used
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Unity 3D', description: '3D Engine' },
                { name: 'Three.js', description: 'Web 3D Graphics' },
                { name: 'AnyLogic', description: 'Simulation Platform' },
                { name: 'React Fiber', description: 'React 3D Renderer' },
                { name: 'WebGL', description: 'Graphics API' },
                { name: 'IoT Integration', description: 'Live Data Sync' }
              ].map((tech, index) => (
                <div key={index} className="text-center p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                  <div className="text-sm font-medium text-white">
                    {tech.name}
                  </div>
                  <div className="text-xs text-zinc-500 font-light mt-1">
                    {tech.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalTwinSection;
