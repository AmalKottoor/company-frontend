import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * Wrapper component to make any 3D component interactive
 * Provides hover effects, click handlers, and info panels
 */
const InteractiveComponent = ({ 
  children, 
  name = "Component",
  type = "Equipment",
  status = "Operational",
  specs = {},
  position = [0, 0, 0],
  onSelect,
  isSelected = false,
  showInfo = true
}) => {
  const [hovered, setHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const groupRef = useRef();

  // Pulse animation when selected
  useFrame((state) => {
    if (groupRef.current && isSelected) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    } else if (groupRef.current) {
      groupRef.current.position.y = position[1];
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
    onSelect?.(name);
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group 
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Highlight ring when hovered or selected */}
      {(hovered || isSelected) && (
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3, 3.5, 32]} />
          <meshBasicMaterial 
            color={isSelected ? "#00ff00" : "#00ffff"} 
            transparent 
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Component name label - always visible when hovered */}
      {hovered && (
        <Html position={[0, 8, 0]} center distanceFactor={6}>
          <div className="bg-zinc-900/95 backdrop-blur-xl border-2 border-cyan-400 rounded-xl px-4 py-2 shadow-xl">
            <div className="text-cyan-400 font-bold text-sm whitespace-nowrap">
              {name}
            </div>
            <div className="text-zinc-400 text-xs">
              Click for details
            </div>
          </div>
        </Html>
      )}

      {/* Detailed info panel when clicked */}
      {showDetails && showInfo && (
        <Html position={[0, 10, 0]} center distanceFactor={8}>
          <div className="bg-zinc-900/98 backdrop-blur-xl border-2 border-cyan-500 rounded-2xl p-6 shadow-2xl" style={{ width: '350px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></span>
                {name}
              </h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(false);
                }}
                className="text-zinc-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between p-2 bg-zinc-800/50 rounded-lg">
                <span className="text-zinc-400 text-sm">Type:</span>
                <span className="text-white font-semibold text-sm">{type}</span>
              </div>

              <div className="flex justify-between p-2 bg-zinc-800/50 rounded-lg">
                <span className="text-zinc-400 text-sm">Status:</span>
                <span className={`font-semibold text-sm ${
                  status === 'Operational' ? 'text-green-400' : 
                  status === 'Warning' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {status}
                </span>
              </div>

              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex justify-between p-2 bg-zinc-800/50 rounded-lg">
                  <span className="text-zinc-400 text-sm">{key}:</span>
                  <span className="text-white font-semibold text-sm">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-700">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Add control logic here
                }}
                className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold text-sm transition-all"
              >
                View Controls
              </button>
            </div>
          </div>
        </Html>
      )}

      {/* Render children with hover effect */}
      <group scale={hovered ? 1.05 : 1}>
        {children}
      </group>
    </group>
  );
};

export default InteractiveComponent;
