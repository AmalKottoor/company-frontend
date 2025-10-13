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
        <div className="App min-h-screen bg-black transition-colors duration-300">
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
          <footer className="bg-zinc-950 border-t border-zinc-800/50 text-white py-16">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Company Info */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">
                    OptiAutomata
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-light">
                    Leading industrial automation and digital transformation partner—delivering innovative engineering solutions from concept to commissioning.
                  </p>
                </div>
                
                {/* Services */}
                <div>
                  <h4 className="text-lg font-medium mb-4 text-white">Core Competencies</h4>
                  <ul className="space-y-2 text-zinc-400 font-light">
                    <li>PLC & SCADA Development</li>
                    <li>Digital Twin Technology</li>
                    <li>AI/ML Predictive Analytics</li>
                    <li>Industrial IoT Solutions</li>
                    <li>Machine Vision Systems</li>
                  </ul>
                </div>
                
                {/* Contact */}
                <div>
                  <h4 className="text-lg font-medium mb-4 text-white">Get In Touch</h4>
                  <div className="space-y-2 text-zinc-400 font-light">
                    <p>Ready to transform your industrial operations?</p>
                    <a href="mailto:amalkottooran01@gmail.com" className="text-neon-cyan font-medium hover:text-neon-blue transition-colors block">
                      amalkottooran01@gmail.com
                    </a>
                    <p className="text-sm pt-4 text-zinc-600">© 2025 OptiAutomata. All rights reserved.</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-zinc-800/50 pt-8 mt-12 text-center text-zinc-600 font-light text-sm">
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
