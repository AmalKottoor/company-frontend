import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, RotateCcw, Zap } from 'lucide-react';

// Lazy load the 3D component to prevent blocking initial page load
const DigitalTwin3D = lazy(() => import('./DigitalTwin3D'));

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
    <section id="digital-twin" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-6" data-testid="digital-twin-section-title">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Digital Twin Technology
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
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
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                Interactive Industrial Automation Demo
              </h3>
              <p className="text-slate-300 text-sm">
                Click the control panel buttons to operate the robotic arms and conveyor system
              </p>
            </div>
            
            {/* Lazy-loaded 3D Component */}
            <Suspense fallback={
              <div className="w-full h-96 flex items-center justify-center bg-slate-900 rounded-xl border border-slate-700">
                <div className="text-center text-slate-300">
                  <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading Digital Twin Experience...</p>
                </div>
              </div>
            }>
              <DigitalTwin3D />
            </Suspense>

            {/* Instructions */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Red Button: Toggle Robot Arms</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Green Button: Toggle Conveyor Belt</span>
              </div>
            </div>
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
              className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              data-testid={`digital-twin-feature-${index}`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4">
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
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
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              Digital Twin Capabilities
            </h3>
            <ul className="space-y-4">
              {[
                'Real-time 3D visualization of industrial processes',
                'Interactive control panels for equipment operation',
                'Live data integration with sensor networks',
                'Predictive maintenance algorithms',
                'Process optimization recommendations',
                'Virtual commissioning and testing'
              ].map((capability, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-600 dark:text-slate-400">{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
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
                <div key={index} className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="text-sm font-semibold text-slate-800 dark:text-white">
                    {tech.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
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
