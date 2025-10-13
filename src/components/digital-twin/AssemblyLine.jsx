import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';

/**
 * Assembly Line Component
 * Modular conveyor system with workstations and moving products
 */
const AssemblyLine = ({ position = [0, 0, 0], isRunning = false, speed = 0.02 }) => {
  const productRefs = useRef([]);
  const beltSpeed = useRef(0);

  useFrame(() => {
    if (isRunning) {
      // Smooth acceleration
      beltSpeed.current = Math.min(beltSpeed.current + 0.001, speed);
      
      productRefs.current.forEach((product, index) => {
        if (product) {
          product.position.x += beltSpeed.current;
          // Loop products back to start
          if (product.position.x > 8) {
            product.position.x = -8;
          }
        }
      });
    } else {
      // Smooth deceleration
      beltSpeed.current = Math.max(beltSpeed.current - 0.001, 0);
      
      productRefs.current.forEach((product) => {
        if (product && beltSpeed.current > 0) {
          product.position.x += beltSpeed.current;
        }
      });
    }
  });

  return (
    <group position={position}>
      {/* Main Conveyor Belt */}
      <Box args={[16, 0.15, 1.2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.6}
          roughness={0.4}
        />
      </Box>

      {/* Belt Sides */}
      <Box args={[16, 0.1, 0.05]} position={[0, 0.1, 0.625]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[16, 0.1, 0.05]} position={[0, 0.1, -0.625]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Support Legs */}
      {[-6, -2, 2, 6].map((x, index) => (
        <group key={`leg-${index}`} position={[x, -0.5, 0]}>
          <Cylinder args={[0.08, 0.08, 1]} position={[0, 0, 0.5]}>
            <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
          </Cylinder>
          <Cylinder args={[0.08, 0.08, 1]} position={[0, 0, -0.5]}>
            <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
          </Cylinder>
        </group>
      ))}

      {/* Drive Rollers */}
      <Cylinder args={[0.12, 0.12, 1.2]} position={[-8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#4b5563" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.12, 0.12, 1.2]} position={[8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#4b5563" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Products on Belt */}
      {[0, 1, 2, 3, 4].map((index) => (
        <group
          key={`product-${index}`}
          ref={el => productRefs.current[index] = el}
          position={[-7 + index * 3.5, 0.3, 0]}
        >
          {/* Product Base */}
          <Box args={[0.4, 0.3, 0.4]}>
            <meshStandardMaterial 
              color={isRunning ? "#00ffff" : "#6b7280"}
              emissive={isRunning ? "#00ffff" : "#000000"}
              emissiveIntensity={isRunning ? 0.2 : 0}
              metalness={0.3}
              roughness={0.7}
            />
          </Box>
          
          {/* Product Top Component */}
          <Sphere args={[0.15]} position={[0, 0.25, 0]}>
            <meshStandardMaterial 
              color={isRunning ? "#a855f7" : "#9ca3af"}
              emissive={isRunning ? "#a855f7" : "#000000"}
              emissiveIntensity={isRunning ? 0.2 : 0}
              metalness={0.5}
              roughness={0.5}
            />
          </Sphere>
        </group>
      ))}

      {/* Workstation Markers */}
      {[-4, 0, 4].map((x, index) => (
        <group key={`station-${index}`} position={[x, 0.5, 1.5]}>
          <Box args={[0.8, 0.05, 0.6]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#1f2937" 
              metalness={0.6}
              roughness={0.4}
            />
          </Box>
          {/* Station Light */}
          <Sphere args={[0.08]} position={[0, 0.15, 0]}>
            <meshStandardMaterial 
              color={isRunning ? "#10b981" : "#ef4444"}
              emissive={isRunning ? "#10b981" : "#ef4444"}
              emissiveIntensity={1.5}
            />
          </Sphere>
        </group>
      ))}

      {/* Status Indicators */}
      <pointLight 
        position={[0, 2, 0]} 
        intensity={isRunning ? 0.5 : 0} 
        color="#00ffff"
        distance={10}
      />
    </group>
  );
};

export default AssemblyLine;
