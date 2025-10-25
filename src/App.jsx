import { lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import LazySection from './components/LazySection';
import IndustrialBackground from './components/IndustrialBackground';
import Logo from './components/Logo';

// Lazy load heavy components for better initial load performance
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const SoftwareSection = lazy(() => import('./components/SoftwareSection'));
const DigitalTwinSection = lazy(() => import('./components/DigitalTwinSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full py-24 flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-muted-foreground text-sm font-light">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <div className="App min-h-screen bg-background transition-colors duration-300">
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main>
            {/* Hero Section - Load immediately */}
            <HeroSection />
            
            {/* Lazy-loaded sections with Suspense and Intersection Observer */}
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <ServicesSection />
              </Suspense>
            </LazySection>
            
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <SoftwareSection />
              </Suspense>
            </LazySection>
            
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <DigitalTwinSection />
              </Suspense>
            </LazySection>
            
            <LazySection>
              <Suspense fallback={<SectionLoader />}>
                <ContactSection />
              </Suspense>
            </LazySection>
          </main>
          
          {/* Footer */}
          <footer className="relative bg-gradient-to-b from-background via-secondary/20 to-background py-20 overflow-hidden border-t border-x border-b border-border/30">
            <IndustrialBackground variant="footer" intensity="low" />
            
            {/* Decorative top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
            
            {/* Corner accent elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-primary/10 rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-accent/10 rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-accent/10 rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-primary/10 rounded-br-2xl"></div>
            
            <div className="container mx-auto px-6 relative z-10">
              {/* Main Footer Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Company Info */}
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="mb-4">
                    <Logo size={40} showText={true} animated={false} />
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    Leading industrial automation and digital transformation partner—delivering innovative engineering solutions from concept to commissioning.
                  </p>
                </div>
                
                {/* Services */}
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Core Competencies</h4>
                  <ul className="space-y-2 text-muted-foreground font-light">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      PLC & SCADA Development
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Digital Twin Technology
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      AI/ML Predictive Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Industrial IoT Solutions
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Machine Vision Systems
                    </li>
                  </ul>
                </div>
                
                {/* Contact */}
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Get In Touch</h4>
                  <div className="space-y-3 text-muted-foreground font-light">
                    <p>Ready to transform your industrial operations?</p>
                    <a 
                      href="mailto:amalkottooran01@gmail.com" 
                      className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors group"
                    >
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      amalkottooran01@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Bottom Bar */}
              <div className="border-t border-border/50 pt-8 mt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-muted-foreground/70 font-light text-sm">
                    © 2025 Caelus Technologies. All rights reserved.
                  </p>
                  <p className="text-xs text-muted-foreground/50 font-light text-center md:text-right">
                    Caelus Technologies is a registered trademark. Third party trademarks are the property of their respective owners.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
