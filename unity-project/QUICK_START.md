# Quick Start Guide - Unity Production Plant

Get your Unity production plant up and running in 30 minutes!

## ⚡ Fast Track Setup

### Step 1: Create Unity Project (5 min)

1. Open **Unity Hub**
2. Click **New Project**
3. Select **3D (URP)** template
4. Name: `ProductionPlantDigitalTwin`
5. Click **Create Project**

### Step 2: Copy Scripts (2 min)

Copy all files from `unity-project/Assets/Scripts/` to your Unity project's `Assets/Scripts/` folder.

### Step 3: Create Basic Scene (15 min)

#### A. Setup Environment
```
1. Create new scene (Ctrl+N)
2. Save as: Assets/Scenes/ProductionPlant.unity

3. Create Ground:
   - GameObject > 3D Object > Plane
   - Scale: (20, 1, 18)
   - Position: (0, 0, 0)
   - Rename: "FactoryFloor"

4. Setup Lighting:
   - Select Directional Light
   - Position: (50, 60, 30)
   - Intensity: 2
   - Enable Shadows
```

#### B. Add Manager
```
1. Create Empty GameObject (Ctrl+Shift+N)
2. Rename: "ProductionPlantManager"
3. Add Component: ProductionPlantManager
4. Add Component: AdaptiveQualityManager
```

#### C. Add Simple Components (Quick Version)

**Conveyor System:**
```
1. GameObject > 3D Object > Cube
2. Scale: (20, 0.5, 2)
3. Position: (-10, 0.25, -10)
4. Add Component: ConveyorSystemController
5. Create Item Prefab:
   - GameObject > 3D Object > Cube
   - Scale: (0.5, 0.5, 0.5)
   - Drag to Assets folder (create prefab)
   - Assign to Conveyor's "Item Prefab" field
```

**Robotic Arm:**
```
1. Create Empty GameObject
2. Rename: "RoboticArm"
3. Position: (8, 0, -10)
4. Add Component: RoboticArmController
5. Create simple arm structure:
   - Child 1: "Base" (Cube, scale 1,0.5,1)
   - Child 2: "Shoulder" (Cube, scale 0.5,2,0.5)
   - Child 3: "Elbow" (Cube, scale 0.5,1.5,0.5)
   - Child 4: "Wrist" (Cube, scale 0.3,1,0.3)
   - Child 5: "EndEffector" (Sphere, scale 0.5)
6. Assign joints in RoboticArmController inspector
```

**Silo:**
```
1. GameObject > 3D Object > Cylinder
2. Scale: (3, 6, 3)
3. Position: (-50, 6, 20)
4. Add Component: SiloController
5. Set Material Type: "Grain"
6. Set Fill Level: 0.75
```

**Boiler:**
```
1. GameObject > 3D Object > Cube
2. Scale: (4, 6, 4)
3. Position: (40, 3, 30)
4. Add Component: BoilerController
5. Add Child: Particle System (for steam)
   - Position above boiler
   - Shape: Cone
   - Start Speed: 5
```

**Cooling Tower:**
```
1. GameObject > 3D Object > Cylinder
2. Scale: (6, 10, 6)
3. Position: (60, 5, 30)
4. Add Component: CoolingTowerController
5. Create Fan Blades:
   - Child: Cube (scale 0.5, 0.1, 4)
   - Position: (0, 5, 0)
   - Assign to "Fan Blades" field
```

**Storage Tank:**
```
1. GameObject > 3D Object > Cylinder
2. Scale: (2.5, 4, 2.5)
3. Position: (-50, 4, -30)
4. Add Component: StorageTankController
5. Set Liquid Type: "Water"
6. Set Liquid Color: Blue
```

#### D. Link to Manager
```
1. Select "ProductionPlantManager"
2. Drag components to their fields:
   - Conveyor → Conveyor System
   - RoboticArm → Robotic Arm
   - Silo → Silos list (click + to add)
   - Boiler → Boilers list
   - CoolingTower → Cooling Towers list
   - StorageTank → Storage Tanks list
```

### Step 4: Test in Editor (3 min)

1. Press **Play** (Ctrl+P)
2. Select ProductionPlantManager
3. In Inspector, check boxes to activate systems:
   - ✅ Conveyor Active
   - ✅ Pick Place Active
   - ✅ Silos Active
   - ✅ Boiler Active
   - ✅ Cooling Active
   - ✅ Tanks Active
4. Watch systems animate!

### Step 5: Build for WebGL (5 min)

#### Quick Build (Desktop version only)

```
1. File > Build Settings
2. Click "WebGL" > "Switch Platform" (wait for import)
3. Click "Add Open Scenes"
4. Click "Player Settings"
   - Resolution: 1920x1080
   - Compression: Gzip
5. Click "Build"
6. Choose folder: ../frontend/public/unity-builds/desktop/
7. Wait for build (3-5 minutes)
```

### Step 6: Test in React (2 min)

```bash
# In frontend directory
npm run dev

# Open browser to localhost:5173
# Navigate to Digital Twin section
# Unity build should load automatically
```

## 🎯 Testing Checklist

- [ ] Scene plays in Unity Editor
- [ ] All systems can be toggled on/off
- [ ] Visual effects appear (particles, lights)
- [ ] WebGL build completes without errors
- [ ] Build files exist in public/unity-builds/desktop/Build/
- [ ] React app loads Unity instance
- [ ] Can control systems from React interface

## 🚀 Next Steps

### Add More Detail

1. **Better Models**: Replace primitive shapes with detailed 3D models
2. **Materials**: Create PBR materials for realistic surfaces
3. **Lighting**: Add more lights for better atmosphere
4. **Effects**: Enhance particle systems
5. **Audio**: Add sound effects

### Build All Quality Levels

```
1. Mobile Build:
   - Quality Settings > Select "Low"
   - Player Settings > Resolution: 1280x720
   - Build to: public/unity-builds/mobile/

2. Desktop Build:
   - Quality Settings > Select "Medium"
   - Player Settings > Resolution: 1920x1080
   - Build to: public/unity-builds/desktop/

3. Desktop-HQ Build:
   - Quality Settings > Select "High"
   - Player Settings > Resolution: 1920x1080
   - Build to: public/unity-builds/desktop-hq/
```

### Optimize Performance

```
1. Combine meshes: Select objects > Static > Batching Static
2. Bake lighting: Window > Rendering > Lighting > Generate Lighting
3. Use LOD: Add LODGroup component to complex objects
4. Optimize textures: Compress textures in import settings
```

## 💡 Pro Tips

### Faster Iteration
- Use **Ctrl+S** to save scene frequently
- Use **Ctrl+P** to quickly play/stop
- Use **F** to focus on selected object
- Use **Alt+Click** to orbit around object

### Better Visuals
- Add **Skybox**: Window > Rendering > Lighting > Skybox Material
- Add **Fog**: Window > Rendering > Lighting > Fog
- Add **Post-Processing**: GameObject > Volume > Global Volume

### Debug Controls
- Add this to ProductionPlantManager for keyboard controls:

```csharp
void Update()
{
    // Existing code...
    
    // Debug controls
    if (Input.GetKeyDown(KeyCode.Alpha1)) ToggleConveyor();
    if (Input.GetKeyDown(KeyCode.Alpha2)) TogglePickPlace();
    if (Input.GetKeyDown(KeyCode.Alpha3)) ToggleSilos();
    if (Input.GetKeyDown(KeyCode.Space)) EmergencyStop();
}
```

## ❓ Common Issues

### Build Errors
**Problem**: "WebGL module not installed"
**Solution**: Unity Hub > Installs > Add Modules > Check WebGL

**Problem**: "Out of memory during build"
**Solution**: Close other applications, increase virtual memory

### Performance Issues
**Problem**: Low FPS in editor
**Solution**: 
- Disable shadows temporarily
- Reduce particle count
- Use simpler materials

**Problem**: Build too large (>100MB)
**Solution**:
- Enable compression (Gzip/Brotli)
- Reduce texture sizes
- Remove unused assets

### React Integration Issues
**Problem**: Unity not loading in React
**Solution**:
- Check browser console for errors
- Verify build files are in correct location
- Check file paths in UnityDigitalTwin.jsx

## 📚 Resources

- **Unity Manual**: https://docs.unity3d.com/Manual/
- **URP Guide**: https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@latest
- **WebGL Tips**: https://docs.unity3d.com/Manual/webgl-building.html

## 🎓 Learning Path

1. **Week 1**: Basic scene setup and component placement
2. **Week 2**: Add materials and lighting
3. **Week 3**: Enhance visual effects and animations
4. **Week 4**: Optimize and build all quality levels

---

**Need Help?** Check the main README.md for detailed instructions!
