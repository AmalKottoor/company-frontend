import { Box, Text, Html } from '@react-three/drei';
import { useState } from 'react';

/**
 * Control Room Building Component
 * Houses control panels and operator stations
 */
const ControlRoom = ({ 
  position = [0, 0, 0],
  controlMode = 'auto',
  onModeChange,
  systemStatus,
  onSystemToggle,
  onEmergencyStop,
  onResetAll
}) => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <group position={position}>
      {/* Building Structure */}
      <Box args={[15, 0.3, 12]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.8} />
      </Box>

      {/* Walls - Semi-transparent */}
      <Box args={[15, 8, 0.3]} position={[0, 4, -6]}>
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.6} transparent opacity={0.2} />
      </Box>
      <Box args={[15, 8, 0.3]} position={[0, 4, 6]}>
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.6} transparent opacity={0.2} />
      </Box>
      <Box args={[0.3, 8, 12]} position={[-7.5, 4, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.6} transparent opacity={0.2} />
      </Box>
      <Box args={[0.3, 8, 12]} position={[7.5, 4, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.6} transparent opacity={0.2} />
      </Box>

      {/* Roof */}
      <Box args={[15.5, 0.3, 12.5]} position={[0, 8.15, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.4} />
      </Box>

      {/* Glass Front */}
      <Box args={[12, 6, 0.2]} position={[0, 4, -6.1]}>
        <meshStandardMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </Box>

      {/* Door */}
      <Box args={[2, 3, 0.2]} position={[-5, 1.5, -6.1]}>
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.4} />
      </Box>

      {/* Label */}
      <Text
        position={[0, 9, 0]}
        fontSize={0.8}
        color="#00ffff"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        Control Room
      </Text>

      {/* Interactive Control Panel */}
      <group position={[0, 3, -5.5]} onClick={() => setShowPanel(!showPanel)}>
        {/* Glowing border to indicate clickable */}
        <Box args={[8.2, 4.2, 0.2]} position={[0, 0, -0.1]}>
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </Box>
        
        <Box args={[8, 4, 0.3]}>
          <meshStandardMaterial 
            color="#1f2937" 
            metalness={0.7} 
            roughness={0.3}
            emissive="#00ffff"
            emissiveIntensity={0.2}
          />
        </Box>
        
        {/* Click instruction */}
        {!showPanel && (
          <Text
            position={[0, 2.5, 0.2]}
            fontSize={0.3}
            color="#00ffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            🖱️ CLICK TO OPEN
          </Text>
        )}

        {showPanel && (
          <Html position={[0, 0, 0.5]} center distanceFactor={8}>
            <div className="bg-zinc-900/98 backdrop-blur-xl border-2 border-cyan-500 rounded-3xl p-8 shadow-2xl" style={{ width: '500px' }}>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                <span className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></span>
                Master Control Panel
              </h3>

              {/* Mode Selector */}
              <div className="mb-6 p-4 bg-gradient-to-br from-zinc-800/80 to-zinc-800/40 rounded-xl border-2 border-zinc-700">
                <label className="text-base font-semibold text-zinc-300 mb-3 block">Control Mode</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => onModeChange?.('auto')}
                    className={`flex-1 px-6 py-3 rounded-xl text-base font-bold transition-all shadow-lg ${
                      controlMode === 'auto'
                        ? 'bg-green-500 text-white'
                        : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                    }`}
                  >
                    AUTO
                  </button>
                  <button
                    onClick={() => onModeChange?.('manual')}
                    className={`flex-1 px-6 py-3 rounded-xl text-base font-bold transition-all shadow-lg ${
                      controlMode === 'manual'
                        ? 'bg-blue-500 text-white'
                        : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                    }`}
                  >
                    MANUAL
                  </button>
                </div>
              </div>

              {/* System Controls */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.keys(systemStatus).filter(key => key !== 'emergencyStop').map((system) => (
                  <button
                    key={system}
                    onClick={() => onSystemToggle?.(system)}
                    disabled={controlMode === 'auto'}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-md ${
                      systemStatus[system]
                        ? 'bg-green-500/30 border-2 border-green-500 text-green-400'
                        : 'bg-zinc-800 border-2 border-zinc-700 text-zinc-400'
                    } ${controlMode === 'auto' ? 'opacity-50 cursor-not-allowed' : 'hover:border-cyan-500'}`}
                  >
                    {system.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Emergency Controls */}
              <div className="flex gap-2">
                <button
                  onClick={onEmergencyStop}
                  className="flex-1 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-red-500/50"
                >
                  🛑 EMERGENCY STOP
                </button>
                <button
                  onClick={onResetAll}
                  className="flex-1 px-6 py-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl font-bold text-base transition-all shadow-lg"
                >
                  ↻ RESET
                </button>
              </div>

              <div className="mt-3 text-xs text-zinc-500 text-center">
                {controlMode === 'auto' ? '⚡ Auto mode: Systems controlled automatically' : '🎮 Manual mode: Click buttons to control systems'}
              </div>
            </div>
          </Html>
        )}
      </group>

      {/* Status Indicator Light */}
      <mesh position={[0, 7, -6.3]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={controlMode === 'auto' ? "#10b981" : "#3b82f6"}
          emissive={controlMode === 'auto' ? "#10b981" : "#3b82f6"}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

export default ControlRoom;
