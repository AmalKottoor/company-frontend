# Unity Production Plant Digital Twin

A high-fidelity Unity WebGL project that replicates and enhances the Three.js production plant simulation with adaptive graphics quality scaling.

## 🎯 Project Overview

This Unity project creates a production plant digital twin with:
- **Enhanced Graphics**: Superior visual quality compared to Three.js version
- **Adaptive Quality**: Automatically scales graphics based on device capabilities (PC/Mobile)
- **Real-time Simulation**: Interactive production line with multiple systems
- **WebGL Export**: Builds for web deployment with React integration

## 📋 Features

### Production Systems
- **Conveyor System**: Automated belt with item transport
- **Robotic Arm**: Pick and place operations
- **Quality Inspection**: Automated vision system
- **Inventory Storage**: Warehouse with visual rack system
- **AGV Delivery**: Automated guided vehicle system

### Industrial Equipment
- **Silos**: Grain, powder, and pellet storage with fill animations
- **Industrial Boiler**: Temperature and pressure simulation with steam effects
- **Cooling Tower**: Water cooling with rotating fans and mist
- **Storage Tanks**: Liquid storage with level indicators

### Graphics Features
- **Adaptive Quality System**: 3 quality tiers (Low/Medium/High)
- **Real-time Shadows**: Dynamic shadow casting
- **Particle Effects**: Steam, smoke, dust, and sparks
- **Dynamic Lighting**: Realistic industrial lighting
- **Post-Processing**: Bloom, ambient occlusion, motion blur (High quality)
- **Material System**: PBR materials with emissive effects

## 🛠️ Prerequisites

- **Unity 2021.3 LTS or newer** (recommended: 2022.3 LTS)
- **Universal Render Pipeline (URP)** package
- **WebGL Build Support** module
- **8GB RAM minimum** (16GB recommended)
- **Windows/Mac/Linux** development environment

## 📦 Installation

### 1. Create Unity Project

```bash
# Open Unity Hub
# Click "New Project"
# Select "3D (URP)" template
# Name: ProductionPlantDigitalTwin
# Location: Choose your directory
```

### 2. Copy Project Files

Copy all files from this `unity-project` folder to your Unity project:

```
YourUnityProject/
├── Assets/
│   └── Scripts/
│       ├── ProductionPlantManager.cs
│       ├── AdaptiveQualityManager.cs
│       └── Components/
│           ├── SiloController.cs
│           ├── BoilerController.cs
│           ├── CoolingTowerController.cs
│           ├── StorageTankController.cs
│           ├── ConveyorSystemController.cs
│           ├── RoboticArmController.cs
│           ├── QualityInspectionController.cs
│           ├── InventoryStorageController.cs
│           └── AGVController.cs
```

### 3. Install Required Packages

Open **Window > Package Manager** and install:
- ✅ Universal RP (if not already installed)
- ✅ Post Processing (optional, for advanced effects)
- ✅ Cinemachine (optional, for camera controls)

## 🏗️ Scene Setup

### 1. Create Main Scene

1. Create new scene: `File > New Scene > URP`
2. Save as: `Assets/Scenes/ProductionPlant.unity`

### 2. Setup Lighting

1. Create **Directional Light** (Sun):
   - Position: (50, 60, 30)
   - Intensity: 2
   - Enable Shadows
   - Shadow Type: Soft Shadows

2. Add **Volume** (Post-Processing):
   - Create: `GameObject > Volume > Global Volume`
   - Add Override: Bloom, Ambient Occlusion, Tonemapping

### 3. Create Ground

1. Create **Plane** or **Cube** for factory floor
   - Scale: (200, 0.2, 180)
   - Material: Dark concrete/asphalt

### 4. Add Production Plant Manager

1. Create Empty GameObject: "ProductionPlantManager"
2. Add Component: `ProductionPlantManager.cs`
3. Add Component: `AdaptiveQualityManager.cs`

### 5. Create Industrial Components

For each component, create a GameObject and add the corresponding controller:

#### Silos (3x)
```
GameObject > 3D Object > Cylinder
- Add: SiloController.cs
- Configure: Material Type, Capacity, Fill Level
- Position: (-50, 0, 20), (-40, 0, 20), (-30, 0, 20)
```

#### Boiler
```
GameObject > 3D Object > Cube (scaled)
- Add: BoilerController.cs
- Add: Particle System (steam)
- Add: Light (flame)
- Position: (40, 0, 30)
```

#### Cooling Tower
```
GameObject > 3D Object > Cylinder
- Add: CoolingTowerController.cs
- Create child: Fan Blades (rotating mesh)
- Add: Particle System (mist)
- Position: (60, 0, 30)
```

#### Storage Tanks (3x)
```
GameObject > 3D Object > Cylinder
- Add: StorageTankController.cs
- Configure: Liquid Type, Color
- Position: (-50, 0, -30), (-40, 0, -30), (-30, 0, -30)
```

#### Conveyor System
```
GameObject > 3D Object > Cube (long, flat)
- Add: ConveyorSystemController.cs
- Create: Item Prefab (small cube)
- Position: (-10, 0, -10)
```

#### Robotic Arm
```
GameObject > Create Empty
- Create hierarchy: Base > Shoulder > Elbow > Wrist > End Effector
- Add: RoboticArmController.cs
- Assign joints in inspector
- Position: (8, 0, -10)
```

#### Quality Inspection
```
GameObject > Create Empty
- Add: QualityInspectionController.cs
- Add: Light (scanner)
- Add: Particle System (scan effect)
- Position: (18, 0, -10)
```

#### Inventory Storage
```
GameObject > Create Empty
- Add: InventoryStorageController.cs
- Configure: Rows, Columns, Capacity
- Position: (15, 0, 8)
```

#### AGV System
```
GameObject > 3D Object > Cube (vehicle shape)
- Add: AGVController.cs
- Create: Waypoint path
- Add: Wheels (child objects)
- Position: (0, 0, 0)
```

### 6. Link Components to Manager

1. Select "ProductionPlantManager" GameObject
2. In Inspector, drag all component controllers to their respective lists:
   - Silos → Silos list
   - Boilers → Boilers list
   - Cooling Towers → Cooling Towers list
   - Storage Tanks → Storage Tanks list
   - Conveyor → Conveyor System
   - Robotic Arm → Robotic Arm
   - Quality Inspection → Quality Inspection
   - Inventory → Inventory Storage
   - AGV → AGV System

## 🎨 Materials and Visual Setup

### Create Materials

1. **Metal Material** (for equipment):
   - Shader: URP/Lit
   - Metallic: 0.8
   - Smoothness: 0.6
   - Color: Dark gray

2. **Emissive Material** (for indicators):
   - Shader: URP/Lit
   - Enable Emission
   - Emission Color: Cyan/Green/Red

3. **Liquid Material** (for tanks):
   - Shader: URP/Lit
   - Rendering Mode: Transparent
   - Color: Blue/Yellow/Orange (with alpha)

### Particle Systems

For each particle effect:
1. **Steam**: White, upward motion, soft particles
2. **Smoke**: Gray, slow rising, large particles
3. **Dust**: Brown, ground level, small particles
4. **Sparks**: Yellow/Orange, quick bursts

## 🔧 Build Configuration

### Quality Settings

Create 3 quality levels: **File > Project Settings > Quality**

#### Low Quality (Mobile)
```
- Pixel Light Count: 1
- Texture Quality: Half Res
- Anisotropic Textures: Disabled
- Anti Aliasing: Disabled
- Soft Particles: Disabled
- Shadows: Disabled
- Shadow Resolution: Low
- Shadow Distance: 0
```

#### Medium Quality (Desktop)
```
- Pixel Light Count: 4
- Texture Quality: Full Res
- Anisotropic Textures: Per Texture
- Anti Aliasing: 2x MSAA
- Soft Particles: Enabled
- Shadows: Hard Shadows Only
- Shadow Resolution: Medium
- Shadow Distance: 50
```

#### High Quality (Desktop-HQ)
```
- Pixel Light Count: 8
- Texture Quality: Full Res
- Anisotropic Textures: Forced On
- Anti Aliasing: 4x MSAA
- Soft Particles: Enabled
- Shadows: All
- Shadow Resolution: Very High
- Shadow Distance: 100
```

### Player Settings

**File > Build Settings > Player Settings**

#### Resolution and Presentation
```
- Default Canvas Width: 1920
- Default Canvas Height: 1080
- Run In Background: ✅
```

#### Publishing Settings (WebGL)
```
- Compression Format: Gzip (or Brotli)
- Enable Exceptions: None
- Data Caching: ✅
- Code Optimization: Runtime Speed
```

#### Other Settings
```
- Color Space: Linear
- Graphics API: WebGL 2.0
- Managed Stripping Level: High
```

## 📤 Building for WebGL

### Build Process

1. **Open Build Settings**: `File > Build Settings`
2. **Select WebGL Platform**: Click "WebGL" → "Switch Platform"
3. **Add Scene**: Add your ProductionPlant scene
4. **Configure Quality**: Set to desired quality level

### Build Three Versions

#### 1. Mobile Build
```
1. Set Quality Level: Low
2. Player Settings > Resolution: 1280x720
3. Build Settings > Build
4. Output: ../frontend/public/unity-builds/mobile/
5. Build Name: ProductionPlantMobile
```

#### 2. Desktop Build
```
1. Set Quality Level: Medium
2. Player Settings > Resolution: 1920x1080
3. Build Settings > Build
4. Output: ../frontend/public/unity-builds/desktop/
5. Build Name: ProductionPlant
```

#### 3. Desktop-HQ Build
```
1. Set Quality Level: High
2. Player Settings > Resolution: 1920x1080
3. Build Settings > Build
4. Output: ../frontend/public/unity-builds/desktop-hq/
5. Build Name: ProductionPlantHQ
```

### Expected Build Output

Each build folder should contain:
```
Build/
├── ProductionPlant.data
├── ProductionPlant.framework.js
├── ProductionPlant.loader.js
└── ProductionPlant.wasm
```

## 🔗 React Integration

The builds will automatically integrate with the React frontend through the `UnityDigitalTwin.jsx` component, which:
- Detects device capabilities
- Loads appropriate build (mobile/desktop/desktop-hq)
- Handles communication between React and Unity
- Provides loading states and error handling

### Calling Unity Methods from React

```javascript
// In React component
unityInstance.SendMessage('ProductionPlantManager', 'StartAllSystems', '');
unityInstance.SendMessage('ProductionPlantManager', 'ToggleConveyor', '');
unityInstance.SendMessage('ProductionPlantManager', 'EmergencyStop', '');
```

### Sending Data from Unity to React

```csharp
// In Unity script
#if UNITY_WEBGL && !UNITY_EDITOR
    SendMetricsToReact(jsonData);
#endif
```

## 🎮 Testing

### In Unity Editor
1. Press **Play** button
2. Test all systems individually
3. Check console for errors
4. Verify visual effects

### WebGL Build Testing
1. Build for WebGL
2. Use local server (Unity's Build & Run or separate server)
3. Test in Chrome, Firefox, Safari
4. Check browser console for errors
5. Monitor performance (FPS, memory)

## 📊 Performance Optimization

### Optimization Checklist
- ✅ Use object pooling for items
- ✅ Combine static meshes
- ✅ Use LOD (Level of Detail) for complex models
- ✅ Optimize particle systems
- ✅ Bake lighting where possible
- ✅ Use texture atlases
- ✅ Enable GPU instancing
- ✅ Minimize draw calls
- ✅ Use occlusion culling

### Memory Management
```csharp
// Periodically unload unused assets
Resources.UnloadUnusedAssets();
System.GC.Collect();
```

## 🐛 Troubleshooting

### Common Issues

**Build fails:**
- Check Unity version compatibility
- Verify WebGL module is installed
- Check console for specific errors

**Performance issues:**
- Reduce quality settings
- Disable shadows
- Reduce particle effects
- Lower texture resolution

**React integration issues:**
- Verify build files are in correct location
- Check browser console for errors
- Ensure Unity loader script loads successfully

## 📚 Additional Resources

- [Unity WebGL Documentation](https://docs.unity3d.com/Manual/webgl.html)
- [URP Documentation](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@latest)
- [Unity Scripting API](https://docs.unity3d.com/ScriptReference/)

## 📝 License

This project is part of the company-frontend application.

## 👥 Support

For issues or questions, check:
1. Unity Console for errors
2. Browser Console for JavaScript errors
3. This README's Troubleshooting section

---

**Version**: 1.0.0  
**Unity Version**: 2021.3 LTS or newer  
**Last Updated**: 2024
