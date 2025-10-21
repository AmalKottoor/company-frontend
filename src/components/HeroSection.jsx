import { motion } from 'framer-motion';
import { ChevronDown, Zap, Cpu, BarChart3, Cog } from 'lucide-react';
import Logo from './Logo';

const HeroSection = () => {
  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    { icon: Zap, text: 'AI/ML Analytics' },
    { icon: Cpu, text: 'Digital Twin' },
    { icon: BarChart3, text: 'SCADA Systems' },
    { icon: Cog, text: 'Automation' }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Minimal Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      
      {/* Subtle Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo and Main Heading */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="mb-6"
            >
              <Logo size={80} showText={false} animated={false} />
            </motion.div>
            <h1 className="text-7xl md:text-9xl font-light tracking-tight" data-testid="hero-main-title">
              <span className="text-white">
                Caelus Technologies
              </span>
            </h1>
          </div>
          
          <motion.p
            className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            data-testid="hero-subtitle"
          >
            Leading Industrial Automation & Digital Transformation Partner—Delivering innovative engineering solutions from concept to commissioning
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 bg-zinc-900/50 backdrop-blur-xl rounded-full px-5 py-2.5 border border-zinc-800/50 hover:border-neon-cyan/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                data-testid={`hero-feature-${index}`}
              >
                <feature.icon size={16} className="text-neon-cyan" />
                <span className="text-zinc-300 text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button
              className="px-10 py-4 bg-white text-black rounded-full font-medium text-base hover:bg-zinc-100 transition-all shadow-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToServices}
              data-testid="hero-cta-services"
            >
              Explore Our Solutions
            </motion.button>
            <motion.button
              className="px-10 py-4 bg-transparent border border-zinc-700 text-white rounded-full font-medium text-base hover:bg-zinc-900/50 hover:border-neon-cyan/50 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="hero-cta-digital-twin"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            onClick={scrollToServices}
            className="text-zinc-600 hover:text-neon-cyan transition-colors"
            data-testid="hero-scroll-indicator"
          >
            <ChevronDown size={28} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
