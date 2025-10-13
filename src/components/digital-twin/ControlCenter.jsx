import { Box, Cylinder, Sphere, Html } from '@react-three/drei';

/**
 * Control Center Component
 * Central monitoring and control station for the production plant
 */
const ControlCenter = ({ 
  position = [0, 0, 0], 
  systemStatus = {},
  onSystemToggle 
}) => {
  const {
    assemblyLine = false,
    qualityInspection = false,
    packaging = false,
    robots = false,
    agv = false
  } = systemStatus;

  return (
    <group position={position}>
      {/* Control Room Structure */}
      <Box args={[4, 3, 3]} position={[0, 1.5, 0]}>
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.9}
        />
      </Box>

      {/* Glass Windows */}
      <Box args={[3.8, 1.5, 0.05]} position={[0, 1.8, 1.5]}>
        <meshStandardMaterial 
          color="#00ffff"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
          emissive="#00ffff"
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Control Desk */}
      <Box args={[3.5, 0.8, 1.5]} position={[0, 0.9, 0.5]}>
        <meshStandardMaterial 
          color="#374151"
          metalness={0.6}
          roughness={0.4}
        />
      </Box>

      {/* Main Monitor Array */}
      <group position={[0, 1.5, -1.4]}>
        {/* Center Main Monitor */}
        <Box args={[1.5, 1, 0.05]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#1f2937"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
        <Box args={[1.4, 0.9, 0.02]} position={[0, 0, 0.04]}>
          <meshStandardMaterial 
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
          />
        </Box>

        {/* Left Monitor */}
        <Box args={[0.8, 0.6, 0.05]} position={[-1.2, -0.1, 0.1]} rotation={[0, 0.3, 0]}>
          <meshStandardMaterial 
            color="#1f2937"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
        <Box args={[0.75, 0.55, 0.02]} position={[-1.2, -0.1, 0.14]} rotation={[0, 0.3, 0]}>
          <meshStandardMaterial 
            color={assemblyLine ? "#10b981" : "#374151"}
            emissive={assemblyLine ? "#047857" : "#000000"}
            emissiveIntensity={assemblyLine ? 0.5 : 0}
          />
        </Box>

        {/* Right Monitor */}
        <Box args={[0.8, 0.6, 0.05]} position={[1.2, -0.1, 0.1]} rotation={[0, -0.3, 0]}>
          <meshStandardMaterial 
            color="#1f2937"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
        <Box args={[0.75, 0.55, 0.02]} position={[1.2, -0.1, 0.14]} rotation={[0, -0.3, 0]}>
          <meshStandardMaterial 
            color={qualityInspection ? "#3b82f6" : "#374151"}
            emissive={qualityInspection ? "#1e40af" : "#000000"}
            emissiveIntensity={qualityInspection ? 0.5 : 0}
          />
        </Box>
      </group>

      {/* Control Panel Buttons */}
      <group position={[0, 1.3, 0.7]}>
        {/* Assembly Line Button */}
        <group position={[-1.2, 0, 0]}>
          <Cylinder 
            args={[0.1, 0.1, 0.05]} 
            position={[0, 0, 0]}
            onClick={() => onSystemToggle && onSystemToggle('assemblyLine')}
            onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
          >
            <meshStandardMaterial 
              color={assemblyLine ? "#10b981" : "#6b7280"}
              emissive={assemblyLine ? "#10b981" : "#374151"}
              emissiveIntensity={assemblyLine ? 1.5 : 0.3}
            />
          </Cylinder>
        </group>

        {/* Quality Inspection Button */}
        <group position={[-0.6, 0, 0]}>
          <Cylinder 
            args={[0.1, 0.1, 0.05]} 
            position={[0, 0, 0]}
            onClick={() => onSystemToggle && onSystemToggle('qualityInspection')}
            onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
          >
            <meshStandardMaterial 
              color={qualityInspection ? "#3b82f6" : "#6b7280"}
              emissive={qualityInspection ? "#3b82f6" : "#374151"}
              emissiveIntensity={qualityInspection ? 1.5 : 0.3}
            />
          </Cylinder>
        </group>

        {/* Packaging Button */}
        <group position={[0, 0, 0]}>
          <Cylinder 
            args={[0.1, 0.1, 0.05]} 
            position={[0, 0, 0]}
            onClick={() => onSystemToggle && onSystemToggle('packaging')}
            onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
          >
            <meshStandardMaterial 
              color={packaging ? "#8b5cf6" : "#6b7280"}
              emissive={packaging ? "#8b5cf6" : "#374151"}
              emissiveIntensity={packaging ? 1.5 : 0.3}
            />
          </Cylinder>
        </group>

        {/* Robots Button */}
        <group position={[0.6, 0, 0]}>
          <Cylinder 
            args={[0.1, 0.1, 0.05]} 
            position={[0, 0, 0]}
            onClick={() => onSystemToggle && onSystemToggle('robots')}
            onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
          >
            <meshStandardMaterial 
              color={robots ? "#f59e0b" : "#6b7280"}
              emissive={robots ? "#f59e0b" : "#374151"}
              emissiveIntensity={robots ? 1.5 : 0.3}
            />
          </Cylinder>
        </group>

        {/* AGV Button */}
        <group position={[1.2, 0, 0]}>
          <Cylinder 
            args={[0.1, 0.1, 0.05]} 
            position={[0, 0, 0]}
            onClick={() => onSystemToggle && onSystemToggle('agv')}
            onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerLeave={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; }}
          >
            <meshStandardMaterial 
              color={agv ? "#ec4899" : "#6b7280"}
              emissive={agv ? "#ec4899" : "#374151"}
              emissiveIntensity={agv ? 1.5 : 0.3}
            />
          </Cylinder>
        </group>
      </group>

      {/* Status Indicators */}
      <group position={[0, 2.8, -1.4]}>
        <Sphere args={[0.08]} position={[-0.6, 0, 0]}>
          <meshStandardMaterial 
            color={assemblyLine || qualityInspection || packaging || robots || agv ? "#10b981" : "#ef4444"}
            emissive={assemblyLine || qualityInspection || packaging || robots || agv ? "#10b981" : "#ef4444"}
            emissiveIntensity={2}
          />
        </Sphere>
        <Sphere args={[0.08]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={1}
          />
        </Sphere>
        <Sphere args={[0.08]} position={[0.6, 0, 0]}>
          <meshStandardMaterial 
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={1}
          />
        </Sphere>
      </group>

      {/* Keyboard */}
      <Box args={[1.2, 0.05, 0.4]} position={[0, 1.32, 0.3]}>
        <meshStandardMaterial 
          color="#1f2937"
          metalness={0.7}
          roughness={0.4}
        />
      </Box>

      {/* Mouse */}
      <Box args={[0.08, 0.03, 0.12]} position={[0.7, 1.33, 0.3]}>
        <meshStandardMaterial 
          color="#374151"
          metalness={0.6}
          roughness={0.4}
        />
      </Box>

      {/* Control Center Lighting */}
      <pointLight
        position={[0, 2.5, 0]}
        intensity={0.5}
        distance={5}
        color="#00ffff"
      />

      {/* Status Display HTML */}
      <Html position={[0, 4, 0]} center>
        <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl p-4 min-w-[280px]">
          <h3 className="text-white font-semibold text-center mb-3 text-sm tracking-tight">
            Production Control Center
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 font-light">Assembly Line</span>
              <div className={`w-2.5 h-2.5 rounded-full ${assemblyLine ? 'bg-neon-green shadow-[0_0_8px_rgba(0,255,127,0.8)]' : 'bg-zinc-700'}`} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 font-light">Quality Check</span>
              <div className={`w-2.5 h-2.5 rounded-full ${qualityInspection ? 'bg-neon-cyan shadow-[0_0_8px_rgba(0,255,255,0.8)]' : 'bg-zinc-700'}`} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 font-light">Packaging</span>
              <div className={`w-2.5 h-2.5 rounded-full ${packaging ? 'bg-neon-purple shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-zinc-700'}`} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 font-light">Robots</span>
              <div className={`w-2.5 h-2.5 rounded-full ${robots ? 'bg-neon-pink shadow-[0_0_8px_rgba(255,0,127,0.8)]' : 'bg-zinc-700'}`} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 font-light">AGV System</span>
              <div className={`w-2.5 h-2.5 rounded-full ${agv ? 'bg-neon-blue shadow-[0_0_8px_rgba(0,127,255,0.8)]' : 'bg-zinc-700'}`} />
            </div>
            <div className="border-t border-zinc-800 pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 font-light">Production Rate</span>
                <span className="text-neon-cyan font-medium">
                  {[assemblyLine, qualityInspection, packaging, robots, agv].filter(Boolean).length * 20}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

export default ControlCenter;
