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
      className="group relative bg-card backdrop-blur-xl rounded-3xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-primary/10"
      whileHover={{ y: -8, scale: 1.02 }}
      layout
    >
      {/* Gradient Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-2xl" />
      </div>
      
      <div className="p-8 relative z-10">
        {/* Icon and Title */}
        <div className="flex items-start space-x-5 mb-6">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:scale-110 transition-all duration-500">
              <IconComponent size={26} className="text-primary transition-all duration-500" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground tracking-tight leading-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-secondary border border-border text-muted-foreground text-xs font-medium rounded-full hover:border-accent/50 hover:text-accent transition-all duration-300"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Short Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 font-light">
          {service.short}
        </p>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-primary hover:text-accent transition-colors text-sm font-medium group/btn"
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
              <div className="mt-5 pt-5 border-t border-border">
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  {service.long}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none -z-10" />
    </motion.div>
  );
};

export default ServiceCard;
