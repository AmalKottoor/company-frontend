import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ServiceCard = ({ service, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      layout
    >
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
          {service.title}
        </h3>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full"
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
    </motion.div>
  );
};

export default ServiceCard;
