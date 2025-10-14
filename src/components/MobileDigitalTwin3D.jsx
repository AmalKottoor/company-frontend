import { Suspense, useState, useEffect, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Html, Text, Environment, Grid } from '@react-three/drei';
import ConveyorSystem from './digital-twin/ConveyorSystem';
import PickPlaceRobot from './digital-twin/PickPlaceRobot';
import IndustrialSilo from './digital-twin/IndustrialSilo';
import IndustrialBoiler from './digital-twin/IndustrialBoiler';
import StorageTank from './digital-twin/StorageTank';

/**
 * Mobile-Optimized Production Plant Scene
 * Lightweight version with reduced complexity for mobile devices
 */
const MobileProductionPlantScene = () => {
  const [systemStatus, setSystemStatus] = useState({
    conveyor: false,
    pickPlace: false,
    silo: false,
    boiler: false,
    tank: false
  });

  const [metrics, setMetrics] = useState({
    itemsProduced: 0,
    itemsProcessed: 0,
    siloFillLevel: 0.7,
    boilerTemp: 150,
    tankFillLevel: 0.6
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        itemsProduced: systemStatus.conveyor ? prev.itemsProduced + 1 : prev.itemsProduced,
        itemsProcessed: systemStatus.pickPlace ? prev.itemsProcessed + 1 : prev.itemsProcessed,
        siloFillLevel: systemStatus.silo ? Math.max(prev.siloFillLevel - 0.001, 0.1) : prev.siloFillLevel,
        boilerTemp: systemStatus.boiler ? Math.min(prev.boilerTemp + 1, 200) : Math.max(prev.boilerTemp - 0.5, 25),
        tankFillLevel: systemStatus.tank ? Math.min(prev.tankFillLevel + 0.001, 0.95) : prev.tankFillLevel
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [systemStatus]);

  const toggleSystem = useCallback((system) => {
    setSystemStatus(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  }, []);

  return (
    <>
      {/* Simplified Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[20, 30, 15]} intensity={1.5} />
      
      {/* Environment */}
      <Environment preset="warehouse" />
      
      {/* Factory Floor - Smaller */}
      <Box args={[50, 0.4, 40]} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.4} roughness={0.7} />
      </Box>
      
      {/* Simplified Grid */}
      <Grid
        args={[50, 40]}
        position={[0, 0.01, 0]}
        cellSize={2}
        cellThickness={0.5}
        cellColor="#00ffff"
        sectionSize={10}
        sectionThickness={1}
        sectionColor="#a855f7"
        fadeDistance={40}
        fadeStrength={1}
        infiniteGrid={false}
      />

      {/* Core Production Components - Reduced Count */}
      <ConveyorSystem 
        position={[-10, 0, -5]} 
        isRunning={systemStatus.conveyor}
        speed={0.03}
        itemsProduced={metrics.itemsProduced}
      />

      <PickPlaceRobot 
        position={[5, 0, -5]} 
        isActive={systemStatus.pickPlace}
        itemsProcessed={metrics.itemsProcessed}
      />

      {/* Single Silo */}
      <IndustrialSilo
        position={[-15, 0, 8]}
        isActive={systemStatus.silo}
        fillLevel={metrics.siloFillLevel}
        material="Material"
        capacity="300T"
        height={10}
        radius={2.5}
      />

      {/* Single Boiler */}
      <IndustrialBoiler
        position={[10, 0, 10]}
        isActive={systemStatus.boiler}
        temperature={metrics.boilerTemp}
        pressure={12}
        steamOutput={0.6}
      />

      {/* Single Tank */}
      <StorageTank
        position={[-15, 0, -12]}
        isActive={systemStatus.tank}
        fillLevel={metrics.tankFillLevel}
        liquidType="Water"
        capacity="50m³"
        height={6}
        radius={2}
        liquidColor="#3b82f6"
      />

      {/* Simplified Control Panel */}
      <group position={[0, 0, 15]}>
        <Box args={[8, 3, 0.3]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
        </Box>
        
        <Html position={[0, 1.5, 0.2]} center>
          <div className="bg-black/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 text-white" style={{ width: '280px' }}>
            <h3 className="text-sm font-bold text-cyan-400 mb-2">Mobile Controls</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => toggleSystem('conveyor')}
                className={`px-2 py-1 rounded ${systemStatus.conveyor ? 'bg-green-500/30 border-green-500' : 'bg-zinc-800 border-zinc-600'} border`}
              >
                Conveyor
              </button>
              <button 
                onClick={() => toggleSystem('pickPlace')}
                className={`px-2 py-1 rounded ${systemStatus.pickPlace ? 'bg-green-500/30 border-green-500' : 'bg-zinc-800 border-zinc-600'} border`}
              >
                Robot
              </button>
              <button 
                onClick={() => toggleSystem('silo')}
                className={`px-2 py-1 rounded ${systemStatus.silo ? 'bg-green-500/30 border-green-500' : 'bg-zinc-800 border-zinc-600'} border`}
              >
                Silo
              </button>
              <button 
                onClick={() => toggleSystem('boiler')}
                className={`px-2 py-1 rounded ${systemStatus.boiler ? 'bg-green-500/30 border-green-500' : 'bg-zinc-800 border-zinc-600'} border`}
              >
                Boiler
              </button>
            </div>
            <div className="mt-2 pt-2 border-t border-zinc-700 text-xs text-zinc-400">
              <div>Produced: {metrics.itemsProduced}</div>
              <div>Temp: {metrics.boilerTemp.toFixed(0)}°C</div>
            </div>
          </div>
        </Html>
      </group>

      {/* Simplified Barriers */}
      {[-22, 22].map((x, index) => (
        <Box key={`barrier-x-${index}`} args={[0.2, 2, 40]} position={[x, 1, 0]}>
          <meshStandardMaterial 
            color="#fbbf24" 
            transparent 
            opacity={0.3}
            emissive="#fbbf24"
            emissiveIntensity={0.2}
          />
        </Box>
      ))}

      {/* Title */}
      <Text
        position={[0, 8, -18]}
        fontSize={1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        Production Plant (Mobile)
      </Text>

      {/* Optimized Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={15}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 6}
        target={[0, 2, 0]}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        makeDefault
      />
    </>
  );
};

// Loading Component
const SceneLoader = () => (
  <Html center>
    <div className="flex items-center space-x-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-xl p-3 text-white">
      <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm font-medium">Loading...</span>
    </div>
  </Html>
);

// Main Mobile Digital Twin Component
const MobileDigitalTwin3D = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-800/50">
        <div className="flex flex-col items-center space-y-3 text-white">
          <div className="w-10 h-10 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading Mobile View...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-[400px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800/50 shadow-xl">
      <Canvas
        camera={{ position: [30, 20, 30], fov: 65 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: false,
          alpha: false,
          powerPreference: "low-power",
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true
        }}
        frameloop="demand"
      >
        <Suspense fallback={<SceneLoader />}>
          <MobileProductionPlantScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MobileDigitalTwin3D;
