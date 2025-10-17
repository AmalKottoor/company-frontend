using UnityEngine;

/// <summary>
/// Industrial Silo Controller
/// Manages silo fill levels, discharge animations, and visual effects
/// </summary>
public class SiloController : MonoBehaviour
{
    [Header("Silo Configuration")]
    public string materialType = "Grain";
    public float capacity = 500f; // Tons
    [Range(0f, 1f)]
    public float fillLevel = 0.75f;
    public float height = 12f;
    public float radius = 3f;

    [Header("Visual Components")]
    public Transform fillIndicator;
    public Material fillMaterial;
    public ParticleSystem dischargeParticles;
    public Light statusLight;

    [Header("Animation Settings")]
    public float dischargeDrainRate = 0.01f;
    public float fillRate = 0.005f;

    [Header("Status")]
    public bool isActive = false;
    public bool isDischarging = false;

    [Header("Colors")]
    public Color activeColor = Color.green;
    public Color inactiveColor = Color.red;
    public Color warningColor = Color.yellow;

    private float targetFillLevel;
    private Renderer fillRenderer;

    void Start()
    {
        targetFillLevel = fillLevel;
        
        if (fillIndicator != null)
        {
            fillRenderer = fillIndicator.GetComponent<Renderer>();
            if (fillRenderer != null && fillMaterial != null)
            {
                fillRenderer.material = fillMaterial;
            }
        }

        UpdateVisuals();
    }

    void Update()
    {
        if (isActive)
        {
            // Discharge logic
            if (isDischarging && fillLevel > 0.1f)
            {
                fillLevel = Mathf.Max(fillLevel - dischargeDrainRate * Time.deltaTime, 0.1f);
            }
            else if (!isDischarging && fillLevel < 0.95f)
            {
                // Slowly refill when not discharging
                fillLevel = Mathf.Min(fillLevel + fillRate * Time.deltaTime, 0.95f);
            }
        }

        // Smooth fill level transition
        targetFillLevel = Mathf.Lerp(targetFillLevel, fillLevel, Time.deltaTime * 2f);

        UpdateVisuals();
        UpdateParticles();
        UpdateStatusLight();
    }

    void UpdateVisuals()
    {
        if (fillIndicator != null)
        {
            // Scale fill indicator based on fill level
            Vector3 scale = fillIndicator.localScale;
            scale.y = targetFillLevel;
            fillIndicator.localScale = scale;

            // Position fill indicator
            float yPos = (targetFillLevel * height) / 2f;
            Vector3 pos = fillIndicator.localPosition;
            pos.y = yPos;
            fillIndicator.localPosition = pos;

            // Update material color based on fill level
            if (fillRenderer != null)
            {
                Color fillColor = Color.Lerp(warningColor, activeColor, targetFillLevel);
                fillRenderer.material.color = fillColor;
            }
        }
    }

    void UpdateParticles()
    {
        if (dischargeParticles != null)
        {
            if (isActive && isDischarging && fillLevel > 0.1f)
            {
                if (!dischargeParticles.isPlaying)
                {
                    dischargeParticles.Play();
                }
                
                // Adjust emission rate based on fill level
                var emission = dischargeParticles.emission;
                emission.rateOverTime = fillLevel * 50f;
            }
            else
            {
                if (dischargeParticles.isPlaying)
                {
                    dischargeParticles.Stop();
                }
            }
        }
    }

    void UpdateStatusLight()
    {
        if (statusLight != null)
        {
            if (isActive)
            {
                statusLight.enabled = true;
                statusLight.color = fillLevel < 0.2f ? warningColor : activeColor;
                statusLight.intensity = 2f + Mathf.Sin(Time.time * 2f) * 0.5f;
            }
            else
            {
                statusLight.enabled = false;
            }
        }
    }

    // Public control methods
    public void SetActive(bool active)
    {
        isActive = active;
        if (!active)
        {
            isDischarging = false;
        }
    }

    public void SetDischarging(bool discharging)
    {
        if (isActive)
        {
            isDischarging = discharging;
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

    public string GetMaterialType()
    {
        return materialType;
    }

    public float GetCapacity()
    {
        return capacity;
    }

    // Visualization helper - creates basic silo geometry if not present
    void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;
        Gizmos.DrawWireCylinder(transform.position, transform.rotation, radius, height);
        
        // Draw fill level
        Gizmos.color = new Color(0, 1, 1, 0.3f);
        float fillHeight = height * fillLevel;
        Gizmos.DrawCylinder(transform.position + Vector3.up * fillHeight / 2f, transform.rotation, radius * 0.95f, fillHeight);
    }
}

// Extension for Gizmos to draw cylinders
public static class GizmosExtensions
{
    public static void DrawWireCylinder(this Gizmos gizmos, Vector3 position, Quaternion rotation, float radius, float height)
    {
        Matrix4x4 oldMatrix = Gizmos.matrix;
        Gizmos.matrix = Matrix4x4.TRS(position, rotation, Vector3.one);

        float halfHeight = height / 2f;
        
        // Draw circles at top and bottom
        DrawCircle(Vector3.up * halfHeight, radius);
        DrawCircle(Vector3.down * halfHeight, radius);
        
        // Draw vertical lines
        for (int i = 0; i < 4; i++)
        {
            float angle = i * 90f * Mathf.Deg2Rad;
            Vector3 offset = new Vector3(Mathf.Cos(angle) * radius, 0, Mathf.Sin(angle) * radius);
            Gizmos.DrawLine(offset + Vector3.up * halfHeight, offset + Vector3.down * halfHeight);
        }

        Gizmos.matrix = oldMatrix;
    }

    public static void DrawCylinder(this Gizmos gizmos, Vector3 position, Quaternion rotation, float radius, float height)
    {
        // Simplified solid cylinder representation
        Matrix4x4 oldMatrix = Gizmos.matrix;
        Gizmos.matrix = Matrix4x4.TRS(position, rotation, new Vector3(radius * 2f, height, radius * 2f));
        Gizmos.DrawCube(Vector3.zero, Vector3.one);
        Gizmos.matrix = oldMatrix;
    }

    private static void DrawCircle(Vector3 center, float radius, int segments = 32)
    {
        float angleStep = 360f / segments * Mathf.Deg2Rad;
        Vector3 prevPoint = center + new Vector3(Mathf.Cos(0) * radius, 0, Mathf.Sin(0) * radius);

        for (int i = 1; i <= segments; i++)
        {
            float angle = i * angleStep;
            Vector3 newPoint = center + new Vector3(Mathf.Cos(angle) * radius, 0, Mathf.Sin(angle) * radius);
            Gizmos.DrawLine(prevPoint, newPoint);
            prevPoint = newPoint;
        }
    }
}
