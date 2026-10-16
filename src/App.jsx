import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Road3DCanvas from './components/Road3DCanvas';
import InteractiveMap from './components/InteractiveMap';
import YOLODetector from './components/YOLODetector';
import AnalyticsAndPaper from './components/AnalyticsAndPaper';
import { PROJECT_INFO, SAMPLE_DETECTIONS, DAMAGE_CLASSES } from './data';
import { 
  Shield, 
  MapPin, 
  Cpu, 
  Activity, 
  TrendingUp, 
  Zap, 
  Layers, 
  Eye, 
  Sliders, 
  ChevronRight, 
  Sparkles,
  FileText,
  Search,
  Filter
} from 'lucide-react';

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeDetection, setActiveDetection] = useState(SAMPLE_DETECTIONS[0]);
  const [activeTab, setActiveTab] = useState('benchmarks');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveCounter, setLiveCounter] = useState(3842);

  // Live defect counter increment simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveCounter(prev => prev + 1);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic 3D Responsive Reticle Cursor */}
      <CustomCursor />

      {/* Top Cyber Navigation Bar */}
      <header className="navbar">
        <div className="nav-brand">
          <div className="brand-logo-icon">
            <Shield size={22} />
          </div>
          <div className="brand-text-block">
            <h1>RoadGuard AI</h1>
            <span className="brand-tag">Geospatial CV Platform</span>
          </div>
        </div>

        <nav className="nav-links">
          <button className="nav-item active" onClick={() => handleScrollTo('hero')}>Home</button>
          <button className="nav-item" onClick={() => handleScrollTo('map-section')}>GIS Map</button>
          <button className="nav-item" onClick={() => handleScrollTo('yolo-section')}>YOLO Testbench</button>
          <button className="nav-item" onClick={() => handleScrollTo('analytics-section')}>Benchmarks</button>
          <button className="nav-item" onClick={() => handleScrollTo('team-section')}>Research Proposal</button>
        </nav>

        <div className="nav-status">
          <span className="status-dot" />
          <span>MODEL ONLINE: YOLOv8-PyTorch</span>
        </div>
      </header>

      {/* Hero 3D Section with Interactive WebGL Highway */}
      <section id="hero" className="hero-3d-section">
        <Road3DCanvas />

        <div className="hero-overlay-content">
          <div className="hero-chip">
            <Sparkles size={14} />
            <span>FINAL REVIEW PAPER — CAPSTONE RESEARCH PROPOSAL</span>
          </div>

          <h1 className="hero-title">
            AI-Based Road Damage Detection & <span className="gradient-text">Geospatial Mapping</span>
          </h1>

          <p className="hero-subtitle">
            An Intelligent Computer Vision Platform for Automated Road Condition Monitoring, YOLOv8 Multi-Class Defect Localization, and Dynamic Maintenance Support.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => handleScrollTo('yolo-section')}>
              <Cpu size={18} /> Test YOLO Inference Engine
            </button>
            <button className="btn-secondary" onClick={() => handleScrollTo('map-section')}>
              <MapPin size={18} /> Inspect Live GIS Telemetry
            </button>
          </div>

          {/* Key Metric Telemetry Bar */}
          <div className="hero-stats-bar">
            <div className="hero-stat-card">
              <Zap size={20} className="stat-icon" />
              <span className="stat-num">{PROJECT_INFO.systemMetrics.mAP50}</span>
              <span className="stat-desc">mAP @ 0.5 (RDD2022 Benchmark)</span>
            </div>
            <div className="hero-stat-card">
              <Activity size={20} className="stat-icon" />
              <span className="stat-num">{PROJECT_INFO.systemMetrics.inferenceSpeed}</span>
              <span className="stat-desc">TensorRT / ONNX Latency</span>
            </div>
            <div className="hero-stat-card">
              <TrendingUp size={20} className="stat-icon" />
              <span className="stat-num">{PROJECT_INFO.systemMetrics.fps}</span>
              <span className="stat-desc">Real-Time Mobile Frame Rate</span>
            </div>
            <div className="hero-stat-card">
              <Shield size={20} className="stat-icon" />
              <span className="stat-num">{liveCounter.toLocaleString()}</span>
              <span className="stat-desc">Surface Anomalies Cataloged</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workbench Section */}
      <main className="main-content">
        
        {/* Section 1: Geospatial GIS Road Asset Map */}
        <section id="map-section">
          <div className="section-title-wrap">
            <div>
              <h2>Interactive Geospatial Road Damage Inventory</h2>
              <p>GPS-synchronized defect clusters, route coverage, and visual severity heatmaps</p>
            </div>

            <div className="filter-tabs">
              <button 
                className={`filter-tab ${selectedFilter === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('ALL')}
              >
                All Detections
              </button>
              <button 
                className={`filter-tab ${selectedFilter === 'D40' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('D40')}
              >
                Potholes (D40)
              </button>
              <button 
                className={`filter-tab ${selectedFilter === 'D20' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('D20')}
              >
                Alligator (D20)
              </button>
              <button 
                className={`filter-tab ${selectedFilter === 'D00' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('D00')}
              >
                Longitudinal (D00)
              </button>
              <button 
                className={`filter-tab ${selectedFilter === 'D10' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('D10')}
              >
                Transverse (D10)
              </button>
              <button 
                className={`filter-tab ${selectedFilter === 'High' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('High')}
              >
                High Severity Only
              </button>
            </div>
          </div>

          <InteractiveMap 
            selectedFilter={selectedFilter}
            onSelectDetection={setActiveDetection}
            activeDetection={activeDetection}
          />
        </section>

        {/* Section 2: YOLO Defect Testbench */}
        <section id="yolo-section">
          <div className="section-title-wrap">
            <div>
              <h2>Single-Stage Neural Defect Inference Testbench</h2>
              <p>Simulate Dashcam / Smartphone camera streams, evaluate bounding boxes, and verify confidence thresholds</p>
            </div>
          </div>

          <YOLODetector onNewDetection={(d) => console.log(d)} />
        </section>

        {/* Section 3: Paper Architecture, Evaluation & Objectives */}
        <section id="analytics-section">
          <div className="section-title-wrap">
            <div>
              <h2>Research Methodology & Academic Review Evidence</h2>
              <p>Full breakdown of Research Objectives (RO1-RO6), RDD2022 dataset evaluations, and engineering milestones</p>
            </div>
          </div>

          <AnalyticsAndPaper 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </section>

      </main>

      {/* Cyber Technical Footer */}
      <footer id="team-section" className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h4>{PROJECT_INFO.title}</h4>
            <p>{PROJECT_INFO.subtitle}</p>
          </div>

          <div className="footer-meta">
            <span className="brand-tag">Project Guide: {PROJECT_INFO.guide} • Coordinator: {PROJECT_INFO.coordinator}</span>
          </div>
        </div>

        {/* Project Authors & Group Members */}
        <div className="footer-team-strip">
          <span className="footer-team-heading">Project Research & Engineering Group:</span>
          <div className="footer-members-list">
            {PROJECT_INFO.team.map((member, idx) => (
              <div key={idx} className="footer-member-chip">
                <span className="footer-member-name">{member.name}</span>
                <span className="footer-member-urn">({member.urn})</span>
                <span className="footer-member-role">{member.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>{PROJECT_INFO.institution} • {PROJECT_INFO.departments}</span>
          <span>Ultralytics YOLO • FastAPI • OpenCV • Leaflet • React Three.js</span>
        </div>
      </footer>
    </div>
  );
}
