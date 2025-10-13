import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Html } from '@react-three/drei';

/**
 * AGV Delivery System Component
 * Automated vehicles for transporting items to inventory
 */
const AGVDelivery = ({ 
  position = [0, 0, 0], 
  isActive = false,
  deliveriesCompleted = 0
}) => {
  const agvRef = useRef();
  const wheelsRef = useRef([]);
  const [agvState, setAgvState] = useState('idle'); // idle, loading, traveling, unloading
  const [cargoLoaded, setCargoLoaded] = useState(false);

  useFrame((state) => {
    if (isActive && agvRef.current) {
      const time = state.clock.elapsedTime;
      const cycle = time % 12; // 12 second cycle

      // AGV path: pickup -> travel to inventory -> unload -> return
      if (cycle < 2) {
        // At pickup point
        setAgvState('loading');
        setCargoLoaded(true);
        agvRef.current.position.x = -8;
        agvRef.current.position.z = -5;
        agvRef.current.rotation.y = 0;
      } else if (cycle < 6) {
        // Traveling to inventory
        setAgvState('traveling');
        const progress = (cycle - 2) / 4;
        agvRef.current.position.x = -8 + progress * 16;
        agvRef.current.position.z = -5 + progress * 10;
        agvRef.current.rotation.y = Math.atan2(10, 16);
      } else if (cycle < 8) {
        // At inventory unloading
        setAgvState('unloading');
        setCargoLoaded(false);
        agvRef.current.position.x = 8;
        agvRef.current.position.z = 5;
        agvRef.current.rotation.y = Math.PI;
      } else {
        // Returning to pickup
        setAgvState('returning');
        const progress = (cycle - 8) / 4;
        agvRef.current.position.x = 8 - progress * 16;
        agvRef.current.position.z = 5 - progress * 10;
        agvRef.current.rotation.y = Math.PI + Math.atan2(-10, -16);
      }

      // Wheel rotation
      wheelsRef.current.forEach(wheel => {
        if (wheel && (agvState === 'traveling' || agvState === 'returning')) {
          wheel.rotation.x += 0.1;
        }
      });
    } else {
      setAgvState('idle');
      setCargoLoaded(false);
      if (agvRef.current) {
        agvRef.current.position.x = -8;
        agvRef.current.position.z = -5;
        agvRef.current.rotation.y = 0;
      }
    }
  });

  return (
    <group position={position}>
      {/* AGV Vehicle */}
      <group ref={agvRef} position={[-8, 0, -5]}>
        {/* Main Chassis */}
        <Box args={[1.4, 0.35, 1]} position={[0, 0.35, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#3b82f6" : "#6b7280"}
            emissive={isActive ? "#1e40af" : "#000000"}
            emissiveIntensity={0.2}
            metalness={0.7}
            roughness={0.3}
          />
        </Box>

        {/* Top Platform */}
        <Box args={[1.2, 0.08, 0.9]} position={[0, 0.56, 0]}>
          <meshStandardMaterial 
            color="#1f2937"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>

        {/* Cargo Container (when loaded) */}
        {cargoLoaded && (
          <group position={[0, 0.85, 0]}>
            <Box args={[0.7, 0.5, 0.7]}>
              <meshStandardMaterial 
                color="#92400e"
                metalness={0.2}
                roughness={0.8}
              />
            </Box>
            {/* Cargo Straps */}
            <Box args={[0.75, 0.03, 0.03]} position={[0, 0, 0.3]}>
              <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
            </Box>
            <Box args={[0.75, 0.03, 0.03]} position={[0, 0, -0.3]}>
              <meshStandardMaterial color="#fbbf24" metalness={0.6} roughness={0.4} />
            </Box>
          </group>
        )}

        {/* Wheels */}
        {[
          { pos: [0.6, 0.12, 0.5] },
          { pos: [-0.6, 0.12, 0.5] },
          { pos: [0.6, 0.12, -0.5] },
          { pos: [-0.6, 0.12, -0.5] }
        ].map((wheel, index) => (
          <Cylinder 
            key={`wheel-${index}`}
            ref={el => wheelsRef.current[index] = el}
            args={[0.14, 0.14, 0.1]} 
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

        {/* Front Sensors */}
        <group position={[0.7, 0.4, 0]}>
          {[-0.2, 0, 0.2].map((z, index) => (
            <Sphere key={`sensor-${index}`} args={[0.05]} position={[0, 0, z]}>
              <meshStandardMaterial 
                color={isActive ? "#10b981" : "#374151"}
                emissive={isActive ? "#10b981" : "#000000"}
                emissiveIntensity={isActive ? 1.5 : 0}
              />
            </Sphere>
          ))}
        </group>

        {/* Navigation Beacon */}
        <Sphere args={[0.08]} position={[0, 1.2, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#f59e0b" : "#6b7280"}
            emissive={isActive ? "#f59e0b" : "#000000"}
            emissiveIntensity={isActive ? 2 : 0}
          />
        </Sphere>

        {/* Safety Lights */}
        <Sphere args={[0.05]} position={[-0.7, 0.35, 0.5]}>
          <meshStandardMaterial 
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={isActive ? 1.5 : 0.3}
          />
        </Sphere>
        <Sphere args={[0.05]} position={[-0.7, 0.35, -0.5]}>
          <meshStandardMaterial 
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={isActive ? 1.5 : 0.3}
          />
        </Sphere>

        {/* Headlights */}
        {isActive && agvState === 'traveling' && (
          <>
            <spotLight
              position={[0.7, 0.35, 0.25]}
              angle={0.4}
              penumbra={0.5}
              intensity={0.6}
              distance={6}
              color="#ffffff"
            />
            <spotLight
              position={[0.7, 0.35, -0.25]}
              angle={0.4}
              penumbra={0.5}
              intensity={0.6}
              distance={6}
              color="#ffffff"
            />
          </>
        )}

        {/* AGV Status Display */}
        <Html position={[0, 1.8, 0]} center distanceFactor={10}>
          <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-lg px-3 py-2 min-w-[160px]">
            <div className="text-white text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400 font-light">Status:</span>
                <span className={`font-medium ${
                  agvState === 'idle' ? 'text-zinc-500' :
                  agvState === 'loading' ? 'text-neon-cyan' :
                  agvState === 'traveling' ? 'text-neon-green' :
                  agvState === 'unloading' ? 'text-neon-purple' :
                  'text-neon-blue'
                }`}>
                  {agvState.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-light">Cargo:</span>
                <span className={`font-medium ${cargoLoaded ? 'text-neon-green' : 'text-zinc-500'}`}>
                  {cargoLoaded ? 'LOADED' : 'EMPTY'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-light">Deliveries:</span>
                <span className="text-neon-cyan font-medium">{deliveriesCompleted}</span>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* Path Markers */}
      {isActive && (
        <>
          {/* Path from pickup to inventory */}
          {Array.from({ length: 10 }).map((_, index) => {
            const progress = index / 9;
            return (
              <Cylinder 
                key={`marker-${index}`}
                args={[0.1, 0.1, 0.03]} 
                position={[
                  -8 + progress * 16,
                  0.02,
                  -5 + progress * 10
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
        </>
      )}

      {/* Pickup Station */}
      <group position={[-8, 0, -5]}>
        <Box args={[2, 0.15, 2]} position={[0, 0.075, 0]}>
          <meshStandardMaterial 
            color="#374151"
            metalness={0.6}
            roughness={0.4}
          />
        </Box>
        {/* Station Marker */}
        <Box args={[0.1, 1.5, 0.1]} position={[-1, 0.75, -1]}>
          <meshStandardMaterial 
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.5}
          />
        </Box>
        <Html position={[0, 2, 0]} center>
          <div className="bg-zinc-900/90 backdrop-blur-sm border border-neon-cyan rounded px-2 py-1 text-[10px] font-medium text-neon-cyan whitespace-nowrap">
            PICKUP ZONE
          </div>
        </Html>
      </group>

      {/* Delivery Station */}
      <group position={[8, 0, 5]}>
        <Box args={[2, 0.15, 2]} position={[0, 0.075, 0]}>
          <meshStandardMaterial 
            color="#374151"
            metalness={0.6}
            roughness={0.4}
          />
        </Box>
        {/* Station Marker */}
        <Box args={[0.1, 1.5, 0.1]} position={[1, 0.75, 1]}>
          <meshStandardMaterial 
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </Box>
        <Html position={[0, 2, 0]} center>
          <div className="bg-zinc-900/90 backdrop-blur-sm border border-neon-green rounded px-2 py-1 text-[10px] font-medium text-neon-green whitespace-nowrap">
            DELIVERY ZONE
          </div>
        </Html>
      </group>
    </group>
  );
};

export default AGVDelivery;
