import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useAdmin } from '../contexts/AdminContext';
import servicesData from '../config/services.json';

const ServicesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isServiceVisible } = useAdmin();

  const filteredServices = servicesData.services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.short.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.tools.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const visibleServices = filteredServices.filter(service => 
    isServiceVisible(service.id)
  );

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-6" data-testid="services-section-title">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive industrial automation solutions from control system design to AI/ML analytics and Digital Twin implementations
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search services or tools..."
              className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 dark:text-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="services-search-input"
            />
            {searchTerm && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                onClick={() => setSearchTerm('')}
                data-testid="services-search-clear"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {visibleServices.length > 0 ? (
            visibleServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <ServiceCard
                  service={service}
                  isVisible={isServiceVisible(service.id)}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-slate-500 dark:text-slate-400"
                data-testid="services-no-results"
              >
                <Search size={48} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No services found</h3>
                <p>Try adjusting your search terms or browse all services</p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[
            { number: '14+', label: 'Services' },
            { number: '12+', label: 'Software Platforms' },
            { number: '100%', label: 'Automation Focus' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center"
              data-testid={`services-stat-${index}`}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
