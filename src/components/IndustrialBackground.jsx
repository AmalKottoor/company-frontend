import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Database, Settings, Network, Activity, Gauge, Cog, Binary, Server, Wifi, CircuitBoard } from 'lucide-react';

const IndustrialBackground = memo(({ variant = 'default', intensity = 'medium' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Delay visibility to prevent initial render lag
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Reduce complexity on mobile
  if (isMobile) {
    intensity = intensity === 'high' ? 'low' : intensity === 'medium' ? 'low' : 'low';
  }
  // Reduced to 6 icons for better performance
  const icons = [
    { Icon: Cpu, position: 'top-20 left-10', size: 40, delay: 0 },
    { Icon: Settings, position: 'bottom-40 right-1/4', size: 42, delay: 1 },
    { Icon: Network, position: 'bottom-60 left-20', size: 36, delay: 2 },
    { Icon: Gauge, position: 'bottom-1/3 left-1/3', size: 40, delay: 3 },
    { Icon: Database, position: 'top-1/2 right-1/3', size: 38, delay: 4 },
    { Icon: Cog, position: 'top-1/4 right-20', size: 36, delay: 5 },
  ];

  const intensitySettings = {
    low: { opacity: 0.02, iconOpacity: 0.03, showIcons: false, showParticles: false },
    medium: { opacity: 0.04, iconOpacity: 0.06, showIcons: true, showParticles: false },
    high: { opacity: 0.06, iconOpacity: 0.08, showIcons: true, showParticles: true },
  };

  const settings = intensitySettings[intensity];

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none will-change-auto">
      {/* Enhanced Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        style={{ opacity: settings.opacity * 6 }}
      />
      
      {/* Diagonal Lines Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:2rem_2rem]" 
        style={{ opacity: settings.opacity * 3 }}
      />

      {/* Animated Gradient Orbs - Simplified */}
      {!isMobile && (
        <motion.div 
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/15 via-accent/8 to-transparent rounded-full blur-[100px]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      {isMobile && (
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-full blur-[80px] opacity-30" />
      )}
      
      {!isMobile && (
        <>
          <motion.div 
            className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-accent/15 via-primary/8 to-transparent rounded-full blur-[100px]"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div 
            className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-primary/12 via-accent/6 to-transparent rounded-full blur-[80px]"
            animate={{
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
      {isMobile && (
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-accent/8 via-primary/5 to-transparent rounded-full blur-[60px] opacity-30" />
      )}

      {/* Floating Industrial Icons - Only on desktop with medium/high intensity */}
      {!isMobile && settings.showIcons && icons.map(({ Icon, position, size, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, settings.iconOpacity, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
        >
          <Icon size={size} className="text-primary" strokeWidth={1} />
        </motion.div>
      ))}

      {/* Circuit Board Pattern */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: settings.opacity * 4 }}>
        <defs>
          <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <line x1="0" y1="50" x2="200" y2="50" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
            <line x1="0" y1="150" x2="200" y2="150" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.3" />
            {/* Vertical lines */}
            <line x1="50" y1="0" x2="50" y2="200" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
            <line x1="150" y1="0" x2="150" y2="200" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.3" />
            {/* Connection nodes */}
            <circle cx="50" cy="50" r="3" fill="hsl(var(--primary))" opacity="0.5" />
            <circle cx="150" cy="50" r="3" fill="hsl(var(--accent))" opacity="0.5" />
            <circle cx="50" cy="150" r="3" fill="hsl(var(--accent))" opacity="0.5" />
            <circle cx="150" cy="150" r="3" fill="hsl(var(--primary))" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Floating Particles - Only on desktop with high intensity */}
      {!isMobile && settings.showParticles && [...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 15) % 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Hexagon Pattern - Reduced and simplified */}
      <div className="absolute inset-0" style={{ opacity: settings.opacity * 2 }}>
        {[...Array(4)].map((_, i) => (
          <div
            key={`hex-${i}`}
            className="absolute w-32 h-32 border border-primary/10"
            style={{
              left: `${(i * 25) % 100}%`,
              top: `${(i * 30) % 100}%`,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
        ))}
      </div>

      {/* Static decorative lines - no animation for performance */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: settings.opacity * 2 }}>
        <path
          d="M 0 100 Q 250 50 500 100 T 1000 100"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
        <path
          d="M 0 300 Q 250 350 500 300 T 1000 300"
          stroke="hsl(var(--accent))"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </svg>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 border-r-2 border-t-2 border-accent/20 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-l-2 border-b-2 border-accent/20 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-primary/20 rounded-br-3xl" />
    </div>
  );
});

IndustrialBackground.displayName = 'IndustrialBackground';

export default IndustrialBackground;
