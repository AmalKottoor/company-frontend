import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import ServiceCard from './ServiceCard';
import IndustrialBackground from './IndustrialBackground';
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
    <section id="services" className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden border-t border-b border-x border-border/30">
      <IndustrialBackground variant="services" intensity="medium" />
      
      {/* Decorative accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent"></div>
      
      {/* Corner accent elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-primary/10 rounded-tl-2xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-accent/10 rounded-tr-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-accent/10 rounded-bl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-primary/10 rounded-br-2xl"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-foreground" data-testid="services-section-title">
            Core Competency Areas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
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
            <Search size={18} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services or tools..."
              className="w-full pl-14 pr-14 py-4 bg-card/50 backdrop-blur-xl border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-foreground placeholder-muted-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="services-search-input"
            />
            {searchTerm && (
              <button
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
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
                className="text-muted-foreground"
                data-testid="services-no-results"
              >
                <Search size={48} className="mx-auto mb-4 opacity-30" />
                <h3 className="text-xl font-medium mb-2 text-foreground">No services found</h3>
                <p className="font-light">Try adjusting your search terms or browse all services</p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-20 border-t border-border"
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
              <div className="text-4xl md:text-5xl font-light text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-light">
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
