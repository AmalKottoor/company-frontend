import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Cooling Tower Component
 * Industrial cooling tower with water circulation and mist effects
 */
const CoolingTower = ({ 
  position = [0, 0, 0], 
  isActive = false,
  waterTemp = 35, // Celsius
  flowRate = 85 // Percentage
}) => {
  const mistRef = useRef();
  const fanRef = useRef();
  const waterRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotating fan
    if (fanRef.current && isActive) {
      fanRef.current.rotation.y += 0.1;
    }

    // Mist animation
    if (mistRef.current && isActive) {
      mistRef.current.position.y = 15 + Math.sin(time * 2) * 0.3;
      mistRef.current.rotation.y += 0.02;
    }

    // Water flow animation
    if (waterRef.current && isActive) {
      waterRef.current.material.opacity = 0.3 + Math.sin(time * 3) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <Box args={[8, 0.5, 8]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.3} />
      </Box>

      {/* Water Basin */}
      <Cylinder args={[3.5, 3.5, 2, 16]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </Cylinder>

      {/* Water */}
      <Cylinder ref={waterRef} args={[3.3, 3.3, 1.8, 16]} position={[0, 1.5, 0]}>
        <meshStandardMaterial 
          color="#3b82f6"
          transparent
          opacity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </Cylinder>

      {/* Lower Tower Section */}
      <Cylinder args={[3, 2.5, 4, 16]} position={[0, 4.5, 0]}>
        <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.4} />
      </Cylinder>

      {/* Fill Material (Honeycomb structure) */}
      <group position={[0, 4.5, 0]}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <Box 
              key={`fill-${i}`}
              args={[0.1, 3.5, 2]} 
              position={[Math.cos(angle) * 2, 0, Math.sin(angle) * 2]}
              rotation={[0, angle, 0]}
            >
              <meshStandardMaterial 
                color="#6b7280" 
                transparent 
                opacity={0.6}
                metalness={0.5}
                roughness={0.5}
              />
            </Box>
          );
        })}
      </group>

      {/* Middle Tower Section (Hyperbolic) */}
      <group position={[0, 8, 0]}>
        {Array.from({ length: 10 }).map((_, i) => {
          const y = i * 0.6;
          const scale = 1 - Math.pow((i - 5) / 5, 2) * 0.3; // Hyperbolic curve
          return (
            <Cylinder 
              key={`section-${i}`}
              args={[2.5 * scale, 2.5 * scale, 0.6, 16]} 
              position={[0, y, 0]}
            >
              <meshStandardMaterial 
                color="#d1d5db" 
                metalness={0.7} 
                roughness={0.3}
              />
            </Cylinder>
          );
        })}
      </group>

      {/* Support Columns */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, index) => (
        <Cylinder 
          key={`column-${index}`}
          args={[0.2, 0.2, 12, 12]} 
          position={[Math.cos(angle) * 3, 6.5, Math.sin(angle) * 3]}
        >
          <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
        </Cylinder>
      ))}

      {/* Top Opening */}
      <Cylinder args={[2, 2, 0.5, 16]} position={[0, 14.5, 0]}>
        <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.3} />
      </Cylinder>

      {/* Fan Housing */}
      <Cylinder args={[1.8, 1.8, 1, 16]} position={[0, 15.2, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Fan Blades */}
      <group ref={fanRef} position={[0, 15.2, 0]}>
        {[0, 60, 120, 180, 240, 300].map((angle, index) => (
          <Box 
            key={`blade-${index}`}
            args={[1.5, 0.05, 0.3]} 
            position={[Math.cos((angle * Math.PI) / 180) * 0.75, 0, Math.sin((angle * Math.PI) / 180) * 0.75]}
            rotation={[0, (angle * Math.PI) / 180, 0]}
          >
            <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.2} />
          </Box>
        ))}
        {/* Fan Hub */}
        <Cylinder args={[0.3, 0.3, 0.2, 12]}>
          <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.2} />
        </Cylinder>
      </group>

      {/* Mist/Steam Effect */}
      {isActive && (
        <group ref={mistRef} position={[0, 15, 0]}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 0.5 + Math.random() * 1;
            return (
              <mesh 
                key={`mist-${i}`}
                position={[
                  Math.cos(angle) * radius, 
                  Math.random() * 2, 
                  Math.sin(angle) * radius
                ]}
              >
                <sphereGeometry args={[0.3 + Math.random() * 0.2, 8, 8]} />
                <meshStandardMaterial 
                  color="#ffffff"
                  transparent
                  opacity={0.2 + Math.random() * 0.2}
                  emissive="#ffffff"
                  emissiveIntensity={0.1}
                />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Water Inlet Pipe */}
      <Cylinder args={[0.25, 0.25, 3, 12]} position={[-4, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Water Outlet Pipe */}
      <Cylinder args={[0.25, 0.25, 3, 12]} position={[4, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Pump House */}
      <Box args={[2, 2, 2]} position={[-4.5, 1.5, 2]}>
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.4} />
      </Box>

      {/* Pump Motor */}
      <Cylinder args={[0.4, 0.4, 1, 12]} position={[-4.5, 2, 2]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color={isActive ? "#10b981" : "#6b7280"}
          emissive={isActive ? "#10b981" : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
          metalness={0.8}
          roughness={0.3}
        />
      </Cylinder>

      {/* Access Platform */}
      <group position={[0, 7, 0]}>
        <Box args={[6, 0.1, 1.5]} position={[0, 0, 3]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
        </Box>
        {/* Railings */}
        <Box args={[6, 1, 0.05]} position={[0, 0.5, 3.7]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
        </Box>
      </group>

      {/* Access Ladder */}
      <group position={[0, 4, 3.5]}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Box key={`rung-${i}`} args={[0.8, 0.05, 0.05]} position={[0, i * 0.4, 0]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
          </Box>
        ))}
        <Box args={[0.05, 6, 0.05]} position={[-0.35, 3, 0]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
        </Box>
        <Box args={[0.05, 6, 0.05]} position={[0.35, 3, 0]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
        </Box>
      </group>

      {/* Warning Lights */}
      {[0, Math.PI].map((angle, index) => (
        <mesh key={`light-${index}`} position={[Math.cos(angle) * 2.2, 14, Math.sin(angle) * 2.2]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial 
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={isActive ? 0.8 : 0.2}
          />
        </mesh>
      ))}

      {/* Label */}
      <Text
        position={[0, 17, 0]}
        fontSize={0.6}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        Cooling Tower
      </Text>

      {/* Info Display */}
      <Html position={[0, 8, 4]} center>
        <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap">
          <div className="font-semibold text-cyan-400">Cooling System</div>
          <div className="text-zinc-300 mt-1">Water Temp: {waterTemp}°C</div>
          <div className="text-zinc-300">Flow Rate: {flowRate}%</div>
          <div className={`text-xs mt-1 ${isActive ? 'text-green-400' : 'text-red-400'}`}>
            {isActive ? '● Circulating' : '○ Standby'}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default CoolingTower;
