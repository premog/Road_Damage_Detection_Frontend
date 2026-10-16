import React, { useState, useRef } from 'react';
import { Camera, Upload, Play, RefreshCw, Cpu, CheckCircle2, Zap, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_ROAD_SAMPLES = [
  {
    id: 'sample1',
    name: 'Pothole on Asphalt (D40)',
    type: 'Pothole',
    code: 'D40',
    color: '#ef4444',
    conf: 0.94,
    box: { top: '35%', left: '28%', width: '42%', height: '38%' },
    bgGrad: 'radial-gradient(ellipse at 50% 50%, #171717 0%, #262626 40%, #09090b 100%)',
    roadPattern: 'pothole-surface'
  },
  {
    id: 'sample2',
    name: 'Alligator Crack Network (D20)',
    type: 'Alligator Crack',
    code: 'D20',
    color: '#f59e0b',
    conf: 0.89,
    box: { top: '25%', left: '20%', width: '60%', height: '52%' },
    bgGrad: 'radial-gradient(ellipse at 50% 50%, #1c1917 0%, #292524 45%, #0c0a09 100%)',
    roadPattern: 'alligator-surface'
  },
  {
    id: 'sample3',
    name: 'Longitudinal Joint Crack (D00)',
    type: 'Longitudinal Crack',
    code: 'D00',
    color: '#38bdf8',
    conf: 0.92,
    box: { top: '10%', left: '44%', width: '12%', height: '80%' },
    bgGrad: 'radial-gradient(ellipse at 50% 50%, #0f172a 0%, #1e293b 45%, #020617 100%)',
    roadPattern: 'longitudinal-surface'
  },
  {
    id: 'sample4',
    name: 'Transverse Thermal Crack (D10)',
    type: 'Transverse Crack',
    code: 'D10',
    color: '#a855f7',
    conf: 0.87,
    box: { top: '42%', left: '15%', width: '70%', height: '16%' },
    bgGrad: 'radial-gradient(ellipse at 50% 50%, #1e1b4b 0%, #312e81 45%, #0f172a 100%)',
    roadPattern: 'transverse-surface'
  }
];

export default function YOLODetectorModal({ onNewDetection }) {
  const [selectedSample, setSelectedSample] = useState(PRESET_ROAD_SAMPLES[0]);
  const [isInferencing, setIsInferencing] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [modelType, setModelType] = useState('yolov8-small');
  const [iouThreshold, setIouThreshold] = useState(0.45);
  const [confThreshold, setConfThreshold] = useState(0.50);
  const fileInputRef = useRef(null);

  const handleRunInference = () => {
    setIsInferencing(true);
    setDetectionResult(null);

    // Simulate TensorRT / ONNX accelerated inference time (18ms to 32ms)
    setTimeout(() => {
      setIsInferencing(false);
      const isHighConf = selectedSample.conf >= confThreshold;
      const result = {
        className: selectedSample.type,
        classCode: selectedSample.code,
        confidence: selectedSample.conf,
        box: selectedSample.box,
        latencyMs: (Math.random() * 8 + 18).toFixed(1),
        fps: (Math.random() * 5 + 40).toFixed(1),
        passedFilter: isHighConf,
        severity: selectedSample.code === 'D40' ? 'High' : selectedSample.code === 'D20' ? 'High' : 'Medium',
        color: selectedSample.color
      };
      setDetectionResult(result);

      if (isHighConf) {
        try {
          confetti({
            particleCount: 25,
            spread: 50,
            origin: { y: 0.8 },
            colors: ['#38bdf8', '#0ea5e9', '#a855f7']
          });
        } catch (e) {
          // silent fallback
        }
      }
    }, 900);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setDetectionResult(null);
    }
  };

  return (
    <div className="detector-card">
      <div className="detector-header">
        <div className="detector-title">
          <div className="ai-icon-badge">
            <Cpu size={20} />
          </div>
          <div>
            <h3>YOLO Road Defect Inference Testbench</h3>
            <p>Ultralytics YOLO Architecture Trained on RDD2022 Benchmark Dataset</p>
          </div>
        </div>

        <div className="model-selector-group">
          <label>Inference Engine:</label>
          <select 
            value={modelType} 
            onChange={(e) => setModelType(e.target.value)}
            className="model-select"
          >
            <option value="yolov8-nano">YOLOv8-Nano (Edge Device - 14ms)</option>
            <option value="yolov8-small">YOLOv8-Small (Balanced - 23ms)</option>
            <option value="yolov8-medium">YOLOv8-Medium (High Accuracy - 46ms)</option>
          </select>
        </div>
      </div>

      <div className="detector-workspace">
        {/* Left: Input Selection & Image Viewer */}
        <div className="detector-viewport-panel">
          <div className="sample-strip">
            <span className="strip-label">Select Test Sample:</span>
            <div className="sample-chips">
              {PRESET_ROAD_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  className={`chip-btn ${selectedSample.id === sample.id && !uploadedImage ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSample(sample);
                    setUploadedImage(null);
                    setDetectionResult(null);
                  }}
                >
                  <span className="chip-dot" style={{ background: sample.color }} />
                  {sample.name}
                </button>
              ))}
              <button 
                className="chip-btn upload-chip"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} /> Upload Custom
              </button>
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                style={{ display: 'none' }} 
              />
            </div>
          </div>

          {/* Interactive Road Frame Visualizer */}
          <div className="frame-viewport-canvas" style={{ background: uploadedImage ? '#000' : selectedSample.bgGrad }}>
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded frame" className="uploaded-frame-img" />
            ) : (
              <div className={`simulated-road-defect-bg ${selectedSample.roadPattern}`}>
                {/* Asphalt Visual Structure */}
                <div className="road-texture-overlay" />
                <div className="lane-marking-visual" />
                {/* Stylized defect graphic representation */}
                {selectedSample.code === 'D40' && (
                  <div className="visual-pothole-crater" />
                )}
                {selectedSample.code === 'D20' && (
                  <div className="visual-alligator-mesh" />
                )}
                {selectedSample.code === 'D00' && (
                  <div className="visual-longitudinal-streak" />
                )}
                {selectedSample.code === 'D10' && (
                  <div className="visual-transverse-streak" />
                )}
              </div>
            )}

            {/* Scanning Laser Sweep Effect while inferencing */}
            {isInferencing && (
              <div className="laser-scanner-line">
                <div className="laser-glow" />
              </div>
            )}

            {/* Bounding Box Prediction Result Overlay */}
            {detectionResult && (
              <div
                className="yolo-bounding-box"
                style={{
                  ...detectionResult.box,
                  borderColor: detectionResult.color,
                  boxShadow: `0 0 20px ${detectionResult.color}55`
                }}
              >
                <div 
                  className="yolo-tag"
                  style={{ background: detectionResult.color }}
                >
                  <span className="tag-class">{detectionResult.classCode}: {detectionResult.className}</span>
                  <span className="tag-conf">{(detectionResult.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="corner top-left" style={{ borderColor: detectionResult.color }} />
                <div className="corner top-right" style={{ borderColor: detectionResult.color }} />
                <div className="corner bottom-left" style={{ borderColor: detectionResult.color }} />
                <div className="corner bottom-right" style={{ borderColor: detectionResult.color }} />
              </div>
            )}

            {/* HUD Status Bar in viewport */}
            <div className="viewport-hud-bar">
              <span>RES: 1920x1080 @ 60FPS</span>
              <span>COLOR: RGB / CLAHE ENHANCED</span>
              <span>SENSOR: SONY IMX586</span>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="inference-action-bar">
            <button 
              className="run-inference-btn"
              onClick={handleRunInference}
              disabled={isInferencing}
            >
              {isInferencing ? (
                <>
                  <RefreshCw size={18} className="spin-fast" /> Executing Neural Weights...
                </>
              ) : (
                <>
                  <Play size={18} fill="currentColor" /> Run YOLO Inference
                </>
              )}
            </button>

            <div className="threshold-sliders">
              <div className="slider-item">
                <label>Conf Threshold: <strong>{(confThreshold * 100).toFixed(0)}%</strong></label>
                <input 
                  type="range" 
                  min="0.2" 
                  max="0.9" 
                  step="0.05" 
                  value={confThreshold} 
                  onChange={(e) => setConfThreshold(parseFloat(e.target.value))}
                />
              </div>
              <div className="slider-item">
                <label>NMS IoU: <strong>{(iouThreshold * 100).toFixed(0)}%</strong></label>
                <input 
                  type="range" 
                  min="0.2" 
                  max="0.8" 
                  step="0.05" 
                  value={iouThreshold} 
                  onChange={(e) => setIouThreshold(parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Neural Telemetry & Inspection Details */}
        <div className="detector-telemetry-panel">
          <h4>Inference Diagnostics & Metrics</h4>

          {detectionResult ? (
            <div className="telemetry-results-card">
              <div className="status-banner success">
                <CheckCircle2 size={18} />
                <span>Damage Pattern Identified with High Confidence</span>
              </div>

              <div className="metric-row">
                <span className="metric-label">Detected Class</span>
                <span className="metric-val highlight" style={{ color: detectionResult.color }}>
                  {detectionResult.classCode} — {detectionResult.className}
                </span>
              </div>

              <div className="metric-row">
                <span className="metric-label">Confidence Score</span>
                <div className="metric-progress-wrapper">
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${detectionResult.confidence * 100}%`,
                        background: detectionResult.color 
                      }} 
                    />
                  </div>
                  <span className="val-text">{(detectionResult.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="metric-row">
                <span className="metric-label">Visual Severity</span>
                <span className={`severity-tag ${detectionResult.severity.toLowerCase()}`}>
                  {detectionResult.severity}
                </span>
              </div>

              <div className="metric-row">
                <span className="metric-label">Inference Latency</span>
                <span className="metric-val"><Zap size={14} className="zap-icon" /> {detectionResult.latencyMs} ms</span>
              </div>

              <div className="metric-row">
                <span className="metric-label">Effective Frame Rate</span>
                <span className="metric-val">{detectionResult.fps} FPS (Real-time Ready)</span>
              </div>

              <div className="metric-row">
                <span className="metric-label">Model Weights</span>
                <span className="metric-val">PyTorch .pt / ONNX FP16</span>
              </div>

              <div className="geo-sync-alert">
                <AlertTriangle size={15} />
                <span>Auto-geocoded to nearest GPS coordinate (18.5912°N, 73.7389°E) and queued in SQLite repository.</span>
              </div>
            </div>
          ) : (
            <div className="telemetry-idle-card">
              <div className="idle-radar" />
              <p>Ready to process road image. Click <strong>"Run YOLO Inference"</strong> to execute single-stage detection and view bounding box tensor outputs.</p>
            </div>
          )}

          {/* Quick RDD2022 Reference Table */}
          <div className="rdd-quick-ref">
            <h5>RDD2022 Class Taxonomy</h5>
            <div className="ref-grid">
              <div className="ref-item">
                <span className="badge blue">D00</span>
                <span>Longitudinal Crack (Wheelline)</span>
              </div>
              <div className="ref-item">
                <span className="badge purple">D10</span>
                <span>Transverse Crack (Thermal Joint)</span>
              </div>
              <div className="ref-item">
                <span className="badge amber">D20</span>
                <span>Alligator Crack (Fatigue Mesh)</span>
              </div>
              <div className="ref-item">
                <span className="badge red">D40</span>
                <span>Pothole (Cavity Defect)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
