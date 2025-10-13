import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import SoftwareSection from './components/SoftwareSection';
import DigitalTwinSection from './components/DigitalTwinSection';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <div className="App min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <HeroSection />
            
            {/* Services Section */}
            <ServicesSection />
            
            {/* Software Competencies Section */}
            <SoftwareSection />
            
            {/* Digital Twin Section */}
            <DigitalTwinSection />
            
            {/* Admin Panel */}
            <AdminPanel />
          </main>
          
          {/* Footer */}
          <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    OptiAutomata
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Industrial Automation Solutions Provider offering end-to-end engineering and digital transformation services.
                  </p>
                </div>
                
                {/* Services */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Core Services</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li>PLC & SCADA Development</li>
                    <li>Digital Twin Implementation</li>
                    <li>AI/ML Analytics</li>
                    <li>IoT System Design</li>
                    <li>Industrial Vision Systems</li>
                  </ul>
                </div>
                
                {/* Contact */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
                  <div className="space-y-2 text-slate-400">
                    <p>Ready to optimize your industrial processes?</p>
                    <p className="text-blue-400 font-medium">contact@optiautomata.com</p>
                    <p className="text-sm">© 2025 OptiAutomata. All rights reserved.</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-800 pt-8 mt-8 text-center text-slate-500">
                <p>Built with React, Vite, Tailwind CSS 3, and Three.js for optimal performance</p>
              </div>
            </div>
          </footer>
        </div>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
