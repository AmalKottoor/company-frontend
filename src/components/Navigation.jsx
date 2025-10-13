import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Mail, Home, Briefcase, Code, Cpu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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
        className="fixed top-6 left-6 z-50 p-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="hamburger-menu-toggle"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Theme Toggle */}
      <motion.button
        className="fixed top-6 right-6 z-50 p-3 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="theme-toggle-button"
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      {/* Side Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Side Menu */}
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-slate-800 dark:via-blue-800 dark:to-purple-800 text-white z-40 shadow-2xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              data-testid="side-navigation-menu"
            >
              <div className="p-8">
                {/* Logo */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    OptiAutomata
                  </h1>
                  <p className="text-sm text-slate-300 mt-2">Industrial Automation Solutions</p>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                      onClick={() => scrollToSection(item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      data-testid={`nav-item-${item.id}`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-xs text-slate-400">
                      © 2025 OptiAutomata
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
