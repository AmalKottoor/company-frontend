using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Automated Guided Vehicle (AGV) Controller
/// Manages AGV movement along predefined paths
/// </summary>
public class AGVController : MonoBehaviour
{
    [Header("AGV Configuration")]
    public float moveSpeed = 3f;
    public float rotationSpeed = 180f;
    public int deliveriesCompleted = 0;

    [Header("Path Configuration")]
    public List<Transform> waypoints = new List<Transform>();
    public bool loopPath = true;
    private int currentWaypointIndex = 0;

    [Header("Visual Components")]
    public Transform agvBody;
    public Transform[] wheels;
    public float wheelRotationSpeed = 360f;
    public Light statusLight;
    public Light headlight;
    public ParticleSystem exhaustEffect;

    [Header("Cargo")]
    public Transform cargoSlot;
    public GameObject cargoItem;
    public bool isCarryingCargo = false;

    [Header("Colors")]
    public Color movingColor = Color.green;
    public Color stoppedColor = Color.yellow;
    public Color inactiveColor = Color.red;

    [Header("Audio")]
    public AudioSource agvAudio;
    public AudioClip moveSound;
    public AudioClip beepSound;

    [Header("Status")]
    public bool isActive = false;
    private bool isMoving = false;
    private float waypointWaitTime = 1f;
    private float waitTimer = 0f;

    void Start()
    {
        if (waypoints.Count == 0)
        {
            GenerateDefaultPath();
        }

        if (waypoints.Count > 0)
        {
            transform.position = waypoints[0].position;
        }

        UpdateVisuals();
    }

    void Update()
    {
        if (isActive && waypoints.Count > 0)
        {
            UpdateMovement();
            UpdateWheels();
        }
        else
        {
            isMoving = false;
        }

        UpdateVisuals();
        UpdateAudio();
    }

    void UpdateMovement()
    {
        if (currentWaypointIndex >= waypoints.Count)
        {
            if (loopPath)
            {
                currentWaypointIndex = 0;
                deliveriesCompleted++;
            }
            else
            {
                isMoving = false;
                return;
            }
        }

        Transform targetWaypoint = waypoints[currentWaypointIndex];
        Vector3 targetPosition = targetWaypoint.position;
        
        // Calculate direction to target
        Vector3 direction = (targetPosition - transform.position).normalized;
        float distanceToTarget = Vector3.Distance(transform.position, targetPosition);

        if (distanceToTarget > 0.5f)
        {
            // Move towards waypoint
            isMoving = true;
            transform.position += direction * moveSpeed * Time.deltaTime;

            // Rotate towards target
            if (direction != Vector3.zero)
            {
                Quaternion targetRotation = Quaternion.LookRotation(direction);
                transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);
            }

            waitTimer = 0f;
        }
        else
        {
            // Reached waypoint, wait before moving to next
            isMoving = false;
            waitTimer += Time.deltaTime;

            if (waitTimer >= waypointWaitTime)
            {
                // Play beep sound when reaching waypoint
                if (agvAudio != null && beepSound != null)
                {
                    agvAudio.PlayOneShot(beepSound, 0.4f);
                }

                // Toggle cargo at specific waypoints
                if (currentWaypointIndex == 0)
                {
                    LoadCargo();
                }
                else if (currentWaypointIndex == waypoints.Count / 2)
                {
                    UnloadCargo();
                }

                currentWaypointIndex++;
                waitTimer = 0f;
            }
        }
    }

    void UpdateWheels()
    {
        if (wheels != null && wheels.Length > 0 && isMoving)
        {
            float rotationAmount = wheelRotationSpeed * moveSpeed * Time.deltaTime;
            
            foreach (var wheel in wheels)
            {
                if (wheel != null)
                {
                    wheel.Rotate(Vector3.right, rotationAmount);
                }
            }
        }
    }

    void LoadCargo()
    {
        if (isCarryingCargo) return;

        isCarryingCargo = true;

        if (cargoSlot != null && cargoItem == null)
        {
            cargoItem = GameObject.CreatePrimitive(PrimitiveType.Cube);
            cargoItem.transform.SetParent(cargoSlot);
            cargoItem.transform.localPosition = Vector3.zero;
            cargoItem.transform.localScale = Vector3.one * 0.8f;
            cargoItem.GetComponent<Renderer>().material.color = new Color(0.8f, 0.6f, 0.2f);
        }

        Debug.Log("AGV loaded cargo");
    }

    void UnloadCargo()
    {
        if (!isCarryingCargo) return;

        isCarryingCargo = false;

        if (cargoItem != null)
        {
            Destroy(cargoItem);
            cargoItem = null;
        }

        Debug.Log("AGV unloaded cargo");
    }

    void UpdateVisuals()
    {
        // Status light
        if (statusLight != null)
        {
            statusLight.enabled = isActive;
            if (isActive)
            {
                statusLight.color = isMoving ? movingColor : stoppedColor;
                statusLight.intensity = 2f;
            }
        }

        // Headlight
        if (headlight != null)
        {
            headlight.enabled = isActive && isMoving;
            if (isMoving)
            {
                headlight.intensity = 3f;
            }
        }

        // Exhaust effect
        if (exhaustEffect != null)
        {
            if (isActive && isMoving)
            {
                if (!exhaustEffect.isPlaying)
                {
                    exhaustEffect.Play();
                }
                
                var emission = exhaustEffect.emission;
                emission.rateOverTime = moveSpeed * 5f;
            }
            else
            {
                if (exhaustEffect.isPlaying)
                {
                    exhaustEffect.Stop();
                }
            }
        }
    }

    void UpdateAudio()
    {
        if (agvAudio != null && moveSound != null)
        {
            if (isActive && isMoving)
            {
                if (!agvAudio.isPlaying || agvAudio.clip != moveSound)
                {
                    agvAudio.clip = moveSound;
                    agvAudio.loop = true;
                    agvAudio.Play();
                }
                agvAudio.volume = 0.3f;
                agvAudio.pitch = 0.9f + (moveSpeed / 5f) * 0.2f;
            }
            else
            {
                if (agvAudio.isPlaying && agvAudio.clip == moveSound)
                {
                    agvAudio.Stop();
                }
            }
        }
    }

    void GenerateDefaultPath()
    {
        // Create a simple square path
        float pathSize = 20f;
        Vector3[] positions = new Vector3[]
        {
            transform.position,
            transform.position + Vector3.forward * pathSize,
            transform.position + Vector3.forward * pathSize + Vector3.right * pathSize,
            transform.position + Vector3.right * pathSize
        };

        foreach (var pos in positions)
        {
            GameObject waypoint = new GameObject($"Waypoint_{waypoints.Count}");
            waypoint.transform.position = pos;
            waypoint.transform.parent = transform.parent;
            waypoints.Add(waypoint.transform);
        }
    }

    // Public control methods
    public void SetActive(bool active)
    {
        isActive = active;
        if (!active)
        {
            isMoving = false;
        }
    }

    public void SetSpeed(float speed)
    {
        moveSpeed = Mathf.Clamp(speed, 0.5f, 10f);
    }

    public float GetSpeed()
    {
        return moveSpeed;
    }

    public int GetDeliveriesCompleted()
    {
        return deliveriesCompleted;
    }

    public void ResetDeliveries()
    {
        deliveriesCompleted = 0;
    }

    public bool IsMoving()
    {
        return isMoving;
    }

    public int GetCurrentWaypoint()
    {
        return currentWaypointIndex;
    }

    void OnDrawGizmos()
    {
        // Draw path
        if (waypoints.Count > 1)
        {
            Gizmos.color = isActive ? Color.green : Color.gray;
            
            for (int i = 0; i < waypoints.Count - 1; i++)
            {
                if (waypoints[i] != null && waypoints[i + 1] != null)
                {
                    Gizmos.DrawLine(waypoints[i].position, waypoints[i + 1].position);
                    Gizmos.DrawWireSphere(waypoints[i].position, 0.5f);
                }
            }

            // Draw last waypoint
            if (waypoints[waypoints.Count - 1] != null)
            {
                Gizmos.DrawWireSphere(waypoints[waypoints.Count - 1].position, 0.5f);
                
                // Draw loop connection
                if (loopPath && waypoints[0] != null)
                {
                    Gizmos.DrawLine(waypoints[waypoints.Count - 1].position, waypoints[0].position);
                }
            }
        }

        // Draw AGV body
        Gizmos.color = isActive ? movingColor : inactiveColor;
        Gizmos.DrawWireCube(transform.position + Vector3.up * 0.5f, new Vector3(2f, 1f, 3f));
        
        // Draw direction indicator
        if (isActive && isMoving)
        {
            Gizmos.color = Color.yellow;
            Gizmos.DrawRay(transform.position + Vector3.up, transform.forward * 2f);
        }
    }
}
