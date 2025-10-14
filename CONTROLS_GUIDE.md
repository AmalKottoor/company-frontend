# Digital Twin Controls Guide

## 🎮 Quick Reference

### Camera Controls
| Action | Desktop | Mobile |
|--------|---------|--------|
| **Rotate View** | Left Click + Drag | Touch + Drag |
| **Zoom In/Out** | Mouse Wheel | Pinch |
| **Pan Camera** | Right Click + Drag | Not Available |

---

## 🏢 Interactive Buildings

### Control Room (Blue Glass Building)
**Location:** Right side of facility

**How to Access:**
1. Look for building with blue glass front
2. Click on the **dark control panel** inside
3. Control panel will pop up

**Features:**
- 🟢 **AUTO Mode** - Systems run automatically
- 🔵 **MANUAL Mode** - Click buttons to control systems
- 🛑 **Emergency Stop** - Immediate shutdown
- ↻ **Reset All** - Clear all metrics

**Individual System Controls (Manual Mode Only):**
- Conveyor
- Pick Place Robot
- Quality Check
- Inventory
- AGV
- Silos
- Boiler
- Cooling Tower
- Tanks

---

### Monitoring Room (Purple Glass Building)
**Location:** Right side, next to Control Room

**How to Access:**
1. Look for building with purple glass front
2. Click on the **dark dashboard panel** inside
3. Metrics dashboard will open

**Metrics Displayed:**

#### OEE Section (Purple)
- Overall Equipment Effectiveness
- Availability %
- Performance %
- Quality %

#### Production Metrics (Cyan)
- Items Produced
- Items Processed
- Throughput (items/min)
- Cycle Time (seconds)
- Defects
- Scrap Rate %

#### Reliability Metrics (Yellow)
- MTBF (Mean Time Between Failures)
- MTTR (Mean Time To Repair)
- Uptime (hours)
- Downtime (hours)

#### Resource Consumption (Orange)
- Energy (kWh)
- Water (Liters)

#### Environmental Status (Green)
- Boiler Temperature
- Cooling Water Temperature
- Average Silo Fill Level

---

## 🏭 Equipment Locations

### Production Building (Gray Building - Left Side)
**Contains:**
- Conveyor Belt System
- Pick & Place Robotic Arm
- Quality Inspection Station
- Inventory Storage Racks
- AGV (Automated Guided Vehicle)

**View:** Look through large front opening

---

### Outdoor Equipment

#### Silos (Far Left)
- **Grain Silo** - Tallest (14m)
- **Powder Silo** - Medium (10m)
- **Pellets Silo** - Large (12m)

#### Utilities (Right Side, Outdoor)
- **Industrial Boiler** - With steam effects
- **Cooling Tower** - With rotating fan and mist

#### Storage Tanks (Left Side, Outdoor)
- **Water Tank** - Blue liquid
- **Chemical Tank** - Purple liquid
- **Oil Tank** - Orange liquid

---

## 🎯 Operating Modes

### AUTO Mode (Recommended for Demos)
```
✅ Systems operate automatically
✅ Optimal production flow
✅ No manual intervention needed
❌ Cannot click individual controls
```

**Best For:**
- Demonstrations
- Presentations
- Observing full operation
- Testing overall system

---

### MANUAL Mode (Hands-On Control)
```
✅ Full control over each system
✅ Click buttons to start/stop
✅ Educational and training
✅ Troubleshooting scenarios
```

**Best For:**
- Training sessions
- Testing individual systems
- Troubleshooting
- Learning equipment operation

---

## 🚨 Emergency Controls

### Emergency Stop
**Location:** Control Room panel (Red button)

**What it does:**
- Immediately stops ALL systems
- Overrides AUTO/MANUAL mode
- Prevents any system activation
- Safety feature

**To Resume:**
1. Click Emergency Stop again to deactivate
2. Systems remain stopped
3. Manually restart in MANUAL mode
4. Or switch to AUTO mode

---

### Reset All
**Location:** Control Room panel (Gray button)

**What it does:**
- Stops all systems
- Clears all metrics to zero
- Resets counters
- Fresh start

**Use When:**
- Starting new demonstration
- Clearing old data
- Testing from beginning

---

## 📊 Understanding Metrics

### OEE (Overall Equipment Effectiveness)
**Formula:** Availability × Performance × Quality

**Target:** 85%+ is world-class

**What it means:**
- **100%** = Perfect operation
- **85%+** = Excellent
- **60-85%** = Good
- **<60%** = Needs improvement

---

### Availability
**Formula:** Uptime / (Uptime + Downtime)

**What it measures:** How often equipment is running

---

### Performance
**Formula:** Actual Output / Ideal Output

**What it measures:** How fast equipment runs vs maximum speed

---

### Quality
**Formula:** Good Parts / Total Parts

**What it measures:** Percentage of defect-free products

---

### Throughput
**Formula:** Items Produced / Time (per minute)

**What it measures:** Production rate

---

### Cycle Time
**Formula:** Time / Items Produced (seconds per item)

**What it measures:** How long each item takes

---

### MTBF (Mean Time Between Failures)
**What it measures:** Average operating time before failure

**Higher is better** - More reliable equipment

---

### MTTR (Mean Time To Repair)
**What it measures:** Average time to fix failures

**Lower is better** - Faster repairs

---

## 🎨 Visual Indicators

### Status Lights

**Control Room:**
- 🟢 **Green Light** = AUTO mode active
- 🔵 **Blue Light** = MANUAL mode active

**System Buttons:**
- 🟢 **Green Border** = System running
- ⚫ **Gray** = System stopped

**Emergency Stop:**
- 🔴 **Red** = Always visible
- Glowing when active

---

### Equipment Status

**Active Equipment:**
- Moving parts (conveyors, fans)
- Glowing indicators
- Particle effects (steam, discharge)
- Animated components

**Inactive Equipment:**
- Stationary
- Dim lights
- No effects
- Still appearance

---

## 💡 Pro Tips

### For Best Experience

1. **Start in AUTO mode** to see everything working
2. **Click Monitoring Room** to see live metrics
3. **Switch to MANUAL** to control individual systems
4. **Zoom in close** to see equipment details
5. **Rotate around** to explore all angles

### Navigation Tips

1. **Find Control Room** - Look for blue glass building on right
2. **Find Monitoring Room** - Purple glass building next to control room
3. **Find Production** - Large gray building on left
4. **Find Silos** - Tall cylinders on far left
5. **Find Utilities** - Boiler and cooling tower on right (outdoor)

### Troubleshooting

**Can't click controls?**
- Make sure you're in MANUAL mode
- Emergency Stop might be active
- Click directly on the dark panel

**Metrics not updating?**
- Systems need to be running
- Check if Emergency Stop is active
- Try Reset All and restart

**Can't see equipment?**
- Zoom out for full view
- Rotate camera around
- Check you're looking at correct area

---

## 🎓 Training Scenarios

### Scenario 1: Full Production Run
1. Open Control Room
2. Select AUTO mode
3. Watch systems operate
4. Open Monitoring Room
5. Observe OEE metrics

### Scenario 2: Manual Operation
1. Open Control Room
2. Select MANUAL mode
3. Start Conveyor
4. Start Pick & Place Robot
5. Start Quality Check
6. Monitor production

### Scenario 3: Emergency Response
1. Systems running in AUTO
2. Click Emergency Stop
3. All systems halt
4. Deactivate Emergency Stop
5. Switch to MANUAL
6. Restart systems individually

### Scenario 4: Metrics Analysis
1. Run systems for 2-3 minutes
2. Open Monitoring Room
3. Check OEE score
4. Identify bottlenecks
5. Adjust operations

---

## 📞 Quick Help

**Nothing is working?**
- Refresh the browser
- Check Emergency Stop is OFF
- Try Reset All

**Controls not responding?**
- Click directly on dark panels
- Make sure panel is visible
- Try zooming in closer

**Performance issues?**
- Close other browser tabs
- Reduce browser zoom level
- Try refreshing page

---

**Enjoy exploring your digital twin!** 🏭
