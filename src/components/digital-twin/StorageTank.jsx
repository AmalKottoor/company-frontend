import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box, Sphere, Text, Html } from '@react-three/drei';

/**
 * Storage Tank Component
 * Large cylindrical storage tank for liquids/chemicals
 */
const StorageTank = ({ 
  position = [0, 0, 0], 
  isActive = false,
  fillLevel = 0.6, // 0 to 1
  liquidType = "Water",
  capacity = "100m³",
  height = 8,
  radius = 2.5,
  liquidColor = "#3b82f6"
}) => {
  const fillRef = useRef();
  const waveRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animated fill level
    if (fillRef.current) {
      const targetY = position[1] + (fillLevel * height) - height / 2 + 0.5;
      fillRef.current.position.y += (targetY - fillRef.current.position.y) * 0.05;
    }

    // Wave effect on liquid surface
    if (waveRef.current && isActive) {
      waveRef.current.position.y = (fillLevel * height) + 0.5 + Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Base Support */}
      <Cylinder args={[radius + 0.3, radius + 0.5, 0.6, 16]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Main Tank Body */}
      <Cylinder args={[radius, radius, height, 24]} position={[0, height / 2 + 0.5, 0]}>
        <meshStandardMaterial 
          color="#e5e7eb" 
          metalness={0.9} 
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </Cylinder>

      {/* Liquid Fill */}
      <Cylinder 
        ref={fillRef}
        args={[radius - 0.1, radius - 0.1, height, 24]} 
        position={[0, height / 2 + 0.5, 0]}
      >
        <meshStandardMaterial 
          color={liquidColor}
          transparent
          opacity={0.5}
          metalness={0.3}
          roughness={0.1}
        />
      </Cylinder>

      {/* Liquid Surface Wave */}
      <Cylinder 
        ref={waveRef}
        args={[radius - 0.1, radius - 0.1, 0.1, 24]} 
        position={[0, (fillLevel * height) + 0.5, 0]}
      >
        <meshStandardMaterial 
          color={liquidColor}
          transparent
          opacity={0.7}
          emissive={liquidColor}
          emissiveIntensity={0.1}
        />
      </Cylinder>

      {/* Tank Roof */}
      <Cylinder args={[radius, radius - 0.2, 0.3, 24]} position={[0, height + 0.65, 0]}>
        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
      </Cylinder>

      {/* Roof Dome */}
      <Sphere args={[radius - 0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 3]} position={[0, height + 0.8, 0]}>
        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
      </Sphere>

      {/* Reinforcement Rings */}
      {[0.25, 0.5, 0.75].map((ratio, index) => (
        <Cylinder 
          key={`ring-${index}`}
          args={[radius + 0.05, radius + 0.05, 0.2, 24]} 
          position={[0, (height * ratio) + 0.5, 0]}
        >
          <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.3} />
        </Cylinder>
      ))}

      {/* Access Hatch */}
      <Cylinder args={[0.5, 0.5, 0.4, 16]} position={[0, height + 1.2, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Vent Pipe */}
      <Cylinder args={[0.1, 0.1, 1.5, 12]} position={[radius - 0.5, height + 1.5, 0]}>
        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Inlet Pipe */}
      <group position={[0, height * 0.8 + 0.5, radius]}>
        <Cylinder args={[0.2, 0.2, 1.5, 12]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.3} />
        </Cylinder>
        <Sphere args={[0.25, 12, 12]} position={[0, 0, 0.75]}>
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.3} />
        </Sphere>
        <Cylinder args={[0.2, 0.2, 1, 12]} position={[0, 0, 1.25]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.3} />
        </Cylinder>
      </group>

      {/* Outlet Pipe */}
      <group position={[0, 1, radius]}>
        <Cylinder args={[0.2, 0.2, 1.5, 12]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.3} />
        </Cylinder>
        <Sphere args={[0.25, 12, 12]} position={[0, 0, 0.75]}>
          <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.3} />
        </Sphere>
        <Cylinder args={[0.2, 0.2, 1, 12]} position={[0, 0, 1.25]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.3} />
        </Cylinder>
      </group>

      {/* Drain Valve */}
      <Cylinder args={[0.15, 0.15, 0.5, 8]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Access Ladder */}
      <group position={[radius + 0.1, height / 2 + 0.5, 0]}>
        {Array.from({ length: Math.floor(height / 0.4) }).map((_, i) => (
          <Box key={`rung-${i}`} args={[0.1, 0.05, 0.6]} position={[0, i * 0.4 - height / 2, 0]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
          </Box>
        ))}
        <Box args={[0.05, height, 0.05]} position={[-0.15, 0, -0.25]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
        </Box>
        <Box args={[0.05, height, 0.05]} position={[-0.15, 0, 0.25]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
        </Box>
      </group>

      {/* Level Indicator */}
      <Box args={[0.3, height, 0.2]} position={[-radius - 0.3, height / 2 + 0.5, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
      </Box>

      {/* Level Gauge */}
      <Box 
        args={[0.25, height * fillLevel, 0.15]} 
        position={[-radius - 0.3, (height * fillLevel) / 2 + 0.5, 0]}
      >
        <meshStandardMaterial 
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Safety Valve */}
      <Cylinder args={[0.15, 0.2, 0.4, 8]} position={[0, height + 0.5, radius - 0.5]}>
        <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Support Legs */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, index) => (
        <Box 
          key={`leg-${index}`}
          args={[0.3, 1, 0.3]} 
          position={[Math.cos(angle) * (radius - 0.3), 0, Math.sin(angle) * (radius - 0.3)]}
        >
          <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
        </Box>
      ))}

      {/* Label */}
      <Text
        position={[0, height + 2.5, 0]}
        fontSize={0.5}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {liquidType} Tank
      </Text>

      {/* Info Display */}
      <Html position={[0, height / 2, radius + 2]} center>
        <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap">
          <div className="font-semibold text-cyan-400">{liquidType} Storage</div>
          <div className="text-zinc-300 mt-1">Level: {(fillLevel * 100).toFixed(0)}%</div>
          <div className="text-zinc-300">Capacity: {capacity}</div>
          <div className={`text-xs mt-1 ${isActive ? 'text-green-400' : 'text-zinc-400'}`}>
            {isActive ? '● Active' : '○ Standby'}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default StorageTank;
