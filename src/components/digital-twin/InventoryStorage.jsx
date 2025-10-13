import { Box, Cylinder, Sphere, Html } from '@react-three/drei';

/**
 * Inventory Storage Component
 * Warehouse storage racks with item tracking
 */
const InventoryStorage = ({ 
  position = [0, 0, 0], 
  isActive = false,
  storedItems = 0,
  capacity = 48
}) => {
  const rows = 4;
  const columns = 6;
  const levels = 2;
  
  // Calculate which slots are filled
  const filledSlots = Math.min(storedItems, capacity);

  return (
    <group position={position}>
      {/* Storage Rack Structure */}
      {[0, 1].map((rackIndex) => (
        <group key={`rack-${rackIndex}`} position={[rackIndex * 4 - 2, 0, 0]}>
          {/* Vertical Posts */}
          {[0, 1, 2, 3].map((postIndex) => (
            <Cylinder 
              key={`post-${postIndex}`}
              args={[0.08, 0.08, 4]} 
              position={[
                postIndex === 0 || postIndex === 1 ? -1.5 : 1.5,
                2,
                postIndex % 2 === 0 ? -1 : 1
              ]}
            >
              <meshStandardMaterial 
                color="#374151" 
                metalness={0.8}
                roughness={0.2}
              />
            </Cylinder>
          ))}

          {/* Horizontal Shelves */}
          {[0, 1, 2, 3].map((shelfIndex) => (
            <group key={`shelf-${shelfIndex}`} position={[0, shelfIndex * 1 + 0.5, 0]}>
              {/* Shelf Surface */}
              <Box args={[3.2, 0.08, 2.2]}>
                <meshStandardMaterial 
                  color="#1f2937" 
                  metalness={0.6}
                  roughness={0.4}
                />
              </Box>
              
              {/* Support Beams */}
              <Box args={[3.2, 0.05, 0.1]} position={[0, 0, -1.1]}>
                <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
              </Box>
              <Box args={[3.2, 0.05, 0.1]} position={[0, 0, 1.1]}>
                <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
              </Box>
            </group>
          ))}

          {/* Stored Items */}
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: columns / 2 }).map((_, col) => {
              const slotIndex = rackIndex * (rows * columns / 2) + row * (columns / 2) + col;
              const isFilled = slotIndex < filledSlots;
              
              return isFilled ? (
                <Box
                  key={`item-${row}-${col}`}
                  args={[0.45, 0.35, 0.45]}
                  position={[
                    col * 1 - 0.75,
                    row * 1 + 0.75,
                    0
                  ]}
                >
                  <meshStandardMaterial 
                    color="#92400e"
                    metalness={0.2}
                    roughness={0.8}
                  />
                </Box>
              ) : null;
            })
          )}
        </group>
      ))}

      {/* Base Platform */}
      <Box args={[9, 0.2, 3]} position={[0, 0.1, 0]}>
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.3}
          roughness={0.8}
        />
      </Box>

      {/* Inventory Management Terminal */}
      <group position={[4.5, 1.2, 0]}>
        {/* Terminal Stand */}
        <Cylinder args={[0.08, 0.12, 1.2]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#374151" 
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>

        {/* Terminal Screen */}
        <Box args={[0.6, 0.8, 0.05]} position={[0, 0.6, 0.1]} rotation={[0, -0.3, 0]}>
          <meshStandardMaterial 
            color="#1f2937"
            metalness={0.6}
            roughness={0.4}
          />
        </Box>

        {/* Screen Display */}
        <Box args={[0.55, 0.75, 0.02]} position={[0, 0.6, 0.13]} rotation={[0, -0.3, 0]}>
          <meshStandardMaterial 
            color={isActive ? "#10b981" : "#374151"}
            emissive={isActive ? "#047857" : "#000000"}
            emissiveIntensity={isActive ? 0.5 : 0}
          />
        </Box>
      </group>

      {/* Status Lights */}
      <group position={[0, 4.5, 0]}>
        {[-1, 0, 1].map((x, index) => (
          <Sphere key={`light-${index}`} args={[0.08]} position={[x * 0.3, 0, 0]}>
            <meshStandardMaterial 
              color={
                index === 0 ? (storedItems > capacity * 0.8 ? "#ef4444" : "#6b7280") :
                index === 1 ? (isActive ? "#10b981" : "#6b7280") :
                (storedItems < capacity * 0.2 ? "#f59e0b" : "#6b7280")
              }
              emissive={
                index === 0 ? (storedItems > capacity * 0.8 ? "#ef4444" : "#000000") :
                index === 1 ? (isActive ? "#10b981" : "#000000") :
                (storedItems < capacity * 0.2 ? "#f59e0b" : "#000000")
              }
              emissiveIntensity={2}
            />
          </Sphere>
        ))}
      </group>

      {/* Inventory Info Display */}
      <Html position={[0, 5.5, 0]} center>
        <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-lg px-4 py-3 min-w-[220px]">
          <h4 className="text-white text-sm font-semibold mb-2 text-center">Inventory Storage</h4>
          <div className="text-white text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-zinc-400 font-light">Stored Items:</span>
              <span className="text-neon-cyan font-medium">{storedItems}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-light">Capacity:</span>
              <span className="text-zinc-300 font-medium">{capacity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 font-light">Utilization:</span>
              <span className={`font-medium ${
                storedItems / capacity > 0.8 ? 'text-neon-pink' :
                storedItems / capacity > 0.5 ? 'text-neon-green' :
                'text-neon-purple'
              }`}>
                {((storedItems / capacity) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-zinc-800">
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-neon-cyan to-neon-purple h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(storedItems / capacity) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Html>

      {/* Warehouse Lighting */}
      {isActive && (
        <>
          <pointLight
            position={[-2, 4, 0]}
            intensity={0.6}
            distance={8}
            color="#ffffff"
          />
          <pointLight
            position={[2, 4, 0]}
            intensity={0.6}
            distance={8}
            color="#ffffff"
          />
        </>
      )}
    </group>
  );
};

export default InventoryStorage;
