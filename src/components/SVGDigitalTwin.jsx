import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SVG-Based Digital Twin with GSAP Animations
 * High-performance, crystal-clear industrial visualization
 */
const SVGDigitalTwin = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  
  // Component states
  const [activeComponent, setActiveComponent] = useState(null);
  const [systemStatus, setSystemStatus] = useState({
    conveyor: false,
    robot: false,
    silo1: false,
    silo2: false,
    boiler: false,
    cooling: false,
    tank1: false,
    tank2: false
  });

  // Animation refs
  const conveyorRef = useRef(null);
  const robotArmRef = useRef(null);
  const steamRef = useRef(null);
  const fanRef = useRef(null);
  const liquidRef = useRef(null);

  // Initialize GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Conveyor belt animation
      if (systemStatus.conveyor) {
        gsap.to('.conveyor-belt', {
          x: -20,
          duration: 2,
          repeat: -1,
          ease: 'none'
        });

        gsap.to('.conveyor-item', {
          x: 400,
          duration: 8,
          repeat: -1,
          ease: 'none',
          stagger: 2
        });
      }

      // Robot arm animation
      if (systemStatus.robot) {
        gsap.timeline({ repeat: -1 })
          .to('.robot-arm', {
            rotation: -45,
            transformOrigin: 'bottom center',
            duration: 1.5,
            ease: 'power2.inOut'
          })
          .to('.robot-arm', {
            rotation: 0,
            duration: 1.5,
            ease: 'power2.inOut'
          });
      }

      // Steam animation
      if (systemStatus.boiler) {
        gsap.to('.steam-particle', {
          y: -50,
          opacity: 0,
          duration: 2,
          repeat: -1,
          stagger: 0.3,
          ease: 'power1.out'
        });
      }

      // Cooling fan animation
      if (systemStatus.cooling) {
        gsap.to('.cooling-fan', {
          rotation: 360,
          transformOrigin: 'center',
          duration: 2,
          repeat: -1,
          ease: 'none'
        });
      }

      // Liquid flow animation
      if (systemStatus.tank1 || systemStatus.tank2) {
        gsap.to('.liquid-flow', {
          strokeDashoffset: -100,
          duration: 2,
          repeat: -1,
          ease: 'none'
        });
      }

      // Silo fill animation
      if (systemStatus.silo1 || systemStatus.silo2) {
        gsap.to('.silo-fill', {
          scaleY: 0.8,
          transformOrigin: 'bottom',
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut'
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [systemStatus]);

  // Hover animations
  const handleComponentHover = (componentId, isHovering) => {
    const element = document.getElementById(componentId);
    if (!element) return;

    if (isHovering) {
      gsap.to(element, {
        scale: 1.05,
        filter: 'drop-shadow(0 0 10px rgba(0,255,255,0.8))',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(element, {
        scale: 1,
        filter: 'drop-shadow(0 0 0px rgba(0,255,255,0))',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  // Click animations
  const handleComponentClick = (componentId) => {
    setActiveComponent(componentId);
    
    const element = document.getElementById(componentId);
    if (!element) return;

    // Pulse animation
    gsap.timeline()
      .to(element, {
        scale: 1.1,
        duration: 0.2,
        ease: 'power2.out'
      })
      .to(element, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.in'
      });
  };

  // Toggle system
  const toggleSystem = (system) => {
    setSystemStatus(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  return (
    <div ref={containerRef} className="relative w-full h-[800px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-20 bg-zinc-900/95 backdrop-blur-xl border-2 border-cyan-500 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></span>
          System Controls
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(systemStatus).map((system) => (
            <button
              key={system}
              onClick={() => toggleSystem(system)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                systemStatus[system]
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {system.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Component Info Panel */}
      {activeComponent && (
        <div className="absolute top-4 right-4 z-20 bg-zinc-900/98 backdrop-blur-xl border-2 border-purple-500 rounded-2xl p-6 shadow-2xl w-80">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-purple-400">
              {activeComponent}
            </h3>
            <button
              onClick={() => setActiveComponent(null)}
              className="text-zinc-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-zinc-800/50 rounded-lg">
              <span className="text-zinc-400">Status:</span>
              <span className={`font-bold ${
                systemStatus[activeComponent.toLowerCase()] ? 'text-green-400' : 'text-red-400'
              }`}>
                {systemStatus[activeComponent.toLowerCase()] ? 'RUNNING' : 'STOPPED'}
              </span>
            </div>
            <div className="flex justify-between p-2 bg-zinc-800/50 rounded-lg">
              <span className="text-zinc-400">Efficiency:</span>
              <span className="text-white font-bold">
                {systemStatus[activeComponent.toLowerCase()] ? '95%' : '0%'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        viewBox="0 0 1200 800"
        className="w-full h-full"
        style={{ background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' }}
      >
        {/* Grid Background */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,255,255,0.1)" strokeWidth="1"/>
          </pattern>
          
          {/* Gradients */}
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <rect width="1200" height="800" fill="url(#grid)" />

        {/* ========== PRODUCTION LINE SECTION ========== */}
        <g id="production-area" transform="translate(50, 400)">
          {/* Conveyor Belt */}
          <g
            id="conveyor"
            onMouseEnter={() => handleComponentHover('conveyor', true)}
            onMouseLeave={() => handleComponentHover('conveyor', false)}
            onClick={() => handleComponentClick('Conveyor')}
            style={{ cursor: 'pointer' }}
          >
            {/* Belt structure */}
            <rect x="0" y="0" width="400" height="60" fill="url(#metalGradient)" stroke="#00ffff" strokeWidth="2" rx="5" />
            
            {/* Belt pattern */}
            <g className="conveyor-belt">
              {[...Array(20)].map((_, i) => (
                <rect
                  key={i}
                  x={i * 20}
                  y="25"
                  width="15"
                  height="10"
                  fill="#475569"
                  opacity="0.5"
                />
              ))}
            </g>

            {/* Moving items */}
            {systemStatus.conveyor && (
              <>
                <rect className="conveyor-item" x="0" y="15" width="30" height="30" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="3" />
                <rect className="conveyor-item" x="-100" y="15" width="30" height="30" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="3" />
                <rect className="conveyor-item" x="-200" y="15" width="30" height="30" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="3" />
              </>
            )}

            {/* Label */}
            <text x="200" y="-10" textAnchor="middle" fill="#00ffff" fontSize="14" fontWeight="bold">
              CONVEYOR SYSTEM
            </text>
          </g>

          {/* Robotic Arm */}
          <g
            id="robot"
            transform="translate(450, 0)"
            onMouseEnter={() => handleComponentHover('robot', true)}
            onMouseLeave={() => handleComponentHover('robot', false)}
            onClick={() => handleComponentClick('Robot')}
            style={{ cursor: 'pointer' }}
          >
            {/* Base */}
            <rect x="-20" y="40" width="40" height="20" fill="url(#metalGradient)" stroke="#00ffff" strokeWidth="2" />
            
            {/* Arm */}
            <g className="robot-arm">
              <rect x="-10" y="-60" width="20" height="100" fill="#475569" stroke="#00ffff" strokeWidth="2" rx="5" />
              <circle cx="0" cy="-60" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
            </g>

            {/* Label */}
            <text x="0" y="-80" textAnchor="middle" fill="#00ffff" fontSize="14" fontWeight="bold">
              ROBOT ARM
            </text>
          </g>
        </g>

        {/* ========== STORAGE SECTION ========== */}
        <g id="storage-area" transform="translate(100, 100)">
          {/* Silo 1 */}
          <g
            id="silo1"
            onMouseEnter={() => handleComponentHover('silo1', true)}
            onMouseLeave={() => handleComponentHover('silo1', false)}
            onClick={() => handleComponentClick('Silo1')}
            style={{ cursor: 'pointer' }}
          >
            {/* Silo body */}
            <rect x="0" y="50" width="80" height="200" fill="url(#metalGradient)" stroke="#00ffff" strokeWidth="3" rx="5" />
            
            {/* Silo top */}
            <polygon points="0,50 40,10 80,50" fill="#64748b" stroke="#00ffff" strokeWidth="3" />
            
            {/* Fill level */}
            <rect className="silo-fill" x="5" y="150" width="70" height="95" fill="#f59e0b" opacity="0.7" />
            
            {/* Fill percentage */}
            <text x="40" y="200" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">75%</text>
            
            {/* Label */}
            <text x="40" y="-5" textAnchor="middle" fill="#00ffff" fontSize="14" fontWeight="bold">
              SILO 1
            </text>
          </g>

          {/* Silo 2 */}
          <g
            id="silo2"
            transform="translate(120, 0)"
            onMouseEnter={() => handleComponentHover('silo2', true)}
            onMouseLeave={() => handleComponentHover('silo2', false)}
            onClick={() => handleComponentClick('Silo2')}
            style={{ cursor: 'pointer' }}
          >
            <rect x="0" y="50" width="80" height="200" fill="url(#metalGradient)" stroke="#00ffff" strokeWidth="3" rx="5" />
            <polygon points="0,50 40,10 80,50" fill="#64748b" stroke="#00ffff" strokeWidth="3" />
            <rect className="silo-fill" x="5" y="120" width="70" height="125" fill="#8b5cf6" opacity="0.7" />
            <text x="40" y="200" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">85%</text>
            <text x="40" y="-5" textAnchor="middle" fill="#00ffff" fontSize="14" fontWeight="bold">
              SILO 2
            </text>
          </g>
        </g>

        {/* ========== UTILITIES SECTION ========== */}
        <g id="utilities-area" transform="translate(800, 150)">
          {/* Boiler */}
          <g
            id="boiler"
            onMouseEnter={() => handleComponentHover('boiler', true)}
            onMouseLeave={() => handleComponentHover('boiler', false)}
            onClick={() => handleComponentClick('Boiler')}
            style={{ cursor: 'pointer' }}
          >
            {/* Boiler body */}
            <rect x="0" y="0" width="120" height="180" fill="url(#metalGradient)" stroke="#ff6b6b" strokeWidth="3" rx="10" />
            
            {/* Steam particles */}
            {systemStatus.boiler && (
              <>
                <circle className="steam-particle" cx="30" cy="-10" r="8" fill="#fff" opacity="0.6" />
                <circle className="steam-particle" cx="60" cy="-10" r="10" fill="#fff" opacity="0.5" />
                <circle className="steam-particle" cx="90" cy="-10" r="7" fill="#fff" opacity="0.7" />
              </>
            )}
            
            {/* Temperature gauge */}
            <circle cx="60" cy="90" r="30" fill="#1e293b" stroke="#00ffff" strokeWidth="2" />
            <text x="60" y="95" textAnchor="middle" fill="#ff6b6b" fontSize="16" fontWeight="bold">180°C</text>
            
            {/* Label */}
            <text x="60" y="-25" textAnchor="middle" fill="#ff6b6b" fontSize="14" fontWeight="bold">
              BOILER
            </text>
          </g>

          {/* Cooling Tower */}
          <g
            id="cooling"
            transform="translate(160, 0)"
            onMouseEnter={() => handleComponentHover('cooling', true)}
            onMouseLeave={() => handleComponentHover('cooling', false)}
            onClick={() => handleComponentClick('Cooling')}
            style={{ cursor: 'pointer' }}
          >
            {/* Tower body */}
            <polygon points="20,180 100,180 90,0 30,0" fill="url(#metalGradient)" stroke="#60a5fa" strokeWidth="3" />
            
            {/* Fan */}
            <g className="cooling-fan" transform="translate(60, 40)">
              <circle r="25" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
              <line x1="-20" y1="0" x2="20" y2="0" stroke="#60a5fa" strokeWidth="3" />
              <line x1="0" y1="-20" x2="0" y2="20" stroke="#60a5fa" strokeWidth="3" />
            </g>
            
            {/* Label */}
            <text x="60" y="-10" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">
              COOLING TOWER
            </text>
          </g>
        </g>

        {/* ========== STORAGE TANKS ========== */}
        <g id="tanks-area" transform="translate(800, 450)">
          {/* Tank 1 */}
          <g
            id="tank1"
            onMouseEnter={() => handleComponentHover('tank1', true)}
            onMouseLeave={() => handleComponentHover('tank1', false)}
            onClick={() => handleComponentClick('Tank1')}
            style={{ cursor: 'pointer' }}
          >
            <ellipse cx="60" cy="20" rx="60" ry="15" fill="#475569" stroke="#00ffff" strokeWidth="2" />
            <rect x="0" y="20" width="120" height="150" fill="url(#metalGradient)" stroke="#00ffff" strokeWidth="2" />
            <ellipse cx="60" cy="170" rx="60" ry="15" fill="#334155" stroke="#00ffff" strokeWidth="2" />
            
            {/* Liquid */}
            <rect x="5" y="100" width="110" height="65" fill="url(#liquidGradient)" />
            <ellipse cx="60" cy="100" rx="55" ry="12" fill="#3b82f6" opacity="0.8" />
            
            {/* Label */}
            <text x="60" y="10" textAnchor="middle" fill="#00ffff" fontSize="14" fontWeight="bold">
              WATER TANK
            </text>
            <text x="60" y="140" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">60%</text>
          </g>

          {/* Tank 2 */}
          <g
            id="tank2"
            transform="translate(150, 0)"
            onMouseEnter={() => handleComponentHover('tank2', true)}
            onMouseLeave={() => handleComponentHover('tank2', false)}
            onClick={() => handleComponentClick('Tank2')}
            style={{ cursor: 'pointer' }}
          >
            <ellipse cx="60" cy="20" rx="60" ry="15" fill="#475569" stroke="#a855f7" strokeWidth="2" />
            <rect x="0" y="20" width="120" height="150" fill="url(#metalGradient)" stroke="#a855f7" strokeWidth="2" />
            <ellipse cx="60" cy="170" rx="60" ry="15" fill="#334155" stroke="#a855f7" strokeWidth="2" />
            
            {/* Liquid */}
            <rect x="5" y="80" width="110" height="85" fill="#8b5cf6" opacity="0.7" />
            <ellipse cx="60" cy="80" rx="55" ry="12" fill="#a855f7" opacity="0.8" />
            
            {/* Label */}
            <text x="60" y="10" textAnchor="middle" fill="#a855f7" fontSize="14" fontWeight="bold">
              CHEMICAL TANK
            </text>
            <text x="60" y="130" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">80%</text>
          </g>
        </g>

        {/* Connection Lines */}
        <g className="connections" stroke="#00ffff" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.3">
          <path d="M 450 460 L 800 500" />
          <path d="M 180 250 L 450 420" />
          <path d="M 860 330 L 860 450" />
        </g>

        {/* Title */}
        <text x="600" y="40" textAnchor="middle" fill="#00ffff" fontSize="28" fontWeight="bold" letterSpacing="2">
          INDUSTRIAL PRODUCTION FACILITY
        </text>
        <text x="600" y="70" textAnchor="middle" fill="#64748b" fontSize="14">
          SVG + GSAP Digital Twin Visualization
        </text>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-zinc-900/95 backdrop-blur-xl border-2 border-zinc-700 rounded-xl p-4">
        <h4 className="text-sm font-bold text-zinc-300 mb-2">Status Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-zinc-400">Running</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-zinc-700 rounded-full"></div>
            <span className="text-zinc-400">Stopped</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
            <span className="text-zinc-400">Hover to highlight</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SVGDigitalTwin;
