using UnityEngine;

/// <summary>
/// Storage Tank Controller
/// Manages liquid storage, fill levels, and visual representation
/// </summary>
public class StorageTankController : MonoBehaviour
{
    [Header("Tank Configuration")]
    public string liquidType = "Water";
    public float capacity = 100f; // m³
    [Range(0f, 1f)]
    public float fillLevel = 0.6f;
    public float height = 8f;
    public float radius = 2.5f;

    [Header("Liquid Properties")]
    public Color liquidColor = new Color(0.2f, 0.5f, 0.8f, 0.7f);
    public float liquidDensity = 1000f; // kg/m³
    public bool isHazardous = false;

    [Header("Visual Components")]
    public Transform liquidMesh;
    public Material liquidMaterial;
    public Renderer liquidRenderer;
    public Light statusLight;
    public ParticleSystem fillEffect;
    public ParticleSystem drainEffect;

    [Header("Operation")]
    public bool isActive = false;
    public bool isFilling = false;
    public bool isDraining = false;
    public float fillRate = 0.01f; // Per second
    public float drainRate = 0.015f;

    [Header("Safety")]
    public float lowLevelThreshold = 0.2f;
    public float highLevelThreshold = 0.9f;
    public bool lowLevelWarning = false;
    public bool highLevelWarning = false;

    private float targetFillLevel;
    private float wavePhase = 0f;

    void Start()
    {
        targetFillLevel = fillLevel;

        if (liquidMesh != null && liquidRenderer == null)
        {
            liquidRenderer = liquidMesh.GetComponent<Renderer>();
        }

        if (liquidRenderer != null && liquidMaterial != null)
        {
            liquidRenderer.material = liquidMaterial;
            liquidRenderer.material.color = liquidColor;
        }

        UpdateVisuals();
    }

    void Update()
    {
        UpdateFillLevel();
        UpdateVisuals();
        UpdateEffects();
        CheckSafetyLevels();
    }

    void UpdateFillLevel()
    {
        if (isActive)
        {
            if (isFilling && fillLevel < 0.95f)
            {
                fillLevel = Mathf.Min(fillLevel + fillRate * Time.deltaTime, 0.95f);
            }
            else if (isDraining && fillLevel > 0.05f)
            {
                fillLevel = Mathf.Max(fillLevel - drainRate * Time.deltaTime, 0.05f);
            }
        }

        // Smooth transition
        targetFillLevel = Mathf.Lerp(targetFillLevel, fillLevel, Time.deltaTime * 2f);

        // Wave animation
        wavePhase += Time.deltaTime * 0.5f;
    }

    void UpdateVisuals()
    {
        if (liquidMesh != null)
        {
            // Scale liquid mesh based on fill level
            Vector3 scale = liquidMesh.localScale;
            scale.y = targetFillLevel;
            liquidMesh.localScale = scale;

            // Position liquid mesh
            float yPos = (targetFillLevel * height) / 2f;
            Vector3 pos = liquidMesh.localPosition;
            pos.y = yPos;
            
            // Add subtle wave motion
            pos.y += Mathf.Sin(wavePhase) * 0.02f * targetFillLevel;
            
            liquidMesh.localPosition = pos;
        }

        // Update liquid material
        if (liquidRenderer != null)
        {
            // Adjust transparency based on fill level
            Color currentColor = liquidColor;
            currentColor.a = Mathf.Lerp(0.3f, 0.8f, targetFillLevel);
            liquidRenderer.material.color = currentColor;

            // Shader properties for advanced effects
            if (liquidRenderer.material.HasProperty("_FillLevel"))
            {
                liquidRenderer.material.SetFloat("_FillLevel", targetFillLevel);
            }

            if (liquidRenderer.material.HasProperty("_WavePhase"))
            {
                liquidRenderer.material.SetFloat("_WavePhase", wavePhase);
            }
        }

        // Status light
        if (statusLight != null)
        {
            statusLight.enabled = isActive;
            if (isActive)
            {
                if (lowLevelWarning || highLevelWarning)
                {
                    statusLight.color = Color.yellow;
                    statusLight.intensity = 2f + Mathf.Sin(Time.time * 3f) * 1f; // Blinking
                }
                else
                {
                    statusLight.color = Color.green;
                    statusLight.intensity = 2f;
                }
            }
        }
    }

    void UpdateEffects()
    {
        // Fill effect
        if (fillEffect != null)
        {
            if (isActive && isFilling && fillLevel < 0.95f)
            {
                if (!fillEffect.isPlaying)
                {
                    fillEffect.Play();
                }
                
                var emission = fillEffect.emission;
                emission.rateOverTime = 20f;
            }
            else
            {
                if (fillEffect.isPlaying)
                {
                    fillEffect.Stop();
                }
            }
        }

        // Drain effect
        if (drainEffect != null)
        {
            if (isActive && isDraining && fillLevel > 0.05f)
            {
                if (!drainEffect.isPlaying)
                {
                    drainEffect.Play();
                }
                
                var emission = drainEffect.emission;
                emission.rateOverTime = 30f;
            }
            else
            {
                if (drainEffect.isPlaying)
                {
                    drainEffect.Stop();
                }
            }
        }
    }

    void CheckSafetyLevels()
    {
        lowLevelWarning = fillLevel < lowLevelThreshold;
        highLevelWarning = fillLevel > highLevelThreshold;

        if (lowLevelWarning)
        {
            Debug.LogWarning($"Tank {gameObject.name} - Low level warning: {fillLevel * 100f:F1}%");
        }

        if (highLevelWarning)
        {
            Debug.LogWarning($"Tank {gameObject.name} - High level warning: {fillLevel * 100f:F1}%");
        }
    }

    // Public control methods
    public void SetActive(bool active)
    {
        isActive = active;
        if (!active)
        {
            isFilling = false;
            isDraining = false;
        }
    }

    public void SetFilling(bool filling)
    {
        if (isActive)
        {
            isFilling = filling;
            if (filling) isDraining = false;
        }
    }

    public void SetDraining(bool draining)
    {
        if (isActive)
        {
            isDraining = draining;
            if (draining) isFilling = false;
        }
    }

    public void SetFillLevel(float level)
    {
        fillLevel = Mathf.Clamp01(level);
    }

    public float GetFillLevel()
    {
        return fillLevel;
    }

    public float GetVolume()
    {
        return capacity * fillLevel;
    }

    public string GetLiquidType()
    {
        return liquidType;
    }

    public float GetCapacity()
    {
        return capacity;
    }

    public bool IsLowLevel()
    {
        return lowLevelWarning;
    }

    public bool IsHighLevel()
    {
        return highLevelWarning;
    }

    void OnDrawGizmos()
    {
        Gizmos.color = isHazardous ? Color.yellow : Color.blue;
        
        // Tank body
        Vector3 center = transform.position + Vector3.up * height / 2f;
        Gizmos.DrawWireCylinder(center, transform.rotation, radius, height);
        
        // Liquid level
        Color liquidGizmoColor = liquidColor;
        liquidGizmoColor.a = 0.3f;
        Gizmos.color = liquidGizmoColor;
        
        float fillHeight = height * fillLevel;
        Vector3 liquidCenter = transform.position + Vector3.up * fillHeight / 2f;
        Gizmos.DrawCylinder(liquidCenter, transform.rotation, radius * 0.95f, fillHeight);
        
        // Warning indicators
        if (lowLevelWarning)
        {
            Gizmos.color = Color.red;
            Gizmos.DrawWireSphere(transform.position + Vector3.up * height * lowLevelThreshold, 0.5f);
        }
        
        if (highLevelWarning)
        {
            Gizmos.color = Color.yellow;
            Gizmos.DrawWireSphere(transform.position + Vector3.up * height * highLevelThreshold, 0.5f);
        }
    }
}
