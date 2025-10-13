import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';

/**
 * Packaging Station Component
 * Automated packaging system with robotic arms and conveyor integration
 */
const PackagingStation = ({ position = [0, 0, 0], isActive = false }) => {
  const arm1Ref = useRef();
  const arm2Ref = useRef();
  const boxRef = useRef();
  const lidRef = useRef();

  useFrame((state) => {
    if (isActive) {
      const time = state.clock.elapsedTime;

      // Packaging arm 1 movement
      if (arm1Ref.current) {
        arm1Ref.current.rotation.y = Math.sin(time * 0.8) * 0.4;
        arm1Ref.current.position.y = Math.sin(time * 1.2) * 0.2 + 1.2;
      }

      // Packaging arm 2 movement
      if (arm2Ref.current) {
        arm2Ref.current.rotation.y = Math.sin(time * 0.8 + Math.PI) * 0.4;
        arm2Ref.current.position.y = Math.sin(time * 1.2 + Math.PI) * 0.2 + 1.2;
      }

      // Box assembly animation
      if (boxRef.current) {
        const scale = Math.sin(time * 0.5) * 0.1 + 1;
        boxRef.current.scale.set(scale, scale, scale);
      }

      // Lid movement
      if (lidRef.current) {
        lidRef.current.position.y = Math.sin(time * 0.6) * 0.3 + 0.8;
      }
    }
  });

  return (
    <group position={position}>
      {/* Base Platform */}
      <Box args={[3, 0.2, 2.5]} position={[0, 0.1, 0]}>
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.7}
          roughness={0.3}
        />
      </Box>

      {/* Work Table */}
      <Box args={[2.5, 0.1, 2]} position={[0, 0.5, 0]}>
        <meshStandardMaterial 
          color="#374151" 
          metalness={0.6}
          roughness={0.4}
        />
      </Box>

      {/* Packaging Arms Frame */}
      <group>
        {/* Left Support */}
        <Cylinder args={[0.08, 0.08, 2.5]} position={[-1, 1.5, 0]}>
          <meshStandardMaterial 
            color="#4b5563" 
            metalness={0.8}
            roughness={0.2}
          />
        </Cylinder>

        {/* Right Support */}
        <Cylinder args={[0.08, 0.08, 2.5]} position={[1, 1.5, 0]}>
          <meshStandardMaterial 
            color="#4b5563" 
            metalness={0.8}
            roughness={0.2}
          />
        </Cylinder>

        {/* Top Rail */}
        <Box args={[2.2, 0.1, 0.15]} position={[0, 2.7, 0]}>
          <meshStandardMaterial 
            color="#374151" 
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
      </group>

      {/* Packaging Arm 1 */}
      <group ref={arm1Ref} position={[-0.6, 1.2, 0]}>
        {/* Arm Mount */}
        <Cylinder args={[0.12, 0.12, 0.3]} position={[0, 0.15, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#8b5cf6" : "#6b7280"}
            emissive={isActive ? "#6d28d9" : "#000000"}
            emissiveIntensity={isActive ? 0.3 : 0}
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>

        {/* Arm Extension */}
        <Box args={[0.15, 0.8, 0.15]} position={[0, -0.4, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#a855f7" : "#6b7280"}
            emissive={isActive ? "#7c3aed" : "#000000"}
            emissiveIntensity={isActive ? 0.2 : 0}
            metalness={0.6}
            roughness={0.4}
          />
        </Box>

        {/* Gripper */}
        <group position={[0, -0.8, 0]}>
          <Box args={[0.25, 0.08, 0.12]}>
            <meshStandardMaterial 
              color="#1f2937"
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
          {/* Gripper Fingers */}
          <Box args={[0.04, 0.15, 0.08]} position={[-0.08, -0.1, 0]}>
            <meshStandardMaterial 
              color="#ef4444"
              emissive="#7f1d1d"
              emissiveIntensity={isActive ? 0.5 : 0.2}
            />
          </Box>
          <Box args={[0.04, 0.15, 0.08]} position={[0.08, -0.1, 0]}>
            <meshStandardMaterial 
              color="#ef4444"
              emissive="#7f1d1d"
              emissiveIntensity={isActive ? 0.5 : 0.2}
            />
          </Box>
        </group>
      </group>

      {/* Packaging Arm 2 */}
      <group ref={arm2Ref} position={[0.6, 1.2, 0]}>
        {/* Arm Mount */}
        <Cylinder args={[0.12, 0.12, 0.3]} position={[0, 0.15, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#8b5cf6" : "#6b7280"}
            emissive={isActive ? "#6d28d9" : "#000000"}
            emissiveIntensity={isActive ? 0.3 : 0}
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>

        {/* Arm Extension */}
        <Box args={[0.15, 0.8, 0.15]} position={[0, -0.4, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#a855f7" : "#6b7280"}
            emissive={isActive ? "#7c3aed" : "#000000"}
            emissiveIntensity={isActive ? 0.2 : 0}
            metalness={0.6}
            roughness={0.4}
          />
        </Box>

        {/* Gripper */}
        <group position={[0, -0.8, 0]}>
          <Box args={[0.25, 0.08, 0.12]}>
            <meshStandardMaterial 
              color="#1f2937"
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
          {/* Gripper Fingers */}
          <Box args={[0.04, 0.15, 0.08]} position={[-0.08, -0.1, 0]}>
            <meshStandardMaterial 
              color="#ef4444"
              emissive="#7f1d1d"
              emissiveIntensity={isActive ? 0.5 : 0.2}
            />
          </Box>
          <Box args={[0.04, 0.15, 0.08]} position={[0.08, -0.1, 0]}>
            <meshStandardMaterial 
              color="#ef4444"
              emissive="#7f1d1d"
              emissiveIntensity={isActive ? 0.5 : 0.2}
            />
          </Box>
        </group>
      </group>

      {/* Packaging Box */}
      <group position={[0, 0.6, 0]}>
        <Box ref={boxRef} args={[0.5, 0.4, 0.5]}>
          <meshStandardMaterial 
            color="#92400e"
            metalness={0.2}
            roughness={0.8}
          />
        </Box>

        {/* Box Lid */}
        <Box ref={lidRef} args={[0.52, 0.05, 0.52]} position={[0, 0.8, 0]}>
          <meshStandardMaterial 
            color="#78350f"
            metalness={0.2}
            roughness={0.8}
          />
        </Box>
      </group>

      {/* Label Printer */}
      <group position={[1.2, 0.8, 0.8]}>
        <Box args={[0.4, 0.3, 0.25]}>
          <meshStandardMaterial 
            color="#374151"
            metalness={0.6}
            roughness={0.4}
          />
        </Box>
        {/* Printer Display */}
        <Box args={[0.3, 0.15, 0.02]} position={[0, 0, 0.135]}>
          <meshStandardMaterial 
            color={isActive ? "#10b981" : "#1f2937"}
            emissive={isActive ? "#047857" : "#000000"}
            emissiveIntensity={isActive ? 0.5 : 0}
          />
        </Box>
      </group>

      {/* Tape Dispenser */}
      <group position={[-1.2, 0.7, 0.8]}>
        <Cylinder args={[0.15, 0.15, 0.4]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial 
            color="#fbbf24"
            metalness={0.3}
            roughness={0.7}
          />
        </Cylinder>
        {/* Dispenser Mount */}
        <Box args={[0.3, 0.1, 0.3]} position={[0, -0.15, 0]}>
          <meshStandardMaterial 
            color="#4b5563"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
      </group>

      {/* Status Lights */}
      <group position={[0, 2.8, 0]}>
        <Sphere args={[0.08]} position={[-0.3, 0, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#10b981" : "#6b7280"}
            emissive={isActive ? "#10b981" : "#000000"}
            emissiveIntensity={isActive ? 2 : 0}
          />
        </Sphere>
        <Sphere args={[0.08]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#f59e0b" : "#6b7280"}
            emissive={isActive ? "#f59e0b" : "#000000"}
            emissiveIntensity={isActive ? 1.5 : 0}
          />
        </Sphere>
        <Sphere args={[0.08]} position={[0.3, 0, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#3b82f6" : "#6b7280"}
            emissive={isActive ? "#3b82f6" : "#000000"}
            emissiveIntensity={isActive ? 1.5 : 0}
          />
        </Sphere>
      </group>

      {/* Work Lighting */}
      {isActive && (
        <>
          <spotLight
            position={[-0.6, 2.5, 0]}
            angle={0.4}
            penumbra={0.5}
            intensity={0.8}
            color="#ffffff"
          />
          <spotLight
            position={[0.6, 2.5, 0]}
            angle={0.4}
            penumbra={0.5}
            intensity={0.8}
            color="#ffffff"
          />
        </>
      )}
    </group>
  );
};

export default PackagingStation;
