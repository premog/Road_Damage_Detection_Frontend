import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Road3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.035);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 3.5, 8);
    camera.lookAt(0, 0, -10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Road Plane with asphalt look
    const roadWidth = 10;
    const roadLength = 120;
    const roadGeo = new THREE.PlaneGeometry(roadWidth, roadLength, 40, 80);
    
    // Add subtle displacement/bumps to simulate road asphalt texture
    const pos = roadGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const x = pos.getX(i);
      // Small asphalt roughness
      pos.setZ(i, z + (Math.sin(x * 12) + Math.cos(pos.getY(i) * 10)) * 0.02);
    }
    roadGeo.computeVertexNormals();

    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      roughness: 0.85,
      metalness: 0.15,
      wireframe: false
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, -0.5, -40);
    scene.add(road);

    // Glowing Neon Lane Divider Dash Marks
    const dashCount = 28;
    const dashGeo = new THREE.BoxGeometry(0.18, 0.05, 2.2);
    const dashMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const dashes = [];

    for (let i = 0; i < dashCount; i++) {
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.position.set(0, -0.47, -i * 4 + 10);
      scene.add(dash);
      dashes.push(dash);
    }

    // Side Curb / Guard Rail Neon Lines
    const railMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.6 });
    const leftRailGeo = new THREE.BoxGeometry(0.1, 0.2, roadLength);
    const leftRail = new THREE.Mesh(leftRailGeo, railMat);
    leftRail.position.set(-roadWidth / 2, -0.4, -40);
    scene.add(leftRail);

    const rightRail = leftRail.clone();
    rightRail.position.x = roadWidth / 2;
    scene.add(rightRail);

    // 3D Holographic Road Damage Markers (Floating Detection Cubes & Rings)
    const markerCount = 7;
    const markers = [];
    const markerColors = [0xef4444, 0xf59e0b, 0x38bdf8, 0xa855f7, 0xef4444, 0xf59e0b, 0x38bdf8];

    for (let i = 0; i < markerCount; i++) {
      const group = new THREE.Group();
      
      // Wireframe target ring
      const ringGeo = new THREE.TorusGeometry(0.7, 0.03, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: markerColors[i % markerColors.length] });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Vertical Laser Scanner beam
      const beamGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.8, 8);
      const beamMat = new THREE.MeshBasicMaterial({ color: markerColors[i % markerColors.length], transparent: true, opacity: 0.7 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = 0.9;
      group.add(beam);

      // Floating diamond pin
      const pinGeo = new THREE.OctahedronGeometry(0.28);
      const pinMat = new THREE.MeshStandardMaterial({ 
        color: markerColors[i % markerColors.length],
        emissive: markerColors[i % markerColors.length],
        emissiveIntensity: 0.6,
        roughness: 0.2
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.y = 1.9;
      group.add(pin);

      const laneX = ((i % 3) - 1) * 2.8;
      const posZ = -i * 14 - 8;
      group.position.set(laneX, -0.45, posZ);
      scene.add(group);
      markers.push({ group, pin, initialZ: posZ });
    }

    // Grid Floor on sides for digital cyber feel
    const sideGrid = new THREE.GridHelper(120, 60, 0x1e293b, 0x0f172a);
    sideGrid.position.set(0, -0.52, -40);
    scene.add(sideGrid);

    // Atmospheric Particle Dust (LIDAR / Sensor Points)
    const particleCount = 400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = Math.random() * 8 - 0.2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 100 - 30;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const spotLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    spotLight.position.set(0, 10, 10);
    scene.add(spotLight);

    const accentPurple = new THREE.PointLight(0xa855f7, 3, 30);
    accentPurple.position.set(-6, 4, -15);
    scene.add(accentPurple);

    // Mouse Interaction for parallax 3D response
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -(e.clientY - rect.top) / rect.height * 2 + 1;
      targetX = x * 1.5;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Camera tilt parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX * 2.2;
      camera.position.y = 3.5 + mouseY * 1.2;
      camera.lookAt(mouseX * 0.6, 0, -20);

      // Move Lane Dashes (Simulating Vehicle Driving forward at high speed)
      const roadSpeed = 16 * delta;
      dashes.forEach(dash => {
        dash.position.z += roadSpeed;
        if (dash.position.z > 14) {
          dash.position.z -= dashCount * 4;
        }
      });

      // Move Damage Markers towards camera and loop
      markers.forEach(m => {
        m.group.position.z += roadSpeed * 0.9;
        m.pin.rotation.y += 0.03;
        m.pin.position.y = 1.9 + Math.sin(elapsedTime * 4 + m.group.position.x) * 0.15;
        if (m.group.position.z > 12) {
          m.group.position.z = -80;
        }
      });

      // Float particles
      const pPositions = particleGeo.attributes.position.array;
      for (let i = 2; i < particleCount * 3; i += 3) {
        pPositions[i] += roadSpeed * 0.7;
        if (pPositions[i] > 15) {
          pPositions[i] = -90;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      roadGeo.dispose();
      roadMat.dispose();
      dashGeo.dispose();
      dashMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="road-3d-viewport" 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }} 
    />
  );
}
