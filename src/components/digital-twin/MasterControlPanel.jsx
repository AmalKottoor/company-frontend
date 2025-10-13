import { Box, Cylinder, Sphere, Html } from '@react-three/drei';

/**
 * Master Control Panel Component
 * Central control interface for all plant systems
 */
const MasterControlPanel = ({ 
  position = [0, 0, 0],
  systemStatus = {},
  onSystemToggle,
  onEmergencyStop,
  onResetAll
}) => {
  const {
    conveyor = false,
    pickPlace = false,
    inventory = false,
    agv = false,
    qualityCheck = false,
    emergencyStop = false
  } = systemStatus;

  const allSystemsActive = conveyor && pickPlace && inventory && agv && qualityCheck;

  return (
    <group position={position}>
      {/* Control Panel Structure */}
      <Box args={[5, 3.5, 0.3]} position={[0, 1.75, 0]}>
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.7}
          roughness={0.3}
        />
      </Box>

      {/* Frame */}
      <Box args={[5.2, 3.7, 0.25]} position={[0, 1.75, -0.15]}>
        <meshStandardMaterial 
          color="#374151"
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Support Legs */}
      {[-1.5, 1.5].map((x, index) => (
        <Box key={`leg-${index}`} args={[0.15, 1.75, 0.15]} position={[x, 0.875, 0]}>
          <meshStandardMaterial 
            color="#4b5563"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
      ))}

      {/* Base */}
      <Box args={[5.5, 0.2, 1]} position={[0, 0.1, 0]}>
        <meshStandardMaterial 
          color="#1f2937"
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Control Panel Interface */}
      <Html position={[0, 1.75, 0.2]} center transform distanceFactor={5}>
        <div className="bg-zinc-950/98 backdrop-blur-xl border-2 border-zinc-800 rounded-2xl p-6 w-[420px]">
          {/* Header */}
          <div className="text-center mb-5 pb-4 border-b border-zinc-800">
            <h2 className="text-white text-2xl font-bold tracking-tight mb-1">
              Master Control Panel
            </h2>
            <p className="text-zinc-500 text-xs font-light">Production Plant Command Center</p>
          </div>

          {/* Emergency Stop */}
          <div className="mb-5 bg-zinc-900/80 rounded-xl p-4 border-2 border-red-900/50">
            <button
              onClick={() => onEmergencyStop && onEmergencyStop()}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                emergencyStop 
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] animate-pulse' 
                  : 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]'
              }`}
              onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
              onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
            >
              {emergencyStop ? '⚠️ EMERGENCY STOP ACTIVE' : '🛑 EMERGENCY STOP'}
            </button>
          </div>

          {/* System Controls */}
          <div className="space-y-3 mb-5">
            {/* Conveyor System */}
            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${conveyor ? 'bg-neon-green shadow-[0_0_8px_rgba(0,255,127,0.8)]' : 'bg-zinc-700'}`} />
                <div>
                  <div className="text-white text-sm font-medium">Conveyor System</div>
                  <div className="text-zinc-500 text-xs font-light">Material Transport</div>
                </div>
              </div>
              <button
                onClick={() => onSystemToggle && onSystemToggle('conveyor')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  conveyor 
                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/50' 
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                }`}
                onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
              >
                {conveyor ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>

            {/* Pick & Place Robot */}
            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${pickPlace ? 'bg-neon-cyan shadow-[0_0_8px_rgba(0,255,255,0.8)]' : 'bg-zinc-700'}`} />
                <div>
                  <div className="text-white text-sm font-medium">Pick & Place Robot</div>
                  <div className="text-zinc-500 text-xs font-light">Item Handling</div>
                </div>
              </div>
              <button
                onClick={() => onSystemToggle && onSystemToggle('pickPlace')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  pickPlace 
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50' 
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                }`}
                onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
              >
                {pickPlace ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>

            {/* Quality Check */}
            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${qualityCheck ? 'bg-neon-purple shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-zinc-700'}`} />
                <div>
                  <div className="text-white text-sm font-medium">Quality Inspection</div>
                  <div className="text-zinc-500 text-xs font-light">Automated QC</div>
                </div>
              </div>
              <button
                onClick={() => onSystemToggle && onSystemToggle('qualityCheck')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  qualityCheck 
                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50' 
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                }`}
                onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
              >
                {qualityCheck ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>

            {/* Inventory System */}
            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${inventory ? 'bg-neon-blue shadow-[0_0_8px_rgba(0,127,255,0.8)]' : 'bg-zinc-700'}`} />
                <div>
                  <div className="text-white text-sm font-medium">Inventory Storage</div>
                  <div className="text-zinc-500 text-xs font-light">Warehouse System</div>
                </div>
              </div>
              <button
                onClick={() => onSystemToggle && onSystemToggle('inventory')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  inventory 
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50' 
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                }`}
                onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
              >
                {inventory ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>

            {/* AGV Delivery */}
            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${agv ? 'bg-neon-pink shadow-[0_0_8px_rgba(255,0,127,0.8)]' : 'bg-zinc-700'}`} />
                <div>
                  <div className="text-white text-sm font-medium">AGV Delivery</div>
                  <div className="text-zinc-500 text-xs font-light">Autonomous Transport</div>
                </div>
              </div>
              <button
                onClick={() => onSystemToggle && onSystemToggle('agv')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  agv 
                    ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/50' 
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                }`}
                onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
                onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
              >
                {agv ? 'ACTIVE' : 'INACTIVE'}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
            <button
              onClick={() => onSystemToggle && onSystemToggle('all')}
              className={`py-3 rounded-lg text-sm font-semibold transition-all ${
                allSystemsActive
                  ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                  : 'bg-gradient-to-r from-neon-cyan to-neon-purple text-white shadow-lg hover:shadow-xl'
              }`}
              onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
              onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
            >
              {allSystemsActive ? '⏸️ Stop All' : '▶️ Start All'}
            </button>
            <button
              onClick={() => onResetAll && onResetAll()}
              className="py-3 rounded-lg text-sm font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-700 transition-all"
              onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
              onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
            >
              🔄 Reset All
            </button>
          </div>

          {/* Status Footer */}
          <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${allSystemsActive ? 'bg-neon-green animate-pulse' : 'bg-zinc-600'}`} />
              <span className="text-zinc-400 font-light">
                {allSystemsActive ? 'Full Production Mode' : 'Partial Operation'}
              </span>
            </div>
            <span className="text-zinc-600 font-mono">v2.1.0</span>
          </div>
        </div>
      </Html>

      {/* Status Lights on Panel */}
      <group position={[0, 3.3, 0.2]}>
        {[conveyor, pickPlace, qualityCheck, inventory, agv].map((status, index) => (
          <Sphere key={`light-${index}`} args={[0.06]} position={[(index - 2) * 0.4, 0, 0]}>
            <meshStandardMaterial 
              color={status ? "#10b981" : "#6b7280"}
              emissive={status ? "#10b981" : "#000000"}
              emissiveIntensity={status ? 2 : 0}
            />
          </Sphere>
        ))}
      </group>

      {/* Panel Lighting */}
      <pointLight
        position={[0, 1.75, 1]}
        intensity={0.6}
        distance={4}
        color="#00ffff"
      />
    </group>
  );
};

export default MasterControlPanel;
