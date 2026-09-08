import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface IntroRobotCanvasProps {
  progress: number; // 0 to 100
  phase: number;    // 0: boot, 1: welcome 1, 2: welcome 2 & services, 3: 100% complete
}

export const IntroRobotCanvas: React.FC<IntroRobotCanvasProps> = ({ progress, phase }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  // References for dynamic animation values updated from props
  const progressRef = useRef<number>(progress);
  progressRef.current = progress;

  const phaseRef = useRef<number>(phase);
  phaseRef.current = phase;

  useEffect(() => {
    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
      );
      if (!supported) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    const scene = new THREE.Scene();

    // Camera setup with mobile adaptive distance
    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, isMobile ? 6.8 : 5.8);

    // ========================================================
    // LIGHTING
    // ========================================================
    const ambientLight = new THREE.AmbientLight(0x0a1020, 2.2);
    scene.add(ambientLight);

    // Key Light - Electric Cobalt Blue
    const keyLight = new THREE.DirectionalLight(0x3e7bfa, 3.8);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Fill Light - Cyber Cyan
    const fillLight = new THREE.PointLight(0x17b4e0, 3.5, 15);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    // Rim / Backlight - Violet Neon
    const rimLight = new THREE.PointLight(0x7b4cf0, 4.0, 14);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Reactor Core Glow Light
    const coreLight = new THREE.PointLight(0x17b4e0, 2.8, 6);
    coreLight.position.set(0, 0.1, 0.8);
    scene.add(coreLight);

    // Pedestal Uplight
    const pedestalLight = new THREE.PointLight(0x3e7bfa, 3.0, 8);
    pedestalLight.position.set(0, -2.0, 0);
    scene.add(pedestalLight);

    // Mouse tracking light
    const mouseLight = new THREE.PointLight(0x17b4e0, 1.8, 8);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // World Root Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ========================================================
    // MATERIALS
    // ========================================================
    const darkArmorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.88,
    });

    const lightArmorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.75,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.95,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.9,
    });

    const neonCyanMat = new THREE.MeshStandardMaterial({
      color: 0x17b4e0,
      emissive: 0x17b4e0,
      emissiveIntensity: 1.6,
      roughness: 0.1,
    });

    const neonBlueMat = new THREE.MeshStandardMaterial({
      color: 0x3e7bfa,
      emissive: 0x3e7bfa,
      emissiveIntensity: 1.4,
      roughness: 0.1,
    });

    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x030712,
      emissive: 0x17b4e0,
      emissiveIntensity: 0.9,
      roughness: 0.05,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.95,
    });

    // ========================================================
    // 3D ROBOT RIG
    // ========================================================
    const robotRoot = new THREE.Group();
    robotRoot.position.set(0, -0.2, 0);
    worldGroup.add(robotRoot);

    // --- 1. Torso & Armor Chassis ---
    const torsoGroup = new THREE.Group();
    robotRoot.add(torsoGroup);

    // Main Chest Plate (Angular cyber chassis)
    const chestGeo = new THREE.BoxGeometry(1.3, 1.2, 0.85);
    const chestMesh = new THREE.Mesh(chestGeo, darkArmorMat);
    chestMesh.position.set(0, 0.2, 0);
    torsoGroup.add(chestMesh);

    // Upper Breastplate Armor Panels (Left & Right)
    [-1, 1].forEach((side) => {
      const plateGeo = new THREE.BoxGeometry(0.52, 0.48, 0.12);
      const plate = new THREE.Mesh(plateGeo, lightArmorMat);
      plate.position.set(side * 0.32, 0.45, 0.44);
      plate.rotation.y = -side * 0.15;
      torsoGroup.add(plate);

      // Gold / Neon cyber accent seam
      const seamGeo = new THREE.BoxGeometry(0.48, 0.03, 0.14);
      const seam = new THREE.Mesh(seamGeo, side === -1 ? neonCyanMat : neonBlueMat);
      seam.position.set(side * 0.32, 0.22, 0.45);
      torsoGroup.add(seam);
    });

    // Central Arc Reactor / Cyber Energy Core
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0.18, 0.44);
    torsoGroup.add(coreGroup);

    // Outer Reactor Ring
    const coreRingGeo = new THREE.TorusGeometry(0.24, 0.045, 16, 32);
    const coreRing = new THREE.Mesh(coreRingGeo, chromeMat);
    coreGroup.add(coreRing);

    // Inner Glowing Cyan Core Disc
    const coreDiscGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 32);
    const coreDisc = new THREE.Mesh(coreDiscGeo, neonCyanMat);
    coreDisc.rotation.x = Math.PI / 2;
    coreGroup.add(coreDisc);

    // Core Center Star / Cross
    const crossGeo1 = new THREE.BoxGeometry(0.04, 0.22, 0.08);
    const cross1 = new THREE.Mesh(crossGeo1, darkArmorMat);
    coreGroup.add(cross1);

    const crossGeo2 = new THREE.BoxGeometry(0.22, 0.04, 0.08);
    const cross2 = new THREE.Mesh(crossGeo2, darkArmorMat);
    coreGroup.add(cross2);

    // Abdominal Hydraulic Pistons & Spine
    const spineGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.55, 16);
    const spineMesh = new THREE.Mesh(spineGeo, lightArmorMat);
    spineMesh.position.set(0, -0.48, 0);
    torsoGroup.add(spineMesh);

    // Side Hydraulic Pistons
    [-1, 1].forEach((side) => {
      const pistonOuterGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.5, 12);
      const pistonOuter = new THREE.Mesh(pistonOuterGeo, chromeMat);
      pistonOuter.position.set(side * 0.45, -0.48, 0.12);
      torsoGroup.add(pistonOuter);

      const pistonShaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12);
      const pistonShaft = new THREE.Mesh(pistonShaftGeo, neonCyanMat);
      pistonShaft.position.set(side * 0.45, -0.48, 0.12);
      torsoGroup.add(pistonShaft);
    });

    // --- 2. Head Group (Independent Cursor Tracking) ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.25, 0);
    robotRoot.add(headGroup);

    // Cyber Neck with Conduit Rings
    const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.35, 16);
    const neckMesh = new THREE.Mesh(neckGeo, darkArmorMat);
    neckMesh.position.set(0, -0.2, 0);
    headGroup.add(neckMesh);

    const neckRingGeo = new THREE.TorusGeometry(0.26, 0.03, 12, 24);
    const neckRing = new THREE.Mesh(neckRingGeo, neonCyanMat);
    neckRing.rotation.x = Math.PI / 2;
    neckRing.position.set(0, -0.18, 0);
    headGroup.add(neckRing);

    // Robot Helmet / Skull
    const helmetGeo = new THREE.BoxGeometry(0.96, 0.78, 0.88);
    const helmetMesh = new THREE.Mesh(helmetGeo, darkArmorMat);
    helmetMesh.position.set(0, 0.22, 0);
    headGroup.add(helmetMesh);

    // Top Crest / Fin (Futuristic Aerodynamic Antenna Fin)
    const crestGeo = new THREE.BoxGeometry(0.12, 0.28, 0.82);
    const crestMesh = new THREE.Mesh(crestGeo, chromeMat);
    crestMesh.position.set(0, 0.65, -0.04);
    headGroup.add(crestMesh);

    const crestNeonGeo = new THREE.BoxGeometry(0.04, 0.22, 0.7);
    const crestNeon = new THREE.Mesh(crestNeonGeo, neonCyanMat);
    crestNeon.position.set(0, 0.67, -0.04);
    headGroup.add(crestNeon);

    // Visor Shield Housing
    const visorRimGeo = new THREE.BoxGeometry(0.86, 0.36, 0.15);
    const visorRim = new THREE.Mesh(visorRimGeo, lightArmorMat);
    visorRim.position.set(0, 0.24, 0.42);
    headGroup.add(visorRim);

    // Wide Emissive Futuristic Cyber Visor
    const visorGeo = new THREE.BoxGeometry(0.78, 0.24, 0.16);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.24, 0.45);
    headGroup.add(visorMesh);

    // Dual Ocular Scan Bars inside Visor (Animated digital robot eyes)
    const eyesGroup = new THREE.Group();
    eyesGroup.position.set(0, 0.24, 0.54);
    headGroup.add(eyesGroup);

    [-1, 1].forEach((side) => {
      const eyeGeo = new THREE.PlaneGeometry(0.22, 0.08);
      const eyeMat = new THREE.MeshBasicMaterial({
        color: 0x17b4e0,
        side: THREE.DoubleSide,
      });
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(side * 0.19, 0, 0);
      eyesGroup.add(eye);

      // Inner iris dot
      const dotGeo = new THREE.PlaneGeometry(0.07, 0.07);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(side * 0.19, 0, 0.005);
      eyesGroup.add(dot);
    });

    // Cyber Antenna / Ear Audio Turbines
    [-1, 1].forEach((side) => {
      // Ear Turbine Node
      const earGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 20);
      const ear = new THREE.Mesh(earGeo, chromeMat);
      ear.rotation.z = Math.PI / 2;
      ear.position.set(side * 0.54, 0.24, 0);
      headGroup.add(ear);

      // Glowing LED Ring
      const earRingGeo = new THREE.TorusGeometry(0.13, 0.025, 12, 20);
      const earRing = new THREE.Mesh(earRingGeo, side === -1 ? neonCyanMat : neonBlueMat);
      earRing.rotation.y = Math.PI / 2;
      earRing.position.set(side * 0.62, 0.24, 0);
      headGroup.add(earRing);

      // Angled Antenna Pole
      const antPoleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8);
      const antPole = new THREE.Mesh(antPoleGeo, chromeMat);
      antPole.position.set(side * 0.58, 0.5, -0.05);
      antPole.rotation.z = -side * 0.35;
      antPole.rotation.x = -0.2;
      headGroup.add(antPole);

      // Antenna Glowing Tip Beacon
      const tipGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const tip = new THREE.Mesh(tipGeo, neonCyanMat);
      tip.position.set(side * 0.66, 0.72, -0.1);
      headGroup.add(tip);
    });

    // Cyber Jaw / Mouth Audio Filter Grill
    const jawGeo = new THREE.BoxGeometry(0.62, 0.18, 0.15);
    const jawMesh = new THREE.Mesh(jawGeo, lightArmorMat);
    jawMesh.position.set(0, -0.02, 0.4);
    headGroup.add(jawMesh);

    // Horizontal audio grill lines
    for (let g = 0; g < 3; g++) {
      const grillGeo = new THREE.BoxGeometry(0.44, 0.02, 0.16);
      const grill = new THREE.Mesh(grillGeo, neonBlueMat);
      grill.position.set(0, -0.06 + g * 0.04, 0.42);
      headGroup.add(grill);
    }

    // --- 3. Shoulders & Arms ---
    const armsGroup = new THREE.Group();
    torsoGroup.add(armsGroup);

    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.85, 0.5, 0);
    armsGroup.add(leftArmGroup);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.85, 0.5, 0);
    armsGroup.add(rightArmGroup);

    [
      { group: leftArmGroup, side: -1 },
      { group: rightArmGroup, side: 1 },
    ].forEach(({ group, side }) => {
      // Shoulder Pauldron
      const shoulderGeo = new THREE.SphereGeometry(0.32, 16, 16);
      shoulderGeo.scale(1.1, 0.85, 1.0);
      const shoulder = new THREE.Mesh(shoulderGeo, darkArmorMat);
      group.add(shoulder);

      // Shoulder Glowing Strip
      const stripGeo = new THREE.TorusGeometry(0.32, 0.025, 12, 24, Math.PI);
      const strip = new THREE.Mesh(stripGeo, neonCyanMat);
      strip.position.set(0, 0.08, 0);
      strip.rotation.x = Math.PI / 2;
      group.add(strip);

      // Upper Arm Segment
      const upperArmGeo = new THREE.CylinderGeometry(0.16, 0.14, 0.65, 16);
      const upperArm = new THREE.Mesh(upperArmGeo, lightArmorMat);
      upperArm.position.set(0, -0.38, 0.1);
      upperArm.rotation.x = 0.25;
      upperArm.rotation.z = -side * 0.12;
      group.add(upperArm);

      // Elbow Joint Ring
      const elbowGeo = new THREE.SphereGeometry(0.16, 14, 14);
      const elbow = new THREE.Mesh(elbowGeo, chromeMat);
      elbow.position.set(0, -0.72, 0.22);
      group.add(elbow);

      // Forearm Gauntlet (Gesturing forward warmly)
      const forearmGeo = new THREE.BoxGeometry(0.24, 0.62, 0.26);
      const forearm = new THREE.Mesh(forearmGeo, darkArmorMat);
      forearm.position.set(0, -1.02, 0.42);
      forearm.rotation.x = 0.55;
      group.add(forearm);

      // Gauntlet Telemetry Light Strip
      const teleGeo = new THREE.BoxGeometry(0.04, 0.45, 0.28);
      const tele = new THREE.Mesh(teleGeo, neonBlueMat);
      tele.position.set(0, -1.02, 0.43);
      tele.rotation.x = 0.55;
      group.add(tele);

      // Articulated Hand & Fingers (Open, welcoming digital gesture)
      const handGroup = new THREE.Group();
      handGroup.position.set(0, -1.35, 0.62);
      group.add(handGroup);

      const palmGeo = new THREE.BoxGeometry(0.22, 0.12, 0.18);
      const palm = new THREE.Mesh(palmGeo, chromeMat);
      handGroup.add(palm);

      // Palm repulsor / beacon
      const repulsorGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16);
      const repulsor = new THREE.Mesh(repulsorGeo, neonCyanMat);
      repulsor.position.set(0, 0.05, 0);
      repulsor.rotation.x = Math.PI / 2;
      handGroup.add(repulsor);

      // 4 Cyber Fingers
      for (let f = -1.5; f <= 1.5; f++) {
        const fingerGeo = new THREE.BoxGeometry(0.04, 0.18, 0.05);
        const finger = new THREE.Mesh(fingerGeo, lightArmorMat);
        finger.position.set(f * 0.055, -0.14, 0.02);
        finger.rotation.x = -0.25;
        handGroup.add(finger);
      }
    });

    // ========================================================
    // 4. FLOATING HOLOGRAPHIC TECH PEDESTAL
    // ========================================================
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.65, 0);
    worldGroup.add(pedestalGroup);

    // Concentric Outer Ring
    const outerRingGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 72);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x3e7bfa,
      emissive: 0x3e7bfa,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.8,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    pedestalGroup.add(outerRing);

    // Concentric Middle Ring
    const midRingGeo = new THREE.TorusGeometry(1.6, 0.018, 16, 60);
    const midRingMat = new THREE.MeshStandardMaterial({
      color: 0x17b4e0,
      emissive: 0x17b4e0,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.9,
    });
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    midRing.rotation.x = Math.PI / 2;
    pedestalGroup.add(midRing);

    // Inner Cyber Grid Circle
    const innerDiscGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.02, 32);
    const innerDiscMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.65,
    });
    const innerDisc = new THREE.Mesh(innerDiscGeo, innerDiscMat);
    pedestalGroup.add(innerDisc);

    // Radial spokes on pedestal
    for (let s = 0; s < 12; s++) {
      const angle = (s / 12) * Math.PI * 2;
      const spokeGeo = new THREE.BoxGeometry(0.02, 0.02, 0.5);
      const spokeMat = new THREE.MeshBasicMaterial({
        color: 0x17b4e0,
        transparent: true,
        opacity: 0.6,
      });
      const spoke = new THREE.Mesh(spokeGeo, spokeMat);
      spoke.position.set(Math.cos(angle) * 1.85, 0, Math.sin(angle) * 1.85);
      spoke.rotation.y = -angle;
      pedestalGroup.add(spoke);
    }

    // Floating Holographic Sparkle Particle Cloud
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 4.5;
      particlePositions[p * 3 + 1] = (Math.random() - 0.5) * 4.0;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x17b4e0,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particleCloud);

    // ========================================================
    // INTERACTION & MOUSE PARALLAX
    // ========================================================
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.position.z = width < 768 ? 6.8 : 5.8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ========================================================
    // RENDER LOOP
    // ========================================================
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const currentProg = progressRef.current;
      const currentPhase = phaseRef.current;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Gentle, majestic levitation
      const hoverY = Math.sin(elapsedTime * 1.6) * 0.04;
      robotRoot.position.y = -0.15 + hoverY;

      // Robot Head tracks cursor with natural soft damping
      headGroup.rotation.y = mouse.x * 0.35;
      headGroup.rotation.x = -mouse.y * 0.18;

      // Torso slight counter-tilt
      torsoGroup.rotation.y = mouse.x * 0.1;
      torsoGroup.rotation.z = -mouse.x * 0.02;

      // Breathing arm movement
      leftArmGroup.rotation.x = Math.sin(elapsedTime * 1.6) * 0.03;
      rightArmGroup.rotation.x = Math.sin(elapsedTime * 1.6 + 0.4) * 0.03;

      // Steady, elegant Arc Reactor glow
      const coreScale = 1 + Math.sin(elapsedTime * 2.2) * 0.03;
      coreGroup.scale.set(coreScale, coreScale, coreScale);
      coreLight.intensity = 2.4 + Math.sin(elapsedTime * 2.2) * 0.4;

      // Calm visor glow without erratic shaking
      eyesGroup.position.x = Math.sin(elapsedTime * 1.2) * 0.02;

      // Rotating concentric pedestal rings
      outerRing.rotation.z = elapsedTime * 0.18;
      midRing.rotation.z = -elapsedTime * 0.25;

      // Rotate particle cloud gently
      particleCloud.rotation.y = elapsedTime * 0.05;

      // World group slight interactive perspective tilt
      worldGroup.rotation.y = mouse.x * 0.08;
      worldGroup.rotation.x = -mouse.y * 0.05;

      // Light tracking
      mouseLight.position.x = mouse.x * 3;
      mouseLight.position.y = mouse.y * 2;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      scene.clear();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    // Elegant CSS/SVG Fallback for environments without WebGL
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="relative flex flex-col items-center">
          <div className="w-44 h-44 rounded-full border-2 border-[#3E7BFA]/40 flex items-center justify-center bg-[#101626]/80 backdrop-blur-md shadow-[0_0_50px_rgba(62,123,250,0.3)] animate-pulse">
            <div className="w-32 h-32 rounded-full border border-[#17B4E0] flex items-center justify-center bg-[#161F36]">
              <span className="text-5xl animate-bounce">🤖</span>
            </div>
          </div>
          <div className="mt-4 px-3 py-1 rounded-full bg-[#101626] border border-[#1E2945] text-[11px] text-[#17B4E0] tracking-widest font-mono">
            3D ENGINE READY
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'none' }}
    />
  );
};
