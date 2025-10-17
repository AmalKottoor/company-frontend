import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, ExternalLink, Monitor, Pencil, Boxes, Database,
  Zap, Cpu, Wrench, Factory, Gauge, Network, Code, Layers,
  Settings, Workflow, BarChart3, Globe
} from 'lucide-react';
import softwaresData from '../config/softwares.json';

const SoftwareSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [flippedCards, setFlippedCards] = useState({});

  // Map software IDs to icons and colors (based on actual brand colors)
  const softwareIconMap = {
    ignition: { icon: Zap, color: 'from-blue-900 to-orange-500', iconColor: 'text-orange-400' }, // Dark blue + orange accent
    rockwell: { icon: Factory, color: 'from-blue-600 to-blue-700', iconColor: 'text-blue-300' }, // FactoryTalk blue
    siemens: { icon: Settings, color: 'from-cyan-500 to-blue-600', iconColor: 'text-cyan-400' },
    canary: { icon: BarChart3, color: 'from-yellow-400 to-yellow-500', iconColor: 'text-yellow-400' }, // Yellow bird
    hivemq: { icon: Network, color: 'from-green-500 to-emerald-600', iconColor: 'text-green-400' },
    labview: { icon: Workflow, color: 'from-yellow-400 to-yellow-500', iconColor: 'text-yellow-300' }, // Yellow triangle
    autocad: { icon: Pencil, color: 'from-pink-600 to-red-600', iconColor: 'text-pink-400' }, // Red/Pink brand
    eplan: { icon: Layers, color: 'from-pink-600 to-red-600', iconColor: 'text-pink-400' }, // Magenta/Red brand
    anylogic: { icon: Boxes, color: 'from-blue-500 to-blue-600', iconColor: 'text-blue-400' }, // Blue brand
    unity: { icon: Cpu, color: 'from-gray-600 to-gray-800', iconColor: 'text-gray-200' }, // Gray/Black cube
    arduino: { icon: Code, color: 'from-teal-500 to-cyan-500', iconColor: 'text-teal-400' }, // Teal/Cyan brand
    dynamics: { icon: Globe, color: 'from-blue-500 to-blue-600', iconColor: 'text-blue-300' } // Microsoft blue
  };

  const filteredSoftware = softwaresData.softwares.filter(software =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCard = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
                {/* Logo Container with White Background */}
                <div className="relative mb-4 h-24 flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-2xl p-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <motion.img
                      src={software.logo}
                      alt={software.name}
                      className="max-h-full max-w-full object-contain"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.target.style.display = 'none';
                        const fallback = e.target.parentElement.querySelector('.fallback-text');
                        if (fallback) fallback.style.display = 'flex';
                      }}
                      data-testid={`software-logo-${software.id}`}
                    />
                    <div 
                      className="fallback-text hidden w-full h-full items-center justify-center text-zinc-800 font-bold text-lg"
                      style={{ display: 'none' }}
                    >
                      {software.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
                    </div>
                  </div>
                </div>

                {/* Software Name */}
                <h3 className="text-white font-semibold text-center mb-2 group-hover:text-neon-purple transition-colors line-clamp-2 min-h-[3rem] flex items-center justify-center text-sm">
                  {software.name}
                </h3>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-neon-purple/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
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

        {/* Competency Areas - Flippable Cards */}
        <motion.div
          className="mt-24 pt-20 border-t border-zinc-800/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-3xl font-light text-white mb-4 text-center tracking-tight">
            Core Competency Areas
          </h3>
          <p className="text-zinc-400 text-center mb-12 text-sm">Click on any card to learn more</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'SCADA/HMI Development',
                shortDesc: 'Ignition, Rockwell, Siemens TIA Portal',
                fullDesc: 'Expert development of supervisory control and data acquisition systems. We specialize in Ignition SCADA, Rockwell FactoryTalk, and Siemens TIA Portal for real-time monitoring, control, and visualization of industrial processes.',
                color: 'from-cyan-500 to-blue-600',
                icon: Monitor,
                features: ['Real-time Monitoring', 'Custom HMI Design', 'Alarm Management', 'Historical Trending']
              },
              {
                title: 'Electrical Engineering',
                shortDesc: 'AutoCAD, EPLAN electrical design systems',
                fullDesc: 'Comprehensive electrical design and documentation services using industry-standard tools. From schematic design to panel layouts, we deliver precise electrical engineering solutions for industrial automation projects.',
                color: 'from-purple-500 to-purple-700',
                icon: Pencil,
                features: ['Schematic Design', 'Panel Layouts', 'Cable Schedules', 'BOM Generation']
              },
              {
                title: 'Simulation & Modeling',
                shortDesc: 'AnyLogic, Unity 3D virtual environments',
                fullDesc: 'Advanced simulation and digital twin development for process optimization. We create virtual replicas of physical systems using AnyLogic for discrete event simulation and Unity 3D for immersive 3D visualizations.',
                color: 'from-green-500 to-emerald-600',
                icon: Boxes,
                features: ['Digital Twin', 'Process Simulation', '3D Visualization', 'What-if Analysis']
              },
              {
                title: 'Data & Analytics',
                shortDesc: 'Historians, LabVIEW, Dynamics 365 CRM',
                fullDesc: 'Industrial data management and analytics solutions. We implement historians for time-series data, develop LabVIEW applications for data acquisition, and integrate Dynamics 365 CRM for comprehensive business intelligence.',
                color: 'from-pink-500 to-rose-600',
                icon: Database,
                features: ['Data Historians', 'Real-time Analytics', 'CRM Integration', 'Reporting Dashboards']
              }
            ].map((area, index) => (
              <motion.div
                key={index}
                className="relative h-[320px] cursor-pointer perspective-1000"
                onClick={() => toggleCard(index)}
                data-testid={`competency-area-${index}`}
              >
                <motion.div
                  className="relative w-full h-full transition-transform duration-700 preserve-3d"
                  animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of Card */}
                  <div className="absolute w-full h-full backface-hidden">
                    <motion.div
                      className="h-full text-center p-8 bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 flex flex-col items-center justify-center"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className={`inline-block p-5 rounded-2xl bg-gradient-to-br ${area.color} mb-6 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <area.icon size={32} className="text-white drop-shadow-lg" strokeWidth={2} />
                      </motion.div>
                      <h4 className="text-white font-semibold mb-3 text-lg">{area.title}</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed font-light mb-4">{area.shortDesc}</p>
                      <div className="mt-auto flex items-center gap-2 text-xs text-neon-purple">
                        <span>Click to learn more</span>
                        <ExternalLink size={12} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <motion.div
                      className="h-full p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 backdrop-blur-xl rounded-3xl border border-zinc-700/50 flex flex-col"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: flippedCards[index] ? 1 : 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${area.color}`}>
                          <area.icon size={24} className="text-white" strokeWidth={2} />
                        </div>
                        <button 
                          className="text-zinc-400 hover:text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCard(index);
                          }}
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <h4 className="text-white font-semibold mb-3 text-base">{area.title}</h4>
                      <p className="text-zinc-300 text-xs leading-relaxed mb-4 flex-grow">{area.fullDesc}</p>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Key Features:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {area.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-zinc-400">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${area.color}`} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SoftwareSection;
