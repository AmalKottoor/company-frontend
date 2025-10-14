import { Suspense, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Html, Text, Environment, Grid, Sky } from '@react-three/drei';
import * as THREE from 'three';
import ConveyorSystem from './digital-twin/ConveyorSystem';
import PickPlaceRobot from './digital-twin/PickPlaceRobot';
import QualityInspection from './digital-twin/QualityInspection';
import InventoryStorage from './digital-twin/InventoryStorage';
import AGVDelivery from './digital-twin/AGVDelivery';
import IndustrialSilo from './digital-twin/IndustrialSilo';
import IndustrialBoiler from './digital-twin/IndustrialBoiler';
import CoolingTower from './digital-twin/CoolingTower';
import StorageTank from './digital-twin/StorageTank';
import ProductionBuilding from './digital-twin/ProductionBuilding';
import ControlRoom from './digital-twin/ControlRoom';
import MonitoringRoom from './digital-twin/MonitoringRoom';
import InteractiveComponent from './digital-twin/InteractiveComponent';
import CameraPresets from './digital-twin/CameraPresets';
import ComponentSelector from './digital-twin/ComponentSelector';

// Device detection utility
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

/**
 * Advanced Production Plant Scene Component
 * Large-scale industrial facility with comprehensive equipment
 */
const AdvancedProductionPlantScene = ({ 
  controlsRef, 
  selectedComponent, 
  setSelectedComponent,
  setComponentList 
}) => {
  const mobile = useMemo(() => isMobile(), []);
  
  // Control Mode
  const [controlMode, setControlMode] = useState('auto'); // 'auto' or 'manual';
  
  // System Status
  const [systemStatus, setSystemStatus] = useState({
    conveyor: false,
    pickPlace: false,
    qualityCheck: false,
    inventory: false,
    agv: false,
    silos: false,
    boiler: false,
    cooling: false,
    tanks: false,
    emergencyStop: false
  });

  // Component List for selector
  const componentListData = useMemo(() => [
    { name: 'Conveyor System', type: 'Production Line', category: 'production', status: systemStatus.conveyor ? 'Operational' : 'Stopped', icon: '🔄' },
    { name: 'Pick & Place Robot', type: 'Robotic Arm', category: 'production', status: systemStatus.pickPlace ? 'Operational' : 'Stopped', icon: '🤖' },
    { name: 'Quality Inspection', type: 'Vision System', category: 'production', status: systemStatus.qualityCheck ? 'Operational' : 'Stopped', icon: '🔍' },
    { name: 'Inventory Storage', type: 'Warehouse', category: 'storage', status: systemStatus.inventory ? 'Operational' : 'Stopped', icon: '📦' },
    { name: 'AGV Delivery', type: 'Automated Vehicle', category: 'production', status: systemStatus.agv ? 'Operational' : 'Stopped', icon: '🚛' },
    { name: 'Grain Silo', type: 'Storage Silo', category: 'storage', status: systemStatus.silos ? 'Operational' : 'Stopped', icon: '🏗️' },
    { name: 'Powder Silo', type: 'Storage Silo', category: 'storage', status: systemStatus.silos ? 'Operational' : 'Stopped', icon: '🏗️' },
    { name: 'Pellets Silo', type: 'Storage Silo', category: 'storage', status: systemStatus.silos ? 'Operational' : 'Stopped', icon: '🏗️' },
    { name: 'Industrial Boiler', type: 'Steam Generator', category: 'utilities', status: systemStatus.boiler ? 'Operational' : 'Stopped', icon: '🔥' },
    { name: 'Cooling Tower', type: 'Heat Exchanger', category: 'utilities', status: systemStatus.cooling ? 'Operational' : 'Stopped', icon: '❄️' },
    { name: 'Water Tank', type: 'Storage Tank', category: 'storage', status: systemStatus.tanks ? 'Operational' : 'Stopped', icon: '🛢️' },
    { name: 'Chemical Tank', type: 'Storage Tank', category: 'storage', status: systemStatus.tanks ? 'Operational' : 'Stopped', icon: '🛢️' },
    { name: 'Oil Tank', type: 'Storage Tank', category: 'storage', status: systemStatus.tanks ? 'Operational' : 'Stopped', icon: '🛢️' },
    { name: 'Control Room', type: 'Operations Center', category: 'control', status: 'Operational', icon: '🎛️' },
    { name: 'Monitoring Room', type: 'Analytics Center', category: 'control', status: 'Operational', icon: '📊' },
  ], [systemStatus]);

  // Update parent component list
  useEffect(() => {
    setComponentList?.(componentListData);
  }, [componentListData, setComponentList]);

  // Production Metrics (Extended)
  const [metrics, setMetrics] = useState({
    itemsProduced: 0,
    itemsProcessed: 0,
    storedItems: 0,
    deliveriesCompleted: 0,
    defects: 0,
    uptime: 0,
    downtime: 0,
    energyConsumption: 0,
    waterUsage: 0,
    cycleTime: 0,
    throughput: 0,
    scrapRate: 0,
    mtbf: 0, // Mean Time Between Failures
    mttr: 0  // Mean Time To Repair
  });

  // Environmental Metrics
  const [envMetrics, setEnvMetrics] = useState({
    siloFillLevels: [0.75, 0.60, 0.85],
    boilerTemp: 180,
    boilerPressure: 15,
    coolingWaterTemp: 35,
    tankFillLevels: [0.6, 0.8, 0.4]
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

        // Energy and water consumption
        const activeCount = Object.values(systemStatus).filter(Boolean).length;
        newMetrics.energyConsumption += activeCount * 0.5;
        if (systemStatus.cooling || systemStatus.boiler) {
          newMetrics.waterUsage += 0.3;
        }

        return newMetrics;
      });

      // Update environmental metrics
      setEnvMetrics(prev => ({
        ...prev,
        boilerTemp: systemStatus.boiler ? Math.min(prev.boilerTemp + 2, 200) : Math.max(prev.boilerTemp - 1, 25),
        coolingWaterTemp: systemStatus.cooling ? Math.max(prev.coolingWaterTemp - 0.5, 25) : Math.min(prev.coolingWaterTemp + 0.3, 45),
        siloFillLevels: prev.siloFillLevels.map((level, i) => 
          systemStatus.silos ? Math.max(level - 0.001, 0.1) : level
        ),
        tankFillLevels: prev.tankFillLevels.map((level, i) => 
          systemStatus.tanks ? Math.min(level + 0.001, 0.95) : level
        )
      }));

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
    
    const idealCycleTime = 1;
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
      return;
    }

    if (system === 'all') {
      const allActive = Object.values(systemStatus).every(v => v);
      setSystemStatus({
        conveyor: !allActive,
        pickPlace: !allActive,
        qualityCheck: !allActive,
        inventory: !allActive,
        agv: !allActive,
        silos: !allActive,
        boiler: !allActive,
        cooling: !allActive,
        tanks: !allActive,
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
      silos: false,
      boiler: false,
      cooling: false,
      tanks: false,
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
      silos: false,
      boiler: false,
      cooling: false,
      tanks: false,
      emergencyStop: false
    });
    setMetrics({
      itemsProduced: 0,
      itemsProcessed: 0,
      storedItems: 0,
      deliveriesCompleted: 0,
      defects: 0,
      uptime: 0,
      downtime: 0,
      energyConsumption: 0,
      waterUsage: 0
    });
  }, []);

  return (
    <>
      {/* Advanced Lighting Setup */}
      <ambientLight intensity={mobile ? 0.6 : 0.5} />
      <directionalLight 
        position={[50, 60, 30]} 
        intensity={mobile ? 1.5 : 2} 
        castShadow={!mobile}
        shadow-mapSize-width={mobile ? 512 : 2048}
        shadow-mapSize-height={mobile ? 512 : 2048}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      {!mobile && <directionalLight position={[-50, 40, -30]} intensity={1} />}
      {!mobile && <pointLight position={[0, 30, 0]} intensity={0.8} color="#00ffff" distance={80} />}
      
      {/* Open Sky Environment */}
      {!mobile && <Sky 
        sunPosition={[100, 50, 100]} 
        turbidity={8}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />}
      
      {/* Natural Environment */}
      <Environment preset="city" />
      
      {/* Ground - Natural concrete/asphalt */}
      <Box args={[200, 0.2, 180]} position={[0, -0.1, 0]}>
        <meshStandardMaterial 
          color="#3a3a3a" 
          metalness={0.1}
          roughness={0.9}
        />
      </Box>
      
      {/* Road markings */}
      <Box args={[200, 0.05, 0.3]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#fbbf24" />
      </Box>
      <Box args={[0.3, 0.05, 180]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#fbbf24" />
      </Box>

      {/* ========== PRODUCTION BUILDING ========== */}
      <ProductionBuilding position={[-40, 0, -30]}>
        {/* Conveyor System */}
        <ConveyorSystem 
          position={[0, 0, 0]} 
          isRunning={systemStatus.conveyor}
          speed={0.03}
          itemsProduced={metrics.itemsProduced}
        />

        {/* Pick & Place Robot */}
        <PickPlaceRobot 
          position={[15, 0, 0]} 
          isActive={systemStatus.pickPlace}
          itemsProcessed={metrics.itemsProcessed}
        />

        {/* Quality Inspection Station */}
        <QualityInspection 
          position={[25, 0, 5]} 
          isActive={systemStatus.qualityCheck}
        />

        {/* Inventory Storage */}
        <InventoryStorage 
          position={[-10, 0, 8]} 
          isActive={systemStatus.inventory}
          storedItems={metrics.storedItems}
          capacity={48}
        />

        {/* AGV Delivery System */}
        <AGVDelivery 
          position={[0, 0, -5]} 
          isActive={systemStatus.agv}
          deliveriesCompleted={metrics.deliveriesCompleted}
        />
      </ProductionBuilding>

      {/* ========== RAW MATERIALS SECTION ========== */}
      <group position={[-50, 0, 20]}>
        {/* Silo 1 - Grain */}
        <InteractiveComponent
          name="Grain Silo"
          type="Storage Silo"
          status={systemStatus.silos ? 'Operational' : 'Stopped'}
          specs={{
            'Capacity': '500T',
            'Fill Level': `${(envMetrics.siloFillLevels[0] * 100).toFixed(0)}%`,
            'Material': 'Grain',
            'Height': '12m',
            'Diameter': '6m'
          }}
          position={[0, 0, 0]}
          onSelect={setSelectedComponent}
          isSelected={selectedComponent === 'Grain Silo'}
        >
          <IndustrialSilo
            position={[0, 0, 0]}
            isActive={systemStatus.silos}
            fillLevel={envMetrics.siloFillLevels[0]}
            material="Grain"
            capacity="500T"
            height={12}
            radius={3}
          />
        </InteractiveComponent>

        {/* Silo 2 - Powder */}
        <InteractiveComponent
          name="Powder Silo"
          type="Storage Silo"
          status={systemStatus.silos ? 'Operational' : 'Stopped'}
          specs={{
            'Capacity': '400T',
            'Fill Level': `${(envMetrics.siloFillLevels[1] * 100).toFixed(0)}%`,
            'Material': 'Powder',
            'Height': '10m',
            'Diameter': '5m'
          }}
          position={[10, 0, 0]}
          onSelect={setSelectedComponent}
          isSelected={selectedComponent === 'Powder Silo'}
        >
          <IndustrialSilo
            position={[0, 0, 0]}
            isActive={systemStatus.silos}
            fillLevel={envMetrics.siloFillLevels[1]}
            material="Powder"
            capacity="400T"
            height={10}
            radius={2.5}
          />
        </InteractiveComponent>

        {/* Silo 3 - Pellets */}
        <IndustrialSilo
          position={[20, 0, 0]}
          isActive={systemStatus.silos}
          fillLevel={envMetrics.siloFillLevels[2]}
          material="Pellets"
          capacity="600T"
          height={14}
          radius={3.5}
        />
      </group>

      {/* ========== UTILITIES SECTION ========== */}
      <group position={[40, 0, 30]}>
        {/* Industrial Boiler */}
        <IndustrialBoiler
          position={[0, 0, 0]}
          isActive={systemStatus.boiler}
          temperature={envMetrics.boilerTemp}
          pressure={envMetrics.boilerPressure}
          steamOutput={0.7}
        />

        {/* Cooling Tower */}
        <CoolingTower
          position={[20, 0, 0]}
          isActive={systemStatus.cooling}
          waterTemp={envMetrics.coolingWaterTemp}
          flowRate={85}
        />
      </group>

      {/* ========== STORAGE TANKS SECTION ========== */}
      <group position={[-50, 0, -30]}>
        {/* Water Tank */}
        <StorageTank
          position={[0, 0, 0]}
          isActive={systemStatus.tanks}
          fillLevel={envMetrics.tankFillLevels[0]}
          liquidType="Water"
          capacity="100m³"
          height={8}
          radius={2.5}
          liquidColor="#3b82f6"
        />

        {/* Chemical Tank */}
        <StorageTank
          position={[10, 0, 0]}
          isActive={systemStatus.tanks}
          fillLevel={envMetrics.tankFillLevels[1]}
          liquidType="Chemical"
          capacity="75m³"
          height={7}
          radius={2}
          liquidColor="#8b5cf6"
        />

        {/* Oil Tank */}
        <StorageTank
          position={[20, 0, 0]}
          isActive={systemStatus.tanks}
          fillLevel={envMetrics.tankFillLevels[2]}
          liquidType="Oil"
          capacity="50m³"
          height={6}
          radius={2}
          liquidColor="#f59e0b"
        />
      </group>

      {/* ========== CONTROL & MONITORING BUILDINGS ========== */}
      {/* Control Room */}
      <ControlRoom 
        position={[50, 0, -30]} 
        controlMode={controlMode}
        onModeChange={setControlMode}
        systemStatus={systemStatus}
        onSystemToggle={handleSystemToggle}
        onEmergencyStop={handleEmergencyStop}
        onResetAll={handleResetAll}
      />

      {/* Monitoring & Analytics Room */}
      <MonitoringRoom 
        position={[50, 0, 10]} 
        metrics={{
          ...metrics,
          cycleTime: metrics.uptime > 0 ? (metrics.uptime * 3600) / Math.max(metrics.itemsProduced, 1) : 0,
          throughput: metrics.uptime > 0 ? (metrics.itemsProduced / metrics.uptime) * 60 : 0,
          scrapRate: metrics.itemsProduced > 0 ? (metrics.defects / metrics.itemsProduced) * 100 : 0,
          mtbf: Math.random() * 100 + 50, // Simulated
          mttr: Math.random() * 10 + 2    // Simulated
        }}
        oeeMetrics={oeeMetrics}
        envMetrics={envMetrics}
      />

      {/* ========== SAFETY & INFRASTRUCTURE ========== */}
      {/* Perimeter Barriers */}
      {[-70, 70].map((x, index) => (
        <Box key={`barrier-x-${index}`} args={[0.3, 4, 120]} position={[x, 2, 0]}>
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.7}
            roughness={0.3}
            transparent 
            opacity={0.4}
            emissive="#fbbf24"
            emissiveIntensity={0.2}
          />
        </Box>
      ))}
      {[-55, 55].map((z, index) => (
        <Box key={`barrier-z-${index}`} args={[150, 4, 0.3]} position={[0, 2, z]}>
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={0.7}
            roughness={0.3}
            transparent 
            opacity={0.4}
            emissive="#fbbf24"
            emissiveIntensity={0.2}
          />
        </Box>
      ))}

      {/* Plant Signage */}
      <group position={[-80, 0, -50]}>
        <Box args={[0.3, 8, 12]} position={[0, 4, 0]}>
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
        </Box>
        <Text
          position={[0.5, 5, 0]}
          fontSize={1.5}
          color="#00ffff"
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.08}
          outlineColor="#000000"
        >
          INDUSTRIAL{'\n'}PRODUCTION{'\n'}FACILITY
        </Text>
      </group>

      {/* Camera Controls - Enhanced for close-up viewing */}
      <OrbitControls
        ref={controlsRef}
        enablePan={!mobile}
        enableZoom={true}
        enableRotate={true}
        minDistance={mobile ? 5 : 2}
        maxDistance={mobile ? 150 : 200}
        maxPolarAngle={Math.PI / 2.05}
        minPolarAngle={Math.PI / 12}
        target={[0, 5, 0]}
        enableDamping={!mobile}
        dampingFactor={mobile ? 0.1 : 0.05}
        rotateSpeed={mobile ? 0.6 : 1.2}
        zoomSpeed={mobile ? 0.8 : 1.5}
        panSpeed={0.8}
        makeDefault
      />
    </>
  );
};

// Loading Component
const SceneLoader = () => (
  <Html center>
    <div className="flex items-center space-x-3 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-2xl p-5 text-white">
      <div className="w-8 h-8 border-3 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
      <span className="font-medium">Loading Advanced Production Plant...</span>
    </div>
  </Html>
);

// Main Advanced Digital Twin Component
const AdvancedDigitalTwin3D = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mobile = useMemo(() => isMobile(), []);
  const controlsRef = useRef();
  const cameraRef = useRef();
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [componentList, setComponentList] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-zinc-950 rounded-3xl border border-zinc-800/50">
        <div className="flex flex-col items-center space-y-4 text-white">
          <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">Initializing Large-Scale Production Plant...</span>
          <span className="text-sm text-zinc-500 font-light">Loading Advanced 3D Assets & Systems</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative w-full ${mobile ? 'h-[500px]' : 'h-[800px]'} bg-gradient-to-b from-sky-200 to-zinc-300 rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl`}>
      {/* Camera Presets Overlay */}
      {!mobile && <CameraPresets controlsRef={controlsRef} cameraRef={cameraRef} />}
      
      {/* Component Selector Overlay */}
      {!mobile && (
        <ComponentSelector 
          components={componentList}
          onSelectComponent={setSelectedComponent}
          selectedComponent={selectedComponent}
        />
      )}

      <Canvas
        camera={{ position: mobile ? [80, 50, 80] : [70, 40, 70], fov: mobile ? 65 : 60 }}
        shadows={!mobile}
        dpr={mobile ? [1, 1.5] : [1, 1.8]}
        performance={{ min: 0.3, max: 1 }}
        gl={{ 
          antialias: !mobile,
          alpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true
        }}
        frameloop={mobile ? "demand" : "always"}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
          cameraRef.current = camera;
        }}
      >
        <Suspense fallback={<SceneLoader />}>
          <AdvancedProductionPlantScene 
            controlsRef={controlsRef}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
            setComponentList={setComponentList}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AdvancedDigitalTwin3D;
