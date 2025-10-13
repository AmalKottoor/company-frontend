import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';

/**
 * AGV (Automated Guided Vehicle) System Component
 * Mobile robots for material transport in the production plant
 */
const AGVSystem = ({ position = [0, 0, 0], isActive = false, pathPoints = [] }) => {
  const agv1Ref = useRef();
  const agv2Ref = useRef();
  const wheel1Ref = useRef();
  const wheel2Ref = useRef();
  const wheel3Ref = useRef();
  const wheel4Ref = useRef();

  useFrame((state) => {
    if (isActive) {
      const time = state.clock.elapsedTime;

      // AGV 1 path following (circular path)
      if (agv1Ref.current) {
        const radius = 8;
        const speed = 0.3;
        agv1Ref.current.position.x = Math.cos(time * speed) * radius;
        agv1Ref.current.position.z = Math.sin(time * speed) * radius;
        agv1Ref.current.rotation.y = -time * speed + Math.PI / 2;
      }

      // AGV 2 path following (figure-eight path)
      if (agv2Ref.current) {
        const speed = 0.25;
        agv2Ref.current.position.x = Math.sin(time * speed) * 10;
        agv2Ref.current.position.z = Math.sin(time * speed * 2) * 5;
        agv2Ref.current.rotation.y = Math.atan2(
          Math.cos(time * speed * 2) * 10,
          Math.cos(time * speed) * 10
        );
      }

      // Wheel rotation
      const wheelSpeed = time * 5;
      [wheel1Ref, wheel2Ref, wheel3Ref, wheel4Ref].forEach(wheel => {
        if (wheel.current) {
          wheel.current.rotation.x = wheelSpeed;
        }
      });
    }
  });

  const AGVVehicle = ({ groupRef, wheelRefs, color = "#3b82f6" }) => (
    <group ref={groupRef}>
      {/* Main Body */}
      <Box args={[1.2, 0.3, 0.8]} position={[0, 0.3, 0]}>
        <meshStandardMaterial 
          color={isActive ? color : "#6b7280"}
          emissive={isActive ? color : "#000000"}
          emissiveIntensity={isActive ? 0.2 : 0}
          metalness={0.7}
          roughness={0.3}
        />
      </Box>

      {/* Top Platform */}
      <Box args={[1, 0.05, 0.7]} position={[0, 0.475, 0]}>
        <meshStandardMaterial 
          color="#1f2937"
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Cargo Container */}
      <Box args={[0.6, 0.4, 0.5]} position={[0, 0.7, 0]}>
        <meshStandardMaterial 
          color="#92400e"
          metalness={0.2}
          roughness={0.8}
        />
      </Box>

      {/* Wheels */}
      {[
        { pos: [0.5, 0.1, 0.4], ref: wheelRefs[0] },
        { pos: [-0.5, 0.1, 0.4], ref: wheelRefs[1] },
        { pos: [0.5, 0.1, -0.4], ref: wheelRefs[2] },
        { pos: [-0.5, 0.1, -0.4], ref: wheelRefs[3] }
      ].map((wheel, index) => (
        <Cylinder 
          key={`wheel-${index}`}
          ref={wheel.ref}
          args={[0.12, 0.12, 0.08]} 
          position={wheel.pos}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial 
            color="#1f2937"
            metalness={0.6}
            roughness={0.6}
          />
        </Cylinder>
      ))}

      {/* Sensor Array */}
      <group position={[0.6, 0.35, 0]}>
        {[-0.15, 0, 0.15].map((z, index) => (
          <Sphere key={`sensor-${index}`} args={[0.04]} position={[0, 0, z]}>
            <meshStandardMaterial 
              color={isActive ? "#10b981" : "#374151"}
              emissive={isActive ? "#10b981" : "#000000"}
              emissiveIntensity={isActive ? 1.5 : 0}
            />
          </Sphere>
        ))}
      </group>

      {/* Navigation Light */}
      <Sphere args={[0.06]} position={[0, 0.95, 0]}>
        <meshStandardMaterial 
          color={isActive ? "#f59e0b" : "#6b7280"}
          emissive={isActive ? "#f59e0b" : "#000000"}
          emissiveIntensity={isActive ? 2 : 0}
        />
      </Sphere>

      {/* Safety Lights */}
      <Sphere args={[0.04]} position={[-0.6, 0.3, 0.4]}>
        <meshStandardMaterial 
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={isActive ? 1.5 : 0.3}
        />
      </Sphere>
      <Sphere args={[0.04]} position={[-0.6, 0.3, -0.4]}>
        <meshStandardMaterial 
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={isActive ? 1.5 : 0.3}
        />
      </Sphere>

      {/* Headlights */}
      {isActive && (
        <>
          <spotLight
            position={[0.6, 0.3, 0.2]}
            angle={0.5}
            penumbra={0.5}
            intensity={0.5}
            distance={5}
            color="#ffffff"
          />
          <spotLight
            position={[0.6, 0.3, -0.2]}
            angle={0.5}
            penumbra={0.5}
            intensity={0.5}
            distance={5}
            color="#ffffff"
          />
        </>
      )}
    </group>
  );

  return (
    <group position={position}>
      {/* AGV 1 */}
      <AGVVehicle 
        groupRef={agv1Ref} 
        wheelRefs={[wheel1Ref, wheel2Ref, wheel3Ref, wheel4Ref]}
        color="#3b82f6"
      />

      {/* AGV 2 */}
      <AGVVehicle 
        groupRef={agv2Ref} 
        wheelRefs={[useRef(), useRef(), useRef(), useRef()]}
        color="#8b5cf6"
      />

      {/* Path Markers on Floor */}
      {isActive && (
        <>
          {/* Circular path markers for AGV 1 */}
          {Array.from({ length: 16 }).map((_, index) => {
            const angle = (index / 16) * Math.PI * 2;
            const radius = 8;
            return (
              <Cylinder 
                key={`marker-1-${index}`}
                args={[0.08, 0.08, 0.02]} 
                position={[
                  Math.cos(angle) * radius,
                  0.01,
                  Math.sin(angle) * radius
                ]}
              >
                <meshStandardMaterial 
                  color="#3b82f6"
                  emissive="#3b82f6"
                  emissiveIntensity={0.5}
                />
              </Cylinder>
            );
          })}

          {/* Figure-eight path markers for AGV 2 */}
          {Array.from({ length: 20 }).map((_, index) => {
            const t = (index / 20) * Math.PI * 2;
            return (
              <Cylinder 
                key={`marker-2-${index}`}
                args={[0.08, 0.08, 0.02]} 
                position={[
                  Math.sin(t) * 10,
                  0.01,
                  Math.sin(t * 2) * 5
                ]}
              >
                <meshStandardMaterial 
                  color="#8b5cf6"
                  emissive="#8b5cf6"
                  emissiveIntensity={0.5}
                />
              </Cylinder>
            );
          })}
        </>
      )}

      {/* Charging Stations */}
      <group position={[10, 0, 0]}>
        <Box args={[1, 0.5, 1]} position={[0, 0.25, 0]}>
          <meshStandardMaterial 
            color="#374151"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
        {/* Charging Port */}
        <Cylinder args={[0.1, 0.1, 0.2]} position={[0, 0.5, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#10b981" : "#6b7280"}
            emissive={isActive ? "#10b981" : "#000000"}
            emissiveIntensity={isActive ? 1 : 0}
          />
        </Cylinder>
        {/* Status Light */}
        <Sphere args={[0.06]} position={[0, 0.6, 0]}>
          <meshStandardMaterial 
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={isActive ? 2 : 0.5}
          />
        </Sphere>
      </group>

      <group position={[-10, 0, 0]}>
        <Box args={[1, 0.5, 1]} position={[0, 0.25, 0]}>
          <meshStandardMaterial 
            color="#374151"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
        {/* Charging Port */}
        <Cylinder args={[0.1, 0.1, 0.2]} position={[0, 0.5, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#10b981" : "#6b7280"}
            emissive={isActive ? "#10b981" : "#000000"}
            emissiveIntensity={isActive ? 1 : 0}
          />
        </Cylinder>
        {/* Status Light */}
        <Sphere args={[0.06]} position={[0, 0.6, 0]}>
          <meshStandardMaterial 
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={isActive ? 2 : 0.5}
          />
        </Sphere>
      </group>
    </group>
  );
};

export default AGVSystem;
