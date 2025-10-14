# Unity WebGL Integration Guide for Digital Twin

This guide explains how to create and integrate Unity-built production plant simulations into your React application.

## Table of Contents
1. [Unity Project Setup](#unity-project-setup)
2. [Creating the Production Plant in Unity](#creating-the-production-plant)
3. [Building for WebGL](#building-for-webgl)
4. [Integration with React](#integration-with-react)
5. [Performance Optimization](#performance-optimization)
6. [Troubleshooting](#troubleshooting)

---

## Unity Project Setup

### Prerequisites
- **Unity 2021.3 LTS or newer** (recommended for WebGL stability)
- **Unity WebGL Build Support** module installed
- **Visual Studio** or **Visual Studio Code** for scripting
- At least **8GB RAM** for development
- **Modern browser** with WebGL 2.0 support for testing

### 1. Create New Unity Project

```bash
# Create a new 3D Unity project
# Use Universal Render Pipeline (URP) for better performance
```

**Project Settings:**
- Template: **3D (URP)** or **3D Core**
- Project Name: `ProductionPlantDigitalTwin`
- Location: Choose your preferred directory

### 2. Install Required Packages

Open **Window > Package Manager** and install:
- ✅ **Universal RP** (for better graphics and performance)
- ✅ **Post Processing** (optional, for visual effects)
- ✅ **ProBuilder** (optional, for quick 3D modeling)
- ✅ **Cinemachine** (optional, for camera controls)

---

## Creating the Production Plant in Unity

### Scene Structure

Create a hierarchical scene structure for organization:

```
ProductionPlant (Scene)
├── Environment
│   ├── Floor
│   ├── Lighting
│   └── Skybox
├── RawMaterials
│   ├── Silo_Grain
│   ├── Silo_Powder
│   └── Silo_Pellets
├── Utilities
│   ├── Boiler_01
│   ├── CoolingTower_01
│   └── WaterTreatment
├── Storage
│   ├── Tank_Water
│   ├── Tank_Chemical
│   └── Tank_Oil
├── ProductionLine
│   ├── ConveyorSystem
│   ├── RoboticArm_01
│   ├── QualityInspection
│   └── PackagingStation
├── Infrastructure
│   ├── Pipelines
│   ├── ElectricalCables
│   └── SafetyBarriers
├── Cameras
│   ├── MainCamera
│   └── OverviewCamera
└── UI
    ├── Canvas
    └── ControlPanel
```

### 3D Models and Assets

#### Option 1: Use Asset Store
Download industrial assets from Unity Asset Store:
- Search for "Industrial Equipment"
- Search for "Factory"
- Search for "Conveyor System"
- Free options: "Industrial Props Pack", "Factory Environment"

#### Option 2: Create Custom Models

**Example: Industrial Silo**

```csharp
// SiloController.cs
using UnityEngine;

public class SiloController : MonoBehaviour
{
    [Header("Silo Settings")]
    public string materialType = "Grain";
    public float capacity = 500f; // Tons
    public float fillLevel = 0.75f; // 0 to 1
    
    [Header("Visual Components")]
    public GameObject fillIndicator;
    public Material fillMaterial;
    public ParticleSystem dischargeParticles;
    
    [Header("Status")]
    public bool isDischarging = false;
    
    private void Update()
    {
        // Update fill level visualization
        if (fillIndicator != null)
        {
            float targetY = fillLevel * 10f; // Adjust based on silo height
            fillIndicator.transform.localScale = new Vector3(1, fillLevel, 1);
        }
        
        // Control discharge particles
        if (dischargeParticles != null)
        {
            if (isDischarging && !dischargeParticles.isPlaying)
                dischargeParticles.Play();
            else if (!isDischarging && dischargeParticles.isPlaying)
                dischargeParticles.Stop();
        }
    }
    
    // Called from JavaScript
    public void SetFillLevel(float level)
    {
        fillLevel = Mathf.Clamp01(level);
    }
    
    public void SetDischarging(bool state)
    {
        isDischarging = state;
    }
}
```

**Example: Industrial Boiler**

```csharp
// BoilerController.cs
using UnityEngine;

public class BoilerController : MonoBehaviour
{
    [Header("Boiler Parameters")]
    public float temperature = 180f; // Celsius
    public float pressure = 15f; // Bar
    public float steamOutput = 0.7f; // 0 to 1
    
    [Header("Visual Effects")]
    public ParticleSystem steamEffect;
    public Light flameLight;
    public Material flameMaterial;
    
    [Header("Status")]
    public bool isOperating = false;
    
    private void Update()
    {
        // Update visual effects based on operation
        if (isOperating)
        {
            // Steam effect
            if (steamEffect != null && !steamEffect.isPlaying)
                steamEffect.Play();
            
            // Flame light flicker
            if (flameLight != null)
            {
                flameLight.intensity = 2f + Mathf.Sin(Time.time * 10f) * 0.3f;
            }
            
            // Temperature increase
            temperature = Mathf.Min(temperature + Time.deltaTime * 2f, 200f);
        }
        else
        {
            // Cool down
            temperature = Mathf.Max(temperature - Time.deltaTime * 1f, 25f);
            
            if (steamEffect != null && steamEffect.isPlaying)
                steamEffect.Stop();
            
            if (flameLight != null)
                flameLight.intensity = 0f;
        }
    }
    
    // JavaScript communication methods
    public void SetOperating(bool state)
    {
        isOperating = state;
    }
    
    public void SetTemperature(float temp)
    {
        temperature = Mathf.Clamp(temp, 0f, 250f);
    }
    
    public float GetTemperature()
    {
        return temperature;
    }
}
```

**Example: Cooling Tower**

```csharp
// CoolingTowerController.cs
using UnityEngine;

public class CoolingTowerController : MonoBehaviour
{
    [Header("Cooling Parameters")]
    public float waterTemperature = 35f; // Celsius
    public float flowRate = 85f; // Percentage
    
    [Header("Components")]
    public Transform fanBlades;
    public ParticleSystem mistEffect;
    public float fanSpeed = 100f;
    
    [Header("Status")]
    public bool isActive = false;
    
    private void Update()
    {
        if (isActive)
        {
            // Rotate fan blades
            if (fanBlades != null)
            {
                fanBlades.Rotate(Vector3.up, fanSpeed * Time.deltaTime);
            }
            
            // Mist effect
            if (mistEffect != null && !mistEffect.isPlaying)
                mistEffect.Play();
            
            // Cool water
            waterTemperature = Mathf.Max(waterTemperature - Time.deltaTime * 0.5f, 25f);
        }
        else
        {
            // Slow down fan
            if (fanBlades != null)
            {
                fanBlades.Rotate(Vector3.up, fanSpeed * 0.1f * Time.deltaTime);
            }
            
            if (mistEffect != null && mistEffect.isPlaying)
                mistEffect.Stop();
            
            // Water warms up
            waterTemperature = Mathf.Min(waterTemperature + Time.deltaTime * 0.3f, 45f);
        }
    }
    
    public void SetActive(bool state)
    {
        isActive = state;
    }
    
    public float GetWaterTemperature()
    {
        return waterTemperature;
    }
}
```

### Main Controller Script

Create a master controller to manage all systems:

```csharp
// ProductionPlantManager.cs
using UnityEngine;
using System.Collections.Generic;

public class ProductionPlantManager : MonoBehaviour
{
    [Header("System References")]
    public List<SiloController> silos;
    public List<BoilerController> boilers;
    public List<CoolingTowerController> coolingTowers;
    public List<StorageTankController> storageTanks;
    
    [Header("Production Metrics")]
    public int itemsProduced = 0;
    public int itemsProcessed = 0;
    public float energyConsumption = 0f;
    
    private static ProductionPlantManager instance;
    
    void Awake()
    {
        instance = this;
    }
    
    // JavaScript callable methods
    public void StartAllSystems()
    {
        foreach (var silo in silos) silo.SetDischarging(true);
        foreach (var boiler in boilers) boiler.SetOperating(true);
        foreach (var tower in coolingTowers) tower.SetActive(true);
    }
    
    public void StopAllSystems()
    {
        foreach (var silo in silos) silo.SetDischarging(false);
        foreach (var boiler in boilers) boiler.SetOperating(false);
        foreach (var tower in coolingTowers) tower.SetActive(false);
    }
    
    public void EmergencyStop()
    {
        StopAllSystems();
        Debug.Log("EMERGENCY STOP ACTIVATED");
    }
    
    public string GetSystemStatus()
    {
        return JsonUtility.ToJson(new SystemStatus
        {
            itemsProduced = itemsProduced,
            energyConsumption = energyConsumption,
            boilerTemp = boilers.Count > 0 ? boilers[0].GetTemperature() : 0f
        });
    }
}

[System.Serializable]
public class SystemStatus
{
    public int itemsProduced;
    public float energyConsumption;
    public float boilerTemp;
}
```

---

## Building for WebGL

### Build Settings Configuration

1. **Open Build Settings**: `File > Build Settings`
2. **Select WebGL Platform**: Click "WebGL" and then "Switch Platform"
3. **Player Settings**: Click "Player Settings" button

### Player Settings Optimization

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

#### Quality Settings
```
- Create 3 quality presets:
  1. Mobile (Low) - For mobile devices
  2. Desktop (Medium) - For standard desktops
  3. Desktop-HQ (High) - For high-end systems
```

**Mobile Quality Settings:**
- Pixel Light Count: 1
- Texture Quality: Half Res
- Anisotropic Textures: Disabled
- Anti Aliasing: Disabled
- Soft Particles: Disabled
- Shadows: Disabled

**Desktop Quality Settings:**
- Pixel Light Count: 4
- Texture Quality: Full Res
- Anisotropic Textures: Per Texture
- Anti Aliasing: 2x Multi Sampling
- Soft Particles: Enabled
- Shadows: Hard Shadows Only

**Desktop-HQ Quality Settings:**
- Pixel Light Count: 8
- Texture Quality: Full Res
- Anisotropic Textures: Forced On
- Anti Aliasing: 4x Multi Sampling
- Soft Particles: Enabled
- Shadows: All

### Build Process

#### 1. Create Build Folders

Create three separate builds for different quality levels:

```
public/unity-builds/
├── mobile/
│   └── Build/
├── desktop/
│   └── Build/
└── desktop-hq/
    └── Build/
```

#### 2. Build for Mobile

```
1. Set Quality Level to "Mobile"
2. Player Settings > Resolution:
   - Default Canvas Width: 1280
   - Default Canvas Height: 720
3. Build Settings > Build
4. Output to: public/unity-builds/mobile/
5. Build name: ProductionPlantMobile
```

#### 3. Build for Desktop

```
1. Set Quality Level to "Desktop"
2. Player Settings > Resolution:
   - Default Canvas Width: 1920
   - Default Canvas Height: 1080
3. Build Settings > Build
4. Output to: public/unity-builds/desktop/
5. Build name: ProductionPlant
```

#### 4. Build for Desktop-HQ

```
1. Set Quality Level to "Desktop-HQ"
2. Player Settings > Resolution:
   - Default Canvas Width: 1920
   - Default Canvas Height: 1080
3. Build Settings > Build
4. Output to: public/unity-builds/desktop-hq/
5. Build name: ProductionPlantHQ
```

### Build Output Structure

After building, your folder structure should look like:

```
public/unity-builds/
├── mobile/
│   ├── Build/
│   │   ├── ProductionPlantMobile.data
│   │   ├── ProductionPlantMobile.framework.js
│   │   ├── ProductionPlantMobile.loader.js
│   │   └── ProductionPlantMobile.wasm
│   ├── StreamingAssets/
│   └── index.html
├── desktop/
│   ├── Build/
│   │   ├── ProductionPlant.data
│   │   ├── ProductionPlant.framework.js
│   │   ├── ProductionPlant.loader.js
│   │   └── ProductionPlant.wasm
│   ├── StreamingAssets/
│   └── index.html
└── desktop-hq/
    ├── Build/
    │   ├── ProductionPlantHQ.data
    │   ├── ProductionPlantHQ.framework.js
    │   ├── ProductionPlantHQ.loader.js
    │   └── ProductionPlantHQ.wasm
    ├── StreamingAssets/
    └── index.html
```

---

## Integration with React

### Using the UnityDigitalTwin Component

The `UnityDigitalTwin` component automatically detects device capabilities and loads the appropriate build.

```jsx
import AdaptiveDigitalTwin from './components/AdaptiveDigitalTwin';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1>Production Plant Digital Twin</h1>
      
      {/* Adaptive mode - automatically selects best option */}
      <AdaptiveDigitalTwin showControls={true} />
      
      {/* Force Unity mode */}
      <AdaptiveDigitalTwin forceMode="unity" showControls={true} />
      
      {/* Force Advanced Three.js mode */}
      <AdaptiveDigitalTwin forceMode="advanced" showControls={true} />
      
      {/* Force Mobile mode */}
      <AdaptiveDigitalTwin forceMode="mobile" showControls={true} />
    </div>
  );
}
```

### Communicating with Unity

#### From React to Unity

```jsx
import { useRef } from 'react';
import UnityDigitalTwin from './components/UnityDigitalTwin';

function ControlPanel() {
  const unityRef = useRef(null);
  
  const startProduction = () => {
    // Send message to Unity
    if (unityRef.current) {
      unityRef.current.sendMessageToUnity(
        'ProductionPlantManager', 
        'StartAllSystems', 
        ''
      );
    }
  };
  
  const stopProduction = () => {
    if (unityRef.current) {
      unityRef.current.sendMessageToUnity(
        'ProductionPlantManager', 
        'StopAllSystems', 
        ''
      );
    }
  };
  
  return (
    <div>
      <UnityDigitalTwin ref={unityRef} />
      <button onClick={startProduction}>Start Production</button>
      <button onClick={stopProduction}>Stop Production</button>
    </div>
  );
}
```

#### From Unity to React

In Unity, use `Application.ExternalCall()` or `SendMessage()`:

```csharp
// In Unity script
using UnityEngine;
using System.Runtime.InteropServices;

public class UnityToReactBridge : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void SendMetricsToReact(string jsonData);
    
    public void UpdateMetrics()
    {
        var metrics = new {
            itemsProduced = 100,
            temperature = 180.5f,
            pressure = 15.2f
        };
        
        string json = JsonUtility.ToJson(metrics);
        
        #if UNITY_WEBGL && !UNITY_EDITOR
        SendMetricsToReact(json);
        #endif
    }
}
```

In your HTML template (index.html in Unity build):

```javascript
// Add to Unity's index.html
mergeInto(LibraryManager.library, {
    SendMetricsToReact: function(jsonData) {
        var data = UTF8ToString(jsonData);
        window.parent.postMessage({
            type: 'UNITY_METRICS',
            data: JSON.parse(data)
        }, '*');
    }
});
```

---

## Performance Optimization

### Unity Optimization Tips

#### 1. Reduce Draw Calls
```csharp
// Combine meshes
StaticBatchingUtility.Combine(gameObjects, root);

// Use GPU instancing for repeated objects
material.enableInstancing = true;
```

#### 2. Optimize Textures
- Use compressed texture formats (DXT, ETC2)
- Reduce texture resolution where possible
- Use texture atlases to reduce draw calls
- Enable mipmaps for distant objects

#### 3. Optimize Lighting
```csharp
// Use baked lighting instead of realtime
// In Lighting window:
// - Mixed Lighting > Baked Global Illumination: ✅
// - Realtime Lighting > Realtime Global Illumination: ❌
```

#### 4. LOD (Level of Detail)
```csharp
// Add LOD Group component to complex objects
LODGroup lodGroup = gameObject.AddComponent<LODGroup>();
LOD[] lods = new LOD[3];

// LOD 0 (close) - full detail
lods[0] = new LOD(0.6f, highDetailRenderers);

// LOD 1 (medium) - reduced detail
lods[1] = new LOD(0.3f, mediumDetailRenderers);

// LOD 2 (far) - low detail
lods[2] = new LOD(0.1f, lowDetailRenderers);

lodGroup.SetLODs(lods);
```

#### 5. Occlusion Culling
```
Window > Rendering > Occlusion Culling
- Bake occlusion data for static objects
- Reduces rendering of objects behind other objects
```

### WebGL Specific Optimizations

#### 1. Code Stripping
```
Player Settings > Other Settings > Managed Stripping Level: High
```

#### 2. Compression
```
Publishing Settings > Compression Format: Brotli
```

#### 3. Memory Management
```csharp
// Unload unused assets periodically
Resources.UnloadUnusedAssets();
System.GC.Collect();
```

---

## Troubleshooting

### Common Issues

#### 1. Build Files Not Loading

**Problem**: Unity build files return 404 errors

**Solution**:
- Verify files are in `public/unity-builds/` directory
- Check file paths in `UnityDigitalTwin.jsx` match your build names
- Ensure build files are committed to version control
- Check server configuration allows `.data`, `.wasm`, `.framework.js` files

#### 2. WebGL Not Supported

**Problem**: Browser doesn't support WebGL

**Solution**:
- Check browser compatibility: Chrome 90+, Firefox 88+, Safari 14+
- Enable hardware acceleration in browser settings
- Update graphics drivers
- Fallback to Three.js version automatically

#### 3. Performance Issues

**Problem**: Simulation runs slowly

**Solution**:
- Reduce quality settings in Unity
- Disable shadows and post-processing
- Use mobile build on lower-end devices
- Implement LOD system
- Reduce particle effects

#### 4. Memory Errors

**Problem**: "Out of memory" errors in browser

**Solution**:
```csharp
// In Unity, reduce memory usage:
// 1. Compress textures more aggressively
// 2. Reduce audio quality
// 3. Use object pooling instead of instantiation
// 4. Unload unused assets
```

#### 5. Communication Issues

**Problem**: React can't send messages to Unity

**Solution**:
- Ensure Unity instance is fully loaded before sending messages
- Check GameObject and method names are correct
- Verify GameObject is active in scene
- Use try-catch blocks for error handling

---

## Testing Checklist

### Before Deployment

- [ ] Test on Chrome (latest version)
- [ ] Test on Firefox (latest version)
- [ ] Test on Safari (latest version)
- [ ] Test on mobile devices (iOS and Android)
- [ ] Test on different screen sizes
- [ ] Verify all interactive elements work
- [ ] Check loading times (should be < 10 seconds)
- [ ] Verify memory usage (should be < 500MB)
- [ ] Test React-Unity communication
- [ ] Check console for errors
- [ ] Verify fallback to Three.js works
- [ ] Test emergency stop functionality
- [ ] Verify metrics update correctly

---

## Additional Resources

### Unity Documentation
- [Unity WebGL Documentation](https://docs.unity3d.com/Manual/webgl.html)
- [Unity Optimization Guide](https://docs.unity3d.com/Manual/OptimizingGraphicsPerformance.html)
- [Unity Scripting API](https://docs.unity3d.com/ScriptReference/)

### WebGL Resources
- [WebGL Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)
- [Can I Use WebGL](https://caniuse.com/webgl)

### Performance Tools
- Chrome DevTools Performance Tab
- Unity Profiler (for development)
- WebGL Insight Chrome Extension

---

## Support

For issues or questions:
1. Check Unity Console for errors
2. Check Browser Console for JavaScript errors
3. Review this guide's Troubleshooting section
4. Check Unity Forums and Stack Overflow

---

**Last Updated**: 2024
**Unity Version**: 2021.3 LTS or newer
**React Version**: 19.0.0
