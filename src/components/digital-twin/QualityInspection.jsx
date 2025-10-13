import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Html } from '@react-three/drei';

/**
 * Quality Inspection Station Component
 * Automated inspection system with sensors and vision system
 */
const QualityInspection = ({ position = [0, 0, 0], isActive = false }) => {
  const scannerRef = useRef();
  const laserRef = useRef();
  const [inspectionStatus, setInspectionStatus] = useState('idle');

  useFrame((state) => {
    if (isActive && scannerRef.current) {
      const time = state.clock.elapsedTime;
      
      // Scanner head movement
      scannerRef.current.position.y = Math.sin(time * 2) * 0.3 + 1.5;
      
      // Laser rotation
      if (laserRef.current) {
        laserRef.current.rotation.y = time * 2;
      }

      // Update inspection status based on time
      const cycle = Math.floor(time * 0.5) % 3;
      if (cycle === 0) setInspectionStatus('scanning');
      else if (cycle === 1) setInspectionStatus('analyzing');
      else setInspectionStatus('pass');
    } else {
      setInspectionStatus('idle');
    }
  });

  return (
    <group position={position}>
      {/* Base Platform */}
      <Box args={[2, 0.2, 2]} position={[0, 0.1, 0]}>
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.7}
          roughness={0.3}
        />
      </Box>

      {/* Inspection Table */}
      <Box args={[1.5, 0.1, 1.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial 
          color="#374151" 
          metalness={0.6}
          roughness={0.4}
        />
      </Box>

      {/* Support Columns */}
      {[[-0.7, 0.7], [0.7, 0.7], [-0.7, -0.7], [0.7, -0.7]].map(([x, z], index) => (
        <Cylinder key={`column-${index}`} args={[0.05, 0.05, 2.5]} position={[x, 1.5, z]}>
          <meshStandardMaterial 
            color="#4b5563" 
            metalness={0.8}
            roughness={0.2}
          />
        </Cylinder>
      ))}

      {/* Top Frame */}
      <Box args={[1.6, 0.1, 1.6]} position={[0, 2.8, 0]}>
        <meshStandardMaterial 
          color="#374151" 
          metalness={0.7}
          roughness={0.3}
        />
      </Box>

      {/* Scanner Head */}
      <group ref={scannerRef} position={[0, 1.5, 0]}>
        {/* Scanner Housing */}
        <Box args={[0.4, 0.3, 0.4]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#3b82f6" : "#6b7280"}
            emissive={isActive ? "#1e40af" : "#000000"}
            emissiveIntensity={isActive ? 0.3 : 0}
            metalness={0.7}
            roughness={0.3}
          />
        </Box>

        {/* Camera Lens */}
        <Cylinder args={[0.12, 0.15, 0.15]} position={[0, -0.225, 0]}>
          <meshStandardMaterial 
            color="#1f2937"
            metalness={0.9}
            roughness={0.1}
          />
        </Cylinder>

        {/* Lens Glass */}
        <Cylinder args={[0.1, 0.1, 0.02]} position={[0, -0.31, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#00ffff" : "#374151"}
            emissive={isActive ? "#00ffff" : "#000000"}
            emissiveIntensity={isActive ? 1 : 0}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.8}
          />
        </Cylinder>

        {/* Laser Scanner */}
        <group ref={laserRef} position={[0, -0.15, 0]}>
          {[0, 1, 2, 3].map((i) => (
            <Box 
              key={`laser-${i}`}
              args={[0.02, 0.02, 0.8]} 
              position={[
                Math.cos((i * Math.PI) / 2) * 0.15,
                0,
                Math.sin((i * Math.PI) / 2) * 0.15
              ]}
              rotation={[0, (i * Math.PI) / 2, 0]}
            >
              <meshStandardMaterial 
                color="#ef4444"
                emissive="#ef4444"
                emissiveIntensity={isActive ? 2 : 0}
              />
            </Box>
          ))}
        </group>

        {/* Scan Beam Effect */}
        {isActive && (
          <pointLight
            position={[0, -0.3, 0]}
            intensity={1}
            distance={2}
            color="#00ffff"
          />
        )}
      </group>

      {/* Sensor Array */}
      {[-0.5, 0, 0.5].map((x, index) => (
        <group key={`sensor-${index}`} position={[x, 0.6, 0.8]}>
          <Cylinder args={[0.06, 0.06, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color="#6b7280"
              metalness={0.8}
              roughness={0.2}
            />
          </Cylinder>
          <Sphere args={[0.04]} position={[0, 0, 0.08]}>
            <meshStandardMaterial 
              color={isActive ? "#10b981" : "#374151"}
              emissive={isActive ? "#10b981" : "#000000"}
              emissiveIntensity={isActive ? 1.5 : 0}
            />
          </Sphere>
        </group>
      ))}

      {/* Display Screen */}
      <Box args={[0.6, 0.4, 0.05]} position={[0, 1.2, -0.8]} rotation={[-0.2, 0, 0]}>
        <meshStandardMaterial 
          color="#1f2937"
          metalness={0.6}
          roughness={0.4}
        />
      </Box>

      {/* Screen Display */}
      <Box args={[0.55, 0.35, 0.02]} position={[0, 1.2, -0.775]} rotation={[-0.2, 0, 0]}>
        <meshStandardMaterial 
          color={
            inspectionStatus === 'pass' ? "#10b981" :
            inspectionStatus === 'scanning' ? "#3b82f6" :
            inspectionStatus === 'analyzing' ? "#f59e0b" :
            "#374151"
          }
          emissive={
            inspectionStatus === 'pass' ? "#10b981" :
            inspectionStatus === 'scanning' ? "#3b82f6" :
            inspectionStatus === 'analyzing' ? "#f59e0b" :
            "#000000"
          }
          emissiveIntensity={isActive ? 0.5 : 0}
        />
      </Box>

      {/* Status Indicators */}
      <group position={[0.9, 1.5, 0]}>
        {/* Pass Indicator */}
        <Sphere args={[0.06]} position={[0, 0.2, 0]}>
          <meshStandardMaterial 
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={inspectionStatus === 'pass' ? 2 : 0.2}
          />
        </Sphere>
        {/* Processing Indicator */}
        <Sphere args={[0.06]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={inspectionStatus === 'analyzing' ? 2 : 0.2}
          />
        </Sphere>
        {/* Scanning Indicator */}
        <Sphere args={[0.06]} position={[0, -0.2, 0]}>
          <meshStandardMaterial 
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={inspectionStatus === 'scanning' ? 2 : 0.2}
          />
        </Sphere>
      </group>

      {/* Status Label */}
      {isActive && (
        <Html position={[0, 3.2, 0]} center>
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700 rounded-lg px-3 py-1.5 text-white text-xs font-medium">
            Status: <span className={
              inspectionStatus === 'pass' ? 'text-neon-green' :
              inspectionStatus === 'scanning' ? 'text-neon-cyan' :
              inspectionStatus === 'analyzing' ? 'text-neon-pink' :
              'text-zinc-500'
            }>
              {inspectionStatus.toUpperCase()}
            </span>
          </div>
        </Html>
      )}

      {/* Ambient Lighting */}
      {isActive && (
        <pointLight
          position={[0, 2, 0]}
          intensity={0.3}
          distance={3}
          color="#00ffff"
        />
      )}
    </group>
  );
};

export default QualityInspection;
