/**
 * Digital Twin Configuration
 * Centralized configuration for all digital twin components
 */

export const digitalTwinConfig = {
  // Performance Thresholds
  performance: {
    // Minimum performance score required for each mode (0-100)
    unityMinScore: 80,
    advancedMinScore: 60,
    mobileMinScore: 0,
    
    // Target frame rates
    desktopTargetFPS: 60,
    mobileTargetFPS: 30,
    
    // Memory limits (MB)
    maxMemoryDesktop: 500,
    maxMemoryMobile: 150,
  },

  // Unity Build Paths
  unity: {
    builds: {
      mobile: {
        path: '/unity-builds/mobile',
        buildName: 'ProductionPlantMobile',
        description: 'Mobile-Optimized Production Plant Simulation'
      },
      desktop: {
        path: '/unity-builds/desktop',
        buildName: 'ProductionPlant',
        description: 'Standard Production Plant Simulation'
      },
      desktopHQ: {
        path: '/unity-builds/desktop-hq',
        buildName: 'ProductionPlantHQ',
        description: 'High-Quality Production Plant Simulation'
      }
    },
    streamingAssetsUrl: 'StreamingAssets',
    companyName: 'DigitalTwin',
    productName: 'ProductionPlant',
    productVersion: '1.0'
  },

  // Three.js Scene Settings
  scene: {
    // Desktop settings
    desktop: {
      cameraPosition: [70, 40, 70],
      cameraFOV: 60,
      shadowMapSize: 2048,
      enableShadows: true,
      enablePostProcessing: true,
      antialias: true,
      dpr: [1, 2],
      frameloop: 'always'
    },
    
    // Mobile settings
    mobile: {
      cameraPosition: [30, 20, 30],
      cameraFOV: 65,
      shadowMapSize: 512,
      enableShadows: false,
      enablePostProcessing: false,
      antialias: false,
      dpr: [1, 1.5],
      frameloop: 'demand'
    }
  },

  // Component Settings
  components: {
    // Silo settings
    silos: [
      {
        id: 'silo_grain',
        material: 'Grain',
        capacity: '500T',
        height: 12,
        radius: 3,
        position: [-50, 0, 20],
        initialFillLevel: 0.75
      },
      {
        id: 'silo_powder',
        material: 'Powder',
        capacity: '400T',
        height: 10,
        radius: 2.5,
        position: [-40, 0, 20],
        initialFillLevel: 0.60
      },
      {
        id: 'silo_pellets',
        material: 'Pellets',
        capacity: '600T',
        height: 14,
        radius: 3.5,
        position: [-30, 0, 20],
        initialFillLevel: 0.85
      }
    ],

    // Boiler settings
    boilers: [
      {
        id: 'boiler_01',
        position: [40, 0, 30],
        initialTemp: 180,
        maxTemp: 250,
        initialPressure: 15,
        maxPressure: 20,
        steamOutput: 0.7
      }
    ],

    // Cooling tower settings
    coolingTowers: [
      {
        id: 'cooling_tower_01',
        position: [60, 0, 30],
        initialWaterTemp: 35,
        targetWaterTemp: 25,
        flowRate: 85
      }
    ],

    // Storage tank settings
    tanks: [
      {
        id: 'tank_water',
        liquidType: 'Water',
        capacity: '100m³',
        height: 8,
        radius: 2.5,
        liquidColor: '#3b82f6',
        position: [-50, 0, -30],
        initialFillLevel: 0.6
      },
      {
        id: 'tank_chemical',
        liquidType: 'Chemical',
        capacity: '75m³',
        height: 7,
        radius: 2,
        liquidColor: '#8b5cf6',
        position: [-40, 0, -30],
        initialFillLevel: 0.8
      },
      {
        id: 'tank_oil',
        liquidType: 'Oil',
        capacity: '50m³',
        height: 6,
        radius: 2,
        liquidColor: '#f59e0b',
        position: [-30, 0, -30],
        initialFillLevel: 0.4
      }
    ],

    // Production line settings
    productionLine: {
      conveyorPosition: [-30, 0, -20],
      conveyorSpeed: 0.03,
      robotPosition: [-12, 0, -20],
      inspectionPosition: [-2, 0, -20],
      inventoryPosition: [20, 0, -10],
      agvPosition: [0, 0, 0]
    }
  },

  // Lighting Configuration
  lighting: {
    desktop: {
      ambient: {
        intensity: 0.5,
        color: '#ffffff'
      },
      directional: [
        {
          position: [50, 60, 30],
          intensity: 2,
          castShadow: true
        },
        {
          position: [-50, 40, -30],
          intensity: 1,
          castShadow: false
        }
      ],
      point: [
        {
          position: [0, 30, 0],
          intensity: 0.8,
          color: '#00ffff',
          distance: 80
        }
      ]
    },
    mobile: {
      ambient: {
        intensity: 0.7,
        color: '#ffffff'
      },
      directional: [
        {
          position: [20, 30, 15],
          intensity: 1.5,
          castShadow: false
        }
      ],
      point: []
    }
  },

  // Color Scheme
  colors: {
    primary: '#00ffff',      // Cyan
    secondary: '#a855f7',    // Purple
    success: '#10b981',      // Green
    warning: '#fbbf24',      // Yellow
    error: '#ef4444',        // Red
    background: '#09090b',   // Zinc-950
    surface: '#18181b',      // Zinc-900
    border: '#27272a',       // Zinc-800
    text: '#ffffff',         // White
    textSecondary: '#a1a1aa' // Zinc-400
  },

  // UI Settings
  ui: {
    showControls: true,
    showMetrics: true,
    showDeviceInfo: true,
    showPerformanceWarnings: true,
    
    // Control panel position
    controlPanelPosition: [-60, 0, 40],
    
    // Metrics dashboard position
    metricsDashboardPosition: [50, 0, 40],
    
    // Animation speeds
    animationSpeed: {
      fast: 0.05,
      normal: 0.03,
      slow: 0.01
    }
  },

  // Metrics Configuration
  metrics: {
    updateInterval: 1000, // ms
    
    // OEE calculation parameters
    oee: {
      idealCycleTime: 1, // items per second
      targetAvailability: 90, // %
      targetPerformance: 85, // %
      targetQuality: 99 // %
    },
    
    // Defect rate
    defectProbability: 0.05, // 5% chance
    
    // Energy consumption rates (kW per active system)
    energyConsumption: {
      conveyor: 5,
      robot: 8,
      boiler: 50,
      coolingTower: 15,
      silo: 3,
      tank: 2
    }
  },

  // Device Detection
  deviceDetection: {
    // Screen size breakpoints
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1920
    },
    
    // Performance scoring weights
    scoring: {
      deviceType: {
        desktop: 20,
        tablet: 10,
        mobile: 0
      },
      webgl: {
        webgl2: 15,
        webgl1: 10,
        none: 0
      },
      memory: {
        high: 15,    // 8GB+
        medium: 10,  // 4GB+
        low: 5       // 2GB+
      },
      cores: {
        high: 10,    // 8+
        medium: 5    // 4+
      },
      gpu: {
        high: 15,
        medium: 8,
        low: 0
      }
    }
  },

  // Debug Settings
  debug: {
    enabled: false,
    showFPS: false,
    showMemory: false,
    logPerformance: false,
    showBoundingBoxes: false,
    logDeviceInfo: true
  }
};

// Helper functions
export const getComponentConfig = (componentType, componentId) => {
  const components = digitalTwinConfig.components[componentType];
  if (Array.isArray(components)) {
    return components.find(c => c.id === componentId);
  }
  return components;
};

export const getSceneConfig = (isMobile) => {
  return isMobile ? digitalTwinConfig.scene.mobile : digitalTwinConfig.scene.desktop;
};

export const getLightingConfig = (isMobile) => {
  return isMobile ? digitalTwinConfig.lighting.mobile : digitalTwinConfig.lighting.desktop;
};

export const getUnityBuildConfig = (performanceTier) => {
  const builds = digitalTwinConfig.unity.builds;
  
  switch (performanceTier) {
    case 'high':
      return builds.desktopHQ;
    case 'medium':
      return builds.desktop;
    case 'low':
    default:
      return builds.mobile;
  }
};

export default digitalTwinConfig;
