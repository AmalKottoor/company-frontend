import { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Html, Text, Environment, Grid } from '@react-three/drei';
import ConveyorSystem from './digital-twin/ConveyorSystem';
import PickPlaceRobot from './digital-twin/PickPlaceRobot';
import QualityInspection from './digital-twin/QualityInspection';
import InventoryStorage from './digital-twin/InventoryStorage';
import AGVDelivery from './digital-twin/AGVDelivery';
import MetricsDashboard from './digital-twin/MetricsDashboard';
import MasterControlPanel from './digital-twin/MasterControlPanel';

/**
 * Production Plant Scene Component
 * Integrated modular production plant with multiple stations
 */

const ProductionPlantScene = () => {
  // System Status
  const [systemStatus, setSystemStatus] = useState({
    conveyor: false,
    pickPlace: false,
    qualityCheck: false,
    inventory: false,
    agv: false,
    emergencyStop: false
  });

  // Production Metrics
  const [metrics, setMetrics] = useState({
    itemsProduced: 0,
    itemsProcessed: 0,
    storedItems: 0,
    deliveriesCompleted: 0,
    defects: 0,
    uptime: 0,
    downtime: 0
  });

  // Calculate OEE metrics
  const [oeeMetrics, setOeeMetrics] = useState({
    oee: 0,
    availability: 0,
    performance: 0,
    quality: 0
  });

  // Update metrics based on system activity
  useEffect(() => {
    if (systemStatus.emergencyStop) {
      return;
    }

    const interval = setInterval(() => {
      setMetrics(prev => {
        const newMetrics = { ...prev };
        
        // Increment counters based on active systems
        if (systemStatus.conveyor) {
          newMetrics.itemsProduced += 1;
        }
        if (systemStatus.pickPlace) {
          newMetrics.itemsProcessed += 1;
        }
        if (systemStatus.agv && systemStatus.inventory) {
          if (Math.random() > 0.7) {
            newMetrics.storedItems = Math.min(newMetrics.storedItems + 1, 48);
            newMetrics.deliveriesCompleted += 1;
          }
        }
        if (systemStatus.qualityCheck && Math.random() > 0.95) {
          newMetrics.defects += 1;
        }

        return newMetrics;
      });

      // Update uptime/downtime
      const activeSystemsCount = Object.values(systemStatus).filter(Boolean).length;
      setMetrics(prev => ({
        ...prev,
        uptime: prev.uptime + (activeSystemsCount > 0 ? 0.001 : 0),
        downtime: prev.downtime + (activeSystemsCount === 0 ? 0.001 : 0)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [systemStatus]);

  // Calculate OEE
  useEffect(() => {
    const totalTime = metrics.uptime + metrics.downtime;
    const availability = totalTime > 0 ? (metrics.uptime / totalTime) * 100 : 0;
    
    const idealCycleTime = 1; // items per second
    const actualCycleTime = metrics.uptime > 0 ? metrics.itemsProduced / (metrics.uptime * 1000) : 0;
    const performance = idealCycleTime > 0 ? Math.min((actualCycleTime / idealCycleTime) * 100, 100) : 0;
    
    const quality = metrics.itemsProduced > 0 
      ? ((metrics.itemsProduced - metrics.defects) / metrics.itemsProduced) * 100 
      : 100;
    
    const oee = (availability * performance * quality) / 10000;

    setOeeMetrics({
      oee: Math.min(oee, 100),
      availability: Math.min(availability, 100),
      performance: Math.min(performance, 100),
      quality: Math.min(quality, 100)
    });
  }, [metrics]);

  const handleSystemToggle = useCallback((system) => {
    if (systemStatus.emergencyStop && system !== 'emergencyStop') {
      return; // Can't toggle systems during emergency stop
    }

    if (system === 'all') {
      const allActive = Object.values(systemStatus).every(v => v);
      setSystemStatus({
        conveyor: !allActive,
        pickPlace: !allActive,
        qualityCheck: !allActive,
        inventory: !allActive,
        agv: !allActive,
        emergencyStop: false
      });
    } else {
      setSystemStatus(prev => ({
        ...prev,
        [system]: !prev[system]
      }));
    }
  }, [systemStatus]);

  const handleEmergencyStop = useCallback(() => {
    setSystemStatus({
      conveyor: false,
      pickPlace: false,
      qualityCheck: false,
      inventory: false,
      agv: false,
      emergencyStop: !systemStatus.emergencyStop
    });
  }, [systemStatus.emergencyStop]);

  const handleResetAll = useCallback(() => {
    setSystemStatus({
      conveyor: false,
      pickPlace: false,
      qualityCheck: false,
      inventory: false,
      agv: false,
      emergencyStop: false
    });
    setMetrics({
      itemsProduced: 0,
      itemsProcessed: 0,
      storedItems: 0,
      deliveriesCompleted: 0,
      defects: 0,
      uptime: 0,
      downtime: 0
    });
  }, []);

  const handleItemReachEnd = useCallback((item) => {
    // Item reached end of conveyor
    console.log('Item reached end:', item);
  }, []);

  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[25, 35, 15]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-25, 25, -15]} intensity={0.8} />
      <pointLight position={[0, 20, 0]} intensity={0.5} color="#00ffff" />
      
      {/* Environment */}
      <Environment preset="warehouse" />
      
      {/* Factory Floor */}
      <Box args={[80, 0.4, 60]} position={[0, -0.2, 0]}>
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.4}
          roughness={0.7}
        />
      </Box>
      
      {/* Floor Grid Lines */}
      <Grid
        args={[80, 60]}
        position={[0, 0.01, 0]}
        cellSize={2}
        cellThickness={0.6}
        cellColor="#00ffff"
        sectionSize={10}
        sectionThickness={1.2}
        sectionColor="#a855f7"
        fadeDistance={60}
        fadeStrength={1}
        infiniteGrid={false}
      />

      {/* Conveyor System */}
      <ConveyorSystem 
        position={[-10, 0, -10]} 
        isRunning={systemStatus.conveyor}
        speed={0.03}
        onItemReachEnd={handleItemReachEnd}
        itemsProduced={metrics.itemsProduced}
      />

      {/* Pick & Place Robot */}
      <PickPlaceRobot 
        position={[8, 0, -10]} 
        isActive={systemStatus.pickPlace}
        itemsProcessed={metrics.itemsProcessed}
      />

      {/* Quality Inspection Station */}
      <QualityInspection 
        position={[18, 0, -10]} 
        isActive={systemStatus.qualityCheck}
      />

      {/* Inventory Storage */}
      <InventoryStorage 
        position={[15, 0, 8]} 
        isActive={systemStatus.inventory}
        storedItems={metrics.storedItems}
        capacity={48}
      />

      {/* AGV Delivery System */}
      <AGVDelivery 
        position={[0, 0, 0]} 
        isActive={systemStatus.agv}
        deliveriesCompleted={metrics.deliveriesCompleted}
      />

      {/* Master Control Panel */}
      <MasterControlPanel 
        position={[-20, 0, 18]} 
        systemStatus={systemStatus}
        onSystemToggle={handleSystemToggle}
        onEmergencyStop={handleEmergencyStop}
        onResetAll={handleResetAll}
      />

      {/* Metrics Dashboard */}
      <MetricsDashboard 
        position={[20, 0, 18]} 
        metrics={{
          ...oeeMetrics,
          itemsProduced: metrics.itemsProduced,
          itemsProcessed: metrics.itemsProcessed,
          defects: metrics.defects,
          uptime: parseFloat(metrics.uptime.toFixed(2)),
          downtime: parseFloat(metrics.downtime.toFixed(2))
        }}
      />

      {/* Safety Barriers */}
      {[-35, 35].map((x, index) => (
        <Box key={`barrier-x-${index}`} args={[0.2, 3, 60]} position={[x, 1.5, 0]}>
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.7}
            roughness={0.3}
            transparent 
            opacity={0.5}
            emissive="#fbbf24"
            emissiveIntensity={0.3}
          />
        </Box>
      ))}
      {[-25, 25].map((z, index) => (
        <Box key={`barrier-z-${index}`} args={[80, 3, 0.2]} position={[0, 1.5, z]}>
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.7}
            roughness={0.3}
            transparent 
            opacity={0.5}
            emissive="#fbbf24"
            emissiveIntensity={0.3}
          />
        </Box>
      ))}

      {/* Overhead Lighting Rigs */}
      {[-20, -10, 0, 10, 20].map((x, index) => (
        <group key={`light-rig-${index}`} position={[x, 10, 0]}>
          <Box args={[2.5, 0.4, 50]}>
            <meshStandardMaterial 
              color="#374151" 
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
          {/* Light Fixtures */}
          {[-20, -10, 0, 10, 20].map((z, lightIndex) => (
            <group key={`light-${lightIndex}`} position={[0, -0.6, z]}>
              <Box args={[1, 0.4, 1]}>
                <meshStandardMaterial 
                  color="#1f2937"
                  metalness={0.7}
                  roughness={0.3}
                />
              </Box>
              <pointLight
                position={[0, -0.4, 0]}
                intensity={0.6}
                distance={12}
                color="#ffffff"
              />
            </group>
          ))}
        </group>
      ))}

      {/* Plant Title */}
      <Text
        position={[0, 12, -25]}
        fontSize={1.5}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.08}
        outlineColor="#000000"
      >
        Mid-Scale Production Plant
      </Text>

      <Text
        position={[0, 10, -25]}
        fontSize={0.6}
        color="#a855f7"
        anchorX="center"
        anchorY="middle"
      >
        Digital Twin Simulation System
      </Text>
      
      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 6}
        target={[0, 3, 0]}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};

// Loading Component
const SceneLoader = () => (
  <Html center>
    <div className="flex items-center space-x-3 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl p-5 text-white">
      <div className="w-8 h-8 border-3 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
      <span className="font-medium">Loading Production Plant...</span>
    </div>
  </Html>
);

// Main Digital Twin Component
const DigitalTwin3D = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-zinc-950 rounded-3xl border border-zinc-800/50">
        <div className="flex flex-col items-center space-y-4 text-white">
          <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">Initializing Production Plant...</span>
          <span className="text-sm text-zinc-500 font-light">Loading 3D Assets & Systems</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[700px] bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl" data-testid="digital-twin-canvas">
      <Canvas
        camera={{ position: [35, 20, 35], fov: 55 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
      >
        <Suspense fallback={<SceneLoader />}>
          <ProductionPlantScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DigitalTwin3D;
