using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

/// <summary>
/// Adaptive Quality Manager
/// Automatically adjusts graphics quality based on device capabilities and performance
/// </summary>
public class AdaptiveQualityManager : MonoBehaviour
{
    [Header("Quality Settings")]
    public QualityTier currentTier = QualityTier.High;
    
    [Header("Performance Monitoring")]
    public float targetFrameRate = 60f;
    public float performanceCheckInterval = 2f;
    public int performanceSampleSize = 30;
    
    [Header("Quality Presets")]
    public QualityPreset lowQuality;
    public QualityPreset mediumQuality;
    public QualityPreset highQuality;

    private float[] frameTimes;
    private int frameTimeIndex = 0;
    private float performanceTimer = 0f;
    private bool autoAdjustQuality = true;

    public enum QualityTier
    {
        Low,
        Medium,
        High
    }

    [System.Serializable]
    public class QualityPreset
    {
        public string name;
        public int shadowQuality; // 0=off, 1=hard, 2=soft
        public float shadowDistance;
        public int textureQuality; // 0=full, 1=half, 2=quarter
        public bool antiAliasing;
        public int antiAliasingQuality; // 0=off, 2=2x, 4=4x, 8=8x
        public bool postProcessing;
        public bool bloom;
        public bool ambientOcclusion;
        public bool motionBlur;
        public int particleQuality; // 0=low, 1=medium, 2=high
        public float renderScale; // 0.5 to 1.0
        public bool realtimeLighting;
        public int maxLights;
    }

    void Awake()
    {
        frameTimes = new float[performanceSampleSize];
        
        // Initialize quality presets if not set
        InitializeQualityPresets();
        
        // Detect device capabilities and set initial quality
        DetectDeviceCapabilities();
    }

    void Start()
    {
        ApplyQualitySettings(currentTier);
    }

    void Update()
    {
        if (!autoAdjustQuality) return;

        // Record frame time
        frameTimes[frameTimeIndex] = Time.unscaledDeltaTime;
        frameTimeIndex = (frameTimeIndex + 1) % performanceSampleSize;

        // Check performance periodically
        performanceTimer += Time.unscaledDeltaTime;
        if (performanceTimer >= performanceCheckInterval)
        {
            CheckPerformanceAndAdjust();
            performanceTimer = 0f;
        }
    }

    void InitializeQualityPresets()
    {
        // Low Quality Preset (Mobile/Low-end)
        if (lowQuality.name == null)
        {
            lowQuality = new QualityPreset
            {
                name = "Low",
                shadowQuality = 0,
                shadowDistance = 0f,
                textureQuality = 2,
                antiAliasing = false,
                antiAliasingQuality = 0,
                postProcessing = false,
                bloom = false,
                ambientOcclusion = false,
                motionBlur = false,
                particleQuality = 0,
                renderScale = 0.75f,
                realtimeLighting = false,
                maxLights = 2
            };
        }

        // Medium Quality Preset (Standard Desktop)
        if (mediumQuality.name == null)
        {
            mediumQuality = new QualityPreset
            {
                name = "Medium",
                shadowQuality = 1,
                shadowDistance = 50f,
                textureQuality = 1,
                antiAliasing = true,
                antiAliasingQuality = 2,
                postProcessing = true,
                bloom = true,
                ambientOcclusion = false,
                motionBlur = false,
                particleQuality = 1,
                renderScale = 0.9f,
                realtimeLighting = true,
                maxLights = 4
            };
        }

        // High Quality Preset (High-end Desktop)
        if (highQuality.name == null)
        {
            highQuality = new QualityPreset
            {
                name = "High",
                shadowQuality = 2,
                shadowDistance = 100f,
                textureQuality = 0,
                antiAliasing = true,
                antiAliasingQuality = 4,
                postProcessing = true,
                bloom = true,
                ambientOcclusion = true,
                motionBlur = true,
                particleQuality = 2,
                renderScale = 1.0f,
                realtimeLighting = true,
                maxLights = 8
            };
        }
    }

    void DetectDeviceCapabilities()
    {
        // Get system info
        int systemMemoryMB = SystemInfo.systemMemorySize;
        string gpuName = SystemInfo.graphicsDeviceName.ToLower();
        int processorCount = SystemInfo.processorCount;
        
        // Mobile detection
        bool isMobile = Application.isMobilePlatform;
        
        // Screen resolution
        int screenWidth = Screen.width;
        int screenHeight = Screen.height;
        int totalPixels = screenWidth * screenHeight;

        Debug.Log($"Device Detection: Memory={systemMemoryMB}MB, GPU={gpuName}, Cores={processorCount}, Mobile={isMobile}");

        // Determine quality tier
        if (isMobile || systemMemoryMB < 4096 || totalPixels < 1280 * 720)
        {
            currentTier = QualityTier.Low;
            Debug.Log("Quality Tier: LOW (Mobile/Low-end device)");
        }
        else if (systemMemoryMB >= 8192 && processorCount >= 6 && totalPixels >= 1920 * 1080)
        {
            currentTier = QualityTier.High;
            Debug.Log("Quality Tier: HIGH (High-end desktop)");
        }
        else
        {
            currentTier = QualityTier.Medium;
            Debug.Log("Quality Tier: MEDIUM (Standard desktop)");
        }
    }

    void CheckPerformanceAndAdjust()
    {
        // Calculate average FPS
        float totalTime = 0f;
        for (int i = 0; i < frameTimes.Length; i++)
        {
            totalTime += frameTimes[i];
        }
        float averageFrameTime = totalTime / frameTimes.Length;
        float averageFPS = 1f / averageFrameTime;

        Debug.Log($"Average FPS: {averageFPS:F1}, Target: {targetFrameRate}");

        // Adjust quality based on performance
        if (averageFPS < targetFrameRate * 0.7f) // Below 70% of target
        {
            // Downgrade quality
            if (currentTier == QualityTier.High)
            {
                currentTier = QualityTier.Medium;
                ApplyQualitySettings(currentTier);
                Debug.Log("Quality downgraded to MEDIUM due to performance");
            }
            else if (currentTier == QualityTier.Medium)
            {
                currentTier = QualityTier.Low;
                ApplyQualitySettings(currentTier);
                Debug.Log("Quality downgraded to LOW due to performance");
            }
        }
        else if (averageFPS > targetFrameRate * 1.2f) // Above 120% of target
        {
            // Upgrade quality
            if (currentTier == QualityTier.Low)
            {
                currentTier = QualityTier.Medium;
                ApplyQualitySettings(currentTier);
                Debug.Log("Quality upgraded to MEDIUM");
            }
            else if (currentTier == QualityTier.Medium)
            {
                currentTier = QualityTier.High;
                ApplyQualitySettings(currentTier);
                Debug.Log("Quality upgraded to HIGH");
            }
        }
    }

    public void ApplyQualitySettings(QualityTier tier)
    {
        QualityPreset preset = tier switch
        {
            QualityTier.Low => lowQuality,
            QualityTier.Medium => mediumQuality,
            QualityTier.High => highQuality,
            _ => mediumQuality
        };

        Debug.Log($"Applying Quality Preset: {preset.name}");

        // Apply Unity Quality Settings
        QualitySettings.shadows = preset.shadowQuality switch
        {
            0 => ShadowQuality.Disable,
            1 => ShadowQuality.HardOnly,
            2 => ShadowQuality.All,
            _ => ShadowQuality.HardOnly
        };

        QualitySettings.shadowDistance = preset.shadowDistance;
        QualitySettings.masterTextureLimit = preset.textureQuality;
        QualitySettings.antiAliasing = preset.antiAliasing ? preset.antiAliasingQuality : 0;
        QualitySettings.pixelLightCount = preset.maxLights;

        // Apply URP settings if available
        ApplyURPSettings(preset);

        // Set target frame rate
        Application.targetFrameRate = (int)targetFrameRate;

        // Apply render scale
        if (Camera.main != null)
        {
            var urpCamera = Camera.main.GetUniversalAdditionalCameraData();
            if (urpCamera != null)
            {
                urpCamera.renderScale = preset.renderScale;
            }
        }
    }

    void ApplyURPSettings(QualityPreset preset)
    {
        // Get URP asset
        var urpAsset = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
        if (urpAsset == null) return;

        // Note: Some settings require creating different URP assets for each quality level
        // This is a simplified version that adjusts what's possible at runtime

        // Adjust shadow settings
        // urpAsset.shadowDistance = preset.shadowDistance; // Read-only at runtime

        // Post-processing would be controlled via Volume components
        var volumes = FindObjectsOfType<Volume>();
        foreach (var volume in volumes)
        {
            volume.enabled = preset.postProcessing;
            
            if (volume.profile != null)
            {
                // Adjust individual post-processing effects
                if (volume.profile.TryGet<Bloom>(out var bloom))
                {
                    bloom.active = preset.bloom;
                }
                
                // Add more post-processing adjustments as needed
            }
        }
    }

    // Public methods callable from JavaScript
    public void SetQualityTier(int tier)
    {
        currentTier = (QualityTier)Mathf.Clamp(tier, 0, 2);
        ApplyQualitySettings(currentTier);
        autoAdjustQuality = false; // Disable auto-adjust when manually set
    }

    public void SetAutoAdjust(bool enable)
    {
        autoAdjustQuality = enable;
    }

    public string GetCurrentQuality()
    {
        return currentTier.ToString();
    }

    public float GetCurrentFPS()
    {
        float totalTime = 0f;
        for (int i = 0; i < frameTimes.Length; i++)
        {
            totalTime += frameTimes[i];
        }
        return frameTimes.Length / totalTime;
    }
}
