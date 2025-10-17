# Unity Production Plant - Setup Checklist

Use this checklist to track your progress in setting up the Unity production plant.

## 📋 Pre-Setup Checklist

- [ ] Unity Hub installed
- [ ] Unity 2021.3 LTS or newer installed
- [ ] WebGL Build Support module installed
- [ ] At least 8GB RAM available
- [ ] At least 10GB free disk space
- [ ] Node.js and npm installed (for testing)
- [ ] Modern web browser installed

## 🎯 Phase 1: Project Creation (5-10 min)

- [ ] Unity Hub opened
- [ ] New project created with 3D URP template
- [ ] Project named: "ProductionPlantDigitalTwin"
- [ ] Project location set
- [ ] Unity Editor opened successfully
- [ ] Universal RP package verified

## 📁 Phase 2: File Setup (5 min)

- [ ] Created `Assets/Scripts/` folder
- [ ] Copied `ProductionPlantManager.cs`
- [ ] Copied `AdaptiveQualityManager.cs`
- [ ] Created `Assets/Scripts/Components/` folder
- [ ] Copied all component controllers:
  - [ ] `SiloController.cs`
  - [ ] `BoilerController.cs`
  - [ ] `CoolingTowerController.cs`
  - [ ] `StorageTankController.cs`
  - [ ] `ConveyorSystemController.cs`
  - [ ] `RoboticArmController.cs`
  - [ ] `QualityInspectionController.cs`
  - [ ] `InventoryStorageController.cs`
  - [ ] `AGVController.cs`
- [ ] Created `Assets/Scripts/Editor/` folder
- [ ] Copied `BuildAutomation.cs`
- [ ] All scripts compile without errors

## ⚙️ Phase 3: Project Configuration (10 min)

### Quality Settings
- [ ] Opened Edit > Project Settings > Quality
- [ ] Created/configured "Low" quality level:
  - [ ] Shadows: Disabled
  - [ ] Texture Quality: Half Res
  - [ ] Anti-Aliasing: Disabled
- [ ] Created/configured "Medium" quality level:
  - [ ] Shadows: Hard Shadows Only
  - [ ] Texture Quality: Full Res
  - [ ] Anti-Aliasing: 2x MSAA
- [ ] Created/configured "High" quality level:
  - [ ] Shadows: All
  - [ ] Texture Quality: Full Res
  - [ ] Anti-Aliasing: 4x MSAA

### Player Settings
- [ ] Opened Edit > Project Settings > Player
- [ ] Selected WebGL tab
- [ ] Set Default Canvas Width: 1920
- [ ] Set Default Canvas Height: 1080
- [ ] Enabled "Run In Background"
- [ ] Set Compression Format: Gzip or Brotli
- [ ] Set Enable Exceptions: None
- [ ] Enabled Data Caching
- [ ] Set Color Space: Linear
- [ ] Set Managed Stripping Level: High

## 🏗️ Phase 4: Scene Creation (15-60 min)

### Basic Scene Setup
- [ ] Created new scene (Ctrl+N)
- [ ] Saved as `Assets/Scenes/ProductionPlant.unity`
- [ ] Created ground plane
- [ ] Configured directional light
- [ ] Created ProductionPlantManager GameObject
- [ ] Added ProductionPlantManager component
- [ ] Added AdaptiveQualityManager component

### Components (Choose Quick or Full Setup)

#### Quick Setup (15 min)
- [ ] Created simple conveyor (cube)
- [ ] Created simple robotic arm (hierarchy of cubes)
- [ ] Created simple silo (cylinder)
- [ ] Created simple boiler (cube)
- [ ] Created simple cooling tower (cylinder)
- [ ] Created simple storage tank (cylinder)
- [ ] Added controllers to each component
- [ ] Linked all components to ProductionPlantManager

#### Full Setup (2-3 hours)
- [ ] Created detailed conveyor system
- [ ] Created detailed robotic arm with joints
- [ ] Created 3 silos with materials
- [ ] Created boiler with particle effects
- [ ] Created cooling tower with fan
- [ ] Created 3 storage tanks
- [ ] Created quality inspection station
- [ ] Created inventory storage
- [ ] Created AGV with waypoints
- [ ] Added all visual effects (particles, lights)
- [ ] Created and assigned materials
- [ ] Configured all component settings
- [ ] Linked all components to ProductionPlantManager

## 🧪 Phase 5: Testing in Editor (5 min)

- [ ] Pressed Play button
- [ ] Selected ProductionPlantManager in Hierarchy
- [ ] Toggled systems on/off in Inspector
- [ ] Verified visual effects appear
- [ ] Verified animations work
- [ ] Checked Console for errors (should be none)
- [ ] Verified performance (30+ FPS)
- [ ] Pressed Play to stop

## 📤 Phase 6: Building WebGL (15-30 min)

### Build Setup
- [ ] Opened File > Build Settings
- [ ] Selected WebGL platform
- [ ] Clicked "Switch Platform" (if needed)
- [ ] Added open scenes to build
- [ ] Verified scene is checked

### Build Automation (Recommended)
- [ ] Opened Build > Production Plant Builder
- [ ] Set base path: `../frontend/public/unity-builds`
- [ ] Selected quality levels to build:
  - [ ] Mobile (Low Quality)
  - [ ] Desktop (Medium Quality)
  - [ ] Desktop-HQ (High Quality)
- [ ] Clicked "Build All Selected"
- [ ] Waited for builds to complete (10-15 min)

### Manual Build (Alternative)
- [ ] Built Mobile version:
  - [ ] Set Quality Level: Low
  - [ ] Set Resolution: 1280x720
  - [ ] Built to: `public/unity-builds/mobile/`
- [ ] Built Desktop version:
  - [ ] Set Quality Level: Medium
  - [ ] Set Resolution: 1920x1080
  - [ ] Built to: `public/unity-builds/desktop/`
- [ ] Built Desktop-HQ version:
  - [ ] Set Quality Level: High
  - [ ] Set Resolution: 1920x1080
  - [ ] Built to: `public/unity-builds/desktop-hq/`

## ✅ Phase 7: Verification (5 min)

### Check Build Files
- [ ] Mobile build files exist:
  - [ ] `ProductionPlantMobile.data`
  - [ ] `ProductionPlantMobile.framework.js`
  - [ ] `ProductionPlantMobile.loader.js`
  - [ ] `ProductionPlantMobile.wasm`
- [ ] Desktop build files exist:
  - [ ] `ProductionPlant.data`
  - [ ] `ProductionPlant.framework.js`
  - [ ] `ProductionPlant.loader.js`
  - [ ] `ProductionPlant.wasm`
- [ ] Desktop-HQ build files exist:
  - [ ] `ProductionPlantHQ.data`
  - [ ] `ProductionPlantHQ.framework.js`
  - [ ] `ProductionPlantHQ.loader.js`
  - [ ] `ProductionPlantHQ.wasm`

### Check File Sizes
- [ ] Mobile build: 8-24 MB total
- [ ] Desktop build: 15-38 MB total
- [ ] Desktop-HQ build: 22-51 MB total
- [ ] All files under 100 MB (if larger, optimize)

## 🌐 Phase 8: React Integration Testing (10 min)

### Start Development Server
- [ ] Opened terminal in frontend directory
- [ ] Ran `npm run dev`
- [ ] Server started successfully
- [ ] Opened browser to `http://localhost:5173`

### Test Unity Integration
- [ ] Navigated to Digital Twin section
- [ ] Unity loading screen appeared
- [ ] Loading progress showed
- [ ] Unity instance loaded successfully
- [ ] Device info badge shows correct tier
- [ ] No errors in browser console
- [ ] Can see production plant scene
- [ ] Systems animate when active

### Test Controls (if implemented)
- [ ] Can toggle systems on/off
- [ ] Visual feedback works
- [ ] Metrics update
- [ ] Emergency stop works
- [ ] Reset works

## 🎉 Completion Checklist

- [ ] Unity project created and configured
- [ ] All scripts added and compiling
- [ ] Scene created with components
- [ ] Tested in Unity Editor successfully
- [ ] All three WebGL builds completed
- [ ] Build files verified
- [ ] React integration tested
- [ ] No errors in console
- [ ] Performance acceptable

## 📊 Quality Check

### Visual Quality
- [ ] Graphics look better than Three.js version
- [ ] Lighting is realistic
- [ ] Shadows appear (on medium/high)
- [ ] Particle effects work
- [ ] Materials look good
- [ ] Animations are smooth

### Performance
- [ ] Mobile build: 30+ FPS on mobile devices
- [ ] Desktop build: 60 FPS on standard PCs
- [ ] Desktop-HQ build: 60 FPS on high-end PCs
- [ ] Loading time: Under 10 seconds
- [ ] Memory usage: Under 500 MB

### Functionality
- [ ] All systems can be controlled
- [ ] Metrics update correctly
- [ ] Emergency stop works
- [ ] Reset functionality works
- [ ] No console errors
- [ ] Adaptive quality works

## 🚀 Optional Enhancements

- [ ] Added detailed 3D models
- [ ] Created custom PBR materials
- [ ] Enhanced particle effects
- [ ] Added ambient audio
- [ ] Implemented UI overlay
- [ ] Added camera presets
- [ ] Created component tooltips
- [ ] Optimized with LOD
- [ ] Baked lighting
- [ ] Added post-processing volume

## 📝 Documentation Review

- [ ] Read README.md
- [ ] Read QUICK_START.md
- [ ] Read UNITY_BUILD_INSTRUCTIONS.md
- [ ] Read PROJECT_SUMMARY.md
- [ ] Understand adaptive quality system
- [ ] Know how to rebuild
- [ ] Know how to troubleshoot

## 🎓 Next Steps

After completing this checklist:

1. **If Quick Setup**: Consider upgrading to full setup
2. **If Full Setup**: Add enhancements and polish
3. **Deploy**: Prepare for production deployment
4. **Monitor**: Track performance and user feedback
5. **Iterate**: Continuously improve based on feedback

## 💡 Tips

- ✅ Save your scene frequently (Ctrl+S)
- ✅ Test in Editor before building
- ✅ Build one quality level first to test
- ✅ Keep backups of working versions
- ✅ Document custom settings
- ✅ Use version control (Git)
- ✅ Profile performance regularly

## ❓ Need Help?

If you encounter issues:
1. Check the Troubleshooting section in UNITY_BUILD_INSTRUCTIONS.md
2. Review Unity Console for errors
3. Check Browser Console for JavaScript errors
4. Verify all files are in correct locations
5. Ensure Unity version is compatible
6. Try rebuilding from scratch if needed

---

**Checklist Version**: 1.0.0  
**Last Updated**: 2024  

**Status**: [ ] Not Started | [ ] In Progress | [ ] Complete

**Completion Date**: _______________

**Notes**:
_______________________________________________________
_______________________________________________________
_______________________________________________________
