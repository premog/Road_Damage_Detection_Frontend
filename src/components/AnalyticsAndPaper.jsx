import React from 'react';
import { MODEL_BENCHMARKS, WORKFLOW_STEPS, PROJECT_INFO } from '../data';
import { BarChart3, TrendingUp, Layers, CheckCircle2, Shield, Activity, Users, Award } from 'lucide-react';

export default function AnalyticsAndPaper({ activeTab, setActiveTab }) {
  return (
    <div className="analytics-paper-section">
      <div className="section-tabs">
        <button 
          className={`tab-btn ${activeTab === 'benchmarks' ? 'active' : ''}`}
          onClick={() => setActiveTab('benchmarks')}
        >
          <BarChart3 size={16} /> Model Evaluation & Benchmarks
        </button>
        <button 
          className={`tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          <Layers size={16} /> System Architecture & Pipeline
        </button>
        <button 
          className={`tab-btn ${activeTab === 'objectives' ? 'active' : ''}`}
          onClick={() => setActiveTab('objectives')}
        >
          <Award size={16} /> Research Objectives & Team
        </button>
      </div>

      {activeTab === 'benchmarks' && (
        <div className="tab-pane">
          <div className="tab-intro">
            <h4>Experimental Results on Multi-National RDD2022 Dataset</h4>
            <p>
              Comparison of single-stage YOLO models against two-stage Faster R-CNN baselines across road conditions in India, Japan, and Czech Republic. Evaluated on precision, recall, and mean Average Precision (mAP@0.5).
            </p>
          </div>

          <div className="table-wrapper">
            <table className="benchmark-table">
              <thead>
                <tr>
                  <th>Architecture</th>
                  <th>Precision</th>
                  <th>Recall</th>
                  <th>mAP @ 0.5</th>
                  <th>Latency (GPU)</th>
                  <th>Model Size</th>
                  <th>Deployment Target</th>
                </tr>
              </thead>
              <tbody>
                {MODEL_BENCHMARKS.map((bm, index) => (
                  <tr key={index} className={bm.model.includes('Small') ? 'highlight-row' : ''}>
                    <td>
                      <div className="model-name-cell">
                        <strong>{bm.model}</strong>
                        {bm.model.includes('Small') && <span className="recommended-badge">Selected Baseline</span>}
                      </div>
                    </td>
                    <td className="mono-cell">{bm.precision}</td>
                    <td className="mono-cell">{bm.recall}</td>
                    <td className="mono-cell highlight-val">{bm.mAP}</td>
                    <td className="mono-cell">{bm.latency}</td>
                    <td className="mono-cell">{bm.size}</td>
                    <td>
                      <span className="target-pill">
                        {bm.model.includes('Nano') ? 'Jetson Nano / Phone' : bm.model.includes('Small') ? 'Vehicle Edge Box' : 'Cloud Server'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Metrics Cards */}
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="metric-title">Mean Average Precision (mAP@0.5)</span>
              <span className="metric-number">89.4%</span>
              <span className="metric-subtext">Achieved on 4 core classes</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">Inference Throughput</span>
              <span className="metric-number">42.7 FPS</span>
              <span className="metric-subtext">Exceeds 30 FPS real-time survey requirement</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">Localization Precision</span>
              <span className="metric-number">&lt; 0.5 m</span>
              <span className="metric-subtext">GPS timestamp synchronization error</span>
            </div>
            <div className="metric-box">
              <span className="metric-title">F1-Score</span>
              <span className="metric-number">88.6%</span>
              <span className="metric-subtext">Balanced precision-recall harmonic mean</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'architecture' && (
        <div className="tab-pane">
          <div className="tab-intro">
            <h4>End-to-End System Methodology & Data Flow</h4>
            <p>
              Integrated multi-layer pipeline transforming raw sensor imagery into georeferenced municipal maintenance intelligence.
            </p>
          </div>

          <div className="pipeline-steps-grid">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.step} className="step-card">
                <div className="step-num">{step.step}</div>
                <div className="step-body">
                  <h5>{step.name}</h5>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="tech-stack-strip">
            <div className="tech-tag"><span>AI Core:</span> Ultralytics YOLO & PyTorch</div>
            <div className="tech-tag"><span>Vision:</span> OpenCV & CLAHE</div>
            <div className="tech-tag"><span>Backend:</span> FastAPI & Python 3.11</div>
            <div className="tech-tag"><span>GIS / Geo:</span> Leaflet, OpenStreetMap & GeoJSON</div>
            <div className="tech-tag"><span>Database:</span> SQLite / Spatialite</div>
            <div className="tech-tag"><span>Frontend:</span> React 19 + Three.js + Vite</div>
          </div>
        </div>
      )}

      {activeTab === 'objectives' && (
        <div className="tab-pane">
          <div className="tab-intro">
            <h4>Academic Project Proposal & Team Profile</h4>
            <p>
              Developed at <strong>{PROJECT_INFO.institution}</strong> under guidance of <strong>{PROJECT_INFO.guide}</strong>.
            </p>
          </div>

          <div className="objectives-list">
            <h5>Formal Research Objectives (RO1 - RO6)</h5>
            <div className="ro-grid">
              {PROJECT_INFO.researchObjectives.map((ro) => (
                <div key={ro.id} className="ro-card">
                  <div className="ro-id">{ro.id}</div>
                  <div>
                    <h6>{ro.title}</h6>
                    <p>{ro.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="team-section">
            <h5>Project Research & Development Team</h5>
            <div className="team-grid">
              {PROJECT_INFO.team.map((member, idx) => (
                <div key={idx} className="team-card">
                  <div className="member-avatar">
                    <Users size={20} />
                  </div>
                  <div className="member-info">
                    <strong>{member.name}</strong>
                    <span className="member-urn">URN: {member.urn}</span>
                    <span className="member-role">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
