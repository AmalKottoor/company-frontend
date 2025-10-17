using UnityEngine;

/// <summary>
/// Quality Inspection Station Controller
/// Simulates automated quality inspection with vision system
/// </summary>
public class QualityInspectionController : MonoBehaviour
{
    [Header("Inspection Configuration")]
    public float inspectionTime = 1.5f;
    public float defectRate = 0.05f; // 5% defect rate
    public int itemsInspected = 0;
    public int defectsFound = 0;

    [Header("Visual Components")]
    public Transform scannerBeam;
    public Light scannerLight;
    public ParticleSystem scanEffect;
    public Light statusLight;

    [Header("Scanner Animation")]
    public float scanSpeed = 2f;
    public float scanRange = 2f;
    private float scanPosition = 0f;
    private bool scanningForward = true;

    [Header("Colors")]
    public Color scanningColor = Color.cyan;
    public Color passColor = Color.green;
    public Color failColor = Color.red;
    public Color inactiveColor = Color.gray;

    [Header("Audio")]
    public AudioSource inspectionAudio;
    public AudioClip scanSound;
    public AudioClip passSound;
    public AudioClip failSound;

    [Header("Status")]
    public bool isActive = false;
    private bool isInspecting = false;
    private float inspectionTimer = 0f;
    private bool currentItemPassed = true;

    void Update()
    {
        if (isActive)
        {
            UpdateScanner();
            UpdateInspection();
        }

        UpdateVisuals();
    }

    void UpdateScanner()
    {
        // Animate scanner beam back and forth
        if (scanningForward)
        {
            scanPosition += scanSpeed * Time.deltaTime;
            if (scanPosition >= scanRange)
            {
                scanPosition = scanRange;
                scanningForward = false;
            }
        }
        else
        {
            scanPosition -= scanSpeed * Time.deltaTime;
            if (scanPosition <= -scanRange)
            {
                scanPosition = -scanRange;
                scanningForward = true;
            }
        }

        if (scannerBeam != null)
        {
            Vector3 pos = scannerBeam.localPosition;
            pos.x = scanPosition;
            scannerBeam.localPosition = pos;
        }

        if (scannerLight != null)
        {
            scannerLight.enabled = isActive;
            if (isActive)
            {
                scannerLight.color = scanningColor;
                scannerLight.intensity = 3f + Mathf.Sin(Time.time * 10f) * 0.5f;
            }
        }
    }

    void UpdateInspection()
    {
        if (!isInspecting)
        {
            // Start new inspection cycle
            inspectionTimer += Time.deltaTime;
            if (inspectionTimer >= inspectionTime)
            {
                StartInspection();
                inspectionTimer = 0f;
            }
        }
        else
        {
            // Complete inspection
            inspectionTimer += Time.deltaTime;
            if (inspectionTimer >= 0.5f)
            {
                CompleteInspection();
                isInspecting = false;
                inspectionTimer = 0f;
            }
        }
    }

    void StartInspection()
    {
        isInspecting = true;
        currentItemPassed = Random.value > defectRate;

        if (scanEffect != null)
        {
            scanEffect.Play();
        }

        if (inspectionAudio != null && scanSound != null)
        {
            inspectionAudio.PlayOneShot(scanSound, 0.4f);
        }

        Debug.Log($"Quality inspection started - Item will {(currentItemPassed ? "PASS" : "FAIL")}");
    }

    void CompleteInspection()
    {
        itemsInspected++;

        if (!currentItemPassed)
        {
            defectsFound++;
            
            if (inspectionAudio != null && failSound != null)
            {
                inspectionAudio.PlayOneShot(failSound, 0.6f);
            }

            Debug.LogWarning($"Defect detected! Total defects: {defectsFound}/{itemsInspected}");
        }
        else
        {
            if (inspectionAudio != null && passSound != null)
            {
                inspectionAudio.PlayOneShot(passSound, 0.4f);
            }
        }

        // Flash status light
        StartCoroutine(FlashStatusLight(currentItemPassed ? passColor : failColor));
    }

    System.Collections.IEnumerator FlashStatusLight(Color color)
    {
        if (statusLight != null)
        {
            Color originalColor = statusLight.color;
            statusLight.color = color;
            statusLight.intensity = 5f;
            
            yield return new WaitForSeconds(0.3f);
            
            statusLight.color = originalColor;
            statusLight.intensity = 2f;
        }
    }

    void UpdateVisuals()
    {
        if (statusLight != null)
        {
            if (!isActive)
            {
                statusLight.enabled = false;
            }
            else if (!isInspecting)
            {
                statusLight.enabled = true;
                statusLight.color = scanningColor;
                statusLight.intensity = 2f;
            }
        }
    }

    // Public control methods
    public void SetActive(bool active)
    {
        isActive = active;
        if (!active)
        {
            isInspecting = false;
            inspectionTimer = 0f;
        }
    }

    public void SetDefectRate(float rate)
    {
        defectRate = Mathf.Clamp01(rate);
    }

    public int GetItemsInspected()
    {
        return itemsInspected;
    }

    public int GetDefectsFound()
    {
        return defectsFound;
    }

    public float GetDefectRate()
    {
        return itemsInspected > 0 ? (float)defectsFound / itemsInspected : 0f;
    }

    public void ResetCounters()
    {
        itemsInspected = 0;
        defectsFound = 0;
    }

    void OnDrawGizmos()
    {
        Gizmos.color = isActive ? Color.cyan : Color.gray;
        
        // Inspection area
        Gizmos.DrawWireCube(transform.position + Vector3.up * 1.5f, new Vector3(4f, 3f, 2f));
        
        // Scanner beam path
        Gizmos.color = scanningColor;
        Vector3 scanStart = transform.position + Vector3.left * scanRange + Vector3.up * 2f;
        Vector3 scanEnd = transform.position + Vector3.right * scanRange + Vector3.up * 2f;
        Gizmos.DrawLine(scanStart, scanEnd);
        
        // Current scan position
        if (isActive)
        {
            Gizmos.color = Color.yellow;
            Vector3 currentPos = transform.position + Vector3.right * scanPosition + Vector3.up * 2f;
            Gizmos.DrawWireSphere(currentPos, 0.3f);
        }
    }
}
