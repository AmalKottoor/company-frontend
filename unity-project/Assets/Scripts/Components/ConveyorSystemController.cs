using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Conveyor System Controller
/// Manages conveyor belt movement, item transport, and animations
/// </summary>
public class ConveyorSystemController : MonoBehaviour
{
    [Header("Conveyor Configuration")]
    public float beltLength = 20f;
    public float beltWidth = 2f;
    public float speed = 1f; // meters per second
    public int maxItems = 10;

    [Header("Belt Components")]
    public Transform beltMesh;
    public Material beltMaterial;
    public Renderer beltRenderer;

    [Header("Item Management")]
    public GameObject itemPrefab;
    public Transform itemSpawnPoint;
    public Transform itemEndPoint;
    public float itemSpawnInterval = 2f;

    [Header("Visual Effects")]
    public ParticleSystem dustEffect;
    public Light[] beltLights;
    public Color activeColor = Color.green;
    public Color inactiveColor = Color.red;

    [Header("Audio")]
    public AudioSource conveyorAudio;
    public AudioClip beltSound;

    [Header("Status")]
    public bool isActive = false;
    public int itemsOnBelt = 0;

    private List<GameObject> items = new List<GameObject>();
    private float spawnTimer = 0f;
    private float beltOffset = 0f;
    private Vector2 textureOffset = Vector2.zero;

    void Start()
    {
        if (beltRenderer != null && beltMaterial != null)
        {
            beltRenderer.material = beltMaterial;
        }

        if (itemSpawnPoint == null)
        {
            itemSpawnPoint = transform;
        }

        if (itemEndPoint == null)
        {
            itemEndPoint = new GameObject("ConveyorEnd").transform;
            itemEndPoint.parent = transform;
            itemEndPoint.localPosition = Vector3.forward * beltLength;
        }

        UpdateVisuals();
    }

    void Update()
    {
        if (isActive)
        {
            UpdateBeltMovement();
            UpdateItemSpawning();
            UpdateItemMovement();
        }

        UpdateVisuals();
        UpdateEffects();
        UpdateAudio();
    }

    void UpdateBeltMovement()
    {
        // Animate belt texture
        beltOffset += speed * Time.deltaTime;
        textureOffset.y = beltOffset;

        if (beltRenderer != null && beltRenderer.material != null)
        {
            beltRenderer.material.SetTextureOffset("_MainTex", textureOffset);
            if (beltRenderer.material.HasProperty("_BaseMap"))
            {
                beltRenderer.material.SetTextureOffset("_BaseMap", textureOffset);
            }
        }
    }

    void UpdateItemSpawning()
    {
        spawnTimer += Time.deltaTime;

        if (spawnTimer >= itemSpawnInterval && itemsOnBelt < maxItems)
        {
            SpawnItem();
            spawnTimer = 0f;
        }
    }

    void SpawnItem()
    {
        if (itemPrefab == null || itemSpawnPoint == null) return;

        GameObject newItem = Instantiate(itemPrefab, itemSpawnPoint.position, Quaternion.identity, transform);
        
        // Add conveyor item component
        ConveyorItem itemComponent = newItem.GetComponent<ConveyorItem>();
        if (itemComponent == null)
        {
            itemComponent = newItem.AddComponent<ConveyorItem>();
        }
        
        itemComponent.Initialize(this);
        items.Add(newItem);
        itemsOnBelt++;
    }

    void UpdateItemMovement()
    {
        for (int i = items.Count - 1; i >= 0; i--)
        {
            if (items[i] == null)
            {
                items.RemoveAt(i);
                itemsOnBelt--;
                continue;
            }

            // Move item along belt
            Vector3 direction = (itemEndPoint.position - itemSpawnPoint.position).normalized;
            items[i].transform.position += direction * speed * Time.deltaTime;

            // Check if item reached end
            float distanceToEnd = Vector3.Distance(items[i].transform.position, itemEndPoint.position);
            if (distanceToEnd < 0.5f)
            {
                Destroy(items[i]);
                items.RemoveAt(i);
                itemsOnBelt--;
            }
        }
    }

    void UpdateVisuals()
    {
        // Update belt lights
        if (beltLights != null && beltLights.Length > 0)
        {
            foreach (var light in beltLights)
            {
                if (light != null)
                {
                    light.enabled = isActive;
                    light.color = isActive ? activeColor : inactiveColor;
                }
            }
        }

        // Update belt material emission
        if (beltRenderer != null && beltRenderer.material != null)
        {
            Color emissionColor = isActive ? activeColor * 0.5f : Color.black;
            if (beltRenderer.material.HasProperty("_EmissionColor"))
            {
                beltRenderer.material.SetColor("_EmissionColor", emissionColor);
                if (isActive)
                {
                    beltRenderer.material.EnableKeyword("_EMISSION");
                }
                else
                {
                    beltRenderer.material.DisableKeyword("_EMISSION");
                }
            }
        }
    }

    void UpdateEffects()
    {
        if (dustEffect != null)
        {
            if (isActive)
            {
                if (!dustEffect.isPlaying)
                {
                    dustEffect.Play();
                }
                
                var emission = dustEffect.emission;
                emission.rateOverTime = speed * 5f;
            }
            else
            {
                if (dustEffect.isPlaying)
                {
                    dustEffect.Stop();
                }
            }
        }
    }

    void UpdateAudio()
    {
        if (conveyorAudio != null && beltSound != null)
        {
            if (isActive)
            {
                if (!conveyorAudio.isPlaying)
                {
                    conveyorAudio.clip = beltSound;
                    conveyorAudio.loop = true;
                    conveyorAudio.Play();
                }
                conveyorAudio.volume = 0.4f;
                conveyorAudio.pitch = 0.9f + (speed / 2f) * 0.2f;
            }
            else
            {
                if (conveyorAudio.isPlaying)
                {
                    conveyorAudio.Stop();
                }
            }
        }
    }

    // Public control methods
    public void SetActive(bool active)
    {
        isActive = active;
    }

    public void SetSpeed(float newSpeed)
    {
        speed = Mathf.Clamp(newSpeed, 0f, 5f);
    }

    public float GetSpeed()
    {
        return speed;
    }

    public int GetItemCount()
    {
        return itemsOnBelt;
    }

    public void ClearAllItems()
    {
        foreach (var item in items)
        {
            if (item != null)
            {
                Destroy(item);
            }
        }
        items.Clear();
        itemsOnBelt = 0;
    }

    void OnDrawGizmos()
    {
        Gizmos.color = isActive ? Color.green : Color.gray;
        
        Vector3 start = itemSpawnPoint != null ? itemSpawnPoint.position : transform.position;
        Vector3 end = itemEndPoint != null ? itemEndPoint.position : transform.position + transform.forward * beltLength;
        
        // Draw belt path
        Gizmos.DrawLine(start, end);
        Gizmos.DrawWireCube((start + end) / 2f, new Vector3(beltWidth, 0.5f, Vector3.Distance(start, end)));
        
        // Draw spawn and end points
        Gizmos.color = Color.cyan;
        Gizmos.DrawWireSphere(start, 0.3f);
        Gizmos.color = Color.red;
        Gizmos.DrawWireSphere(end, 0.3f);
    }
}

/// <summary>
/// Conveyor Item Component
/// Attached to items on the conveyor belt
/// </summary>
public class ConveyorItem : MonoBehaviour
{
    private ConveyorSystemController conveyor;
    public string itemId;
    public float weight = 1f;

    public void Initialize(ConveyorSystemController controller)
    {
        conveyor = controller;
        itemId = System.Guid.NewGuid().ToString();
    }

    void OnDestroy()
    {
        // Notify conveyor when item is destroyed
        if (conveyor != null)
        {
            Debug.Log($"Item {itemId} reached end of conveyor");
        }
    }
}
