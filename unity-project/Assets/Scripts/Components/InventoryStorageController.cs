using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Inventory Storage Controller
/// Manages warehouse storage with visual rack system
/// </summary>
public class InventoryStorageController : MonoBehaviour
{
    [Header("Storage Configuration")]
    public int capacity = 48;
    public int currentStock = 0;
    public int rows = 4;
    public int columns = 12;

    [Header("Visual Components")]
    public GameObject itemPrefab;
    public Transform storageGrid;
    public float itemSpacing = 1f;
    public Light[] rackLights;

    [Header("Operation")]
    public bool isActive = false;
    public float stockUpdateInterval = 2f;
    private float stockTimer = 0f;

    [Header("Colors")]
    public Color lowStockColor = Color.red;
    public Color mediumStockColor = Color.yellow;
    public Color highStockColor = Color.green;
    public Color inactiveColor = Color.gray;

    [Header("Audio")]
    public AudioSource storageAudio;
    public AudioClip storeSound;
    public AudioClip retrieveSound;

    private List<GameObject> storedItems = new List<GameObject>();
    private bool[,] occupiedSlots;

    void Start()
    {
        occupiedSlots = new bool[rows, columns];
        
        if (storageGrid == null)
        {
            storageGrid = transform;
        }

        // Initialize with some items
        for (int i = 0; i < Mathf.Min(currentStock, capacity); i++)
        {
            AddItemVisual();
        }

        UpdateVisuals();
    }

    void Update()
    {
        if (isActive)
        {
            stockTimer += Time.deltaTime;
            if (stockTimer >= stockUpdateInterval)
            {
                SimulateStockChange();
                stockTimer = 0f;
            }
        }

        UpdateVisuals();
    }

    void SimulateStockChange()
    {
        // Randomly add or remove items
        if (Random.value > 0.5f && currentStock < capacity)
        {
            StoreItem();
        }
        else if (currentStock > 0)
        {
            RetrieveItem();
        }
    }

    void StoreItem()
    {
        if (currentStock >= capacity) return;

        currentStock++;
        AddItemVisual();

        if (storageAudio != null && storeSound != null)
        {
            storageAudio.PlayOneShot(storeSound, 0.3f);
        }

        Debug.Log($"Item stored. Stock: {currentStock}/{capacity}");
    }

    void RetrieveItem()
    {
        if (currentStock <= 0) return;

        currentStock--;
        RemoveItemVisual();

        if (storageAudio != null && retrieveSound != null)
        {
            storageAudio.PlayOneShot(retrieveSound, 0.3f);
        }

        Debug.Log($"Item retrieved. Stock: {currentStock}/{capacity}");
    }

    void AddItemVisual()
    {
        // Find empty slot
        for (int row = 0; row < rows; row++)
        {
            for (int col = 0; col < columns; col++)
            {
                if (!occupiedSlots[row, col])
                {
                    Vector3 position = CalculateSlotPosition(row, col);
                    GameObject item = CreateItemVisual(position);
                    storedItems.Add(item);
                    occupiedSlots[row, col] = true;
                    return;
                }
            }
        }
    }

    void RemoveItemVisual()
    {
        if (storedItems.Count == 0) return;

        // Remove last item
        GameObject item = storedItems[storedItems.Count - 1];
        storedItems.RemoveAt(storedItems.Count - 1);

        // Find and clear slot
        for (int row = rows - 1; row >= 0; row--)
        {
            for (int col = columns - 1; col >= 0; col--)
            {
                if (occupiedSlots[row, col])
                {
                    occupiedSlots[row, col] = false;
                    Destroy(item);
                    return;
                }
            }
        }
    }

    Vector3 CalculateSlotPosition(int row, int col)
    {
        float x = (col - columns / 2f) * itemSpacing;
        float y = row * itemSpacing;
        float z = 0f;

        return storageGrid.position + storageGrid.TransformDirection(new Vector3(x, y, z));
    }

    GameObject CreateItemVisual(Vector3 position)
    {
        GameObject item;
        
        if (itemPrefab != null)
        {
            item = Instantiate(itemPrefab, position, Quaternion.identity, storageGrid);
        }
        else
        {
            // Create simple cube if no prefab
            item = GameObject.CreatePrimitive(PrimitiveType.Cube);
            item.transform.position = position;
            item.transform.parent = storageGrid;
            item.transform.localScale = Vector3.one * 0.8f;
            
            // Random color for variety
            Color itemColor = new Color(
                Random.Range(0.6f, 1f),
                Random.Range(0.4f, 0.8f),
                Random.Range(0.3f, 0.6f)
            );
            item.GetComponent<Renderer>().material.color = itemColor;
        }

        return item;
    }

    void UpdateVisuals()
    {
        // Update rack lights based on stock level
        if (rackLights != null && rackLights.Length > 0)
        {
            float fillRatio = (float)currentStock / capacity;
            Color lightColor;

            if (!isActive)
            {
                lightColor = inactiveColor;
            }
            else if (fillRatio < 0.3f)
            {
                lightColor = lowStockColor;
            }
            else if (fillRatio < 0.7f)
            {
                lightColor = mediumStockColor;
            }
            else
            {
                lightColor = highStockColor;
            }

            foreach (var light in rackLights)
            {
                if (light != null)
                {
                    light.enabled = isActive;
                    light.color = lightColor;
                    light.intensity = 2f;
                }
            }
        }
    }

    // Public control methods
    public void SetActive(bool active)
    {
        isActive = active;
    }

    public void SetStock(int stock)
    {
        int targetStock = Mathf.Clamp(stock, 0, capacity);
        
        while (currentStock < targetStock)
        {
            StoreItem();
        }
        
        while (currentStock > targetStock)
        {
            RetrieveItem();
        }
    }

    public int GetCurrentStock()
    {
        return currentStock;
    }

    public int GetCapacity()
    {
        return capacity;
    }

    public float GetFillPercentage()
    {
        return (float)currentStock / capacity * 100f;
    }

    public void ClearAll()
    {
        foreach (var item in storedItems)
        {
            if (item != null)
            {
                Destroy(item);
            }
        }
        storedItems.Clear();
        occupiedSlots = new bool[rows, columns];
        currentStock = 0;
    }

    void OnDrawGizmos()
    {
        Gizmos.color = isActive ? Color.green : Color.gray;
        
        // Storage structure
        float width = columns * itemSpacing;
        float height = rows * itemSpacing;
        Vector3 center = transform.position + Vector3.up * height / 2f;
        Gizmos.DrawWireCube(center, new Vector3(width, height, 2f));
        
        // Fill level indicator
        float fillRatio = (float)currentStock / capacity;
        Gizmos.color = new Color(0, 1, 0, 0.2f);
        Vector3 fillCenter = transform.position + Vector3.up * (height * fillRatio) / 2f;
        Gizmos.DrawCube(fillCenter, new Vector3(width, height * fillRatio, 2f));
    }
}
