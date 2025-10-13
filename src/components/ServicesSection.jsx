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
    <section id="services" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-white" data-testid="services-section-title">
            Core Competency Areas
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
            End-to-end industrial automation and digital transformation solutions—from electrical design and PLC programming to AI/ML analytics and immersive Digital Twin implementations
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <Search size={18} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search services or tools..."
              className="w-full pl-14 pr-14 py-4 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-full focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all text-white placeholder-zinc-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="services-search-input"
            />
            {searchTerm && (
              <button
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-neon-cyan transition-colors"
                onClick={() => setSearchTerm('')}
                data-testid="services-search-clear"
              >
                <X size={18} />
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
                className="text-zinc-500"
                data-testid="services-no-results"
              >
                <Search size={48} className="mx-auto mb-4 opacity-30" />
                <h3 className="text-xl font-medium mb-2 text-white">No services found</h3>
                <p className="font-light">Try adjusting your search terms or browse all services</p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-20 border-t border-zinc-800/50"
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
              <div className="text-4xl md:text-5xl font-light text-white mb-2">
                {stat.number}
              </div>
              <div className="text-zinc-500 font-light">
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
