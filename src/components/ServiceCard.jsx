import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Zap, Cpu, Database, Settings, RefreshCw, Brain, Wifi, Copy, Microchip, Building2, Eye, Activity, BarChart3, Box } from 'lucide-react';

// Icon mapping
const iconMap = {
  'Zap': Zap,
  'Cpu': Cpu,
  'Database': Database,
  'Settings': Settings,
  'RefreshCw': RefreshCw,
  'Brain': Brain,
  'Wifi': Wifi,
  'Copy': Copy,
  'Microchip': Microchip,
  'Building2': Building2,
  'Eye': Eye,
  'Activity': Activity,
  'BarChart3': BarChart3,
  'Box': Box
};

const ServiceCard = ({ service, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[service.icon] || Cpu;

  if (!isVisible) return null;

  return (
    <motion.div
      className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300"
      whileHover={{ y: -8, scale: 1.02 }}
      layout
    >
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
              <IconComponent size={24} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full shadow-sm"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Short Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
          {service.short}
        </p>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
        >
          <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {service.long}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default ServiceCard;
