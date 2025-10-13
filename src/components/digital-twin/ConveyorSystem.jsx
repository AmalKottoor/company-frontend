import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Html } from '@react-three/drei';

/**
 * Enhanced Conveyor System with Item Tracking
 * Displays moving items with IDs and tracks their positions
 */
const ConveyorSystem = ({ 
  position = [0, 0, 0], 
  isRunning = false, 
  speed = 0.03,
  onItemReachEnd,
  itemsProduced = 0
}) => {
  const [items, setItems] = useState([]);
  const itemIdCounter = useRef(0);
  const spawnTimer = useRef(0);

  useFrame((state, delta) => {
    if (isRunning) {
      // Spawn new items
      spawnTimer.current += delta;
      if (spawnTimer.current > 3 && items.length < 8) {
        spawnTimer.current = 0;
        const newItem = {
          id: itemIdCounter.current++,
          position: -12,
          status: 'in-transit',
          color: '#00ffff'
        };
        setItems(prev => [...prev, newItem]);
      }

      // Move items
      setItems(prevItems => {
        return prevItems.map(item => {
          const newPosition = item.position + speed;
          
          // Check if item reached end
          if (newPosition > 12) {
            if (onItemReachEnd) {
              onItemReachEnd(item);
            }
            return null;
          }
          
          return {
            ...item,
            position: newPosition
          };
        }).filter(Boolean);
      });
    }
  });

  return (
    <group position={position}>
      {/* Main Conveyor Belt */}
      <Box args={[24, 0.15, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.7}
          roughness={0.3}
        />
      </Box>

      {/* Belt Edges */}
      <Box args={[24, 0.12, 0.08]} position={[0, 0.12, 0.79]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[24, 0.12, 0.08]} position={[0, 0.12, -0.79]}>
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Support Structure */}
      {[-10, -5, 0, 5, 10].map((x, index) => (
        <group key={`support-${index}`} position={[x, -0.6, 0]}>
          <Cylinder args={[0.08, 0.08, 1.2]} position={[0, 0, 0.6]}>
            <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
          </Cylinder>
          <Cylinder args={[0.08, 0.08, 1.2]} position={[0, 0, -0.6]}>
            <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
          </Cylinder>
        </group>
      ))}

      {/* Drive Rollers */}
      <Cylinder args={[0.15, 0.15, 1.5]} position={[-12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#4b5563" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.15, 0.15, 1.5]} position={[12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#4b5563" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Moving Items with Tracking */}
      {items.map((item) => (
        <group key={item.id} position={[item.position, 0.35, 0]}>
          {/* Item Box */}
          <Box args={[0.5, 0.4, 0.5]}>
            <meshStandardMaterial 
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.3}
              metalness={0.4}
              roughness={0.6}
            />
          </Box>
          
          {/* Item ID Label */}
          <Html position={[0, 0.5, 0]} center distanceFactor={8}>
            <div className="bg-zinc-900/90 backdrop-blur-sm border border-neon-cyan rounded px-2 py-0.5 text-[10px] font-mono text-neon-cyan whitespace-nowrap">
              ID: {String(item.id).padStart(4, '0')}
            </div>
          </Html>

          {/* Status Indicator */}
          <Sphere args={[0.06]} position={[0, 0.3, 0]}>
            <meshStandardMaterial 
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={1.5}
            />
          </Sphere>
        </group>
      ))}

      {/* Sensors along the belt */}
      {[-8, -4, 0, 4, 8].map((x, index) => (
        <group key={`sensor-${index}`} position={[x, 0.3, 0.9]}>
          <Cylinder args={[0.05, 0.05, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color="#6b7280"
              metalness={0.8}
              roughness={0.2}
            />
          </Cylinder>
          <Sphere args={[0.04]} position={[0, 0, 0.12]}>
            <meshStandardMaterial 
              color={isRunning ? "#ef4444" : "#374151"}
              emissive={isRunning ? "#ef4444" : "#000000"}
              emissiveIntensity={isRunning ? 1.5 : 0}
            />
          </Sphere>
        </group>
      ))}

      {/* Conveyor Info Display */}
      <Html position={[0, 1.5, 0]} center>
        <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-lg px-3 py-2 min-w-[200px]">
          <div className="text-white text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-400 font-light">Items on Belt:</span>
              <span className="text-neon-cyan font-medium">{items.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-light">Total Produced:</span>
              <span className="text-neon-green font-medium">{itemsProduced}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-light">Speed:</span>
              <span className="text-neon-purple font-medium">{(speed * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </Html>

      {/* Running Indicator Light */}
      {isRunning && (
        <pointLight
          position={[0, 2, 0]}
          intensity={0.4}
          distance={15}
          color="#00ffff"
        />
      )}
    </group>
  );
};

export default ConveyorSystem;
