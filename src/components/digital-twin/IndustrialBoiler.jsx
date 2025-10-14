import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box, Sphere, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Industrial Boiler Component
 * Steam boiler with temperature and pressure monitoring
 */
const IndustrialBoiler = ({ 
  position = [0, 0, 0], 
  isActive = false,
  temperature = 180, // Celsius
  pressure = 15, // Bar
  steamOutput = 0.7 // 0 to 1
}) => {
  const boilerRef = useRef();
  const steamRef = useRef();
  const flameRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Steam animation
    if (steamRef.current && isActive) {
      steamRef.current.position.y = Math.sin(time * 2) * 0.2 + 12;
      steamRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.1);
    }

    // Flame flicker
    if (flameRef.current && isActive) {
      flameRef.current.scale.y = 1 + Math.sin(time * 10) * 0.2;
      flameRef.current.material.emissiveIntensity = 0.8 + Math.sin(time * 8) * 0.2;
    }

    // Boiler vibration when active
    if (boilerRef.current && isActive) {
      boilerRef.current.rotation.z = Math.sin(time * 20) * 0.002;
    }
  });

  const statusColor = useMemo(() => {
    if (!isActive) return '#6b7280';
    if (temperature > 200) return '#ef4444'; // Red - too hot
    if (temperature > 150) return '#10b981'; // Green - optimal
    return '#f59e0b'; // Orange - warming up
  }, [isActive, temperature]);

  return (
    <group position={position}>
      {/* Base Platform */}
      <Box args={[6, 0.5, 6]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.3} />
      </Box>

      {/* Main Boiler Body */}
      <group ref={boilerRef}>
        {/* Primary Vessel */}
        <Cylinder args={[2, 2, 8, 24]} position={[0, 4.5, 0]}>
          <meshStandardMaterial 
            color="#d1d5db" 
            metalness={0.9} 
            roughness={0.2}
            envMapIntensity={1.5}
          />
        </Cylinder>

        {/* Insulation Bands */}
        {[1, 3, 5, 7].map((y, index) => (
          <Cylinder 
            key={`band-${index}`}
            args={[2.1, 2.1, 0.3, 24]} 
            position={[0, y + 0.5, 0]}
          >
            <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.4} />
          </Cylinder>
        ))}

        {/* Top Dome */}
        <Sphere args={[2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 8.5, 0]}>
          <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
        </Sphere>

        {/* Bottom Dome */}
        <Sphere args={[2, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
        </Sphere>

        {/* Burner Chamber */}
        <Box args={[3, 2, 2]} position={[0, 1, -2.5]}>
          <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
        </Box>

        {/* Burner Flame (when active) */}
        {isActive && (
          <group position={[0, 1, -2.5]}>
            <Sphere ref={flameRef} args={[0.8, 16, 16]}>
              <meshStandardMaterial 
                color="#ff6b00"
                emissive="#ff6b00"
                emissiveIntensity={1}
                transparent
                opacity={0.8}
              />
            </Sphere>
            <pointLight position={[0, 0, 0]} intensity={2} distance={8} color="#ff6b00" />
          </group>
        )}

        {/* Fuel Line */}
        <Cylinder args={[0.15, 0.15, 3, 12]} position={[-1.5, 0.5, -3]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
        </Cylinder>

        {/* Water Inlet */}
        <Cylinder args={[0.2, 0.2, 2, 12]} position={[2.5, 3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.3} />
        </Cylinder>

        {/* Steam Outlet Pipe */}
        <group position={[0, 9, 0]}>
          <Cylinder args={[0.3, 0.3, 2, 12]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.2} />
          </Cylinder>
          
          {/* Elbow Joint */}
          <Sphere args={[0.35, 12, 12]} position={[0, 2, 0]}>
            <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.2} />
          </Sphere>
          
          <Cylinder args={[0.3, 0.3, 3, 12]} position={[1.5, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.2} />
          </Cylinder>

          {/* Steam Effect */}
          {isActive && (
            <group ref={steamRef} position={[3, 2, 0]}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Sphere 
                  key={`steam-${i}`}
                  args={[0.3 - i * 0.03, 8, 8]} 
                  position={[i * 0.4, i * 0.3, 0]}
                >
                  <meshStandardMaterial 
                    color="#ffffff"
                    transparent
                    opacity={0.4 - i * 0.04}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                  />
                </Sphere>
              ))}
            </group>
          )}
        </group>

        {/* Pressure Gauge */}
        <group position={[2.2, 6, 0]}>
          <Cylinder args={[0.4, 0.4, 0.2, 16]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
          </Cylinder>
          <Cylinder args={[0.35, 0.35, 0.15, 16]} rotation={[0, 0, Math.PI / 2]} position={[0.1, 0, 0]}>
            <meshStandardMaterial 
              color={statusColor}
              emissive={statusColor}
              emissiveIntensity={isActive ? 0.5 : 0.1}
            />
          </Cylinder>
        </group>

        {/* Temperature Gauge */}
        <group position={[2.2, 4, 0]}>
          <Cylinder args={[0.4, 0.4, 0.2, 16]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
          </Cylinder>
          <Cylinder args={[0.35, 0.35, 0.15, 16]} rotation={[0, 0, Math.PI / 2]} position={[0.1, 0, 0]}>
            <meshStandardMaterial 
              color={statusColor}
              emissive={statusColor}
              emissiveIntensity={isActive ? 0.5 : 0.1}
            />
          </Cylinder>
        </group>

        {/* Safety Valve */}
        <Cylinder args={[0.2, 0.3, 0.6, 8]} position={[0, 9.5, 0]}>
          <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.3} />
        </Cylinder>

        {/* Control Panel */}
        <Box args={[1, 1.5, 0.3]} position={[-2.5, 2, 0]}>
          <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
        </Box>

        {/* Status Lights */}
        {[0.4, 0, -0.4].map((y, index) => (
          <Sphere key={`light-${index}`} args={[0.08, 12, 12]} position={[-2.35, 2 + y, 0.2]}>
            <meshStandardMaterial 
              color={index === 0 && isActive ? "#10b981" : index === 1 && temperature > 150 ? "#fbbf24" : "#ef4444"}
              emissive={index === 0 && isActive ? "#10b981" : index === 1 && temperature > 150 ? "#fbbf24" : "#ef4444"}
              emissiveIntensity={isActive ? 0.8 : 0.2}
            />
          </Sphere>
        ))}
      </group>

      {/* Label */}
      <Text
        position={[0, 11, 0]}
        fontSize={0.6}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        Steam Boiler
      </Text>

      {/* Info Display */}
      <Html position={[0, 5, 3]} center>
        <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap">
          <div className="font-semibold text-cyan-400">Boiler Status</div>
          <div className="text-zinc-300 mt-1">Temp: {temperature}°C</div>
          <div className="text-zinc-300">Pressure: {pressure} Bar</div>
          <div className="text-zinc-300">Output: {(steamOutput * 100).toFixed(0)}%</div>
          <div className={`text-xs mt-1 ${isActive ? 'text-green-400' : 'text-red-400'}`}>
            {isActive ? '● Operating' : '○ Offline'}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default IndustrialBoiler;
