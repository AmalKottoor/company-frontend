import { Box, Text, Html } from '@react-three/drei';
import { useState } from 'react';

/**
 * Monitoring Room Component
 * Displays comprehensive metrics and OEE data
 */
const MonitoringRoom = ({ 
  position = [0, 0, 0],
  metrics = {},
  oeeMetrics = {},
  envMetrics = {}
}) => {
  const [showMetrics, setShowMetrics] = useState(false);

  return (
    <group position={position}>
      {/* Building Structure */}
      <Box args={[18, 0.3, 14]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.8} />
      </Box>

      {/* Walls - Semi-transparent */}
      <Box args={[18, 8, 0.3]} position={[0, 4, -7]}>
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.6} transparent opacity={0.2} />
      </Box>
      <Box args={[18, 8, 0.3]} position={[0, 4, 7]}>
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.6} transparent opacity={0.2} />
      </Box>
      <Box args={[0.3, 8, 14]} position={[-9, 4, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.6} transparent opacity={0.2} />
      </Box>
      <Box args={[0.3, 8, 14]} position={[9, 4, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.6} transparent opacity={0.2} />
      </Box>

      {/* Roof */}
      <Box args={[18.5, 0.3, 14.5]} position={[0, 8.15, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.4} />
      </Box>

      {/* Glass Front */}
      <Box args={[15, 6, 0.2]} position={[0, 4, -7.1]}>
        <meshStandardMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </Box>

      {/* Label */}
      <Text
        position={[0, 9, 0]}
        fontSize={0.8}
        color="#a855f7"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        Monitoring & Analytics
      </Text>

      {/* Interactive Dashboard */}
      <group position={[0, 3.5, -6.5]} onClick={() => setShowMetrics(!showMetrics)}>
        {/* Glowing border to indicate clickable */}
        <Box args={[12.2, 5.2, 0.2]} position={[0, 0, -0.1]}>
          <meshStandardMaterial 
            color="#a855f7" 
            emissive="#a855f7"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </Box>
        
        <Box args={[12, 5, 0.3]}>
          <meshStandardMaterial 
            color="#1f2937" 
            metalness={0.7} 
            roughness={0.3}
            emissive="#a855f7"
            emissiveIntensity={0.2}
          />
        </Box>
        
        {/* Click instruction */}
        {!showMetrics && (
          <Text
            position={[0, 3, 0.2]}
            fontSize={0.4}
            color="#a855f7"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            🖱️ CLICK TO VIEW METRICS
          </Text>
        )}

        {showMetrics && (
          <Html position={[0, 0, 0.5]} center distanceFactor={10}>
            <div className="bg-zinc-900/98 backdrop-blur-xl border-2 border-purple-500 rounded-3xl p-8 shadow-2xl" style={{ width: '700px', maxHeight: '80vh', overflowY: 'auto' }}>
              <h3 className="text-3xl font-bold text-purple-400 mb-6 flex items-center gap-3">
                <span className="w-5 h-5 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></span>
                Production Analytics Dashboard
              </h3>

              {/* OEE Metrics */}
              <div className="mb-6 p-6 bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-2xl border-2 border-purple-500/50 shadow-lg">
                <h4 className="text-lg font-bold text-purple-300 mb-4">Overall Equipment Effectiveness (OEE)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-zinc-800/70 rounded-xl border border-purple-500/30">
                    <div className="text-4xl font-bold text-purple-400 mb-2">{(oeeMetrics.oee || 0).toFixed(1)}%</div>
                    <div className="text-sm text-zinc-300 font-semibold">OEE Score</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-800/70 rounded-xl border border-green-500/30">
                    <div className="text-4xl font-bold text-green-400 mb-2">{(oeeMetrics.availability || 0).toFixed(1)}%</div>
                    <div className="text-sm text-zinc-300 font-semibold">Availability</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-800/70 rounded-xl border border-blue-500/30">
                    <div className="text-4xl font-bold text-blue-400 mb-2">{(oeeMetrics.performance || 0).toFixed(1)}%</div>
                    <div className="text-sm text-zinc-300 font-semibold">Performance</div>
                  </div>
                  <div className="text-center p-4 bg-zinc-800/70 rounded-xl border border-cyan-500/30">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">{(oeeMetrics.quality || 0).toFixed(1)}%</div>
                    <div className="text-sm text-zinc-300 font-semibold">Quality</div>
                  </div>
                </div>
              </div>

              {/* Production Metrics */}
              <div className="mb-6 p-6 bg-zinc-800/40 rounded-2xl border-2 border-cyan-500/30 shadow-lg">
                <h4 className="text-lg font-bold text-cyan-300 mb-4">Production Metrics</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between p-3 bg-zinc-900/70 rounded-lg border border-zinc-700">
                    <span className="text-zinc-300 font-medium">Items Produced:</span>
                    <span className="text-white font-bold text-lg">{metrics.itemsProduced || 0}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Items Processed:</span>
                    <span className="text-white font-semibold">{metrics.itemsProcessed || 0}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Throughput:</span>
                    <span className="text-white font-semibold">{(metrics.throughput || 0).toFixed(1)}/min</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Cycle Time:</span>
                    <span className="text-white font-semibold">{(metrics.cycleTime || 0).toFixed(1)}s</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Defects:</span>
                    <span className="text-red-400 font-semibold">{metrics.defects || 0}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Scrap Rate:</span>
                    <span className="text-red-400 font-semibold">{(metrics.scrapRate || 0).toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              {/* Reliability Metrics */}
              <div className="mb-6 p-6 bg-zinc-800/40 rounded-2xl border-2 border-yellow-500/30 shadow-lg">
                <h4 className="text-lg font-bold text-yellow-300 mb-4">Reliability Metrics</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">MTBF:</span>
                    <span className="text-white font-semibold">{(metrics.mtbf || 0).toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">MTTR:</span>
                    <span className="text-white font-semibold">{(metrics.mttr || 0).toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Uptime:</span>
                    <span className="text-green-400 font-semibold">{(metrics.uptime || 0).toFixed(2)}h</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Downtime:</span>
                    <span className="text-red-400 font-semibold">{(metrics.downtime || 0).toFixed(2)}h</span>
                  </div>
                </div>
              </div>

              {/* Resource Consumption */}
              <div className="mb-6 p-6 bg-zinc-800/40 rounded-2xl border-2 border-orange-500/30 shadow-lg">
                <h4 className="text-lg font-bold text-orange-300 mb-4">Resource Consumption</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Energy:</span>
                    <span className="text-white font-semibold">{(metrics.energyConsumption || 0).toFixed(1)} kWh</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Water:</span>
                    <span className="text-white font-semibold">{(metrics.waterUsage || 0).toFixed(1)} L</span>
                  </div>
                </div>
              </div>

              {/* Environmental Status */}
              <div className="p-6 bg-zinc-800/40 rounded-2xl border-2 border-green-500/30 shadow-lg">
                <h4 className="text-lg font-bold text-green-300 mb-4">Environmental Status</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Boiler Temp:</span>
                    <span className="text-orange-400 font-semibold">{envMetrics.boilerTemp || 0}°C</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Cooling Water:</span>
                    <span className="text-blue-400 font-semibold">{envMetrics.coolingWaterTemp || 0}°C</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-900/50 rounded">
                    <span className="text-zinc-400">Avg Silo Fill:</span>
                    <span className="text-cyan-400 font-semibold">
                      {((envMetrics.siloFillLevels?.reduce((a, b) => a + b, 0) / (envMetrics.siloFillLevels?.length || 1)) * 100 || 0).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-zinc-400 text-center font-semibold">
                📊 Real-time data • Updates every second
              </div>
            </div>
          </Html>
        )}
      </group>

      {/* Screens/Monitors on wall */}
      {[-4, 0, 4].map((x, i) => (
        <Box key={`screen-${i}`} args={[2.5, 1.5, 0.1]} position={[x, 5, -6.9]}>
          <meshStandardMaterial 
            color="#000000"
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </Box>
      ))}
    </group>
  );
};

export default MonitoringRoom;
