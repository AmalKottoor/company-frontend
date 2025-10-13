import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Html } from '@react-three/drei';

/**
 * Pick and Place Robot Component
 * Robotic arm that picks items from conveyor and places them
 */
const PickPlaceRobot = ({ 
  position = [0, 0, 0], 
  isActive = false,
  onItemPicked,
  itemsProcessed = 0
}) => {
  const baseRef = useRef();
  const shoulderRef = useRef();
  const elbowRef = useRef();
  const wristRef = useRef();
  const gripperRef = useRef();
  const [holdingItem, setHoldingItem] = useState(false);
  const [robotState, setRobotState] = useState('idle'); // idle, reaching, picking, placing, returning

  useFrame((state) => {
    if (isActive) {
      const time = state.clock.elapsedTime;
      const cycle = time % 8; // 8 second cycle

      // State machine for pick and place
      if (cycle < 2) {
        setRobotState('reaching');
        setHoldingItem(false);
        if (baseRef.current) baseRef.current.rotation.y = Math.min(time * 0.3, Math.PI / 4);
        if (shoulderRef.current) shoulderRef.current.rotation.z = Math.sin(time * 2) * 0.3 + 0.2;
        if (elbowRef.current) elbowRef.current.rotation.z = Math.sin(time * 2) * 0.4 - 0.4;
      } else if (cycle < 3) {
        setRobotState('picking');
        setHoldingItem(true);
        if (wristRef.current) wristRef.current.rotation.x = Math.sin(time * 3) * 0.2;
      } else if (cycle < 5) {
        setRobotState('placing');
        if (baseRef.current) baseRef.current.rotation.y = -Math.PI / 4;
        if (shoulderRef.current) shoulderRef.current.rotation.z = -0.3;
        if (elbowRef.current) elbowRef.current.rotation.z = 0.2;
      } else if (cycle < 6) {
        setRobotState('releasing');
        setHoldingItem(false);
      } else {
        setRobotState('returning');
        if (baseRef.current) baseRef.current.rotation.y = 0;
        if (shoulderRef.current) shoulderRef.current.rotation.z = 0;
        if (elbowRef.current) elbowRef.current.rotation.z = 0;
      }

      // Gripper animation
      if (gripperRef.current) {
        const gripperState = holdingItem ? 0.05 : 0.15;
        gripperRef.current.scale.x = gripperState;
      }
    } else {
      setRobotState('idle');
      setHoldingItem(false);
    }
  });

  return (
    <group position={position}>
      {/* Base Platform */}
      <Cylinder args={[0.8, 0.9, 0.3]} position={[0, 0.15, 0]}>
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>

      {/* Rotating Base */}
      <group ref={baseRef}>
        <Cylinder args={[0.6, 0.6, 0.5]} position={[0, 0.5, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#3b82f6" : "#4b5563"}
            emissive={isActive ? "#1e40af" : "#000000"}
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>

        {/* Shoulder Joint */}
        <group ref={shoulderRef} position={[0, 0.75, 0]}>
          <Sphere args={[0.35]}>
            <meshStandardMaterial 
              color="#374151" 
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>

          {/* Upper Arm */}
          <Box args={[0.3, 2.2, 0.3]} position={[0, 1.1, 0]}>
            <meshStandardMaterial 
              color={isActive ? "#10b981" : "#6b7280"}
              emissive={isActive ? "#047857" : "#000000"}
              emissiveIntensity={0.2}
              metalness={0.6}
              roughness={0.4}
            />
          </Box>

          {/* Elbow Joint */}
          <group ref={elbowRef} position={[0, 2.2, 0]}>
            <Sphere args={[0.3]}>
              <meshStandardMaterial 
                color="#374151" 
                metalness={0.8}
                roughness={0.2}
              />
            </Sphere>

            {/* Forearm */}
            <Box args={[0.25, 1.6, 0.25]} position={[0, 0.8, 0]}>
              <meshStandardMaterial 
                color={isActive ? "#8b5cf6" : "#6b7280"}
                emissive={isActive ? "#6d28d9" : "#000000"}
                emissiveIntensity={0.2}
                metalness={0.6}
                roughness={0.4}
              />
            </Box>

            {/* Wrist Joint */}
            <group ref={wristRef} position={[0, 1.6, 0]}>
              <Sphere args={[0.25]}>
                <meshStandardMaterial 
                  color="#374151" 
                  metalness={0.8}
                  roughness={0.2}
                />
              </Sphere>

              {/* End Effector Mount */}
              <Cylinder args={[0.15, 0.12, 0.3]} position={[0, 0.25, 0]}>
                <meshStandardMaterial 
                  color={isActive ? "#f59e0b" : "#9ca3af"}
                  emissive={isActive ? "#d97706" : "#000000"}
                  emissiveIntensity={0.3}
                  metalness={0.7}
                  roughness={0.3}
                />
              </Cylinder>

              {/* Gripper */}
              <group ref={gripperRef} position={[0, 0.4, 0]}>
                {/* Left Jaw */}
                <Box args={[0.06, 0.3, 0.12]} position={[-0.1, 0.15, 0]}>
                  <meshStandardMaterial 
                    color="#ef4444"
                    emissive="#7f1d1d"
                    emissiveIntensity={holdingItem ? 0.8 : 0.3}
                    metalness={0.6}
                    roughness={0.4}
                  />
                </Box>
                {/* Right Jaw */}
                <Box args={[0.06, 0.3, 0.12]} position={[0.1, 0.15, 0]}>
                  <meshStandardMaterial 
                    color="#ef4444"
                    emissive="#7f1d1d"
                    emissiveIntensity={holdingItem ? 0.8 : 0.3}
                    metalness={0.6}
                    roughness={0.4}
                  />
                </Box>

                {/* Held Item */}
                {holdingItem && (
                  <Box args={[0.4, 0.3, 0.4]} position={[0, 0.2, 0]}>
                    <meshStandardMaterial 
                      color="#00ffff"
                      emissive="#00ffff"
                      emissiveIntensity={0.5}
                      metalness={0.4}
                      roughness={0.6}
                    />
                  </Box>
                )}
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Status Indicator */}
      <Sphere args={[0.1]} position={[0, 0.8, 0.7]}>
        <meshStandardMaterial 
          color={isActive ? "#10b981" : "#ef4444"}
          emissive={isActive ? "#10b981" : "#ef4444"}
          emissiveIntensity={2}
        />
      </Sphere>

      {/* Robot Info Display */}
      <Html position={[0, 5, 0]} center>
        <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-lg px-3 py-2 min-w-[180px]">
          <div className="text-white text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-400 font-light">Status:</span>
              <span className={`font-medium ${
                robotState === 'idle' ? 'text-zinc-500' :
                robotState === 'picking' ? 'text-neon-cyan' :
                robotState === 'placing' ? 'text-neon-purple' :
                'text-neon-green'
              }`}>
                {robotState.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-light">Processed:</span>
              <span className="text-neon-cyan font-medium">{itemsProcessed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-light">Holding:</span>
              <span className={`font-medium ${holdingItem ? 'text-neon-green' : 'text-zinc-500'}`}>
                {holdingItem ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </div>
      </Html>

      {/* Work Light */}
      {isActive && (
        <spotLight
          position={[0, 4, 0]}
          angle={0.6}
          penumbra={0.5}
          intensity={1}
          color="#ffffff"
          castShadow
        />
      )}
    </group>
  );
};

export default PickPlaceRobot;
