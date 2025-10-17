# Unity WebGL Build Instructions

Complete instructions for building the Unity production plant and integrating with React.

## 📋 Overview

This document provides step-by-step instructions to:
1. Set up Unity project with production plant
2. Build WebGL versions for mobile and desktop
3. Deploy builds to React frontend
4. Test and verify integration

## 🎯 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Unity 2021.3 LTS or newer** installed
- [ ] **Unity WebGL Build Support** module installed
- [ ] **8GB RAM minimum** (16GB recommended)
- [ ] **10GB free disk space** for builds
- [ ] **Node.js and npm** installed for React testing
- [ ] **Modern web browser** (Chrome 90+, Firefox 88+, Safari 14+)

## 📁 Project Structure

```
frontend/
├── unity-project/                    # Unity source project
│   ├── Assets/
│   │   └── Scripts/
│   │       ├── ProductionPlantManager.cs
│   │       ├── AdaptiveQualityManager.cs
│   │       ├── Components/
│   │       │   ├── SiloController.cs
│   │       │   ├── BoilerController.cs
│   │       │   ├── CoolingTowerController.cs
│   │       │   ├── StorageTankController.cs
│   │       │   ├── ConveyorSystemController.cs
│   │       │   ├── RoboticArmController.cs
│   │       │   ├── QualityInspectionController.cs
│   │       │   ├── InventoryStorageController.cs
│   │       │   └── AGVController.cs
│   │       └── Editor/
│   │           └── BuildAutomation.cs
│   ├── README.md
│   └── QUICK_START.md
│
└── public/
    └── unity-builds/                 # WebGL build output
        ├── mobile/
        │   └── Build/
        │       ├── ProductionPlantMobile.data
        │       ├── ProductionPlantMobile.framework.js
        │       ├── ProductionPlantMobile.loader.js
        │       └── ProductionPlantMobile.wasm
        ├── desktop/
        │   └── Build/
        │       ├── ProductionPlant.data
        │       ├── ProductionPlant.framework.js
        │       ├── ProductionPlant.loader.js
        │       └── ProductionPlant.wasm
        └── desktop-hq/
            └── Build/
                ├── ProductionPlantHQ.data
                ├── ProductionPlantHQ.framework.js
                ├── ProductionPlantHQ.loader.js
                └── ProductionPlantHQ.wasm
```

## 🚀 Setup Instructions

### Step 1: Create Unity Project

1. **Open Unity Hub**
2. Click **"New Project"**
3. Select **"3D (URP)"** template
4. Configure:
   - **Project Name**: `ProductionPlantDigitalTwin`
   - **Location**: `d:\frontend\unity-project\` (or your preferred location)
5. Click **"Create Project"**
6. Wait for Unity to initialize (2-3 minutes)

### Step 2: Install Required Packages

1. Open **Window > Package Manager**
2. Ensure these packages are installed:
   - ✅ **Universal RP** (should be pre-installed with URP template)
   - ✅ **Post Processing** (optional, for advanced effects)
   - ✅ **Cinemachine** (optional, for camera controls)

### Step 3: Copy Project Files

Copy all scripts from the provided `unity-project` folder:

```
Source: d:\frontend\unity-project\Assets\Scripts\
Destination: [YourUnityProject]\Assets\Scripts\
```

**Files to copy:**
- `ProductionPlantManager.cs`
- `AdaptiveQualityManager.cs`
- `Components\*.cs` (all component controllers)
- `Editor\BuildAutomation.cs`

### Step 4: Configure Quality Settings

1. Open **Edit > Project Settings > Quality**
2. Create/configure 3 quality levels:

#### Level 0: Low (Mobile)
```
Name: Low
Pixel Light Count: 1
Texture Quality: Half Res
Anisotropic Textures: Disabled
Anti Aliasing: Disabled
Soft Particles: Disabled
Shadows: Disabled
Shadow Resolution: Low Resolution
Shadow Distance: 0
Shadow Cascades: No Cascades
```

#### Level 1: Medium (Desktop)
```
Name: Medium
Pixel Light Count: 4
Texture Quality: Full Res
Anisotropic Textures: Per Texture
Anti Aliasing: 2x Multi Sampling
Soft Particles: Enabled
Shadows: Hard Shadows Only
Shadow Resolution: Medium Resolution
Shadow Distance: 50
Shadow Cascades: Two Cascades
```

#### Level 2: High (Desktop-HQ)
```
Name: High
Pixel Light Count: 8
Texture Quality: Full Res
Anisotropic Textures: Forced On
Anti Aliasing: 4x Multi Sampling
Soft Particles: Enabled
Shadows: All
Shadow Resolution: Very High Resolution
Shadow Distance: 100
Shadow Cascades: Four Cascades
```

### Step 5: Configure Player Settings

1. Open **Edit > Project Settings > Player**
2. Select **WebGL** tab (icon)

#### Resolution and Presentation
```
Default Canvas Width: 1920
Default Canvas Height: 1080
Run In Background: ✅ Enabled
```

#### Publishing Settings
```
Compression Format: Gzip (or Brotli for better compression)
Enable Exceptions: None (for smaller build size)
Data Caching: ✅ Enabled
```

#### Other Settings
```
Color Space: Linear
Auto Graphics API: ✅ Enabled
Graphics API: WebGL 2.0
Managed Stripping Level: High
```

### Step 6: Create Production Plant Scene

#### Option A: Quick Setup (15 minutes)
Follow the **QUICK_START.md** guide for a basic scene with primitive shapes.

#### Option B: Full Setup (2-3 hours)
Follow the **README.md** guide for a complete scene with detailed models and effects.

**Minimum Scene Requirements:**
- Ground plane
- Directional light
- ProductionPlantManager GameObject
- At least one of each component type (Silo, Boiler, Conveyor, etc.)

### Step 7: Build WebGL Versions

#### Using Build Automation Tool (Recommended)

1. Open **Build > Production Plant Builder**
2. Configure:
   - Base Path: `../frontend/public/unity-builds`
   - Select quality levels to build
3. Click **"Build All Selected"**
4. Wait for builds to complete (10-15 minutes total)

#### Manual Build Process

**For Mobile:**
```
1. Edit > Project Settings > Quality > Select "Low"
2. Edit > Project Settings > Player > Resolution: 1280x720
3. File > Build Settings
4. Platform: WebGL (Switch Platform if needed)
5. Add Open Scenes
6. Click "Build"
7. Choose: d:\frontend\public\unity-builds\mobile\
8. Wait for build (3-5 minutes)
```

**For Desktop:**
```
1. Edit > Project Settings > Quality > Select "Medium"
2. Edit > Project Settings > Player > Resolution: 1920x1080
3. File > Build Settings
4. Click "Build"
5. Choose: d:\frontend\public\unity-builds\desktop\
6. Wait for build (3-5 minutes)
```

**For Desktop-HQ:**
```
1. Edit > Project Settings > Quality > Select "High"
2. Edit > Project Settings > Player > Resolution: 1920x1080
3. File > Build Settings
4. Click "Build"
5. Choose: d:\frontend\public\unity-builds\desktop-hq\
6. Wait for build (3-5 minutes)
```

## ✅ Verification

### Check Build Output

After building, verify these files exist:

**Mobile Build:**
```
d:\frontend\public\unity-builds\mobile\Build\
├── ProductionPlantMobile.data
├── ProductionPlantMobile.framework.js
├── ProductionPlantMobile.loader.js
└── ProductionPlantMobile.wasm
```

**Desktop Build:**
```
d:\frontend\public\unity-builds\desktop\Build\
├── ProductionPlant.data
├── ProductionPlant.framework.js
├── ProductionPlant.loader.js
└── ProductionPlant.wasm
```

**Desktop-HQ Build:**
```
d:\frontend\public\unity-builds\desktop-hq\Build\
├── ProductionPlantHQ.data
├── ProductionPlantHQ.framework.js
├── ProductionPlantHQ.loader.js
└── ProductionPlantHQ.wasm
```

### File Size Guidelines

Expected file sizes (approximate):

| Build | .data | .wasm | .framework.js | Total |
|-------|-------|-------|---------------|-------|
| Mobile | 5-15 MB | 3-8 MB | 200-500 KB | 8-24 MB |
| Desktop | 10-25 MB | 5-12 MB | 300-700 KB | 15-38 MB |
| Desktop-HQ | 15-35 MB | 7-15 MB | 400-900 KB | 22-51 MB |

**Note:** Sizes vary based on scene complexity and assets.

## 🧪 Testing

### Test in Unity Editor

1. Press **Play** (Ctrl+P)
2. Select **ProductionPlantManager** in Hierarchy
3. In Inspector, toggle systems on/off
4. Verify:
   - [ ] Visual effects appear (particles, lights)
   - [ ] Components animate correctly
   - [ ] No errors in Console
   - [ ] Performance is acceptable (30+ FPS)

### Test WebGL Build Locally

1. Use Unity's **Build and Run** feature, or
2. Use a local web server:

```bash
# Using Python
cd d:\frontend\public\unity-builds\desktop
python -m http.server 8000

# Using Node.js http-server
npx http-server d:\frontend\public\unity-builds\desktop -p 8000
```

3. Open browser: `http://localhost:8000`
4. Verify Unity loads and runs

### Test in React Application

1. Start React dev server:
```bash
cd d:\frontend
npm run dev
```

2. Open browser: `http://localhost:5173`
3. Navigate to Digital Twin section
4. Verify:
   - [ ] Unity build loads automatically
   - [ ] Correct quality level selected based on device
   - [ ] Loading progress shows
   - [ ] Controls work (if implemented)
   - [ ] No errors in browser console

## 🔧 Troubleshooting

### Build Fails

**Error: "WebGL module not installed"**
```
Solution:
1. Open Unity Hub
2. Go to Installs
3. Click gear icon on your Unity version
4. Select "Add Modules"
5. Check "WebGL Build Support"
6. Install
```

**Error: "Out of memory"**
```
Solution:
1. Close other applications
2. Increase virtual memory (Windows)
3. Build one quality level at a time
4. Restart Unity
```

**Error: "Scene not found"**
```
Solution:
1. File > Build Settings
2. Click "Add Open Scenes"
3. Ensure scene is checked
4. Try building again
```

### Build Too Large

**Problem: Build exceeds 50MB**
```
Solutions:
1. Enable compression (Gzip/Brotli)
2. Reduce texture sizes:
   - Select textures in Assets
   - Inspector > Max Size: 1024 or 512
   - Apply
3. Remove unused assets:
   - Edit > Project Settings > Player
   - Managed Stripping Level: High
4. Optimize models:
   - Reduce polygon count
   - Remove unnecessary details
```

### Performance Issues

**Problem: Low FPS in build**
```
Solutions:
1. Reduce quality settings
2. Disable shadows
3. Reduce particle effects
4. Lower texture resolution
5. Use LOD (Level of Detail) system
6. Bake lighting instead of realtime
```

### React Integration Issues

**Problem: Unity not loading in React**
```
Solutions:
1. Check browser console for errors
2. Verify build files are in correct location
3. Check file paths in UnityDigitalTwin.jsx
4. Ensure loader script loads successfully
5. Test build directly (not through React)
6. Clear browser cache
```

**Problem: "Failed to load Unity loader script"**
```
Solutions:
1. Verify file paths match build names
2. Check server is serving .js, .wasm, .data files
3. Check CORS settings if using external server
4. Verify files aren't corrupted
```

## 📊 Performance Optimization

### Pre-Build Optimizations

1. **Combine Meshes**
   - Select static objects
   - Check "Static" in Inspector
   - Enable "Batching Static"

2. **Bake Lighting**
   - Window > Rendering > Lighting
   - Generate Lighting
   - Wait for bake to complete

3. **Optimize Textures**
   - Select all textures
   - Inspector > Compression: High Quality
   - Max Size: 2048 (or lower for mobile)

4. **Use LOD Groups**
   - Add LODGroup component to complex objects
   - Create 3 LOD levels (high, medium, low)

### Post-Build Optimizations

1. **Enable Compression**
   - Gzip: Good compression, wide support
   - Brotli: Better compression, modern browsers

2. **CDN Deployment**
   - Host builds on CDN for faster loading
   - Enable caching headers

3. **Lazy Loading**
   - Load Unity only when needed
   - Show loading screen

## 📝 Maintenance

### Updating Builds

When you make changes to the Unity project:

1. Test in Unity Editor
2. Rebuild affected quality levels
3. Test in React
4. Deploy updated builds

### Version Control

**Include in Git:**
- All scripts (.cs files)
- Scene files (.unity)
- Project settings
- README and documentation

**Exclude from Git (.gitignore):**
```
# Unity
Library/
Temp/
Obj/
Build/
Builds/
Logs/
UserSettings/

# WebGL Builds (too large)
*.data
*.wasm
*.framework.js
*.loader.js
```

**Note:** Build files should be generated locally or in CI/CD pipeline.

## 🎓 Next Steps

1. **Enhance Visuals**
   - Add detailed 3D models
   - Create custom materials
   - Improve lighting setup
   - Add more particle effects

2. **Add Interactivity**
   - Implement UI controls
   - Add camera presets
   - Create component selection
   - Add tooltips and info panels

3. **Optimize Further**
   - Profile performance
   - Reduce draw calls
   - Optimize scripts
   - Implement object pooling

4. **Deploy to Production**
   - Build all quality levels
   - Test on multiple devices
   - Deploy to hosting service
   - Monitor performance

## 📚 Additional Resources

- **Unity Documentation**: https://docs.unity3d.com/
- **WebGL Best Practices**: https://docs.unity3d.com/Manual/webgl-building.html
- **URP Guide**: https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@latest
- **Performance Optimization**: https://docs.unity3d.com/Manual/OptimizingGraphicsPerformance.html

## 💬 Support

For issues or questions:
1. Check Unity Console for errors
2. Check Browser Console for JavaScript errors
3. Review this guide's Troubleshooting section
4. Check Unity Forums and Stack Overflow

---

**Document Version**: 1.0.0  
**Last Updated**: 2024  
**Unity Version**: 2021.3 LTS or newer
