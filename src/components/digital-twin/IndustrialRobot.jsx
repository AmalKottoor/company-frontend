import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';

/**
 * Industrial Robot Component
 * 6-axis articulated robot arm with realistic movements
 */
const IndustrialRobot = ({ position = [0, 0, 0], isActive = false, task = 'idle' }) => {
  const baseRef = useRef();
  const joint1Ref = useRef();
  const joint2Ref = useRef();
  const joint3Ref = useRef();
  const endEffectorRef = useRef();
  const clawLeftRef = useRef();
  const clawRightRef = useRef();

  useFrame((state) => {
    if (isActive && baseRef.current) {
      const time = state.clock.elapsedTime;

      // Base rotation
      if (baseRef.current) {
        baseRef.current.rotation.y = Math.sin(time * 0.4) * 0.8;
      }

      // Joint 1 - Shoulder
      if (joint1Ref.current) {
        joint1Ref.current.rotation.z = Math.sin(time * 0.5) * 0.4 + 0.2;
      }

      // Joint 2 - Elbow
      if (joint2Ref.current) {
        joint2Ref.current.rotation.z = Math.sin(time * 0.6) * 0.3 - 0.3;
      }

      // Joint 3 - Wrist
      if (joint3Ref.current) {
        joint3Ref.current.rotation.x = Math.sin(time * 0.8) * 0.2;
        joint3Ref.current.rotation.z = Math.sin(time * 0.7) * 0.15;
      }

      // End Effector rotation
      if (endEffectorRef.current) {
        endEffectorRef.current.rotation.y = time * 0.5;
      }

      // Claw animation
      const clawOpen = Math.sin(time * 1.5) * 0.5 + 0.5; // 0 to 1
      if (clawLeftRef.current && clawRightRef.current) {
        clawLeftRef.current.position.x = -0.08 - clawOpen * 0.1;
        clawRightRef.current.position.x = 0.08 + clawOpen * 0.1;
      }
    }
  });

  return (
    <group position={position}>
      {/* Base Platform */}
      <Cylinder args={[0.6, 0.7, 0.2]} position={[0, 0.1, 0]}>
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>

      {/* Rotating Base */}
      <group ref={baseRef}>
        <Cylinder args={[0.5, 0.5, 0.4]} position={[0, 0.4, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#3b82f6" : "#4b5563"}
            emissive={isActive ? "#1e40af" : "#000000"}
            emissiveIntensity={isActive ? 0.3 : 0}
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>

        {/* Joint 1 - Shoulder */}
        <group ref={joint1Ref} position={[0, 0.6, 0]}>
          {/* Shoulder Housing */}
          <Sphere args={[0.3]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#374151" 
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>

          {/* Upper Arm */}
          <Box args={[0.25, 1.8, 0.25]} position={[0, 0.9, 0]}>
            <meshStandardMaterial 
              color={isActive ? "#10b981" : "#6b7280"}
              emissive={isActive ? "#047857" : "#000000"}
              emissiveIntensity={isActive ? 0.2 : 0}
              metalness={0.6}
              roughness={0.4}
            />
          </Box>

          {/* Joint 2 - Elbow */}
          <group ref={joint2Ref} position={[0, 1.8, 0]}>
            {/* Elbow Housing */}
            <Sphere args={[0.25]} position={[0, 0, 0]}>
              <meshStandardMaterial 
                color="#374151" 
                metalness={0.8}
                roughness={0.2}
              />
            </Sphere>

            {/* Forearm */}
            <Box args={[0.2, 1.4, 0.2]} position={[0, 0.7, 0]}>
              <meshStandardMaterial 
                color={isActive ? "#8b5cf6" : "#6b7280"}
                emissive={isActive ? "#6d28d9" : "#000000"}
                emissiveIntensity={isActive ? 0.2 : 0}
                metalness={0.6}
                roughness={0.4}
              />
            </Box>

            {/* Joint 3 - Wrist */}
            <group ref={joint3Ref} position={[0, 1.4, 0]}>
              {/* Wrist Housing */}
              <Sphere args={[0.2]} position={[0, 0, 0]}>
                <meshStandardMaterial 
                  color="#374151" 
                  metalness={0.8}
                  roughness={0.2}
                />
              </Sphere>

              {/* Wrist Extension */}
              <Cylinder args={[0.12, 0.12, 0.4]} position={[0, 0.2, 0]}>
                <meshStandardMaterial 
                  color="#4b5563" 
                  metalness={0.7}
                  roughness={0.3}
                />
              </Cylinder>

              {/* End Effector */}
              <group ref={endEffectorRef} position={[0, 0.4, 0]}>
                {/* Tool Mount */}
                <Cylinder args={[0.15, 0.1, 0.2]} position={[0, 0.1, 0]}>
                  <meshStandardMaterial 
                    color={isActive ? "#f59e0b" : "#9ca3af"}
                    emissive={isActive ? "#d97706" : "#000000"}
                    emissiveIntensity={isActive ? 0.3 : 0}
                    metalness={0.7}
                    roughness={0.3}
                  />
                </Cylinder>

                {/* Gripper Base */}
                <Box args={[0.3, 0.08, 0.15]} position={[0, 0.24, 0]}>
                  <meshStandardMaterial 
                    color="#1f2937" 
                    metalness={0.8}
                    roughness={0.2}
                  />
                </Box>

                {/* Left Claw */}
                <group ref={clawLeftRef} position={[-0.08, 0.28, 0]}>
                  <Box args={[0.04, 0.25, 0.08]}>
                    <meshStandardMaterial 
                      color="#ef4444"
                      emissive="#7f1d1d"
                      emissiveIntensity={isActive ? 0.5 : 0.2}
                      metalness={0.6}
                      roughness={0.4}
                    />
                  </Box>
                  {/* Claw Tip */}
                  <Box args={[0.04, 0.08, 0.04]} position={[0, 0.165, 0]}>
                    <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
                  </Box>
                </group>

                {/* Right Claw */}
                <group ref={clawRightRef} position={[0.08, 0.28, 0]}>
                  <Box args={[0.04, 0.25, 0.08]}>
                    <meshStandardMaterial 
                      color="#ef4444"
                      emissive="#7f1d1d"
                      emissiveIntensity={isActive ? 0.5 : 0.2}
                      metalness={0.6}
                      roughness={0.4}
                    />
                  </Box>
                  {/* Claw Tip */}
                  <Box args={[0.04, 0.08, 0.04]} position={[0, 0.165, 0]}>
                    <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
                  </Box>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Status Light */}
      <Sphere args={[0.08]} position={[0, 0.6, 0.55]}>
        <meshStandardMaterial 
          color={isActive ? "#10b981" : "#ef4444"}
          emissive={isActive ? "#10b981" : "#ef4444"}
          emissiveIntensity={2}
        />
      </Sphere>

      {/* Work Light */}
      {isActive && (
        <spotLight
          position={[0, 3, 0]}
          angle={0.5}
          penumbra={0.5}
          intensity={1}
          color="#ffffff"
          castShadow
        />
      )}
    </group>
  );
};

export default IndustrialRobot;
