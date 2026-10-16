// Realistic Road Damage Detection Dataset based on RDD2022 & Project Review Paper
export const PROJECT_INFO = {
  title: "AI-Based Road Damage Detection and Geospatial Mapping System",
  subtitle: "An Intelligent Computer Vision Platform for Automated Road Condition Monitoring, Localization & Maintenance Support",
  institution: "Ajeenkya DY Patil University School of Engineering",
  departments: "B.Tech CSE & B.Tech AI&DS",
  guide: "Dr. Pradip Salve",
  coordinator: "Dr. Yogesh Mali",
  team: [
    { name: "Prem Bhandakkar", urn: "2023-B-14032006", role: "CV Pipeline, YOLO Model & Geospatial Data Flow" },
    { name: "Kushal Agarwal", urn: "2023-B-01072003", role: "Dataset Engineering & RDD2022 Annotation" },
    { name: "Piyush Pingane", urn: "2023-B-05092005A", role: "Backend Architecture & SQLite Database" },
    { name: "Kanishk Talaha", urn: "2023-B-19022005D", role: "Frontend Dashboard & Map Visualization" }
  ],
  researchObjectives: [
    { id: "RO1", title: "Automated Detection", desc: "Develop a computer-vision pipeline that detects & classifies visible road damage from vehicle cameras." },
    { id: "RO2", title: "YOLO Model Training", desc: "Train and benchmark YOLOv8/v11 on RDD2022 (longitudinal, transverse, alligator cracks, potholes)." },
    { id: "RO3", title: "Geospatial Localization", desc: "Associate GPS metadata with damage frames for route-based georeferencing and GIS integration." },
    { id: "RO4", title: "Severity Priority Scoring", desc: "Algorithmic severity estimation (Low, Medium, High) derived from bounding box area and defect density." },
    { id: "RO5", title: "Interactive Dashboard", desc: "Web platform displaying real-time detections, confidence telemetry, heatmaps and maintenance queues." },
    { id: "RO6", title: "System Evaluation", desc: "Validate precision, recall, mAP@0.5, inference latency (FPS) and localization reliability." }
  ],
  systemMetrics: {
    mAP50: "89.4%",
    inferenceSpeed: "23.4 ms",
    fps: "42.7 FPS",
    totalDetectionsProcessed: "3,842",
    surveyedDistanceKm: "128.5 km",
    criticalAlertsCount: 14
  }
};

export const DAMAGE_CLASSES = {
  D00: { code: "D00", label: "Longitudinal Crack", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.15)", icon: "GitCommit" },
  D10: { code: "D10", label: "Transverse Crack", color: "#a855f7", bg: "rgba(168, 85, 247, 0.15)", icon: "Split" },
  D20: { code: "D20", label: "Alligator Crack", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", icon: "Grid" },
  D40: { code: "D40", label: "Pothole", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)", icon: "AlertTriangle" }
};

export const SAMPLE_DETECTIONS = [
  {
    id: "DET-2026-001",
    classCode: "D40",
    className: "Pothole",
    confidence: 0.94,
    severity: "High",
    severityScore: 92,
    lat: 18.5912,
    lng: 73.7389,
    locationName: "Hinjawadi Phase 1 - Spine Road Junction",
    roadType: "Arterial Highway",
    timestamp: "2026-10-16 11:24:18",
    boxAreaPct: "14.2%",
    vehicleSpeedKmh: 42.5,
    cameraSource: "Vehicle Dashcam 4K",
    bbox: [120, 240, 310, 390],
    repairStatus: "Urgent Repair Scheduled",
    color: "#ef4444"
  },
  {
    id: "DET-2026-002",
    classCode: "D20",
    className: "Alligator Crack",
    confidence: 0.88,
    severity: "Medium",
    severityScore: 68,
    lat: 18.5985,
    lng: 73.7441,
    locationName: "Wakad Bridge North Approach",
    roadType: "Urban Main Road",
    timestamp: "2026-10-16 11:29:40",
    boxAreaPct: "8.7%",
    vehicleSpeedKmh: 38.0,
    cameraSource: "Front Survey Pod",
    bbox: [80, 160, 420, 280],
    repairStatus: "Under Review",
    color: "#f59e0b"
  },
  {
    id: "DET-2026-003",
    classCode: "D00",
    className: "Longitudinal Crack",
    confidence: 0.91,
    severity: "Low",
    severityScore: 34,
    lat: 18.6041,
    lng: 73.7512,
    locationName: "Pimple Saudagar Express Corridor",
    roadType: "Divided 4-Lane",
    timestamp: "2026-10-16 11:34:02",
    boxAreaPct: "4.3%",
    vehicleSpeedKmh: 55.2,
    cameraSource: "Smartphone Mount (Sony IMX)",
    bbox: [210, 90, 270, 480],
    repairStatus: "Monitored",
    color: "#38bdf8"
  },
  {
    id: "DET-2026-004",
    classCode: "D10",
    className: "Transverse Crack",
    confidence: 0.86,
    severity: "Medium",
    severityScore: 58,
    lat: 18.6120,
    lng: 73.7624,
    locationName: "Bhumkar Chowk Underpass",
    roadType: "Sub-Arterial",
    timestamp: "2026-10-16 11:41:15",
    boxAreaPct: "6.9%",
    vehicleSpeedKmh: 28.6,
    cameraSource: "Vehicle Dashcam 4K",
    bbox: [140, 190, 390, 260],
    repairStatus: "Assigned to Ward 4",
    color: "#a855f7"
  },
  {
    id: "DET-2026-005",
    classCode: "D40",
    className: "Pothole",
    confidence: 0.96,
    severity: "High",
    severityScore: 97,
    lat: 18.6214,
    lng: 73.7719,
    locationName: "Ravet Flyover Descent Ramp",
    roadType: "National Highway Link",
    timestamp: "2026-10-16 11:48:52",
    boxAreaPct: "18.5%",
    vehicleSpeedKmh: 46.1,
    cameraSource: "Front Survey Pod",
    bbox: [180, 290, 380, 470],
    repairStatus: "Emergency Patching",
    color: "#ef4444"
  },
  {
    id: "DET-2026-006",
    classCode: "D20",
    className: "Alligator Crack",
    confidence: 0.82,
    severity: "High",
    severityScore: 81,
    lat: 18.6289,
    lng: 73.7801,
    locationName: "Chinchwad Station Link Road",
    roadType: "Commercial Zone Arterial",
    timestamp: "2026-10-16 11:55:30",
    boxAreaPct: "12.1%",
    vehicleSpeedKmh: 31.4,
    cameraSource: "Smartphone Mount (Sony IMX)",
    bbox: [90, 140, 460, 330],
    repairStatus: "Assigned to Contractor",
    color: "#f59e0b"
  }
];

export const MODEL_BENCHMARKS = [
  { model: "YOLOv8-Nano (Edge)", precision: "84.2%", recall: "81.6%", mAP: "83.1%", latency: "14.2 ms", size: "6.3 MB" },
  { model: "YOLOv8-Small (Balanced)", precision: "89.4%", recall: "87.8%", mAP: "88.6%", latency: "23.4 ms", size: "22.5 MB" },
  { model: "YOLOv8-Medium (Deep)", precision: "92.1%", recall: "90.5%", mAP: "91.3%", latency: "46.1 ms", size: "52.0 MB" },
  { model: "Faster R-CNN (Baseline)", precision: "86.7%", recall: "83.2%", mAP: "84.5%", latency: "112.0 ms", size: "168 MB" }
];

export const WORKFLOW_STEPS = [
  { step: "01", name: "Image / Frame Ingestion", desc: "Continuous 4K/1080p vehicle stream or smartphone sensor feed" },
  { step: "02", name: "Pre-processing & CLAHE", desc: "Contrast normalization, shadow removal, aspect ratio preservation" },
  { step: "03", name: "YOLO Real-time Inference", desc: "Single-stage tensor execution yielding bounding boxes and class logits" },
  { step: "04", name: "GPS Fusion & Geo-tagging", desc: "Lat-Long interpolation from onboard NMEA GPS telemetry at 10Hz" },
  { step: "05", name: "Severity Scoring Engine", desc: "Area proportion calculation and visual damage matrix ranking" },
  { step: "06", name: "GIS Map & Dispatch Queue", desc: "Interactive visualization, municipal export (GeoJSON/CSV), priority dispatch" }
];
