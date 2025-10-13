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
      className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-800/50 overflow-hidden hover:border-neon-cyan/30 transition-all duration-500"
      whileHover={{ y: -4 }}
      layout
    >
      <div className="p-8">
        {/* Icon and Title */}
        <div className="flex items-start space-x-5 mb-6">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-zinc-800/80 rounded-2xl flex items-center justify-center border border-zinc-700/50 group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-500">
              <IconComponent size={26} className="text-neon-cyan group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all duration-500" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white tracking-tight leading-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 text-xs font-medium rounded-full hover:border-neon-purple/50 hover:text-neon-purple transition-all duration-300"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Short Description */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-5 font-light">
          {service.short}
        </p>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-neon-cyan hover:text-neon-blue transition-colors text-sm font-medium group/btn"
        >
          <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
          {isExpanded ? <ChevronUp size={16} className="group-hover/btn:translate-y-[-2px] transition-transform" /> : <ChevronDown size={16} className="group-hover/btn:translate-y-[2px] transition-transform" />}
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
              <div className="mt-5 pt-5 border-t border-zinc-800/50">
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {service.long}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-cyan/5 via-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default ServiceCard;
