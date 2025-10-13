import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import SoftwareSection from './components/SoftwareSection';
import DigitalTwinSection from './components/DigitalTwinSection';
import ContactSection from './components/ContactSection';

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
            
            {/* Contact Section */}
            <ContactSection />
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
                    Leading industrial automation and digital transformation partner—delivering innovative engineering solutions from concept to commissioning.
                  </p>
                </div>
                
                {/* Services */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Core Competencies</h4>
                  <ul className="space-y-2 text-slate-400">
                    <li>PLC & SCADA Development</li>
                    <li>Digital Twin Technology</li>
                    <li>AI/ML Predictive Analytics</li>
                    <li>Industrial IoT Solutions</li>
                    <li>Machine Vision Systems</li>
                  </ul>
                </div>
                
                {/* Contact */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
                  <div className="space-y-2 text-slate-400">
                    <p>Ready to transform your industrial operations?</p>
                    <a href="mailto:amalkottooran01@gmail.com" className="text-blue-400 font-medium hover:text-blue-300 transition-colors block">
                      amalkottooran01@gmail.com
                    </a>
                    <p className="text-sm pt-4">© 2025 OptiAutomata. All rights reserved.</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-slate-800 pt-8 mt-8 text-center text-slate-500">
                <p>Powered by React, Vite, Tailwind CSS, and Three.js</p>
              </div>
            </div>
          </footer>
        </div>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
