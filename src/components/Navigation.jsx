import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Mail, Home, Briefcase, Code, Cpu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'services', label: 'Services', icon: Briefcase, href: '#services' },
    { id: 'software', label: 'Software', icon: Code, href: '#software' },
    { id: 'digital-twin', label: 'Digital Twin', icon: Cpu, href: '#digital-twin' },
    { id: 'contact', label: 'Contact Us', icon: Mail, href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <motion.button
        className="fixed top-6 left-6 z-50 p-3.5 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 text-neon-cyan rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:border-neon-cyan/50 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="hamburger-menu-toggle"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </motion.button>

      {/* Theme Toggle */}
      <motion.button
        className="fixed top-6 right-6 z-50 p-3.5 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 text-neon-purple rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:border-neon-purple/50 transition-all duration-300"
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="theme-toggle-button"
      >
        {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
      </motion.button>

      {/* Side Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Side Menu */}
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-zinc-950/95 backdrop-blur-2xl border-r border-zinc-800/50 text-white z-40 shadow-2xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              data-testid="side-navigation-menu"
            >
              <div className="p-8 pt-24">
                {/* Logo */}
                <div className="mb-12">
                  <Logo size={48} showText={true} animated={true} />
                  <p className="text-sm text-zinc-500 mt-3 font-light">Industrial Automation Solutions</p>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      className="w-full flex items-center space-x-3 p-4 rounded-2xl hover:bg-zinc-800/50 transition-all duration-300 text-left group border border-transparent hover:border-zinc-800"
                      onClick={() => scrollToSection(item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                      data-testid={`nav-item-${item.id}`}
                    >
                      <item.icon size={20} className="text-neon-cyan group-hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.6)] transition-all duration-300" />
                      <span className="text-zinc-300 group-hover:text-white transition-colors font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="border-t border-zinc-800/50 pt-4">
                    <p className="text-xs text-zinc-600 font-light">
                      © 2025 Caelus Technologies
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
