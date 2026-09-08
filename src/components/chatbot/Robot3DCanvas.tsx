import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Robot3DCanvasProps {
  isHovered?: boolean;
  isOpen?: boolean;
  size?: number;
  className?: string;
}

export const Robot3DCanvas: React.FC<Robot3DCanvasProps> = ({
  isHovered = false,
  isOpen = false,
  size = 64,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  const hoveredRef = useRef<boolean>(isHovered);
  hoveredRef.current = isHovered;

  const openRef = useRef<boolean>(isOpen);
  openRef.current = isOpen;

  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Quick WebGL support test
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

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0.1, 4.2);

    // ==========================================
    // LIGHTS
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0e172a, 2.5);
    scene.add(ambientLight);

    // Key Light - Electric Blue
    const keyLight = new THREE.DirectionalLight(0x3e7bfa, 3.2);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    // Fill Light - Cyber Cyan
    const fillLight = new THREE.PointLight(0x17b4e0, 2.8, 10);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    // Rim / Backlight - Violet
    const rimLight = new THREE.PointLight(0x7b4cf0, 2.5, 8);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Visor / Core point light
    const coreLight = new THREE.PointLight(0x17b4e0, 2.0, 4);
    coreLight.position.set(0, 0.2, 1.2);
    scene.add(coreLight);

    // ==========================================
    // ROBOT HIERARCHY
    // ==========================================
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    // --- Materials ---
    // Dark Metallic Titanium for Chassis
    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x101626,
      metalness: 0.85,
      roughness: 0.25,
    });

    // Sleek Accent Metal
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e2945,
      metalness: 0.9,
      roughness: 0.2,
    });

    // Glowing Cyber Cyan Visor
    const visorMaterial = new THREE.MeshStandardMaterial({
      color: 0x051329,
      emissive: 0x17b4e0,
      emissiveIntensity: 0.7,
      metalness: 0.5,
      roughness: 0.1,
    });

    // Glowing Eyes
    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0x5eead4,
    });

    // Glowing Electric Blue Aura Material
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x3e7bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    // --- 1. HEAD ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.45, 0);

    // Head Base - Sleek rounded capsule
    const headGeometry = new THREE.SphereGeometry(0.72, 32, 24);
    headGeometry.scale(1.0, 0.92, 0.9);
    const headMesh = new THREE.Mesh(headGeometry, chassisMaterial);
    headGroup.add(headMesh);

    // Visor - Curved front screen
    const visorGeometry = new THREE.CylinderGeometry(0.68, 0.68, 0.38, 32, 1, false, -Math.PI * 0.38, Math.PI * 0.76);
    visorGeometry.rotateY(Math.PI);
    const visorMesh = new THREE.Mesh(visorGeometry, visorMaterial);
    visorMesh.position.set(0, 0.05, 0.14);
    headGroup.add(visorMesh);

    // Left Eye
    const leftEyeGeo = new THREE.BoxGeometry(0.16, 0.09, 0.05);
    const leftEye = new THREE.Mesh(leftEyeGeo, eyeMaterial);
    leftEye.position.set(-0.25, 0.06, 0.68);
    leftEye.rotation.y = 0.2;
    headGroup.add(leftEye);

    // Right Eye
    const rightEyeGeo = new THREE.BoxGeometry(0.16, 0.09, 0.05);
    const rightEye = new THREE.Mesh(rightEyeGeo, eyeMaterial);
    rightEye.position.set(0.25, 0.06, 0.68);
    rightEye.rotation.y = -0.2;
    headGroup.add(rightEye);

    // Ear Pod Left
    const earGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16);
    earGeo.rotateZ(Math.PI / 2);
    const earLeft = new THREE.Mesh(earGeo, accentMaterial);
    earLeft.position.set(-0.76, 0.05, 0);
    headGroup.add(earLeft);

    const earRingLeftGeo = new THREE.TorusGeometry(0.2, 0.025, 12, 24);
    earRingLeftGeo.rotateY(Math.PI / 2);
    const earRingLeft = new THREE.Mesh(
      earRingLeftGeo,
      new THREE.MeshBasicMaterial({ color: 0x17b4e0 })
    );
    earRingLeft.position.set(-0.82, 0.05, 0);
    headGroup.add(earRingLeft);

    // Ear Pod Right
    const earRight = new THREE.Mesh(earGeo, accentMaterial);
    earRight.position.set(0.76, 0.05, 0);
    headGroup.add(earRight);

    const earRingRightGeo = new THREE.TorusGeometry(0.2, 0.025, 12, 24);
    earRingRightGeo.rotateY(Math.PI / 2);
    const earRingRight = new THREE.Mesh(
      earRingRightGeo,
      new THREE.MeshBasicMaterial({ color: 0x17b4e0 })
    );
    earRingRight.position.set(0.82, 0.05, 0);
    headGroup.add(earRingRight);

    // Antenna Mast
    const antennaMastGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.32, 12);
    const antennaMast = new THREE.Mesh(antennaMastGeo, accentMaterial);
    antennaMast.position.set(0, 0.82, 0);
    headGroup.add(antennaMast);

    // Antenna Glowing Tip Orb
    const antennaOrbGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const antennaOrb = new THREE.Mesh(
      antennaOrbGeo,
      new THREE.MeshBasicMaterial({ color: 0x17b4e0 })
    );
    antennaOrb.position.set(0, 1.0, 0);
    headGroup.add(antennaOrb);

    robotRoot.add(headGroup);

    // --- 2. TORSO / BODY ---
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.45, 0);

    // Torso Base
    const torsoGeo = new THREE.SphereGeometry(0.55, 24, 20);
    torsoGeo.scale(0.9, 0.85, 0.8);
    const torsoMesh = new THREE.Mesh(torsoGeo, chassisMaterial);
    torsoGroup.add(torsoMesh);

    // Chest Arc Reactor Core
    const reactorRingGeo = new THREE.TorusGeometry(0.16, 0.03, 12, 24);
    const reactorRing = new THREE.Mesh(reactorRingGeo, accentMaterial);
    reactorRing.position.set(0, 0.04, 0.42);
    torsoGroup.add(reactorRing);

    const reactorCoreGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const reactorCore = new THREE.Mesh(
      reactorCoreGeo,
      new THREE.MeshBasicMaterial({ color: 0x3e7bfa })
    );
    reactorCore.position.set(0, 0.04, 0.42);
    torsoGroup.add(reactorCore);

    // Floating Shoulder / Arm Pods Left & Right
    const shoulderGeo = new THREE.SphereGeometry(0.18, 16, 16);
    shoulderGeo.scale(0.8, 1.2, 0.8);

    const shoulderLeft = new THREE.Mesh(shoulderGeo, accentMaterial);
    shoulderLeft.position.set(-0.62, 0.1, 0);
    torsoGroup.add(shoulderLeft);

    const shoulderRight = new THREE.Mesh(shoulderGeo, accentMaterial);
    shoulderRight.position.set(0.62, 0.1, 0);
    torsoGroup.add(shoulderRight);

    robotRoot.add(torsoGroup);

    // --- 3. ORBITAL HOLO RING ---
    const haloGeo = new THREE.TorusGeometry(1.2, 0.015, 12, 48);
    haloGeo.rotateX(Math.PI / 2.3);
    const haloMesh = new THREE.Mesh(haloGeo, glowMaterial);
    haloMesh.position.set(0, 0.0, 0);
    robotRoot.add(haloMesh);

    // Small floating particle dots orbiting
    const particleCount = 6;
    const particles: THREE.Mesh[] = [];
    const particleGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0x17b4e0 });

    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      robotRoot.add(p);
      particles.push(p);
    }

    // ==========================================
    // INTERACTION / MOUSE TRACKING
    // ==========================================
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePosRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ==========================================
    // ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let blinkTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const isHov = hoveredRef.current;
      const isOp = openRef.current;

      // 1. Floating levitation motion
      const floatSpeed = isHov ? 3.0 : 2.0;
      const floatAmplitude = isHov ? 0.08 : 0.05;
      robotRoot.position.y = Math.sin(elapsedTime * floatSpeed) * floatAmplitude;

      // 2. Head tracking / looking towards cursor
      const targetLookX = mousePosRef.current.x * (isHov ? 0.45 : 0.25);
      const targetLookY = mousePosRef.current.y * (isHov ? 0.35 : 0.2);

      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetLookX, 0.08);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -targetLookY, 0.08);
      headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, -targetLookX * 0.15, 0.08);

      // Torso slight follow
      torsoGroup.rotation.y = THREE.MathUtils.lerp(torsoGroup.rotation.y, targetLookX * 0.4, 0.06);

      // Shoulders subtle breathing
      const shoulderBob = Math.sin(elapsedTime * 2.5) * 0.03;
      shoulderLeft.position.y = 0.1 + shoulderBob;
      shoulderRight.position.y = 0.1 - shoulderBob;

      // 3. Orbital Ring rotation
      haloMesh.rotation.z = elapsedTime * 0.4;
      haloMesh.rotation.x = Math.PI / 2.3 + Math.sin(elapsedTime * 0.8) * 0.1;

      // 4. Orbiting particles
      particles.forEach((p, idx) => {
        const angle = elapsedTime * 0.8 + (idx * (Math.PI * 2)) / particleCount;
        const radius = 1.15;
        p.position.x = Math.cos(angle) * radius;
        p.position.z = Math.sin(angle) * radius * 0.8;
        p.position.y = Math.sin(elapsedTime * 2 + idx) * 0.25;
      });

      // 5. Blinking eye simulation
      blinkTimer += 0.016;
      if (blinkTimer > 3.8) {
        // Blink
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
        if (blinkTimer > 4.0) {
          leftEye.scale.y = 1.0;
          rightEye.scale.y = 1.0;
          blinkTimer = 0;
        }
      }

      // 6. Antenna and Reactor Core Glow Pulse
      const pulseIntensity = 0.7 + Math.sin(elapsedTime * 4.0) * 0.3;
      (antennaOrb.material as THREE.MeshBasicMaterial).color.setRGB(
        0.09 * pulseIntensity,
        0.7 * pulseIntensity,
        0.88 * pulseIntensity
      );
      (reactorCore.material as THREE.MeshBasicMaterial).color.setRGB(
        0.24 * pulseIntensity,
        0.48 * pulseIntensity,
        0.98 * pulseIntensity
      );

      // Subtle base rotation if open
      if (isOp) {
        robotRoot.rotation.y = Math.sin(elapsedTime * 1.2) * 0.15;
      } else {
        robotRoot.rotation.y = THREE.MathUtils.lerp(robotRoot.rotation.y, 0, 0.05);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // RESIZE & CLEANUP
    // ==========================================
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size }}
      className={`relative select-none pointer-events-none ${className}`}
    >
      {!hasWebGL && (
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#1230C4] to-[#17B4E0] p-1 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#0A0E1A] flex items-center justify-center text-cyan-400 font-mono text-xs">
            🤖
          </div>
        </div>
      )}
    </div>
  );
};
