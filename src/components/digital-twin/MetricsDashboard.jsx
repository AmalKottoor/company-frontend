import { Html } from '@react-three/drei';
import { Box, Cylinder } from '@react-three/drei';
import { useEffect, useState } from 'react';

/**
 * Metrics Dashboard Component
 * Displays OEE and other performance metrics
 */
const MetricsDashboard = ({ 
  position = [0, 0, 0],
  metrics = {
    oee: 0,
    availability: 0,
    performance: 0,
    quality: 0,
    itemsProduced: 0,
    itemsProcessed: 0,
    defects: 0,
    uptime: 0,
    downtime: 0
  }
}) => {
  const [displayMetrics, setDisplayMetrics] = useState(metrics);

  useEffect(() => {
    // Smooth transition for metrics
    const interval = setInterval(() => {
      setDisplayMetrics(prev => ({
        oee: prev.oee + (metrics.oee - prev.oee) * 0.1,
        availability: prev.availability + (metrics.availability - prev.availability) * 0.1,
        performance: prev.performance + (metrics.performance - prev.performance) * 0.1,
        quality: prev.quality + (metrics.quality - prev.quality) * 0.1,
        itemsProduced: metrics.itemsProduced,
        itemsProcessed: metrics.itemsProcessed,
        defects: metrics.defects,
        uptime: metrics.uptime,
        downtime: metrics.downtime
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [metrics]);

  const getOEEColor = (value) => {
    if (value >= 85) return 'text-neon-green';
    if (value >= 60) return 'text-neon-cyan';
    if (value >= 40) return 'text-neon-pink';
    return 'text-red-500';
  };

  const getOEEStatus = (value) => {
    if (value >= 85) return 'World Class';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <group position={position}>
      {/* Dashboard Structure */}
      <Box args={[6, 4, 0.2]} position={[0, 2, 0]}>
        <meshStandardMaterial 
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Frame */}
      <Box args={[6.2, 4.2, 0.15]} position={[0, 2, -0.1]}>
        <meshStandardMaterial 
          color="#374151"
          metalness={0.7}
          roughness={0.3}
        />
      </Box>

      {/* Support Stand */}
      <Cylinder args={[0.15, 0.15, 2]} position={[0, 1, 0]}>
        <meshStandardMaterial 
          color="#4b5563"
          metalness={0.7}
          roughness={0.3}
        />
      </Cylinder>

      {/* Base */}
      <Cylinder args={[0.5, 0.6, 0.2]} position={[0, 0.1, 0]}>
        <meshStandardMaterial 
          color="#1f2937"
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>

      {/* Dashboard Display */}
      <Html position={[0, 2, 0.15]} center transform distanceFactor={6}>
        <div className="bg-zinc-950/98 backdrop-blur-xl border-2 border-zinc-800 rounded-2xl p-6 w-[480px]">
          {/* Header */}
          <div className="text-center mb-4 pb-3 border-b border-zinc-800">
            <h2 className="text-white text-xl font-semibold tracking-tight mb-1">
              Plant Performance Dashboard
            </h2>
            <p className="text-zinc-500 text-xs font-light">Real-time OEE & Metrics Analysis</p>
          </div>

          {/* OEE Main Display */}
          <div className="bg-zinc-900/80 rounded-xl p-4 mb-4 border border-zinc-800">
            <div className="text-center">
              <div className="text-zinc-400 text-xs font-medium mb-2">Overall Equipment Effectiveness</div>
              <div className={`text-5xl font-bold mb-2 ${getOEEColor(displayMetrics.oee)}`}>
                {displayMetrics.oee.toFixed(1)}%
              </div>
              <div className={`text-sm font-medium ${getOEEColor(displayMetrics.oee)}`}>
                {getOEEStatus(displayMetrics.oee)}
              </div>
              {/* OEE Progress Bar */}
              <div className="mt-3 w-full bg-zinc-800 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    displayMetrics.oee >= 85 ? 'bg-gradient-to-r from-neon-green to-neon-cyan' :
                    displayMetrics.oee >= 60 ? 'bg-gradient-to-r from-neon-cyan to-neon-blue' :
                    displayMetrics.oee >= 40 ? 'bg-gradient-to-r from-neon-pink to-neon-purple' :
                    'bg-gradient-to-r from-red-500 to-red-700'
                  }`}
                  style={{ width: `${Math.min(displayMetrics.oee, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* OEE Components */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Availability */}
            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800">
              <div className="text-zinc-400 text-[10px] font-medium mb-1">AVAILABILITY</div>
              <div className="text-neon-cyan text-2xl font-bold mb-1">
                {displayMetrics.availability.toFixed(1)}%
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5">
                <div 
                  className="bg-neon-cyan h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${displayMetrics.availability}%` }}
                />
              </div>
            </div>

            {/* Performance */}
            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800">
              <div className="text-zinc-400 text-[10px] font-medium mb-1">PERFORMANCE</div>
              <div className="text-neon-purple text-2xl font-bold mb-1">
                {displayMetrics.performance.toFixed(1)}%
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5">
                <div 
                  className="bg-neon-purple h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${displayMetrics.performance}%` }}
                />
              </div>
            </div>

            {/* Quality */}
            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800">
              <div className="text-zinc-400 text-[10px] font-medium mb-1">QUALITY</div>
              <div className="text-neon-green text-2xl font-bold mb-1">
                {displayMetrics.quality.toFixed(1)}%
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5">
                <div 
                  className="bg-neon-green h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${displayMetrics.quality}%` }}
                />
              </div>
            </div>
          </div>

          {/* Production Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-xs font-light">Items Produced</span>
                  <span className="text-white text-lg font-semibold">{displayMetrics.itemsProduced}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-xs font-light">Items Processed</span>
                  <span className="text-neon-cyan text-lg font-semibold">{displayMetrics.itemsProcessed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-xs font-light">Defects</span>
                  <span className="text-neon-pink text-lg font-semibold">{displayMetrics.defects}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-xs font-light">Uptime</span>
                  <span className="text-neon-green text-lg font-semibold">{displayMetrics.uptime}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-xs font-light">Downtime</span>
                  <span className="text-red-400 text-lg font-semibold">{displayMetrics.downtime}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-xs font-light">Efficiency</span>
                  <span className="text-neon-purple text-lg font-semibold">
                    {displayMetrics.uptime > 0 ? 
                      ((displayMetrics.uptime / (displayMetrics.uptime + displayMetrics.downtime)) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,127,0.8)]" />
            <span className="text-zinc-400 text-xs font-light">Live Data Stream Active</span>
          </div>
        </div>
      </Html>

      {/* Ambient Glow */}
      <pointLight
        position={[0, 2, 0.5]}
        intensity={0.5}
        distance={5}
        color="#00ffff"
      />
    </group>
  );
};

export default MetricsDashboard;
