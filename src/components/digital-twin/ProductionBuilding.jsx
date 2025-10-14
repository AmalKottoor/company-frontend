import { Box, Text } from '@react-three/drei';

/**
 * Production Building Component
 * Enclosed building for production line equipment
 */
const ProductionBuilding = ({ position = [0, 0, 0], children }) => {
  return (
    <group position={position}>
      {/* Building Floor */}
      <Box args={[40, 0.3, 30]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.8} />
      </Box>

      {/* Walls - Semi-transparent to see inside */}
      {/* Front Wall (with large opening) */}
      <group position={[0, 5, -15]}>
        <Box args={[10, 10, 0.3]} position={[-15, 0, 0]}>
          <meshStandardMaterial 
            color="#4a5568" 
            metalness={0.5} 
            roughness={0.6}
            transparent
            opacity={0.3}
          />
        </Box>
        <Box args={[10, 10, 0.3]} position={[15, 0, 0]}>
          <meshStandardMaterial 
            color="#4a5568" 
            metalness={0.5} 
            roughness={0.6}
            transparent
            opacity={0.3}
          />
        </Box>
        <Box args={[40, 3, 0.3]} position={[0, 6.5, 0]}>
          <meshStandardMaterial 
            color="#4a5568" 
            metalness={0.5} 
            roughness={0.6}
            transparent
            opacity={0.3}
          />
        </Box>
      </group>

      {/* Back Wall - Semi-transparent */}
      <Box args={[40, 10, 0.3]} position={[0, 5, 15]}>
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.5} 
          roughness={0.6}
          transparent
          opacity={0.3}
        />
      </Box>

      {/* Side Walls - Semi-transparent */}
      <Box args={[0.3, 10, 30]} position={[-20, 5, 0]}>
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.5} 
          roughness={0.6}
          transparent
          opacity={0.3}
        />
      </Box>
      <Box args={[0.3, 10, 30]} position={[20, 5, 0]}>
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.5} 
          roughness={0.6}
          transparent
          opacity={0.3}
        />
      </Box>

      {/* Roof */}
      <Box args={[40.5, 0.3, 30.5]} position={[0, 10.15, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.4} />
      </Box>

      {/* Roof Support Beams */}
      {[-15, -5, 5, 15].map((x, i) => (
        <Box key={`beam-x-${i}`} args={[0.3, 0.4, 30]} position={[x, 10, 0]}>
          <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
        </Box>
      ))}

      {/* Windows */}
      {[-10, 0, 10].map((x, i) => (
        <Box key={`window-${i}`} args={[3, 2, 0.1]} position={[x, 6, 15.2]}>
          <meshStandardMaterial 
            color="#60a5fa" 
            transparent 
            opacity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
      ))}

      {/* Building Label */}
      <Text
        position={[0, 11, 0]}
        fontSize={1.2}
        color="#00ffff"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        Production Hall
      </Text>

      {/* Content */}
      <group position={[0, 0, 0]}>
        {children}
      </group>
    </group>
  );
};

export default ProductionBuilding;
