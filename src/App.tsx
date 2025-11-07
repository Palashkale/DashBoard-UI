import { useState, useRef, useEffect } from "react";
import {
  Home,
  AlertCircle,
  Compass,
  AlertTriangle,
  Phone,
  Video,
  Camera,
  Settings,
  Lock,
  Search,
  Cloud,
  Bell,
  Plus,
  Minus,
  Sun,
  Fingerprint,
  Wind,
  Droplets,
  Bluetooth,
  MessageCircle,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Moon,
  Zap,
  Battery,
  Music,
  X,
  Volume2,
  Wifi,
} from "lucide-react";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [speed, setSpeed] = useState(64);
  const [temperature, setTemperature] = useState(21);
  const [isPlaying, setIsPlaying] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [currentApp, setCurrentApp] = useState("home");
  const [brightness, setBrightness] = useState(80);
  const [showBrightnessSlider, setShowBrightnessSlider] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Camera functionality
  const toggleCamera = async () => {
    if (cameraActive) {
      // Stop camera
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      setCameraActive(false);
      setCurrentApp("home");
    } else {
      // Start camera
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setCameraActive(true);
        setCurrentApp("camera");
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Unable to access camera. Please check permissions.");
      }
    }
  };

  // Make phone call
  const makePhoneCall = () => {
    window.open("tel:+1234567890", "_self");
  };

  // Open Google Maps
  const openGoogleMaps = () => {
    window.open("https://maps.google.com", "_blank");
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Initialize camera when component mounts and camera is active
  useEffect(() => {
    if (cameraActive && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [cameraActive, stream]);

  // Navigation functions
  const navigateToApp = (app) => {
    setCurrentApp(app);
    if (app !== "camera" && cameraActive) {
      toggleCamera(); // Turn off camera when switching away
    }
  };

  const increaseSpeed = () => setSpeed((prev) => Math.min(prev + 5, 200));
  const decreaseSpeed = () => setSpeed((prev) => Math.max(prev - 5, 0));
  const increaseTemp = () => setTemperature((prev) => Math.min(prev + 1, 40));
  const decreaseTemp = () => setTemperature((prev) => Math.max(prev - 1, 15));

  const convertTemperature = (temp) => {
    return isCelsius ? temp : Math.round((temp * 9) / 5 + 32);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Settings options
  const settingsOptions = [
    { icon: Wifi, label: "Wi-Fi", description: "Connected to HomeWiFi" },
    {
      icon: Bluetooth,
      label: "Bluetooth",
      description: "On - Connected to Car",
    },
    { icon: Volume2, label: "Sound", description: "Volume level 75%" },
    { icon: Sun, label: "Display", description: "Brightness, Night mode" },
    { icon: Lock, label: "Security", description: "Screen lock, Fingerprint" },
  ];

  // Render different app screens
  const renderAppScreen = () => {
    switch (currentApp) {
      case "camera":
        return (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 bg-black bg-opacity-70">
              <button
                onClick={() => navigateToApp("home")}
                className="text-white p-2 rounded-full bg-black bg-opacity-50"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-white font-semibold">Camera</div>
              <button
                onClick={() => setCameraActive(!cameraActive)}
                className="text-white p-2 rounded-full bg-black bg-opacity-50"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 relative bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                onLoadedMetadata={() => console.log("Camera feed loaded")}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={toggleCamera}
                  className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center"
                >
                  <div className="w-12 h-12 bg-red-500 rounded-full" />
                </button>
              </div>
              {!stream && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <div>Starting camera...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 bg-gray-900">
              <button
                onClick={() => navigateToApp("home")}
                className="text-white p-2"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="text-white font-semibold text-lg">Settings</div>
              <div className="w-6" />
            </div>
            <div className="flex-1 bg-gray-800 overflow-y-auto">
              {settingsOptions.map((setting, index) => (
                <div key={index} className="border-b border-gray-700">
                  <button className="w-full p-4 flex items-center gap-4 hover:bg-gray-700 transition-colors">
                    <setting.icon className="w-6 h-6 text-lime-400" />
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium">
                        {setting.label}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {setting.description}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* App Screens Overlay */}
      {renderAppScreen()}

      {/* Main Dashboard - Hidden when in fullscreen app */}
      <div
        className={`${["camera", "settings"].includes(currentApp) ? "hidden" : "block"}`}
      >
        <div className="max-w-[1400px] mx-auto p-4 lg:p-6">
          {/* Header */}
          <header
            className={`flex flex-col lg:flex-row items-center justify-between gap-4 mb-6`}
          >
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center"></div>
                <h1 className="text-xl lg:text-2xl font-semibold">Dashboard</h1>
              </div>

              <div className="lg:hidden flex items-center gap-4">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`p-2 rounded-full transition-colors ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-200 shadow-sm"
                  }`}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
                <Bell className="w-5 h-5" />
              </div>
            </div>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full w-full lg:w-96 ${
                isDark ? "bg-gray-800" : "bg-white shadow-sm"
              }`}
            >
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-colors ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-200 shadow-sm"
                }`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <div className="flex items-center gap-2">
                <Cloud className="w-6 h-6" />
                <div>
                  <div className="text-xl font-semibold">23°C</div>
                  <div className="text-xs text-gray-500">Cloudly</div>
                </div>
              </div>
              <div className="text-lg">10:45</div>
              <Bell className="w-5 h-5" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500" />
            </div>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-4">
              {/* Emergency Card */}
              <div
                className={`rounded-2xl p-5 ${
                  isDark ? "bg-gray-900" : "bg-white shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <div>
                      <div className="font-semibold">Emergency</div>
                      <div className="text-xs text-gray-500">
                        Switch on only in emergency case
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmergencyMode(!emergencyMode)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      emergencyMode
                        ? "bg-lime-400"
                        : isDark
                          ? "bg-gray-700"
                          : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        emergencyMode ? "translate-x-7" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
              {/* Control Center */}
              <div
                className={`rounded-2xl p-4 lg:p-6 ${isDark ? "bg-gray-900" : "bg-white shadow-lg"}`}
              >
                {/* Alert Banner */}
                <div className="mb-4 lg:mb-6">
                  <div
                    className={`p-3 rounded-lg ${isDark ? "bg-red-900/20 border border-red-800" : "bg-red-50 border border-red-200"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span
                          className={`font-semibold ${isDark ? "text-red-400" : "text-red-600"}`}
                        >
                          Safety Alerts Active
                        </span>
                      </div>
                      <span
                        className={`text-xs ${isDark ? "text-red-400" : "text-red-500"}`}
                      >
                        {new Date().toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "2-digit",
                        })}
                        , {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Sidebar Navigation */}
                  <div className="flex lg:flex-col gap-3 justify-center">
                    <button
                      onClick={() => navigateToApp("home")}
                      className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors ${
                        currentApp === "home"
                          ? "bg-lime-400 text-black"
                          : isDark
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <Home className="w-5 h-5" />
                    </button>
                    <button
                      onClick={makePhoneCall}
                      className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors ${
                        isDark
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigateToApp("video")}
                      className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors ${
                        currentApp === "video"
                          ? "bg-lime-400 text-black"
                          : isDark
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <Video className="w-5 h-5" />
                    </button>
                    <button
                      onClick={toggleCamera}
                      className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors ${
                        cameraActive
                          ? "bg-red-500 text-white"
                          : isDark
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigateToApp("settings")}
                      className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors ${
                        currentApp === "settings"
                          ? "bg-lime-400 text-black"
                          : isDark
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Main Controls */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 lg:gap-6">
                    {/* Navigation Pad - Simplified */}
                    <div
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center relative ${
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <button
                        onClick={increaseSpeed}
                        className="absolute top-1 left-1/2 -translate-x-1/2"
                      >
                        <ArrowUp className="w-4 h-4 lg:w-5 lg:h-5 text-lime-400" />
                      </button>
                      <button
                        onClick={decreaseSpeed}
                        className="absolute bottom-1 left-1/2 -translate-x-1/2"
                      >
                        <ArrowDown className="w-4 h-4 lg:w-5 lg:h-5 text-lime-400" />
                      </button>
                    </div>

                    {/* Car Display */}
                    <div className="relative">
                      <div
                        className={`w-32 h-24 lg:w-40 lg:h-32 rounded-2xl flex items-center justify-center ${
                          isDark ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      >
                        <div className="text-4xl lg:text-6xl">🚘</div>
                      </div>
                      <button
                        className={`absolute -bottom-2 -right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${
                          isDark
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <Lock className="w-4 h-4 lg:w-5 lg:h-5 text-lime-400" />
                      </button>
                    </div>

                    {/* Speed Gauge - Fixed Layout */}
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          stroke={isDark ? "#1f2937" : "#e5e7eb"}
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          stroke="#a3e635"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${(speed / 200) * 502} 502`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-xs text-gray-500 mb-2">Speed</div>
                        <div className="text-5xl font-bold">{speed}</div>
                        <div className="text-sm text-gray-500 mt-2">km/h</div>
                      </div>
                    </div>
                  </div>

                  {/* Alert Panel */}
                  <div
                    className={`w-full lg:w-64 rounded-xl p-4 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <h3
                        className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        Active Alerts
                      </h3>
                      <span
                        className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? "bg-red-900/50 text-red-300"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        4
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Driver Distracted Alert */}
                      <div
                        className={`flex items-start gap-3 p-3 rounded-lg ${
                          isDark
                            ? "bg-red-900/20 border border-red-800"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-medium ${isDark ? "text-red-400" : "text-red-700"}`}
                            >
                              DRIVER DISTRACTED
                            </span>
                            <span
                              className={`text-xs ${isDark ? "text-red-400" : "text-red-600"}`}
                            >
                              Now
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 ${isDark ? "text-red-300" : "text-red-600"}`}
                          >
                            Driver attention diverted from road
                          </p>
                        </div>
                      </div>

                      {/* Driver Drowsy Alert */}
                      <div
                        className={`flex items-start gap-3 p-3 rounded-lg ${
                          isDark
                            ? "bg-red-900/20 border border-red-800"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-medium ${isDark ? "text-red-400" : "text-red-700"}`}
                            >
                              DRIVER DROWSY
                            </span>
                            <span
                              className={`text-xs ${isDark ? "text-red-400" : "text-red-600"}`}
                            >
                              2 min ago
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 ${isDark ? "text-red-300" : "text-red-600"}`}
                          >
                            Signs of fatigue detected
                          </p>
                        </div>
                      </div>

                      {/* Phone Usage Alert */}
                      <div
                        className={`flex items-start gap-3 p-3 rounded-lg ${
                          isDark
                            ? "bg-red-900/20 border border-red-800"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-medium ${isDark ? "text-red-400" : "text-red-700"}`}
                            >
                              DRIVER CHECKING PHONE
                            </span>
                            <span
                              className={`text-xs ${isDark ? "text-red-400" : "text-red-600"}`}
                            >
                              5 min ago
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 ${isDark ? "text-red-300" : "text-red-600"}`}
                          >
                            Mobile device usage while driving
                          </p>
                        </div>
                      </div>

                      {/* Rash Driving Alert */}
                      <div
                        className={`flex items-start gap-3 p-3 rounded-lg ${
                          isDark
                            ? "bg-red-900/20 border border-red-800"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-medium ${isDark ? "text-red-400" : "text-red-700"}`}
                            >
                              RASH DRIVING
                            </span>
                            <span
                              className={`text-xs ${isDark ? "text-red-400" : "text-red-600"}`}
                            >
                              8 min ago
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 ${isDark ? "text-red-300" : "text-red-600"}`}
                          >
                            Aggressive maneuvers detected
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Alert Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                      <button
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          isDark
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        }`}
                      >
                        Acknowledge
                      </button>
                      <button
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          isDark
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        Emergency
                      </button>
                    </div>
                  </div>
                </div>

                {/* Battery and Power - Fixed Layout */}
                <div className="flex justify-center gap-8 mt-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke={isDark ? "#1f2937" : "#e5e7eb"}
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="#a3e635"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray="125 200"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Zap className="w-4 h-4 mb-1" />
                        <div className="text-sm font-bold">62%</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Power</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke={isDark ? "#1f2937" : "#e5e7eb"}
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="#a3e635"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray="100 200"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Battery className="w-4 h-4 mb-1" />
                        <div className="text-sm font-bold">50%</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Battery</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${
                    isDark
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-white hover:bg-gray-50 shadow-lg"
                  }`}
                >
                  <Wind className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="text-xs">Wind</span>
                </button>
                <button
                  className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${
                    isDark
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-white hover:bg-gray-50 shadow-lg"
                  }`}
                >
                  <Droplets className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="text-xs">Humidity</span>
                </button>
                <button
                  className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${
                    isDark
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-white hover:bg-gray-50 shadow-lg"
                  }`}
                >
                  <Bluetooth className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="text-xs">Bluetooth</span>
                </button>
                <button
                  className={`rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${
                    isDark
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-white hover:bg-gray-50 shadow-lg"
                  }`}
                >
                  <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="text-xs">Message</span>
                </button>
              </div>
            </div>

            {/* Middle Column */}
            <div className="lg:col-span-4 space-y-4">
              {/* Climate Control */}
              <div
                className={`rounded-2xl p-4 lg:p-6 ${
                  isDark ? "bg-gray-900" : "bg-white shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Climate</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decreaseTemp}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isDark
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={increaseTemp}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isDark
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-2">INTERIOR: 23°C</div>
                <div className="flex items-end gap-2 mb-4 lg:mb-6">
                  <div className="text-3xl lg:text-5xl font-bold">
                    {convertTemperature(temperature)}°
                  </div>
                  <button
                    onClick={toggleTemperatureUnit}
                    className="text-sm text-lime-400 hover:text-lime-300 transition-colors mb-2"
                  >
                    {isCelsius ? "C" : "F"}
                  </button>
                </div>

                <div className="space-y-3 mb-4 lg:mb-6">
                  <div className="text-xs text-gray-500">WINDOW CLOSED</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">15°C</span>
                    <div className="flex-1 mx-4 h-2 bg-gray-700 rounded-full relative">
                      <div
                        className="absolute left-0 h-full bg-lime-400 rounded-full"
                        style={{ width: `${((temperature - 15) / 25) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm">40°C</span>
                  </div>
                </div>

                {/* Brightness Section */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() =>
                      setShowBrightnessSlider(!showBrightnessSlider)
                    }
                    className={`flex-1 rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors ${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <Sun className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span className="text-xs">Brightness</span>
                  </button>
                  <button
                    className={`flex-1 rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors ${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <Fingerprint className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span className="text-xs">Fingerprint</span>
                  </button>
                </div>

                {/* Brightness Slider */}
                {showBrightnessSlider && (
                  <div className="mt-4 p-4 rounded-xl bg-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Brightness</span>
                      <span className="text-sm text-lime-400">
                        {brightness}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #a3e635 0%, #a3e635 ${brightness}%, #374151 ${brightness}%, #374151 100%)`,
                      }}
                    />
                  </div>
                )}
              </div>
              {/* Google Maps - Interactive Version */}
              <div
                className={`rounded-2xl p-4 lg:p-6 ${
                  isDark ? "bg-gray-900" : "bg-white shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Navigation</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={openGoogleMaps}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        isDark
                          ? "bg-lime-400 text-black hover:bg-lime-500"
                          : "bg-lime-400 text-black hover:bg-lime-500"
                      }`}
                    >
                      Open Map
                    </button>
                  </div>
                </div>

                {/* Interactive Map Container */}
                <div
                  className={`rounded-xl h-48 relative overflow-hidden ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  {/* MapTiler Interactive Map */}
                  <iframe
                    src="https://api.maptiler.com/maps/streets-v2/?key=iaxsZ27HgyxS3qWBqoaq#10.5/18.5204/73.8567"
                    className="w-full h-full border-0"
                    title="Pune Interactive Map"
                    loading="lazy"
                  />

                  {/* Overlay Elements */}

                  {/* Location Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div
                      className={`rounded-lg p-3 backdrop-blur-sm border ${
                        isDark
                          ? "bg-black bg-opacity-50 border-gray-700"
                          : "bg-white bg-opacity-90 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div
                            className={`font-semibold text-sm ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            FC Road, Pune
                          </div>
                          <div
                            className={`text-xs ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            Heading to Koregaon Park
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              isDark
                                ? "bg-green-900 text-green-300"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            Moving
                          </div>
                          <Navigation className="w-4 h-4 text-lime-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rest of the navigation details remains the same */}
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <div className="text-xs text-gray-500">Distance</div>
                      <div className="font-semibold text-sm">4.2 km</div>
                    </div>
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <div className="text-xs text-gray-500">Time</div>
                      <div className="font-semibold text-sm">12 min</div>
                    </div>
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <div className="text-xs text-gray-500">Arrival</div>
                      <div className="font-semibold text-sm">6:24 PM</div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg flex items-center gap-3 ${
                      isDark
                        ? "bg-blue-900/20 border border-blue-800"
                        : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        In 500m, turn right
                      </div>
                      <div className="text-xs text-gray-500">SB Road</div>
                    </div>
                    <div className="text-xs font-medium text-blue-500">
                      0.5 km
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      isDark
                        ? "bg-lime-600 hover:bg-lime-700 text-white"
                        : "bg-lime-500 hover:bg-lime-600 text-white"
                    }`}
                  >
                    Re-route
                  </button>
                </div>
              </div>
              {/* Phone Controls */}
              <div
                className={`rounded-2xl p-4 lg:p-6 ${
                  isDark ? "bg-gray-900" : "bg-white shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <Phone className="w-6 h-6 lg:w-8 lg:h-8" />
                    <div className="text-xl lg:text-3xl font-bold">20</div>
                  </div>
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="text-xl lg:text-3xl font-bold">17</div>
                    <Phone className="w-6 h-6 lg:w-8 lg:h-8 rotate-180" />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button className="p-1 rounded-full hover:bg-gray-800">
                    <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <span className="text-sm">17</span>
                  <button className="p-1 rounded-full hover:bg-gray-800">
                    <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 space-y-4">
              {/* Navigation */}
              <div
                className={`rounded-2xl p-4 lg:p-6 ${
                  isDark ? "bg-gray-900" : "bg-white shadow-lg"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-lime-400">
                    <Navigation
                      className="w-6 h-6 lg:w-8 lg:h-8"
                      style={{ transform: "rotate(-135deg)" }}
                    />
                  </div>
                  <div>
                    <div className="text-xl lg:text-3xl font-bold">500m</div>
                    <div className="text-xs text-gray-500">
                      In 500m take turning left
                    </div>
                  </div>
                </div>
                <div
                  className={`rounded-xl p-3 lg:p-4 h-48 lg:h-64 relative overflow-hidden ${
                    isDark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <svg className="w-full h-full">
                    <defs>
                      <linearGradient
                        id="routeGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#22c55e"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#22c55e"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 20 160 L 40 140 L 70 120 L 100 90 L 130 70 L 160 50 L 190 30"
                      stroke="#22c55e"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="40" cy="140" r="3" fill="#22c55e" />
                    <circle cx="100" cy="90" r="3" fill="#22c55e" />
                    <circle cx="160" cy="50" r="4" fill="#22c55e" />
                    <rect
                      x="15"
                      y="145"
                      width="30"
                      height="20"
                      fill={isDark ? "#374151" : "#d1d5db"}
                      rx="3"
                    />
                    <rect
                      x="85"
                      y="100"
                      width="35"
                      height="25"
                      fill={isDark ? "#374151" : "#d1d5db"}
                      rx="3"
                    />
                  </svg>
                </div>
                <div className="mt-3 lg:mt-4">
                  <div className="font-semibold text-sm lg:text-base">
                    Rolling Green Rd.
                  </div>
                  <div className="text-xs text-gray-500">
                    2716 Ash Dr. San Jose, South Dakota 83475
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs lg:text-sm">4 km</div>
                    <div
                      className={`h-0.5 flex-1 mx-2 rounded ${
                        isDark ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    />
                    <div className="text-xs lg:text-sm">6 min</div>
                  </div>
                </div>
              </div>

              {/* Music Player */}
              <div
                className={`rounded-2xl p-4 lg:p-6 ${
                  isDark ? "bg-gray-900" : "bg-white shadow-lg"
                }`}
              >
                <div
                  className={`rounded-xl overflow-hidden mb-3 lg:mb-4 h-28 lg:h-40 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center`}
                >
                  <Music className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
                </div>
                <div className="text-center mb-3 lg:mb-4">
                  <div className="font-semibold text-sm lg:text-base">
                    That Naruto Song
                  </div>
                  <div className="text-xs text-gray-500">Weebo</div>
                </div>
                <div className="flex items-center justify-center gap-2 lg:gap-4 mb-3 lg:mb-4">
                  <button
                    className={`p-1 lg:p-2 rounded-full transition-colors ${
                      isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <SkipBack
                      className="w-4 h-4 lg:w-5 lg:h-5"
                      fill="currentColor"
                    />
                  </button>
                  <button
                    className={`p-1 lg:p-2 rounded-full transition-colors ${
                      isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <SkipBack className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`p-2 lg:p-3 rounded-full transition-colors ${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 lg:w-5 lg:h-5" />
                    ) : (
                      <Play
                        className="w-4 h-4 lg:w-5 lg:h-5"
                        fill="currentColor"
                      />
                    )}
                  </button>
                  <button
                    className={`p-1 lg:p-2 rounded-full transition-colors ${
                      isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <SkipForward className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                  <button
                    className={`p-1 lg:p-2 rounded-full transition-colors ${
                      isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <SkipForward
                      className="w-4 h-4 lg:w-5 lg:h-5"
                      fill="currentColor"
                    />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">0:00</span>
                  <div
                    className={`flex-1 h-1 rounded-full relative ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  >
                    <div className="absolute h-full w-1/4 bg-lime-400 rounded-full" />
                  </div>
                  <span className="text-xs">3:05</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
