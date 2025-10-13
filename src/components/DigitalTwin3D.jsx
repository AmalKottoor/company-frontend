import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Html, Text, Environment } from '@react-three/drei';

// Industrial Robot Arm Component
const RobotArm = ({ position = [0, 0, 0], isActive = false }) => {
  const armRef = useRef();
  const jointRef = useRef();
  const clawRef = useRef();

  useFrame((state) => {
    if (isActive && armRef.current && jointRef.current && clawRef.current) {
      // Simulate robot movement
      const time = state.clock.elapsedTime;
      armRef.current.rotation.y = Math.sin(time * 0.5) * 0.5;
      jointRef.current.rotation.z = Math.sin(time * 0.7) * 0.3;
      clawRef.current.rotation.x = Math.sin(time * 1.2) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <Cylinder ref={armRef} args={[0.5, 0.6, 0.3]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color={isActive ? "#3b82f6" : "#64748b"} />
      </Cylinder>
      
      {/* Main Arm */}
      <group ref={jointRef} position={[0, 0.5, 0]}>
        <Box args={[0.2, 1.5, 0.2]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color={isActive ? "#10b981" : "#6b7280"} />
        </Box>
        
        {/* End Effector */}
        <group ref={clawRef} position={[0, 1.5, 0]}>
          <Box args={[0.3, 0.1, 0.1]}>
            <meshStandardMaterial color={isActive ? "#f59e0b" : "#9ca3af"} />
          </Box>
          {/* Claw fingers */}
          <Box args={[0.05, 0.2, 0.05]} position={[-0.1, -0.1, 0]}>
            <meshStandardMaterial color="#ef4444" />
          </Box>
          <Box args={[0.05, 0.2, 0.05]} position={[0.1, -0.1, 0]}>
            <meshStandardMaterial color="#ef4444" />
          </Box>
        </group>
      </group>
    </group>
  );
};

// Conveyor Belt Component
const ConveyorBelt = ({ position = [0, 0, 0], isRunning = false }) => {
  const beltRef = useRef();
  const packageRefs = useRef([]);

  useFrame(() => {
    if (isRunning && packageRefs.current) {
      packageRefs.current.forEach((pkg) => {
        if (pkg) {
          pkg.position.x += 0.02;
          if (pkg.position.x > 4) {
            pkg.position.x = -4;
          }
        }
      });
    }
  });

  return (
    <group position={position}>
      {/* Belt Surface */}
      <Box ref={beltRef} args={[8, 0.1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2d3748" />
      </Box>
      
      {/* Belt Rollers */}
      <Cylinder args={[0.1, 0.1, 1]} position={[-4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#4a5568" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 1]} position={[4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#4a5568" />
      </Cylinder>

      {/* Packages on belt */}
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          ref={el => packageRefs.current[index] = el}
          args={[0.3, 0.3, 0.3]}
          position={[-3 + index * 2, 0.2, 0]}
        >
          <meshStandardMaterial color={`hsl(${index * 120}, 70%, 50%)`} />
        </Box>
      ))}
    </group>
  );
};

// Control Panel Component
const ControlPanel = ({ position = [0, 0, 0], onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group position={position}>
      {/* Panel Base */}
      <Box args={[1.2, 1.5, 0.1]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      
      {/* Screen */}
      <Box args={[0.8, 0.6, 0.02]} position={[0, 1, 0.06]}>
        <meshStandardMaterial color={isHovered ? "#10b981" : "#374151"} emissive={isHovered ? "#064e3b" : "#000000"} />
      </Box>
      
      {/* Buttons */}
      <Cylinder
        args={[0.08, 0.08, 0.02]}
        position={[-0.2, 0.3, 0.06]}
        onClick={() => onToggle && onToggle('robot')}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" />
      </Cylinder>
      
      <Cylinder
        args={[0.08, 0.08, 0.02]}
        position={[0.2, 0.3, 0.06]}
        onClick={() => onToggle && onToggle('conveyor')}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <meshStandardMaterial color="#10b981" emissive="#064e3b" />
      </Cylinder>

      {/* Labels */}
      {isHovered && (
        <Html position={[0, 1.8, 0]} center>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Click buttons to control systems
          </div>
        </Html>
      )}
    </group>
  );
};

// Status Display Component
const StatusDisplay = ({ robotActive, conveyorActive }) => {
  return (
    <Html position={[0, 3, 0]} center>
      <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-600 rounded-lg p-4 text-white min-w-64">
        <h4 className="font-bold mb-3 text-center">System Status</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Robot Arm:</span>
            <div className={`w-3 h-3 rounded-full ${robotActive ? 'bg-green-400' : 'bg-red-400'}`} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Conveyor Belt:</span>
            <div className={`w-3 h-3 rounded-full ${conveyorActive ? 'bg-green-400' : 'bg-red-400'}`} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Production Rate:</span>
            <span className="text-sm text-blue-400">{robotActive && conveyorActive ? '95%' : '0%'}</span>
          </div>
        </div>
      </div>
    </Html>
  );
};

// Main 3D Scene Component
const IndustrialScene = () => {
  const [robotActive, setRobotActive] = useState(false);
  const [conveyorActive, setConveyorActive] = useState(false);

  const handleToggle = (system) => {
    if (system === 'robot') {
      setRobotActive(!robotActive);
    } else if (system === 'conveyor') {
      setConveyorActive(!conveyorActive);
    }
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      {/* Environment */}
      <Environment preset="warehouse" />
      
      {/* Factory Floor */}
      <Box args={[20, 0.1, 15]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#718096" />
      </Box>
      
      {/* Robot Arms */}
      <RobotArm position={[-3, 0, 2]} isActive={robotActive} />
      <RobotArm position={[3, 0, 2]} isActive={robotActive} />
      
      {/* Conveyor Belt */}
      <ConveyorBelt position={[0, 0, 0]} isRunning={conveyorActive} />
      
      {/* Control Panel */}
      <ControlPanel position={[0, 0, -4]} onToggle={handleToggle} />
      
      {/* Safety Barriers */}
      {[-6, 6].map((x, index) => (
        <Box key={index} args={[0.1, 2, 8]} position={[x, 1, 0]}>
          <meshStandardMaterial color="#fbbf24" transparent opacity={0.7} />
        </Box>
      ))}
      
      {/* Overhead Structure */}
      <Box args={[12, 0.2, 1]} position={[0, 4, 0]}>
        <meshStandardMaterial color="#4a5568" />
      </Box>
      
      {/* Status Display */}
      <StatusDisplay robotActive={robotActive} conveyorActive={conveyorActive} />
      
      {/* Title */}
      <Text
        position={[0, 5, -2]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Industrial Automation Digital Twin
      </Text>
      
      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

// Loading Component
const SceneLoader = () => (
  <Html center>
    <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-sm border border-slate-600 rounded-lg p-4 text-white">
      <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <span>Loading Digital Twin...</span>
    </div>
  </Html>
);

// Main Digital Twin Component
const DigitalTwin3D = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-slate-900 rounded-xl">
        <div className="flex items-center space-x-2 text-white">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Initializing Digital Twin...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-slate-900 rounded-xl overflow-hidden border border-slate-700" data-testid="digital-twin-canvas">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 60 }}
        shadows
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={<SceneLoader />}>
          <IndustrialScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DigitalTwin3D;
