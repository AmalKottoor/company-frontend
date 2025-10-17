using UnityEngine;

/// <summary>
/// Cooling Tower Controller
/// Manages water cooling, fan rotation, and mist effects
/// </summary>
public class CoolingTowerController : MonoBehaviour
{
    [Header("Cooling Parameters")]
    public float waterTemperature = 35f; // Celsius
    public float targetTemperature = 25f;
    public float maxTemperature = 50f;
    [Range(0f, 100f)]
    public float flowRate = 85f; // Percentage
    public float coolingRate = 0.5f; // Degrees per second
    public float warmingRate = 0.3f;

    [Header("Mechanical Components")]
    public Transform fanBlades;
    public float fanSpeed = 100f; // Degrees per second
    public float maxFanSpeed = 300f;

    [Header("Visual Effects")]
    public ParticleSystem mistEffect;
    public ParticleSystem waterSprayEffect;
    public Light statusLight;
    public Material waterMaterial;
    public Renderer waterRenderer;

    [Header("Audio")]
    public AudioSource fanAudio;
    public AudioClip fanSound;

    [Header("Status")]
    public bool isActive = false;

    [Header("Colors")]
    public Color coldWaterColor = new Color(0.2f, 0.5f, 0.8f);
    public Color warmWaterColor = new Color(0.5f, 0.7f, 0.9f);
    public Color hotWaterColor = new Color(0.7f, 0.8f, 1f);

    private float currentFanSpeed = 0f;

    void Start()
    {
        if (waterRenderer != null && waterMaterial != null)
        {
            waterRenderer.material = waterMaterial;
        }

        UpdateVisuals();
    }

    void Update()
    {
        UpdateCooling();
        UpdateFan();
        UpdateVisuals();
        UpdateEffects();
        UpdateAudio();
    }

    void UpdateCooling()
    {
        if (isActive)
        {
            // Cool water
            waterTemperature = Mathf.Max(waterTemperature - coolingRate * Time.deltaTime, targetTemperature);
            
            // Adjust fan speed based on temperature difference
            float tempDiff = waterTemperature - targetTemperature;
            fanSpeed = Mathf.Lerp(100f, maxFanSpeed, tempDiff / (maxTemperature - targetTemperature));
        }
        else
        {
            // Water warms up when not active
            waterTemperature = Mathf.Min(waterTemperature + warmingRate * Time.deltaTime, maxTemperature);
            
            // Fan slows down
            fanSpeed = Mathf.Lerp(fanSpeed, 0f, Time.deltaTime * 2f);
        }
    }

    void UpdateFan()
    {
        if (fanBlades != null)
        {
            // Smooth fan speed transition
            currentFanSpeed = Mathf.Lerp(currentFanSpeed, isActive ? fanSpeed : 0f, Time.deltaTime * 3f);
            
            // Rotate fan blades
            fanBlades.Rotate(Vector3.up, currentFanSpeed * Time.deltaTime);
        }
    }

    void UpdateVisuals()
    {
        // Update water material color based on temperature
        if (waterRenderer != null)
        {
            float tempRatio = Mathf.Clamp01((waterTemperature - targetTemperature) / (maxTemperature - targetTemperature));
            Color currentColor = Color.Lerp(coldWaterColor, hotWaterColor, tempRatio);
            
            if (waterRenderer.material.HasProperty("_BaseColor"))
            {
                waterRenderer.material.SetColor("_BaseColor", currentColor);
            }
            else if (waterRenderer.material.HasProperty("_Color"))
            {
                waterRenderer.material.color = currentColor;
            }

            // Add transparency based on flow
            if (waterRenderer.material.HasProperty("_Alpha"))
            {
                waterRenderer.material.SetFloat("_Alpha", flowRate / 100f);
            }
        }

        // Status light
        if (statusLight != null)
        {
            statusLight.enabled = isActive;
            if (isActive)
            {
                float efficiency = 1f - ((waterTemperature - targetTemperature) / (maxTemperature - targetTemperature));
                statusLight.color = Color.Lerp(Color.red, Color.green, efficiency);
                statusLight.intensity = 2f;
            }
        }
    }

    void UpdateEffects()
    {
        // Mist effect
        if (mistEffect != null)
        {
            if (isActive && currentFanSpeed > 10f)
            {
                if (!mistEffect.isPlaying)
                {
                    mistEffect.Play();
                }

                var emission = mistEffect.emission;
                emission.rateOverTime = (currentFanSpeed / maxFanSpeed) * 50f;

                var main = mistEffect.main;
                main.startSpeed = (currentFanSpeed / maxFanSpeed) * 5f;
                main.startSize = 0.5f + (currentFanSpeed / maxFanSpeed) * 1.5f;
            }
            else
            {
                if (mistEffect.isPlaying)
                {
                    mistEffect.Stop();
                }
            }
        }

        // Water spray effect
        if (waterSprayEffect != null)
        {
            if (isActive && flowRate > 20f)
            {
                if (!waterSprayEffect.isPlaying)
                {
                    waterSprayEffect.Play();
                }

                var emission = waterSprayEffect.emission;
                emission.rateOverTime = (flowRate / 100f) * 30f;
            }
            else
            {
                if (waterSprayEffect.isPlaying)
                {
                    waterSprayEffect.Stop();
                }
            }
        }
    }

    void UpdateAudio()
    {
        if (fanAudio != null && fanSound != null)
        {
            if (isActive && currentFanSpeed > 10f)
            {
                if (!fanAudio.isPlaying)
                {
                    fanAudio.clip = fanSound;
                    fanAudio.loop = true;
                    fanAudio.Play();
                }
                
                // Adjust pitch and volume based on fan speed
                fanAudio.pitch = 0.8f + (currentFanSpeed / maxFanSpeed) * 0.4f;
                fanAudio.volume = 0.3f + (currentFanSpeed / maxFanSpeed) * 0.5f;
            }
            else
            {
                if (fanAudio.isPlaying)
                {
                    fanAudio.Stop();
                }
            }
        }
    }

    // Public control methods
    public void SetActive(bool active)
    {
        isActive = active;
    }

    public void SetFlowRate(float rate)
    {
        flowRate = Mathf.Clamp(rate, 0f, 100f);
    }

    public void SetWaterTemperature(float temp)
    {
        waterTemperature = Mathf.Clamp(temp, targetTemperature, maxTemperature);
    }

    public float GetWaterTemperature()
    {
        return waterTemperature;
    }

    public float GetFlowRate()
    {
        return flowRate;
    }

    public float GetFanSpeed()
    {
        return currentFanSpeed;
    }

    public bool IsActive()
    {
        return isActive;
    }

    void OnDrawGizmos()
    {
        Gizmos.color = isActive ? Color.cyan : Color.gray;
        
        // Tower body
        Gizmos.DrawWireCube(transform.position, new Vector3(6f, 10f, 6f));
        
        // Fan location
        Gizmos.color = isActive ? Color.yellow : Color.gray;
        Gizmos.DrawWireSphere(transform.position + Vector3.up * 5f, 2f);
        
        // Mist area
        if (isActive)
        {
            Gizmos.color = new Color(0.5f, 0.8f, 1f, 0.2f);
            Gizmos.DrawCube(transform.position + Vector3.up * 10f, new Vector3(8f, 2f, 8f));
        }
    }
}
