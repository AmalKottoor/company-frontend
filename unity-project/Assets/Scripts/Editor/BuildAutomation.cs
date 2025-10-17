using UnityEditor;
using UnityEngine;
using System.IO;

/// <summary>
/// Build Automation Script
/// Automates building all three quality levels for WebGL
/// </summary>
public class BuildAutomation : EditorWindow
{
    private string buildBasePath = "../frontend/public/unity-builds";
    private bool buildMobile = true;
    private bool buildDesktop = true;
    private bool buildDesktopHQ = true;

    [MenuItem("Build/Production Plant Builder")]
    public static void ShowWindow()
    {
        GetWindow<BuildAutomation>("Production Plant Builder");
    }

    void OnGUI()
    {
        GUILayout.Label("Production Plant WebGL Builder", EditorStyles.boldLabel);
        GUILayout.Space(10);

        EditorGUILayout.HelpBox("This will build the production plant for WebGL in three quality levels.", MessageType.Info);
        GUILayout.Space(10);

        // Build path
        GUILayout.Label("Build Output Path:", EditorStyles.boldLabel);
        buildBasePath = EditorGUILayout.TextField("Base Path:", buildBasePath);
        GUILayout.Space(10);

        // Quality level selection
        GUILayout.Label("Select Quality Levels to Build:", EditorStyles.boldLabel);
        buildMobile = EditorGUILayout.Toggle("Mobile (Low Quality)", buildMobile);
        buildDesktop = EditorGUILayout.Toggle("Desktop (Medium Quality)", buildDesktop);
        buildDesktopHQ = EditorGUILayout.Toggle("Desktop-HQ (High Quality)", buildDesktopHQ);
        GUILayout.Space(10);

        // Build buttons
        if (GUILayout.Button("Build All Selected", GUILayout.Height(40)))
        {
            BuildAll();
        }

        GUILayout.Space(10);

        if (GUILayout.Button("Build Mobile Only"))
        {
            BuildMobile();
        }

        if (GUILayout.Button("Build Desktop Only"))
        {
            BuildDesktop();
        }

        if (GUILayout.Button("Build Desktop-HQ Only"))
        {
            BuildDesktopHQ();
        }

        GUILayout.Space(20);

        // Info section
        EditorGUILayout.HelpBox(
            "Build Output Structure:\n" +
            "mobile/ - Low quality for mobile devices\n" +
            "desktop/ - Medium quality for standard PCs\n" +
            "desktop-hq/ - High quality for high-end PCs\n\n" +
            "Each build will take 3-5 minutes.",
            MessageType.None
        );
    }

    void BuildAll()
    {
        Debug.Log("=== Starting Build Process ===");

        if (buildMobile)
        {
            BuildMobile();
        }

        if (buildDesktop)
        {
            BuildDesktop();
        }

        if (buildDesktopHQ)
        {
            BuildDesktopHQ();
        }

        Debug.Log("=== Build Process Complete ===");
        EditorUtility.DisplayDialog("Build Complete", "All selected builds completed successfully!", "OK");
    }

    void BuildMobile()
    {
        Debug.Log("Building Mobile version...");
        
        // Set quality level
        QualitySettings.SetQualityLevel(0); // Low quality
        
        // Set player settings
        PlayerSettings.defaultScreenWidth = 1280;
        PlayerSettings.defaultScreenHeight = 720;
        
        // Build
        string buildPath = Path.Combine(buildBasePath, "mobile");
        BuildWebGL(buildPath, "ProductionPlantMobile");
        
        Debug.Log("Mobile build complete!");
    }

    void BuildDesktop()
    {
        Debug.Log("Building Desktop version...");
        
        // Set quality level
        QualitySettings.SetQualityLevel(1); // Medium quality
        
        // Set player settings
        PlayerSettings.defaultScreenWidth = 1920;
        PlayerSettings.defaultScreenHeight = 1080;
        
        // Build
        string buildPath = Path.Combine(buildBasePath, "desktop");
        BuildWebGL(buildPath, "ProductionPlant");
        
        Debug.Log("Desktop build complete!");
    }

    void BuildDesktopHQ()
    {
        Debug.Log("Building Desktop-HQ version...");
        
        // Set quality level
        QualitySettings.SetQualityLevel(2); // High quality
        
        // Set player settings
        PlayerSettings.defaultScreenWidth = 1920;
        PlayerSettings.defaultScreenHeight = 1080;
        
        // Build
        string buildPath = Path.Combine(buildBasePath, "desktop-hq");
        BuildWebGL(buildPath, "ProductionPlantHQ");
        
        Debug.Log("Desktop-HQ build complete!");
    }

    void BuildWebGL(string path, string buildName)
    {
        // Ensure directory exists
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }

        // Get scenes
        string[] scenes = new string[] { "Assets/Scenes/ProductionPlant.unity" };

        // Build options
        BuildPlayerOptions buildPlayerOptions = new BuildPlayerOptions
        {
            scenes = scenes,
            locationPathName = path,
            target = BuildTarget.WebGL,
            options = BuildOptions.None
        };

        // Perform build
        BuildReport report = BuildPipeline.BuildPlayer(buildPlayerOptions);
        BuildSummary summary = report.summary;

        if (summary.result == BuildResult.Succeeded)
        {
            Debug.Log($"Build succeeded: {buildName} ({summary.totalSize} bytes)");
        }
        else if (summary.result == BuildResult.Failed)
        {
            Debug.LogError($"Build failed: {buildName}");
        }
    }
}

/// <summary>
/// Quick Build Menu Items
/// </summary>
public class QuickBuildMenu
{
    [MenuItem("Build/Quick Build - Mobile")]
    public static void QuickBuildMobile()
    {
        QualitySettings.SetQualityLevel(0);
        PlayerSettings.defaultScreenWidth = 1280;
        PlayerSettings.defaultScreenHeight = 720;
        
        BuildPlayerOptions options = new BuildPlayerOptions
        {
            scenes = new[] { "Assets/Scenes/ProductionPlant.unity" },
            locationPathName = "../frontend/public/unity-builds/mobile",
            target = BuildTarget.WebGL,
            options = BuildOptions.None
        };
        
        BuildPipeline.BuildPlayer(options);
    }

    [MenuItem("Build/Quick Build - Desktop")]
    public static void QuickBuildDesktop()
    {
        QualitySettings.SetQualityLevel(1);
        PlayerSettings.defaultScreenWidth = 1920;
        PlayerSettings.defaultScreenHeight = 1080;
        
        BuildPlayerOptions options = new BuildPlayerOptions
        {
            scenes = new[] { "Assets/Scenes/ProductionPlant.unity" },
            locationPathName = "../frontend/public/unity-builds/desktop",
            target = BuildTarget.WebGL,
            options = BuildOptions.None
        };
        
        BuildPipeline.BuildPlayer(options);
    }

    [MenuItem("Build/Quick Build - Desktop HQ")]
    public static void QuickBuildDesktopHQ()
    {
        QualitySettings.SetQualityLevel(2);
        PlayerSettings.defaultScreenWidth = 1920;
        PlayerSettings.defaultScreenHeight = 1080;
        
        BuildPlayerOptions options = new BuildPlayerOptions
        {
            scenes = new[] { "Assets/Scenes/ProductionPlant.unity" },
            locationPathName = "../frontend/public/unity-builds/desktop-hq",
            target = BuildTarget.WebGL,
            options = BuildOptions.None
        };
        
        BuildPipeline.BuildPlayer(options);
    }

    [MenuItem("Build/Open Build Folder")]
    public static void OpenBuildFolder()
    {
        string path = Path.GetFullPath("../frontend/public/unity-builds");
        EditorUtility.RevealInFinder(path);
    }
}
