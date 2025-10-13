import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ExternalLink } from 'lucide-react';
import softwaresData from '../config/softwares.json';

const SoftwareSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSoftware = softwaresData.softwares.filter(software =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="software" className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-6 text-white" data-testid="software-section-title">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Software Competencies
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We work with industry-leading software platforms to deliver comprehensive automation solutions
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
              placeholder="Search software platforms..."
              className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-slate-400 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="software-search-input"
            />
            {searchTerm && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                onClick={() => setSearchTerm('')}
                data-testid="software-search-clear"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Software Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {filteredSoftware.length > 0 ? (
            filteredSoftware.map((software, index) => (
              <motion.div
                key={software.id}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-800/70"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                data-testid={`software-card-${software.id}`}
              >
                {/* Logo Container */}
                <div className="relative mb-4 h-16 flex items-center justify-center">
                  <motion.img
                    src={software.logo}
                    alt={software.name}
                    className="max-h-12 max-w-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    data-testid={`software-logo-${software.id}`}
                  />
                  <div 
                    className="hidden items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg text-white font-bold text-sm"
                    style={{ display: 'none' }}
                  >
                    {software.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
                  </div>
                </div>

                {/* Software Name */}
                <h3 className="text-white font-semibold text-center mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                  {software.name}
                </h3>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* External Link Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink size={16} className="text-blue-400" />
                </div>

                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-10" />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-slate-400"
                data-testid="software-no-results"
              >
                <Search size={48} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No software found</h3>
                <p>Try adjusting your search terms</p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Competency Areas */}
        <motion.div
          className="mt-20 pt-16 border-t border-slate-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Core Competency Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'SCADA/HMI',
                description: 'Ignition, Rockwell, Siemens platforms',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Engineering Design',
                description: 'AutoCAD, EPLAN electrical systems',
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Simulation & Modeling',
                description: 'AnyLogic, Unity 3D environments',
                color: 'from-green-500 to-teal-500'
              },
              {
                title: 'Data & Analytics',
                description: 'Historians, LabVIEW, Dynamics 365',
                color: 'from-orange-500 to-red-500'
              }
            ].map((area, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700/50"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
                data-testid={`competency-area-${index}`}
              >
                <div className={`inline-block p-3 rounded-full bg-gradient-to-r ${area.color} mb-4`}>
                  <div className="w-6 h-6" />
                </div>
                <h4 className="text-white font-semibold mb-2">{area.title}</h4>
                <p className="text-slate-400 text-sm">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SoftwareSection;
