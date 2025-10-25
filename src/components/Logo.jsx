import { motion } from 'framer-motion';

const Logo = ({ className = "", size = 40, showText = true, animated = true }) => {
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const Component = animated ? motion.div : 'div';
  const componentProps = animated ? { variants: logoVariants, initial: "initial", animate: "animate" } : {};

  return (
    <Component className={`flex items-center gap-3 ${className}`} {...componentProps}>
      {/* Logo Icon - Stylized "C" with celestial elements */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer glow circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#glowGradient)"
          opacity="0.2"
        />
        
        {/* Main "C" shape */}
        <path
          d="M 70 25 A 25 25 0 1 1 70 75"
          stroke="url(#mainGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Inner arc accent */}
        <path
          d="M 65 35 A 15 15 0 1 1 65 65"
          stroke="url(#accentGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        
        {/* Star/celestial elements */}
        <circle cx="30" cy="30" r="2" fill="hsl(var(--primary))" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="75" cy="45" r="1.5" fill="hsl(var(--accent))" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.3;0.9;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="35" cy="70" r="1.5" fill="hsl(var(--primary))" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
          
          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Company Name */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-semibold text-foreground tracking-tight">
            Caelus
          </span>
          <span className="text-xs text-muted-foreground font-light tracking-wide">
            TECHNOLOGIES
          </span>
        </div>
      )}
    </Component>
  );
};

export default Logo;
