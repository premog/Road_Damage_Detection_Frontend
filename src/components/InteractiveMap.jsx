import React, { useState, useEffect } from 'react';
import { SAMPLE_DETECTIONS, DAMAGE_CLASSES } from '../data';
import { MapPin, Navigation, Compass, Layers, ZoomIn, ZoomOut, AlertCircle, ShieldCheck } from 'lucide-react';

export default function InteractiveMap({ selectedFilter, onSelectDetection, activeDetection }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewMode, setViewMode] = useState('dark-gis'); // 'dark-gis' | 'heatmap' | 'satellite'
  const [vehiclePosition, setVehiclePosition] = useState({ x: 35, y: 72 });
  const [isSurveyRunning, setIsSurveyRunning] = useState(true);

  // Filtered damage markers
  const filteredDetections = SAMPLE_DETECTIONS.filter(d => {
    if (selectedFilter === 'ALL') return true;
    return d.classCode === selectedFilter || d.severity === selectedFilter;
  });

  // Simulated vehicle live traversal animation across the highway corridor
  useEffect(() => {
    if (!isSurveyRunning) return;
    const interval = setInterval(() => {
      setVehiclePosition(prev => {
        let nextY = prev.y - 0.7;
        let nextX = prev.x + Math.sin(prev.y * 0.15) * 0.4;
        if (nextY < 15) {
          nextY = 75;
          nextX = 35;
        }
        return { x: nextX, y: nextY };
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isSurveyRunning]);

  return (
    <div className="gis-map-card">
      <div className="gis-header">
        <div className="gis-title-group">
          <div className="radar-ping">
            <span className="ping-dot" />
            <span className="ping-ring" />
          </div>
          <div>
            <h3>Geospatial Road Asset Telemetry Map</h3>
            <p>Pune Urban Corridor & Expressway Test Route — 10Hz NMEA GPS Geocoding</p>
          </div>
        </div>

        <div className="gis-controls">
          <div className="layer-selector">
            <button 
              className={`layer-btn ${viewMode === 'dark-gis' ? 'active' : ''}`}
              onClick={() => setViewMode('dark-gis')}
            >
              <Layers size={14} /> GIS Vector
            </button>
            <button 
              className={`layer-btn ${viewMode === 'heatmap' ? 'active' : ''}`}
              onClick={() => setViewMode('heatmap')}
            >
              <span className="heat-dot" /> Heatmap
            </button>
          </div>

          <div className="zoom-controls">
            <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))} title="Zoom In">
              <ZoomIn size={15} />
            </button>
            <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))} title="Zoom Out">
              <ZoomOut size={15} />
            </button>
            <button 
              className={`survey-toggle ${isSurveyRunning ? 'live' : ''}`}
              onClick={() => setIsSurveyRunning(!isSurveyRunning)}
              title="Toggle Vehicle GPS Simulation"
            >
              <Navigation size={14} className={isSurveyRunning ? 'spin-slow' : ''} />
              {isSurveyRunning ? 'LIVE SIM' : 'PAUSED'}
            </button>
          </div>
        </div>
      </div>

      {/* Map Graphic Canvas / Container */}
      <div className={`map-viewport-box ${viewMode}`}>
        <div 
          className="map-layers-wrapper"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
        >
          {/* Simulated Geographic Roads Vector Paths */}
          <svg className="gis-vector-svg" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roadGlow" x1="0%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
              </linearGradient>
              <radialGradient id="heatGlowRed" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.7)" />
                <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
              </radialGradient>
              <radialGradient id="heatGlowAmber" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0.6)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
              </radialGradient>
            </defs>

            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
            <rect width="1000" height="600" fill="url(#grid)" />

            {/* Urban Sector Lines */}
            <path d="M 50 150 Q 300 200 550 120 T 950 250" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="4" />
            <path d="M 120 480 Q 420 380 680 440 T 980 380" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="4" />
            <path d="M 680 80 L 740 550" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="3" strokeDasharray="5,5" />

            {/* Primary Survey Expressway (Spine) */}
            <path 
              d="M 320 580 C 370 450, 290 320, 480 220 S 760 140, 840 40" 
              fill="none" 
              stroke="url(#roadGlow)" 
              strokeWidth="16" 
              strokeLinecap="round" 
            />
            {/* Centerline Dash */}
            <path 
              d="M 320 580 C 370 450, 290 320, 480 220 S 760 140, 840 40" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth="2" 
              strokeDasharray="14,14" 
              className="dash-centerline"
            />

            {/* Heatmap Overlays if selected */}
            {viewMode === 'heatmap' && (
              <>
                <circle cx="340" cy="460" r="110" fill="url(#heatGlowRed)" />
                <circle cx="300" cy="350" r="95" fill="url(#heatGlowAmber)" />
                <circle cx="510" cy="210" r="130" fill="url(#heatGlowRed)" />
                <circle cx="680" cy="160" r="90" fill="url(#heatGlowAmber)" />
              </>
            )}
          </svg>

          {/* Survey Vehicle GPS Icon */}
          <div 
            className="gps-vehicle-marker"
            style={{ 
              left: `${vehiclePosition.x * 10}px`, 
              top: `${vehiclePosition.y * 6}px` 
            }}
          >
            <div className="vehicle-pulse" />
            <div className="vehicle-body">
              <Navigation size={18} className="car-arrow" />
            </div>
            <span className="vehicle-tag">SURVEY VAN-01 (42 km/h)</span>
          </div>

          {/* Defect Markers on Map */}
          {filteredDetections.map((det, index) => {
            // Coordinate mapping to pixel coordinates in 1000x600 viewBox
            const posX = 260 + (index * 95) + ((index % 2) * 20);
            const posY = 500 - (index * 75) + ((index % 3) * 15);
            const isSelected = activeDetection?.id === det.id;

            return (
              <div
                key={det.id}
                className={`map-damage-pin ${isSelected ? 'selected' : ''}`}
                style={{
                  left: `${posX}px`,
                  top: `${posY}px`,
                  '--accent': det.color
                }}
                onClick={() => onSelectDetection(det)}
              >
                <div className="pin-pulse" />
                <div className="pin-head">
                  <span className="pin-badge">{det.classCode}</span>
                </div>
                <div className="pin-tooltip">
                  <div className="tooltip-top">
                    <strong style={{ color: det.color }}>{det.className}</strong>
                    <span className="conf-tag">{(det.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="tooltip-location">{det.locationName}</div>
                  <div className="tooltip-status">{det.severity} Severity • {det.repairStatus}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating HUD Telemetry Overlay on Map */}
        <div className="gis-hud-telemetry">
          <div className="hud-pill">
            <Compass size={14} className="hud-icon" />
            <span>HEADING: <strong>034° NNE</strong></span>
          </div>
          <div className="hud-pill">
            <span className="live-status-dot" />
            <span>ACTIVE DEFECTS IN VIEW: <strong>{filteredDetections.length}</strong></span>
          </div>
          <div className="hud-pill">
            <ShieldCheck size={14} className="hud-icon green" />
            <span>GPS RTK ACCURACY: <strong>±0.12m</strong></span>
          </div>
        </div>

        {/* Legend */}
        <div className="map-legend">
          <span className="legend-title">Defect Code Index</span>
          <div className="legend-items">
            {Object.entries(DAMAGE_CLASSES).map(([key, item]) => (
              <div key={key} className="legend-item">
                <span className="legend-swatch" style={{ background: item.color }} />
                <span className="legend-code">{item.code}:</span>
                <span className="legend-name">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
