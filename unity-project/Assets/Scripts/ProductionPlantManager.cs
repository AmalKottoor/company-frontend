using UnityEngine;
using System.Collections.Generic;
using System.Runtime.InteropServices;

/// <summary>
/// Main Production Plant Manager
/// Coordinates all systems and communicates with React frontend
/// </summary>
public class ProductionPlantManager : MonoBehaviour
{
    [Header("System References")]
    public List<SiloController> silos = new List<SiloController>();
    public List<BoilerController> boilers = new List<BoilerController>();
    public List<CoolingTowerController> coolingTowers = new List<CoolingTowerController>();
    public List<StorageTankController> storageTanks = new List<StorageTankController>();
    public ConveyorSystemController conveyorSystem;
    public RoboticArmController roboticArm;
    public QualityInspectionController qualityInspection;
    public InventoryStorageController inventoryStorage;
    public AGVController agvSystem;

    [Header("Production Metrics")]
    public int itemsProduced = 0;
    public int itemsProcessed = 0;
    public int storedItems = 0;
    public int deliveriesCompleted = 0;
    public int defects = 0;
    public float uptime = 0f;
    public float downtime = 0f;
    public float energyConsumption = 0f;
    public float waterUsage = 0f;

    [Header("System Status")]
    public bool conveyorActive = false;
    public bool pickPlaceActive = false;
    public bool qualityCheckActive = false;
    public bool inventoryActive = false;
    public bool agvActive = false;
    public bool silosActive = false;
    public bool boilerActive = false;
    public bool coolingActive = false;
    public bool tanksActive = false;
    public bool emergencyStop = false;

    [Header("OEE Metrics")]
    public float oee = 0f;
    public float availability = 0f;
    public float performance = 0f;
    public float quality = 0f;

    private static ProductionPlantManager instance;
    private float metricsUpdateTimer = 0f;
    private const float METRICS_UPDATE_INTERVAL = 1f;

    // JavaScript communication
    [DllImport("__Internal")]
    private static extern void SendMetricsToReact(string jsonData);

    void Awake()
    {
        instance = this;
    }

    void Start()
    {
        // Auto-discover components if not assigned
        if (silos.Count == 0)
            silos.AddRange(FindObjectsOfType<SiloController>());
        if (boilers.Count == 0)
            boilers.AddRange(FindObjectsOfType<BoilerController>());
        if (coolingTowers.Count == 0)
            coolingTowers.AddRange(FindObjectsOfType<CoolingTowerController>());
        if (storageTanks.Count == 0)
            storageTanks.AddRange(FindObjectsOfType<StorageTankController>());

        if (conveyorSystem == null)
            conveyorSystem = FindObjectOfType<ConveyorSystemController>();
        if (roboticArm == null)
            roboticArm = FindObjectOfType<RoboticArmController>();
        if (qualityInspection == null)
            qualityInspection = FindObjectOfType<QualityInspectionController>();
        if (inventoryStorage == null)
            inventoryStorage = FindObjectOfType<InventoryStorageController>();
        if (agvSystem == null)
            agvSystem = FindObjectOfType<AGVController>();
    }

    void Update()
    {
        if (emergencyStop) return;

        // Update metrics
        metricsUpdateTimer += Time.deltaTime;
        if (metricsUpdateTimer >= METRICS_UPDATE_INTERVAL)
        {
            UpdateMetrics();
            CalculateOEE();
            SendMetricsUpdate();
            metricsUpdateTimer = 0f;
        }
    }

    void UpdateMetrics()
    {
        // Production metrics
        if (conveyorActive && conveyorSystem != null)
        {
            itemsProduced++;
        }

        if (pickPlaceActive && roboticArm != null)
        {
            itemsProcessed++;
        }

        if (agvActive && inventoryActive)
        {
            if (Random.value > 0.7f)
            {
                storedItems = Mathf.Min(storedItems + 1, 48);
                deliveriesCompleted++;
            }
        }

        if (qualityCheckActive && Random.value > 0.95f)
        {
            defects++;
        }

        // Energy and water consumption
        int activeCount = 0;
        if (conveyorActive) activeCount++;
        if (pickPlaceActive) activeCount++;
        if (qualityCheckActive) activeCount++;
        if (inventoryActive) activeCount++;
        if (agvActive) activeCount++;
        if (silosActive) activeCount++;
        if (boilerActive) activeCount++;
        if (coolingActive) activeCount++;
        if (tanksActive) activeCount++;

        energyConsumption += activeCount * 0.5f;

        if (coolingActive || boilerActive)
        {
            waterUsage += 0.3f;
        }

        // Uptime/Downtime
        if (activeCount > 0)
        {
            uptime += METRICS_UPDATE_INTERVAL;
        }
        else
        {
            downtime += METRICS_UPDATE_INTERVAL;
        }
    }

    void CalculateOEE()
    {
        float totalTime = uptime + downtime;
        availability = totalTime > 0 ? (uptime / totalTime) * 100f : 0f;

        float idealCycleTime = 1f;
        float actualCycleTime = uptime > 0 ? itemsProduced / uptime : 0f;
        performance = idealCycleTime > 0 ? Mathf.Min((actualCycleTime / idealCycleTime) * 100f, 100f) : 0f;

        quality = itemsProduced > 0 ? ((itemsProduced - defects) / (float)itemsProduced) * 100f : 100f;

        oee = (availability * performance * quality) / 10000f;
    }

    void SendMetricsUpdate()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        var metricsData = new MetricsData
        {
            itemsProduced = itemsProduced,
            itemsProcessed = itemsProcessed,
            storedItems = storedItems,
            deliveriesCompleted = deliveriesCompleted,
            defects = defects,
            uptime = uptime,
            downtime = downtime,
            energyConsumption = energyConsumption,
            waterUsage = waterUsage,
            oee = oee,
            availability = availability,
            performance = performance,
            quality = quality
        };

        string json = JsonUtility.ToJson(metricsData);
        SendMetricsToReact(json);
#endif
    }

    // ===== PUBLIC METHODS CALLABLE FROM JAVASCRIPT =====

    public void StartAllSystems()
    {
        if (emergencyStop) return;

        conveyorActive = true;
        pickPlaceActive = true;
        qualityCheckActive = true;
        inventoryActive = true;
        agvActive = true;
        silosActive = true;
        boilerActive = true;
        coolingActive = true;
        tanksActive = true;

        ApplySystemStates();
    }

    public void StopAllSystems()
    {
        conveyorActive = false;
        pickPlaceActive = false;
        qualityCheckActive = false;
        inventoryActive = false;
        agvActive = false;
        silosActive = false;
        boilerActive = false;
        coolingActive = false;
        tanksActive = false;

        ApplySystemStates();
    }

    public void ToggleConveyor()
    {
        if (emergencyStop) return;
        conveyorActive = !conveyorActive;
        if (conveyorSystem != null) conveyorSystem.SetActive(conveyorActive);
    }

    public void TogglePickPlace()
    {
        if (emergencyStop) return;
        pickPlaceActive = !pickPlaceActive;
        if (roboticArm != null) roboticArm.SetActive(pickPlaceActive);
    }

    public void ToggleQualityCheck()
    {
        if (emergencyStop) return;
        qualityCheckActive = !qualityCheckActive;
        if (qualityInspection != null) qualityInspection.SetActive(qualityCheckActive);
    }

    public void ToggleInventory()
    {
        if (emergencyStop) return;
        inventoryActive = !inventoryActive;
        if (inventoryStorage != null) inventoryStorage.SetActive(inventoryActive);
    }

    public void ToggleAGV()
    {
        if (emergencyStop) return;
        agvActive = !agvActive;
        if (agvSystem != null) agvSystem.SetActive(agvActive);
    }

    public void ToggleSilos()
    {
        if (emergencyStop) return;
        silosActive = !silosActive;
        foreach (var silo in silos)
        {
            if (silo != null) silo.SetActive(silosActive);
        }
    }

    public void ToggleBoiler()
    {
        if (emergencyStop) return;
        boilerActive = !boilerActive;
        foreach (var boiler in boilers)
        {
            if (boiler != null) boiler.SetOperating(boilerActive);
        }
    }

    public void ToggleCooling()
    {
        if (emergencyStop) return;
        coolingActive = !coolingActive;
        foreach (var tower in coolingTowers)
        {
            if (tower != null) tower.SetActive(coolingActive);
        }
    }

    public void ToggleTanks()
    {
        if (emergencyStop) return;
        tanksActive = !tanksActive;
        foreach (var tank in storageTanks)
        {
            if (tank != null) tank.SetActive(tanksActive);
        }
    }

    public void EmergencyStop()
    {
        emergencyStop = !emergencyStop;

        if (emergencyStop)
        {
            StopAllSystems();
        }

        Debug.Log(emergencyStop ? "EMERGENCY STOP ACTIVATED" : "EMERGENCY STOP RELEASED");
    }

    public void ResetAll()
    {
        StopAllSystems();
        emergencyStop = false;

        itemsProduced = 0;
        itemsProcessed = 0;
        storedItems = 0;
        deliveriesCompleted = 0;
        defects = 0;
        uptime = 0f;
        downtime = 0f;
        energyConsumption = 0f;
        waterUsage = 0f;

        Debug.Log("All systems reset");
    }

    void ApplySystemStates()
    {
        if (conveyorSystem != null) conveyorSystem.SetActive(conveyorActive);
        if (roboticArm != null) roboticArm.SetActive(pickPlaceActive);
        if (qualityInspection != null) qualityInspection.SetActive(qualityCheckActive);
        if (inventoryStorage != null) inventoryStorage.SetActive(inventoryActive);
        if (agvSystem != null) agvSystem.SetActive(agvActive);

        foreach (var silo in silos)
        {
            if (silo != null) silo.SetActive(silosActive);
        }

        foreach (var boiler in boilers)
        {
            if (boiler != null) boiler.SetOperating(boilerActive);
        }

        foreach (var tower in coolingTowers)
        {
            if (tower != null) tower.SetActive(coolingActive);
        }

        foreach (var tank in storageTanks)
        {
            if (tank != null) tank.SetActive(tanksActive);
        }
    }

    public string GetSystemStatus()
    {
        var status = new SystemStatusData
        {
            conveyor = conveyorActive,
            pickPlace = pickPlaceActive,
            qualityCheck = qualityCheckActive,
            inventory = inventoryActive,
            agv = agvActive,
            silos = silosActive,
            boiler = boilerActive,
            cooling = coolingActive,
            tanks = tanksActive,
            emergencyStop = emergencyStop
        };

        return JsonUtility.ToJson(status);
    }
}

[System.Serializable]
public class MetricsData
{
    public int itemsProduced;
    public int itemsProcessed;
    public int storedItems;
    public int deliveriesCompleted;
    public int defects;
    public float uptime;
    public float downtime;
    public float energyConsumption;
    public float waterUsage;
    public float oee;
    public float availability;
    public float performance;
    public float quality;
}

[System.Serializable]
public class SystemStatusData
{
    public bool conveyor;
    public bool pickPlace;
    public bool qualityCheck;
    public bool inventory;
    public bool agv;
    public bool silos;
    public bool boiler;
    public bool cooling;
    public bool tanks;
    public bool emergencyStop;
}
