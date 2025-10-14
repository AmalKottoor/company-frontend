# Quick Start Guide - Digital Twin System

Get your advanced digital twin simulation up and running in minutes!

## 🚀 Immediate Usage (Without Unity)

You can start using the digital twin **right now** with the Three.js-based simulations. Unity is optional for enhanced graphics.

### Step 1: Import the Component

```jsx
import AdaptiveDigitalTwin from './components/AdaptiveDigitalTwin';
```

### Step 2: Add to Your Page

```jsx
function YourPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Production Plant Digital Twin
      </h1>
      
      {/* That's it! The component handles everything automatically */}
      <AdaptiveDigitalTwin showControls={true} />
    </div>
  );
}
```

### Step 3: Run Your App

```bash
npm run dev
```

**Done!** The digital twin will automatically:
- ✅ Detect your device type (mobile/tablet/desktop)
- ✅ Measure performance capabilities
- ✅ Select the optimal rendering mode
- ✅ Load the appropriate 3D simulation

---

## 📱 What You Get Out of the Box

### On Desktop (High-End)
- Large-scale production plant with 15+ components
- Industrial silos, boilers, cooling towers
- Storage tanks with liquid animations
- Conveyor systems and robotic arms
- Real-time metrics and OEE calculations
- Full camera controls (rotate, zoom, pan)
- 60 FPS smooth performance

### On Desktop (Standard)
- Same features as high-end
- Optimized for mid-range systems
- Reduced particle effects
- Efficient rendering

### On Mobile/Tablet
- Lightweight optimized version
- Core production components
- Touch-friendly controls
- 30 FPS target
- Minimal battery usage

---

## 🎮 Using the Controls

### Camera Controls
| Action | Desktop | Mobile |
|--------|---------|--------|
| Rotate | Click + Drag | Touch + Drag |
| Zoom | Mouse Wheel | Pinch |
| Pan | Right-Click + Drag | N/A |

### System Controls
1. **Start Systems**: Click individual system buttons in the control panel
2. **Stop Systems**: Click again to toggle off
3. **Emergency Stop**: Red button stops all systems immediately
4. **Reset**: Clears all metrics and resets to initial state

---

## 🔧 Customization Options

### Force Specific Mode

```jsx
// Force high-quality mode (if device supports it)
<AdaptiveDigitalTwin forceMode="advanced" showControls={true} />

// Force mobile mode (for testing or low-end devices)
<AdaptiveDigitalTwin forceMode="mobile" showControls={true} />

// Force Unity mode (requires Unity build files)
<AdaptiveDigitalTwin forceMode="unity" showControls={true} />
```

### Hide Controls

```jsx
// Minimal view without control panel
<AdaptiveDigitalTwin showControls={false} />
```

### Use Individual Components

```jsx
// Use only the advanced Three.js version
import AdvancedDigitalTwin3D from './components/AdvancedDigitalTwin3D';
<AdvancedDigitalTwin3D />

// Use only the mobile version
import MobileDigitalTwin3D from './components/MobileDigitalTwin3D';
<MobileDigitalTwin3D />
```

---

## 🎨 Styling Integration

The components use Tailwind CSS and will inherit your app's theme. They work with:
- ✅ Dark mode (default)
- ✅ Light mode (with minor adjustments)
- ✅ Custom color schemes
- ✅ Responsive layouts

### Custom Container

```jsx
<div className="my-custom-container">
  <AdaptiveDigitalTwin 
    showControls={true}
    className="rounded-xl shadow-2xl"
  />
</div>
```

---

## 📊 Available Components

### Industrial Equipment
- **Silos** (3 types): Grain, Powder, Pellets storage
- **Boilers**: Steam generation with temperature/pressure monitoring
- **Cooling Towers**: Water cooling with mist effects
- **Storage Tanks** (3 types): Water, Chemical, Oil storage

### Production Line
- **Conveyor Systems**: Moving belt with items
- **Robotic Arms**: Pick and place operations
- **Quality Inspection**: Automated checking
- **Inventory Storage**: Warehouse racks
- **AGV Systems**: Automated guided vehicles

### Monitoring
- **Control Panel**: System start/stop controls
- **Metrics Dashboard**: Real-time OEE, production stats
- **Status Indicators**: Visual system status

---

## 🔍 Checking Device Compatibility

The system automatically detects:
- Screen size and resolution
- GPU capabilities (WebGL 1/2)
- Available RAM
- CPU cores
- Network speed
- Device type

You'll see this info in the control panel when `showControls={true}`.

---

## ⚡ Performance Tips

### For Best Performance

1. **Close unnecessary browser tabs**
2. **Use latest browser version** (Chrome 90+, Firefox 88+, Safari 14+)
3. **Enable hardware acceleration** in browser settings
4. **Update graphics drivers**
5. **Use desktop mode** on capable devices

### If Performance is Poor

```jsx
// Manually select mobile mode
<AdaptiveDigitalTwin forceMode="mobile" showControls={true} />
```

Or reduce active systems in the simulation.

---

## 🐛 Troubleshooting

### Black Screen or Not Loading

**Check:**
1. Browser console for errors (F12)
2. WebGL support: Visit https://get.webgl.org/
3. JavaScript enabled
4. No ad blockers interfering

**Solution:**
```jsx
// Try mobile mode
<AdaptiveDigitalTwin forceMode="mobile" />
```

### Poor Performance

**Solution:**
```jsx
// Force mobile mode for better performance
<AdaptiveDigitalTwin forceMode="mobile" showControls={true} />
```

### Controls Not Working

**Check:**
1. Click inside the 3D viewport
2. Allow page to fully load
3. Try refreshing the page

---

## 🎯 Next Steps

### Add Unity for Enhanced Graphics (Optional)

Unity provides photorealistic graphics but requires additional setup:

1. **Read**: `UNITY_INTEGRATION_GUIDE.md`
2. **Build**: Create Unity WebGL builds
3. **Deploy**: Place builds in `public/unity-builds/`
4. **Use**: System automatically uses Unity on capable devices

### Customize Components

1. **Read**: `DIGITAL_TWIN_README.md` for detailed docs
2. **Edit**: Component files in `src/components/digital-twin/`
3. **Configure**: Settings in `src/config/digitalTwinConfig.js`

### Integrate with Backend

```jsx
import { useState, useEffect } from 'react';
import AdaptiveDigitalTwin from './components/AdaptiveDigitalTwin';

function ConnectedDigitalTwin() {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    // Fetch real-time data from your backend
    const interval = setInterval(async () => {
      const response = await fetch('/api/production-metrics');
      const data = await response.json();
      setMetrics(data);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <AdaptiveDigitalTwin showControls={true} />
      {/* Display real metrics */}
      {metrics && (
        <div className="mt-4 p-4 bg-zinc-900 rounded-lg">
          <h3>Live Metrics</h3>
          <p>Items Produced: {metrics.itemsProduced}</p>
          <p>Temperature: {metrics.temperature}°C</p>
        </div>
      )}
    </div>
  );
}
```

---

## 📚 Documentation

- **Quick Start**: This file
- **Full Documentation**: `DIGITAL_TWIN_README.md`
- **Unity Guide**: `UNITY_INTEGRATION_GUIDE.md`
- **Example Usage**: `src/examples/DigitalTwinExample.jsx`
- **Configuration**: `src/config/digitalTwinConfig.js`

---

## ✨ Features Summary

| Feature | Desktop | Mobile | Unity |
|---------|---------|--------|-------|
| Large-scale plant | ✅ | ⚠️ Simplified | ✅ Enhanced |
| Silos & Boilers | ✅ | ✅ Limited | ✅ |
| Cooling Towers | ✅ | ❌ | ✅ |
| Storage Tanks | ✅ | ✅ Limited | ✅ |
| Production Line | ✅ | ✅ | ✅ |
| Real-time Metrics | ✅ | ✅ | ✅ |
| Shadows | ✅ | ❌ | ✅ |
| Particle Effects | ✅ | ⚠️ Minimal | ✅ Enhanced |
| Touch Controls | ✅ | ✅ | ✅ |

---

## 🎉 You're Ready!

Start with the basic implementation above and explore the advanced features as needed. The system is designed to work great out of the box while offering extensive customization options.

**Happy coding!** 🚀

---

**Need Help?**
- Check `DIGITAL_TWIN_README.md` for detailed documentation
- Review example code in `src/examples/DigitalTwinExample.jsx`
- Inspect browser console for errors
- Verify WebGL support at https://get.webgl.org/
