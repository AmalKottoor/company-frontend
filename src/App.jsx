import { lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import Logo from './components/Logo';

// Lazy load heavy components for better initial load performance
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const SoftwareSection = lazy(() => import('./components/SoftwareSection'));
const DigitalTwinSection = lazy(() => import('./components/DigitalTwinSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full py-24 flex items-center justify-center bg-black">
    <div className="text-center">
      <div className="w-8 h-8 border-3 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-zinc-500 text-sm font-light">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <div className="App min-h-screen bg-black transition-colors duration-300">
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main>
            {/* Hero Section - Load immediately */}
            <HeroSection />
            
            {/* Lazy-loaded sections with Suspense */}
            <Suspense fallback={<SectionLoader />}>
              {/* Services Section */}
              <ServicesSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              {/* Software Competencies Section */}
              <SoftwareSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              {/* Digital Twin Section */}
              <DigitalTwinSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              {/* Contact Section */}
              <ContactSection />
            </Suspense>
          </main>
          
          {/* Footer */}
          <footer className="bg-zinc-950 border-t border-zinc-800/50 text-white py-16">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Company Info */}
                <div>
                  <div className="mb-4">
                    <Logo size={40} showText={true} animated={false} />
                  </div>
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
                    <p className="text-sm pt-4 text-zinc-600">© 2025 Caelus Technologies. All rights reserved.</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-zinc-800/50 pt-8 mt-12 text-center text-zinc-600 font-light text-sm">
                <p className="mb-2">© 2025 Caelus Technologies. All rights reserved.</p>
                <p className="text-xs text-zinc-700">
                  Caelus Technologies is a registered trademark of Caelus Technologies. Third party trademarks are the property of their respective owners.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
