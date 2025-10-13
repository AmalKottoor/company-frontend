import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ExternalLink, Monitor, Pencil, Boxes, Database } from 'lucide-react';
import softwaresData from '../config/softwares.json';

const SoftwareSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSoftware = softwaresData.softwares.filter(software =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="software" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6 text-white tracking-tight" data-testid="software-section-title">
            Software Competencies
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
            Expertise across industry-leading platforms—delivering integrated automation solutions with proven technologies
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
              placeholder="Search software platforms..."
              className="w-full pl-14 pr-14 py-4 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-full focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple/50 transition-all text-white placeholder-zinc-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="software-search-input"
            />
            {searchTerm && (
              <button
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-neon-purple transition-colors"
                onClick={() => setSearchTerm('')}
                data-testid="software-search-clear"
              >
                <X size={18} />
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
                className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 border border-zinc-800/50 hover:border-neon-purple/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                data-testid={`software-card-${software.id}`}
              >
                {/* Logo Container */}
                <div className="relative mb-4 h-16 flex items-center justify-center">
                  <motion.img
                    src={software.logo}
                    alt={software.name}
                    className="max-h-12 max-w-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    data-testid={`software-logo-${software.id}`}
                  />
                  <div 
                    className="hidden items-center justify-center w-full h-full bg-zinc-800 rounded-lg text-neon-purple font-semibold text-sm"
                    style={{ display: 'none' }}
                  >
                    {software.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
                  </div>
                </div>

                {/* Software Name */}
                <h3 className="text-white font-medium text-center mb-3 group-hover:text-neon-purple transition-colors line-clamp-2">
                  {software.name}
                </h3>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* External Link Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink size={14} className="text-neon-purple" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-zinc-500"
                data-testid="software-no-results"
              >
                <Search size={48} className="mx-auto mb-4 opacity-30" />
                <h3 className="text-xl font-medium mb-2 text-white">No software found</h3>
                <p className="font-light">Try adjusting your search terms</p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Competency Areas */}
        <motion.div
          className="mt-24 pt-20 border-t border-zinc-800/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-3xl font-light text-white mb-12 text-center tracking-tight">
            Software Competency Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'SCADA/HMI Development',
                description: 'Ignition, Rockwell, Siemens TIA Portal',
                color: 'neon-cyan',
                icon: Monitor
              },
              {
                title: 'Electrical Engineering',
                description: 'AutoCAD, EPLAN electrical design systems',
                color: 'neon-purple',
                icon: Pencil
              },
              {
                title: 'Simulation & Modeling',
                description: 'AnyLogic, Unity 3D virtual environments',
                color: 'neon-green',
                icon: Boxes
              },
              {
                title: 'Data & Analytics',
                description: 'Historians, LabVIEW, Dynamics 365 CRM',
                color: 'neon-pink',
                icon: Database
              }
            ].map((area, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                data-testid={`competency-area-${index}`}
              >
                <div className={`inline-block p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 mb-5`}>
                  <area.icon size={28} className={`text-${area.color}`} />
                </div>
                <h4 className="text-white font-medium mb-3 text-lg">{area.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SoftwareSection;
