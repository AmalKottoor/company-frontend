import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Cone, Box, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Industrial Silo Component
 * Large storage silo for raw materials with fill level indicator
 */
const IndustrialSilo = ({ 
  position = [0, 0, 0], 
  isActive = false,
  fillLevel = 0.5, // 0 to 1
  material = "Grain",
  capacity = "500T",
  height = 12,
  radius = 3
}) => {
  const siloRef = useRef();
  const fillRef = useRef();
  const particlesRef = useRef();

  // Animated fill level
  useFrame((state) => {
    if (fillRef.current) {
      const targetY = position[1] + (fillLevel * height * 0.7) - height * 0.35;
      fillRef.current.position.y += (targetY - fillRef.current.position.y) * 0.05;
    }

    // Particle animation when active
    if (particlesRef.current && isActive) {
      particlesRef.current.rotation.y += 0.01;
    }
  });

  // Fill color based on level
  const fillColor = useMemo(() => {
    if (fillLevel > 0.8) return '#10b981'; // Green
    if (fillLevel > 0.5) return '#f59e0b'; // Orange
    if (fillLevel > 0.2) return '#ef4444'; // Red
    return '#6b7280'; // Gray
  }, [fillLevel]);

  return (
    <group position={position}>
      {/* Base Platform */}
      <Cylinder args={[radius + 0.5, radius + 0.8, 0.8, 16]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* Main Silo Body */}
      <group ref={siloRef}>
        <Cylinder args={[radius, radius, height, 16]} position={[0, height / 2 + 0.8, 0]}>
          <meshStandardMaterial 
            color="#d1d5db" 
            metalness={0.9} 
            roughness={0.2}
            envMapIntensity={1.5}
          />
        </Cylinder>

        {/* Reinforcement Rings */}
        {[0.2, 0.4, 0.6, 0.8].map((ratio, index) => (
          <Cylinder 
            key={`ring-${index}`}
            args={[radius + 0.1, radius + 0.1, 0.3, 16]} 
            position={[0, (height * ratio) + 0.8, 0]}
          >
            <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.3} />
          </Cylinder>
        ))}

        {/* Fill Level Indicator (Internal) */}
        <Cylinder 
          ref={fillRef}
          args={[radius - 0.2, radius - 0.2, height * 0.7, 16]} 
          position={[0, height * 0.35 + 0.8, 0]}
        >
          <meshStandardMaterial 
            color={fillColor}
            transparent
            opacity={0.6}
            emissive={fillColor}
            emissiveIntensity={0.2}
          />
        </Cylinder>

        {/* Conical Top */}
        <Cone args={[radius + 0.2, height * 0.3, 16]} position={[0, height + 0.8 + height * 0.15, 0]}>
          <meshStandardMaterial 
            color="#9ca3af" 
            metalness={0.9} 
            roughness={0.2}
          />
        </Cone>

        {/* Access Ladder */}
        <group position={[radius + 0.1, height / 2 + 0.8, 0]}>
          {Array.from({ length: Math.floor(height / 0.5) }).map((_, i) => (
            <Box key={`rung-${i}`} args={[0.1, 0.05, 0.5]} position={[0, i * 0.5 - height / 2, 0]}>
              <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
            </Box>
          ))}
          <Box args={[0.05, height, 0.05]} position={[-0.2, 0, -0.2]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
          </Box>
          <Box args={[0.05, height, 0.05]} position={[-0.2, 0, 0.2]}>
            <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
          </Box>
        </group>

        {/* Discharge Chute */}
        <Cone args={[0.8, 1.5, 8]} position={[0, 0.8 - 0.75, 0]} rotation={[Math.PI, 0, 0]}>
          <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
        </Cone>

        {/* Outlet Valve */}
        <Cylinder args={[0.3, 0.3, 0.6, 8]} position={[0, -0.3, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#10b981" : "#ef4444"}
            emissive={isActive ? "#10b981" : "#ef4444"}
            emissiveIntensity={isActive ? 0.5 : 0.2}
            metalness={0.8}
            roughness={0.3}
          />
        </Cylinder>
      </group>

      {/* Particle Effect when active */}
      {isActive && (
        <group ref={particlesRef} position={[0, -0.5, 0]}>
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const r = Math.random() * 0.5;
            return (
              <Box 
                key={`particle-${i}`}
                args={[0.05, 0.05, 0.05]} 
                position={[Math.cos(angle) * r, -Math.random() * 0.5, Math.sin(angle) * r]}
              >
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
              </Box>
            );
          })}
        </group>
      )}

      {/* Label */}
      <Text
        position={[0, height + 2, radius + 0.5]}
        fontSize={0.5}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {material} Silo
      </Text>

      {/* Info Display */}
      <Html position={[0, height / 2, radius + 0.5]} center>
        <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap">
          <div className="font-semibold text-cyan-400">{(fillLevel * 100).toFixed(0)}% Full</div>
          <div className="text-zinc-400">{capacity} Capacity</div>
          <div className={`text-xs ${isActive ? 'text-green-400' : 'text-red-400'}`}>
            {isActive ? '● Discharging' : '○ Idle'}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default IndustrialSilo;
