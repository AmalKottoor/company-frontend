using UnityEngine;

/// <summary>
/// Industrial Boiler Controller
/// Manages temperature, pressure, steam generation, and visual effects
/// </summary>
public class BoilerController : MonoBehaviour
{
    [Header("Boiler Parameters")]
    public float temperature = 25f; // Celsius
    public float targetTemperature = 180f;
    public float maxTemperature = 250f;
    public float pressure = 0f; // Bar
    public float maxPressure = 20f;
    [Range(0f, 1f)]
    public float steamOutput = 0f;

    [Header("Operation Settings")]
    public float heatUpRate = 2f; // Degrees per second
    public float coolDownRate = 1f;
    public float pressureBuildRate = 0.5f; // Bar per second
    public float pressureReleaseRate = 0.3f;

    [Header("Visual Effects")]
    public ParticleSystem steamEffect;
    public ParticleSystem flameEffect;
    public Light flameLight;
    public Light statusLight;
    public Material boilerMaterial;
    public Renderer boilerRenderer;

    [Header("Audio")]
    public AudioSource boilerAudio;
    public AudioClip operatingSound;
    public AudioClip steamReleaseSound;

    [Header("Status")]
    public bool isOperating = false;
    public bool isSafetyRelease = false;

    [Header("Colors")]
    public Color coldColor = new Color(0.3f, 0.3f, 0.4f);
    public Color warmColor = new Color(0.8f, 0.4f, 0.2f);
    public Color hotColor = new Color(1f, 0.3f, 0.1f);

    private float emissiveIntensity = 0f;

    void Start()
    {
        if (boilerRenderer != null && boilerMaterial != null)
        {
            boilerRenderer.material = boilerMaterial;
        }

        UpdateVisuals();
    }

    void Update()
    {
        UpdateTemperatureAndPressure();
        UpdateVisuals();
        UpdateEffects();
        UpdateAudio();
        CheckSafetyLimits();
    }

    void UpdateTemperatureAndPressure()
    {
        if (isOperating)
        {
            // Heat up
            temperature = Mathf.Min(temperature + heatUpRate * Time.deltaTime, targetTemperature);
            
            // Build pressure as temperature increases
            if (temperature > 100f)
            {
                pressure = Mathf.Min(pressure + pressureBuildRate * Time.deltaTime, maxPressure);
            }

            // Steam output based on temperature and pressure
            steamOutput = Mathf.Clamp01((temperature - 100f) / 100f * (pressure / maxPressure));
        }
        else
        {
            // Cool down
            temperature = Mathf.Max(temperature - coolDownRate * Time.deltaTime, 25f);
            
            // Release pressure
            pressure = Mathf.Max(pressure - pressureReleaseRate * Time.deltaTime, 0f);
            
            // Reduce steam output
            steamOutput = Mathf.Max(steamOutput - Time.deltaTime * 0.5f, 0f);
        }

        // Safety release if pressure too high
        if (pressure > maxPressure * 0.9f)
        {
            isSafetyRelease = true;
            pressure = Mathf.Max(pressure - pressureReleaseRate * 2f * Time.deltaTime, maxPressure * 0.8f);
        }
        else
        {
            isSafetyRelease = false;
        }
    }

    void UpdateVisuals()
    {
        // Update boiler material color based on temperature
        if (boilerRenderer != null)
        {
            float tempRatio = Mathf.Clamp01((temperature - 25f) / (maxTemperature - 25f));
            Color currentColor = Color.Lerp(coldColor, hotColor, tempRatio);
            
            if (boilerRenderer.material.HasProperty("_BaseColor"))
            {
                boilerRenderer.material.SetColor("_BaseColor", currentColor);
            }
            else if (boilerRenderer.material.HasProperty("_Color"))
            {
                boilerRenderer.material.color = currentColor;
            }

            // Emissive glow when hot
            emissiveIntensity = Mathf.Lerp(emissiveIntensity, tempRatio * 2f, Time.deltaTime);
            if (boilerRenderer.material.HasProperty("_EmissionColor"))
            {
                boilerRenderer.material.SetColor("_EmissionColor", currentColor * emissiveIntensity);
                boilerRenderer.material.EnableKeyword("_EMISSION");
            }
        }

        // Status light
        if (statusLight != null)
        {
            statusLight.enabled = isOperating;
            if (isOperating)
            {
                statusLight.color = pressure > maxPressure * 0.8f ? Color.red : Color.green;
                statusLight.intensity = 2f;
            }
        }
    }

    void UpdateEffects()
    {
        // Steam effect
        if (steamEffect != null)
        {
            if (isOperating && steamOutput > 0.1f)
            {
                if (!steamEffect.isPlaying)
                {
                    steamEffect.Play();
                }

                var emission = steamEffect.emission;
                emission.rateOverTime = steamOutput * 100f * (isSafetyRelease ? 2f : 1f);

                var main = steamEffect.main;
                main.startSpeed = steamOutput * 10f * (isSafetyRelease ? 1.5f : 1f);
            }
            else
            {
                if (steamEffect.isPlaying)
                {
                    steamEffect.Stop();
                }
            }
        }

        // Flame effect
        if (flameEffect != null)
        {
            if (isOperating)
            {
                if (!flameEffect.isPlaying)
                {
                    flameEffect.Play();
                }

                var emission = flameEffect.emission;
                emission.rateOverTime = 50f + temperature * 0.5f;
            }
            else
            {
                if (flameEffect.isPlaying)
                {
                    flameEffect.Stop();
                }
            }
        }

        // Flame light
        if (flameLight != null)
        {
            if (isOperating)
            {
                flameLight.enabled = true;
                // Flickering effect
                flameLight.intensity = 3f + Mathf.Sin(Time.time * 10f) * 0.5f + Mathf.PerlinNoise(Time.time * 5f, 0) * 0.3f;
                flameLight.color = Color.Lerp(new Color(1f, 0.5f, 0.2f), new Color(1f, 0.3f, 0.1f), Mathf.PerlinNoise(Time.time * 3f, 1f));
            }
            else
            {
                flameLight.enabled = false;
            }
        }
    }

    void UpdateAudio()
    {
        if (boilerAudio != null && operatingSound != null)
        {
            if (isOperating)
            {
                if (!boilerAudio.isPlaying)
                {
                    boilerAudio.clip = operatingSound;
                    boilerAudio.loop = true;
                    boilerAudio.Play();
                }
                boilerAudio.volume = Mathf.Lerp(0.3f, 0.8f, temperature / maxTemperature);
            }
            else
            {
                if (boilerAudio.isPlaying)
                {
                    boilerAudio.Stop();
                }
            }
        }

        // Safety release sound
        if (isSafetyRelease && steamReleaseSound != null && boilerAudio != null)
        {
            if (!boilerAudio.isPlaying || boilerAudio.clip != steamReleaseSound)
            {
                boilerAudio.PlayOneShot(steamReleaseSound, 0.5f);
            }
        }
    }

    void CheckSafetyLimits()
    {
        if (temperature > maxTemperature * 0.95f || pressure > maxPressure * 0.95f)
        {
            Debug.LogWarning($"Boiler {gameObject.name} approaching safety limits! Temp: {temperature:F1}°C, Pressure: {pressure:F1} Bar");
        }
    }

    // Public control methods
    public void SetOperating(bool operating)
    {
        isOperating = operating;
    }

    public void SetTemperature(float temp)
    {
        temperature = Mathf.Clamp(temp, 0f, maxTemperature);
    }

    public void SetTargetTemperature(float temp)
    {
        targetTemperature = Mathf.Clamp(temp, 100f, maxTemperature);
    }

    public float GetTemperature()
    {
        return temperature;
    }

    public float GetPressure()
    {
        return pressure;
    }

    public float GetSteamOutput()
    {
        return steamOutput;
    }

    public bool IsOperating()
    {
        return isOperating;
    }

    void OnDrawGizmos()
    {
        Gizmos.color = isOperating ? Color.red : Color.gray;
        Gizmos.DrawWireCube(transform.position, new Vector3(4f, 6f, 4f));
        
        if (isOperating)
        {
            Gizmos.color = new Color(1f, 1f, 1f, 0.3f);
            Gizmos.DrawCube(transform.position + Vector3.up * 3.5f, new Vector3(1f, 0.5f, 1f));
        }
    }
}
