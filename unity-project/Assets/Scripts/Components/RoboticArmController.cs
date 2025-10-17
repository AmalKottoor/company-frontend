using UnityEngine;

/// <summary>
/// Robotic Arm Controller (Pick & Place)
/// Manages robotic arm movements, picking, and placing operations
/// </summary>
public class RoboticArmController : MonoBehaviour
{
    [Header("Arm Configuration")]
    public Transform baseJoint;
    public Transform shoulderJoint;
    public Transform elbowJoint;
    public Transform wristJoint;
    public Transform endEffector;
    public Transform gripperLeft;
    public Transform gripperRight;

    [Header("Movement Settings")]
    public float baseRotationSpeed = 30f;
    public float jointRotationSpeed = 45f;
    public float gripperSpeed = 2f;
    public Vector3 homePosition = new Vector3(0, 90, -45);
    public Vector3 pickPosition = new Vector3(45, 60, -30);
    public Vector3 placePosition = new Vector3(-45, 60, -30);

    [Header("Gripper Settings")]
    public float gripperOpenDistance = 0.3f;
    public float gripperClosedDistance = 0.05f;
    private float currentGripperDistance;
    private bool isGripperOpen = true;

    [Header("Operation")]
    public bool isActive = false;
    public bool isHoldingItem = false;
    public GameObject heldItem;

    [Header("Visual Effects")]
    public Light statusLight;
    public ParticleSystem pickEffect;
    public ParticleSystem placeEffect;
    public Color activeColor = Color.green;
    public Color inactiveColor = Color.red;
    public Color workingColor = Color.yellow;

    [Header("Audio")]
    public AudioSource armAudio;
    public AudioClip moveSound;
    public AudioClip gripSound;

    [Header("Performance Tracking")]
    public int itemsProcessed = 0;
    public float cycleTime = 3f;
    private float cycleTimer = 0f;

    private enum ArmState
    {
        Idle,
        MovingToPick,
        Picking,
        MovingToPlace,
        Placing,
        ReturningHome
    }

    private ArmState currentState = ArmState.Idle;
    private Vector3 targetAngles;
    private Vector3 currentAngles;

    void Start()
    {
        currentGripperDistance = gripperOpenDistance;
        currentAngles = homePosition;
        targetAngles = homePosition;
        ApplyJointAngles(currentAngles);
        UpdateGripper();
    }

    void Update()
    {
        if (isActive)
        {
            UpdateArmCycle();
            UpdateJointMovement();
            UpdateGripper();
        }
        else
        {
            // Return to home position when inactive
            if (currentState != ArmState.Idle)
            {
                currentState = ArmState.Idle;
                targetAngles = homePosition;
            }
        }

        UpdateVisuals();
        UpdateAudio();
    }

    void UpdateArmCycle()
    {
        cycleTimer += Time.deltaTime;

        switch (currentState)
        {
            case ArmState.Idle:
                if (cycleTimer >= cycleTime)
                {
                    currentState = ArmState.MovingToPick;
                    targetAngles = pickPosition;
                    isGripperOpen = true;
                    cycleTimer = 0f;
                }
                break;

            case ArmState.MovingToPick:
                if (Vector3.Distance(currentAngles, targetAngles) < 2f)
                {
                    currentState = ArmState.Picking;
                    cycleTimer = 0f;
                }
                break;

            case ArmState.Picking:
                isGripperOpen = false;
                if (cycleTimer >= 0.5f)
                {
                    PickItem();
                    currentState = ArmState.MovingToPlace;
                    targetAngles = placePosition;
                    cycleTimer = 0f;
                }
                break;

            case ArmState.MovingToPlace:
                if (Vector3.Distance(currentAngles, targetAngles) < 2f)
                {
                    currentState = ArmState.Placing;
                    cycleTimer = 0f;
                }
                break;

            case ArmState.Placing:
                isGripperOpen = true;
                if (cycleTimer >= 0.5f)
                {
                    PlaceItem();
                    currentState = ArmState.ReturningHome;
                    targetAngles = homePosition;
                    cycleTimer = 0f;
                }
                break;

            case ArmState.ReturningHome:
                if (Vector3.Distance(currentAngles, targetAngles) < 2f)
                {
                    currentState = ArmState.Idle;
                    itemsProcessed++;
                    cycleTimer = 0f;
                }
                break;
        }
    }

    void UpdateJointMovement()
    {
        // Smoothly interpolate to target angles
        currentAngles = Vector3.Lerp(currentAngles, targetAngles, Time.deltaTime * jointRotationSpeed / 45f);
        ApplyJointAngles(currentAngles);
    }

    void ApplyJointAngles(Vector3 angles)
    {
        if (baseJoint != null)
        {
            baseJoint.localRotation = Quaternion.Euler(0, angles.x, 0);
        }

        if (shoulderJoint != null)
        {
            shoulderJoint.localRotation = Quaternion.Euler(angles.y, 0, 0);
        }

        if (elbowJoint != null)
        {
            elbowJoint.localRotation = Quaternion.Euler(angles.z, 0, 0);
        }
    }

    void UpdateGripper()
    {
        float targetDistance = isGripperOpen ? gripperOpenDistance : gripperClosedDistance;
        currentGripperDistance = Mathf.Lerp(currentGripperDistance, targetDistance, Time.deltaTime * gripperSpeed);

        if (gripperLeft != null)
        {
            Vector3 pos = gripperLeft.localPosition;
            pos.x = -currentGripperDistance / 2f;
            gripperLeft.localPosition = pos;
        }

        if (gripperRight != null)
        {
            Vector3 pos = gripperRight.localPosition;
            pos.x = currentGripperDistance / 2f;
            gripperRight.localPosition = pos;
        }
    }

    void PickItem()
    {
        isHoldingItem = true;
        
        if (pickEffect != null)
        {
            pickEffect.Play();
        }

        if (armAudio != null && gripSound != null)
        {
            armAudio.PlayOneShot(gripSound, 0.5f);
        }

        // Create visual representation of held item
        if (endEffector != null && heldItem == null)
        {
            heldItem = GameObject.CreatePrimitive(PrimitiveType.Cube);
            heldItem.transform.SetParent(endEffector);
            heldItem.transform.localPosition = Vector3.zero;
            heldItem.transform.localScale = Vector3.one * 0.3f;
            heldItem.GetComponent<Renderer>().material.color = new Color(0.8f, 0.6f, 0.2f);
        }

        Debug.Log("Robotic arm picked item");
    }

    void PlaceItem()
    {
        isHoldingItem = false;

        if (placeEffect != null)
        {
            placeEffect.Play();
        }

        if (armAudio != null && gripSound != null)
        {
            armAudio.PlayOneShot(gripSound, 0.3f);
        }

        // Remove held item
        if (heldItem != null)
        {
            Destroy(heldItem);
            heldItem = null;
        }

        Debug.Log("Robotic arm placed item");
    }

    void UpdateVisuals()
    {
        if (statusLight != null)
        {
            statusLight.enabled = isActive;
            if (isActive)
            {
                statusLight.color = currentState == ArmState.Idle ? activeColor : workingColor;
                statusLight.intensity = 2f;
            }
        }
    }

    void UpdateAudio()
    {
        if (armAudio != null && moveSound != null)
        {
            if (isActive && currentState != ArmState.Idle)
            {
                if (!armAudio.isPlaying || armAudio.clip != moveSound)
                {
                    armAudio.clip = moveSound;
                    armAudio.loop = true;
                    armAudio.volume = 0.3f;
                    armAudio.Play();
                }
            }
            else
            {
                if (armAudio.isPlaying && armAudio.clip == moveSound)
                {
                    armAudio.Stop();
                }
            }
        }
    }

    // Public control methods
    public void SetActive(bool active)
    {
        isActive = active;
    }

    public int GetItemsProcessed()
    {
        return itemsProcessed;
    }

    public void ResetCounter()
    {
        itemsProcessed = 0;
    }

    public string GetCurrentState()
    {
        return currentState.ToString();
    }

    void OnDrawGizmos()
    {
        // Draw arm reach area
        Gizmos.color = isActive ? new Color(0, 1, 0, 0.1f) : new Color(0.5f, 0.5f, 0.5f, 0.1f);
        Gizmos.DrawWireSphere(transform.position, 5f);

        // Draw pick and place positions
        if (isActive)
        {
            Gizmos.color = Color.cyan;
            Gizmos.DrawWireSphere(transform.position + transform.TransformDirection(Vector3.forward * 3f + Vector3.right * 2f), 0.5f);
            
            Gizmos.color = Color.magenta;
            Gizmos.DrawWireSphere(transform.position + transform.TransformDirection(Vector3.forward * 3f + Vector3.left * 2f), 0.5f);
        }
    }
}
