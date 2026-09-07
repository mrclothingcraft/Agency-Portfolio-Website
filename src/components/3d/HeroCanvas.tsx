import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { PageRoute } from '../../types';
import { 
  Code2, 
  Globe, 
  Palette, 
  Video, 
  ShoppingBag, 
  TrendingUp, 
  ExternalLink 
} from 'lucide-react';

interface HeroCanvasProps {
  onNavigate?: (route: PageRoute, slug?: string) => void;
}

interface ServiceInfo {
  id: string;
  name: string;
  emoji: string;
  slug: string;
  category: string;
  desc: string;
  color: number;
  hexColor: string;
}

const SERVICES_DATA: ServiceInfo[] = [
  {
    id: 'code',
    name: 'Web Dev & Coding',
    emoji: '💻',
    slug: 'web-development',
    category: 'Full-Stack Architecture',
    desc: 'React, Next.js, TypeScript & custom WebGL',
    color: 0x3E7BFA,
    hexColor: '#3E7BFA'
  },
  {
    id: 'mobile',
    name: 'Mobile App Dev',
    emoji: '📱',
    slug: 'mobile-app-development',
    category: 'iOS & Android Native',
    desc: 'React Native, Flutter & 60fps kinematics',
    color: 0x17B4E0,
    hexColor: '#17B4E0'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Solution',
    emoji: '🏬',
    slug: 'ecommerce-complete-solution',
    category: 'End-to-End Commerce',
    desc: 'Headless storefronts, ERP sync & high conversion',
    color: 0x3E7BFA,
    hexColor: '#3E7BFA'
  },
  {
    id: 'design',
    name: 'Website Design',
    emoji: '🌐',
    slug: 'web-development',
    category: 'UI/UX & Experience',
    desc: 'Bespoke layouts, responsive systems & motion',
    color: 0x17B4E0,
    hexColor: '#17B4E0'
  },
  {
    id: 'graphic',
    name: 'Graphic Design',
    emoji: '🎨',
    slug: 'graphic-design',
    category: 'Visual Identity',
    desc: 'Brand guidelines, vector assets & pitch decks',
    color: 0x7B4CF0,
    hexColor: '#7B4CF0'
  },
  {
    id: 'video',
    name: 'Video Editing',
    emoji: '🎬',
    slug: 'video-editing',
    category: 'Motion & Post-Production',
    desc: 'Commercial showreels, kinetic 3D & color grading',
    color: 0xE056FD,
    hexColor: '#E056FD'
  },
  {
    id: 'shopify',
    name: 'Shopify / E-Commerce',
    emoji: '🛒',
    slug: 'shopify-development',
    category: 'Headless Commerce',
    desc: 'Shopify Plus, custom themes & conversion funnels',
    color: 0x00E676,
    hexColor: '#00E676'
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    emoji: '📈',
    slug: 'digital-marketing',
    category: 'Performance & Growth',
    desc: 'SEO optimization, paid media & analytics tracking',
    color: 0xFFB300,
    hexColor: '#FFB300'
  }
];

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ onNavigate }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [activeService, setActiveService] = useState<ServiceInfo | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  const activeServiceRef = useRef<ServiceInfo | null>(null);
  activeServiceRef.current = activeService;

  const handleServiceClick = useCallback((slug: string) => {
    if (onNavigate) {
      onNavigate('service-detail', slug);
    }
  }, [onNavigate]);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionHandler);

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const isSupported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      if (!isSupported) {
        setHasWebGL(false);
        return () => mediaQuery.removeEventListener('change', motionHandler);
      }
    } catch {
      setHasWebGL(false);
      return () => mediaQuery.removeEventListener('change', motionHandler);
    }

    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.4, 7.5);

    // ==========================================
    // 1. LIGHTING SETUP
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    // Key Light - Bright Electric Cobalt Blue
    const keyLight = new THREE.DirectionalLight(0x3E7BFA, 3.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    // Fill Light - Cyber Cyan
    const fillLight = new THREE.PointLight(0x17B4E0, 3.8, 18);
    fillLight.position.set(-5, 2, 4);
    scene.add(fillLight);

    // Rim / Backlight - Violet Neon
    const rimLight = new THREE.PointLight(0x7B4CF0, 3.5, 15);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // Subtle Under-glow for Pedestal
    const pedestalLight = new THREE.PointLight(0x17B4E0, 2.5, 8);
    pedestalLight.position.set(0, -2.2, 0);
    scene.add(pedestalLight);

    // Interactive mouse tracker light
    const mouseLight = new THREE.PointLight(0x3E7BFA, 2.0, 10);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    // Root World Group for smooth scene parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ==========================================
    // 2. HOLOGRAPHIC TECH PEDESTAL (Bottom platform)
    // ==========================================
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -2.1, 0);
    worldGroup.add(pedestalGroup);

    // Outer cyber ring with dashed wireframe
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.02, 16, 80);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x3E7BFA,
      emissive: 0x3E7BFA,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.7
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    pedestalGroup.add(ring1);

    // Inner concentric ring
    const ringGeo2 = new THREE.TorusGeometry(1.6, 0.015, 16, 60);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x17B4E0,
      emissive: 0x17B4E0,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    pedestalGroup.add(ring2);

    // Radial spokes on pedestal
    const spokesCount = 8;
    for (let s = 0; s < spokesCount; s++) {
      const spokeAngle = (s / spokesCount) * Math.PI * 2;
      const spokeGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.6, 8);
      const spokeMat = new THREE.MeshBasicMaterial({ color: 0x1E2945, transparent: true, opacity: 0.6 });
      const spoke = new THREE.Mesh(spokeGeo, spokeMat);
      spoke.rotation.z = Math.PI / 2;
      spoke.rotation.y = spokeAngle;
      spoke.position.set(Math.cos(spokeAngle) * 1.9, 0, Math.sin(spokeAngle) * 1.9);
      pedestalGroup.add(spoke);
    }

    // ==========================================
    // 3. 3D FUTURISTIC DIGITAL CHARACTER (Human/Cartoon Stylized)
    // ==========================================
    const characterRoot = new THREE.Group();
    characterRoot.position.set(0, -0.4, 0);
    worldGroup.add(characterRoot);

    // Stylized materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xDCE4F5,
      roughness: 0.45,
      metalness: 0.1
    });

    const jacketMat = new THREE.MeshStandardMaterial({
      color: 0x101626,
      roughness: 0.35,
      metalness: 0.4
    });

    const jacketAccentMat = new THREE.MeshStandardMaterial({
      color: 0x161F36,
      roughness: 0.3,
      metalness: 0.6
    });

    const neonCyanMat = new THREE.MeshStandardMaterial({
      color: 0x17B4E0,
      emissive: 0x17B4E0,
      emissiveIntensity: 1.2,
      roughness: 0.2
    });

    const neonBlueMat = new THREE.MeshStandardMaterial({
      color: 0x3E7BFA,
      emissive: 0x3E7BFA,
      emissiveIntensity: 1.0,
      roughness: 0.2
    });

    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x061226,
      emissive: 0x17B4E0,
      emissiveIntensity: 0.65,
      transparent: true,
      opacity: 0.88,
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x0A0F1D,
      roughness: 0.6,
      metalness: 0.2
    });

    // --- Torso & Jacket ---
    const torsoGroup = new THREE.Group();
    characterRoot.add(torsoGroup);

    // Main chest / upper body
    const chestGeo = new THREE.CylinderGeometry(0.68, 0.52, 1.25, 24);
    const chestMesh = new THREE.Mesh(chestGeo, jacketMat);
    chestMesh.position.y = 0.25;
    torsoGroup.add(chestMesh);

    // High-tech collar
    const collarGeo = new THREE.TorusGeometry(0.38, 0.1, 16, 24, Math.PI * 1.6);
    const collarMesh = new THREE.Mesh(collarGeo, jacketAccentMat);
    collarMesh.position.set(0, 0.92, -0.05);
    collarMesh.rotation.x = Math.PI / 2.3;
    torsoGroup.add(collarMesh);

    // Glowing vertical zipper / energy line
    const zipperGeo = new THREE.BoxGeometry(0.04, 1.15, 0.08);
    const zipperMesh = new THREE.Mesh(zipperGeo, neonCyanMat);
    zipperMesh.position.set(0, 0.28, 0.58);
    torsoGroup.add(zipperMesh);

    // Agency chest emblem / badge
    const badgeGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.04, 6);
    const badgeMesh = new THREE.Mesh(badgeGeo, neonBlueMat);
    badgeMesh.rotation.x = Math.PI / 2;
    badgeMesh.position.set(-0.3, 0.48, 0.56);
    torsoGroup.add(badgeMesh);

    // --- Head Group (tracks cursor independently) ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.28, 0);
    characterRoot.add(headGroup);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.35, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.set(0, -0.15, 0);
    headGroup.add(neckMesh);

    // Stylized Head
    const headGeo = new THREE.SphereGeometry(0.52, 32, 28);
    headGeo.scale(0.96, 1.14, 1.02);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(headMesh);

    // Stylized Modern Hair (layered swept cut)
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    // Top hair volume
    const hairTopGeo = new THREE.SphereGeometry(0.54, 24, 18);
    hairTopGeo.scale(0.98, 0.8, 1.05);
    const hairTop = new THREE.Mesh(hairTopGeo, hairMat);
    hairTop.position.set(0, 0.38, -0.04);
    hairGroup.add(hairTop);

    // Swept bangs strands
    for (let b = -3; b <= 3; b++) {
      const bangGeo = new THREE.ConeGeometry(0.12, 0.45, 6);
      const bang = new THREE.Mesh(bangGeo, hairMat);
      bang.position.set(b * 0.12, 0.48, 0.42);
      bang.rotation.x = -Math.PI / 3;
      bang.rotation.z = -b * 0.15;
      hairGroup.add(bang);
    }

    // --- Futuristic AR Visor / Cyber Goggles ---
    const visorGeo = new THREE.CylinderGeometry(0.54, 0.54, 0.22, 32, 1, true, -Math.PI * 0.38, Math.PI * 0.76);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.rotation.y = Math.PI / 2;
    visorMesh.position.set(0, 0.08, 0.05);
    headGroup.add(visorMesh);

    // Visor rim frame
    const visorRimGeo = new THREE.BoxGeometry(0.85, 0.03, 0.04);
    const visorRimTop = new THREE.Mesh(visorRimGeo, neonCyanMat);
    visorRimTop.position.set(0, 0.19, 0.52);
    headGroup.add(visorRimTop);

    const visorRimBottom = new THREE.Mesh(visorRimGeo, neonCyanMat);
    visorRimBottom.position.set(0, -0.03, 0.52);
    headGroup.add(visorRimBottom);

    // Visor internal HUD data line
    const hudGeo = new THREE.PlaneGeometry(0.45, 0.04);
    const hudMat = new THREE.MeshBasicMaterial({ color: 0x17B4E0, transparent: true, opacity: 0.75 });
    const hudLine = new THREE.Mesh(hudGeo, hudMat);
    hudLine.position.set(0, 0.08, 0.54);
    headGroup.add(hudLine);

    // --- Cyber Studio Headphones ---
    const headphoneGroup = new THREE.Group();
    headGroup.add(headphoneGroup);

    // Top Headband
    const bandGeo = new THREE.TorusGeometry(0.58, 0.035, 12, 32, Math.PI);
    const bandMesh = new THREE.Mesh(bandGeo, jacketMat);
    bandMesh.position.set(0, 0.12, 0);
    headphoneGroup.add(bandMesh);

    // Left and right ear cups with glowing LED rings
    [-1, 1].forEach((side) => {
      const cupGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 24);
      const cup = new THREE.Mesh(cupGeo, jacketAccentMat);
      cup.rotation.z = Math.PI / 2;
      cup.position.set(side * 0.54, 0.06, 0);
      headphoneGroup.add(cup);

      // Glowing circular LED ring
      const ledGeo = new THREE.TorusGeometry(0.14, 0.02, 12, 24);
      const led = new THREE.Mesh(ledGeo, side === -1 ? neonCyanMat : neonBlueMat);
      led.rotation.y = Math.PI / 2;
      led.position.set(side * 0.6, 0.06, 0);
      headphoneGroup.add(led);
    });

    // --- Arms & Hands Posed in Active Creation / Engineering Mode ---
    const armsGroup = new THREE.Group();
    torsoGroup.add(armsGroup);

    // Shoulders
    [-1, 1].forEach((side) => {
      // Shoulder joint
      const shoulderGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const shoulder = new THREE.Mesh(shoulderGeo, jacketMat);
      shoulder.position.set(side * 0.76, 0.65, 0);
      armsGroup.add(shoulder);

      // Upper arm angled forward
      const upperArmGeo = new THREE.CylinderGeometry(0.17, 0.15, 0.62, 16);
      const upperArm = new THREE.Mesh(upperArmGeo, jacketMat);
      upperArm.position.set(side * 0.68, 0.32, 0.25);
      upperArm.rotation.x = Math.PI / 3.8;
      upperArm.rotation.z = -side * Math.PI / 10;
      armsGroup.add(upperArm);

      // Forearm reaching toward laptop
      const forearmGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.6, 16);
      const forearm = new THREE.Mesh(forearmGeo, jacketAccentMat);
      forearm.position.set(side * 0.48, 0.05, 0.65);
      forearm.rotation.x = Math.PI / 2.2;
      forearm.rotation.y = side * Math.PI / 8;
      armsGroup.add(forearm);

      // Cyber wrist cuff with glowing status indicator
      const cuffGeo = new THREE.TorusGeometry(0.13, 0.02, 12, 24);
      const cuff = new THREE.Mesh(cuffGeo, neonCyanMat);
      cuff.position.set(side * 0.42, -0.02, 0.95);
      cuff.rotation.x = Math.PI / 2;
      armsGroup.add(cuff);

      // Hand typing / gesturing over keyboard
      const handGeo = new THREE.BoxGeometry(0.18, 0.07, 0.22);
      const hand = new THREE.Mesh(handGeo, skinMat);
      hand.position.set(side * 0.38, -0.04, 1.1);
      hand.rotation.x = 0.1;
      armsGroup.add(hand);
    });

    // ==========================================
    // 4. FLOATING HOLOGRAPHIC LAPTOP / CYBER DECK
    // ==========================================
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, -0.15, 1.2);
    laptopGroup.rotation.x = -0.12;
    characterRoot.add(laptopGroup);

    // Laptop Base Chassis (Ultra-thin slate titanium)
    const baseGeo = new THREE.BoxGeometry(1.28, 0.03, 0.88);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x121829,
      metalness: 0.85,
      roughness: 0.25
    });
    const laptopBase = new THREE.Mesh(baseGeo, baseMat);
    laptopGroup.add(laptopBase);

    // Illuminated Keyboard & Trackpad surface
    const keyboardGeo = new THREE.PlaneGeometry(1.12, 0.48);
    // Procedural keyboard texture
    const kbCanvas = document.createElement('canvas');
    kbCanvas.width = 256;
    kbCanvas.height = 128;
    const kbCtx = kbCanvas.getContext('2d')!;
    kbCtx.fillStyle = '#0b0f19';
    kbCtx.fillRect(0, 0, 256, 128);
    // Draw grid of glowing keys
    kbCtx.strokeStyle = 'rgba(62, 123, 250, 0.5)';
    kbCtx.lineWidth = 1.5;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 14; col++) {
        kbCtx.strokeRect(6 + col * 17.5, 6 + row * 22, 14, 17);
      }
    }
    const kbTexture = new THREE.CanvasTexture(kbCanvas);
    const kbMat = new THREE.MeshBasicMaterial({ map: kbTexture, transparent: true });
    const kbMesh = new THREE.Mesh(keyboardGeo, kbMat);
    kbMesh.rotation.x = -Math.PI / 2;
    kbMesh.position.set(0, 0.02, -0.1);
    laptopGroup.add(kbMesh);

    // Laptop Display Lid / Glass Holographic Screen
    const screenLidGeo = new THREE.BoxGeometry(1.24, 0.78, 0.02);
    const screenFrameMat = new THREE.MeshStandardMaterial({
      color: 0x161F36,
      metalness: 0.9,
      roughness: 0.2
    });
    const screenLid = new THREE.Mesh(screenLidGeo, screenFrameMat);
    screenLid.position.set(0, 0.38, -0.42);
    screenLid.rotation.x = 0.22;
    laptopGroup.add(screenLid);

    // Animated Holographic Code & UI Texture on Screen
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 512;
    codeCanvas.height = 320;
    const codeCtx = codeCanvas.getContext('2d')!;
    const codeTexture = new THREE.CanvasTexture(codeCanvas);
    const screenDisplayGeo = new THREE.PlaneGeometry(1.18, 0.72);
    const screenDisplayMat = new THREE.MeshBasicMaterial({
      map: codeTexture,
      transparent: true,
      opacity: 0.95
    });
    const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenDisplayMat);
    screenDisplay.position.set(0, 0.38, -0.408);
    screenDisplay.rotation.x = 0.22;
    laptopGroup.add(screenDisplay);

    let codeFrameCount = 0;
    const renderCodeScreen = () => {
      codeFrameCount++;
      codeCtx.fillStyle = '#080C16';
      codeCtx.fillRect(0, 0, 512, 320);

      // Window Header with 3 dots
      codeCtx.fillStyle = '#161F36';
      codeCtx.fillRect(0, 0, 512, 32);
      codeCtx.fillStyle = '#FF5F56';
      codeCtx.beginPath(); codeCtx.arc(20, 16, 5, 0, Math.PI * 2); codeCtx.fill();
      codeCtx.fillStyle = '#FFBD2E';
      codeCtx.beginPath(); codeCtx.arc(38, 16, 5, 0, Math.PI * 2); codeCtx.fill();
      codeCtx.fillStyle = '#27C93F';
      codeCtx.beginPath(); codeCtx.arc(56, 16, 5, 0, Math.PI * 2); codeCtx.fill();

      // Title
      codeCtx.font = 'bold 12px monospace';
      codeCtx.fillStyle = '#3E7BFA';
      codeCtx.fillText('aether-studio-core.tsx', 80, 20);

      // Animated Code Syntax
      const lines = [
        { text: 'import { AetherStudio } from "@aether/core";', color: '#17B4E0' },
        { text: 'export const FlagshipExperience = () => {', color: '#3E7BFA' },
        { text: '  const stack = ["WebGL", "TypeScript", "NextJS"];', color: '#9AA3C2' },
        { text: '  const velocity = useOptimizedPipeline({ fps: 60 });', color: '#7B4CF0' },
        { text: '  return <ArchitectPrestige velocity={velocity} />;', color: '#00E676' },
        { text: '}; // Status: High Performance Engine Active', color: '#FFB300' },
        { text: '// Ready to launch next-gen digital platforms', color: '#55648A' }
      ];

      codeCtx.font = '13px monospace';
      lines.forEach((line, idx) => {
        codeCtx.fillStyle = line.color;
        codeCtx.fillText(line.text, 24, 65 + idx * 32);
      });

      // Scanline pulse
      const scanY = (codeFrameCount * 2) % 320;
      codeCtx.fillStyle = 'rgba(23, 180, 224, 0.15)';
      codeCtx.fillRect(0, scanY, 512, 4);

      codeTexture.needsUpdate = true;
    };

    renderCodeScreen();

    // ==========================================
    // 5. THE 6 3D FLOATING / ORBITING SERVICE OBJECTS
    // (Real 3D multi-part meshes representing agency services)
    // ==========================================
    const serviceObjectsGroup = new THREE.Group();
    worldGroup.add(serviceObjectsGroup);

    interface ServiceMeshNode {
      group: THREE.Group;
      data: ServiceInfo;
      baseAngle: number;
      orbitRadius: number;
      orbitHeight: number;
      orbitSpeed: number;
      floatPhase: number;
      scaleTarget: number;
      currentScale: number;
    }

    const serviceNodes: ServiceMeshNode[] = [];

    // Helper to register service mesh for raycasting
    const interactiveMeshes: THREE.Object3D[] = [];

    SERVICES_DATA.forEach((svc, index) => {
      const nodeGroup = new THREE.Group();
      const baseAngle = (index / SERVICES_DATA.length) * Math.PI * 2;
      const orbitRadius = 2.45 + (index % 2 === 0 ? 0.25 : -0.15);
      const orbitHeight = index === 0 ? 0.75 :
                          index === 1 ? -0.25 :
                          index === 2 ? 0.85 :
                          index === 3 ? -0.1 :
                          index === 4 ? 1.05 :
                          index === 5 ? 0.45 :
                          index === 6 ? -0.65 : 0.15;

      // -------------------------------------------------------------
      // 1. WEB DEV & CODING: 3D Floating Code Window with 3D < / >
      // -------------------------------------------------------------
      if (svc.id === 'code') {
        // Dark glass window
        const winGeo = new THREE.BoxGeometry(0.9, 0.62, 0.05);
        const winMat = new THREE.MeshStandardMaterial({
          color: 0x101626,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0x0A0E1A
        });
        const winMesh = new THREE.Mesh(winGeo, winMat);
        nodeGroup.add(winMesh);

        // Window header bar
        const barGeo = new THREE.BoxGeometry(0.9, 0.12, 0.06);
        const barMat = new THREE.MeshStandardMaterial({ color: 0x161F36, metalness: 0.9, roughness: 0.1 });
        const barMesh = new THREE.Mesh(barGeo, barMat);
        barMesh.position.set(0, 0.25, 0.01);
        nodeGroup.add(barMesh);

        // 3 Dots
        [-0.32, -0.22, -0.12].forEach((x, i) => {
          const dotGeo = new THREE.SphereGeometry(0.03, 12, 12);
          const dotMat = new THREE.MeshBasicMaterial({ 
            color: i === 0 ? 0xFF5F56 : i === 1 ? 0xFFBD2E : 0x27C93F 
          });
          const dot = new THREE.Mesh(dotGeo, dotMat);
          dot.position.set(x, 0.25, 0.04);
          nodeGroup.add(dot);
        });

        // 3D Glowing Extruded Code Brackets < / >
        const bracketMat = new THREE.MeshStandardMaterial({
          color: 0x3E7BFA,
          emissive: 0x3E7BFA,
          emissiveIntensity: 1.2,
          roughness: 0.2
        });

        // Left bracket '<'
        const leftBracketUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8), bracketMat);
        leftBracketUpper.rotation.z = Math.PI / 4;
        leftBracketUpper.position.set(-0.2, 0.04, 0.06);
        nodeGroup.add(leftBracketUpper);

        const leftBracketLower = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8), bracketMat);
        leftBracketLower.rotation.z = -Math.PI / 4;
        leftBracketLower.position.set(-0.2, -0.1, 0.06);
        nodeGroup.add(leftBracketLower);

        // Slash '/'
        const slash = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.32, 8), bracketMat);
        slash.rotation.z = -Math.PI / 6;
        slash.position.set(0, -0.03, 0.06);
        nodeGroup.add(slash);

        // Right bracket '>'
        const rightBracketUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8), bracketMat);
        rightBracketUpper.rotation.z = -Math.PI / 4;
        rightBracketUpper.position.set(0.2, 0.04, 0.06);
        nodeGroup.add(rightBracketUpper);

        const rightBracketLower = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8), bracketMat);
        rightBracketLower.rotation.z = Math.PI / 4;
        rightBracketLower.position.set(0.2, -0.1, 0.06);
        nodeGroup.add(rightBracketLower);
      }

      // -------------------------------------------------------------
      // 2. WEBSITE DESIGN: 3D Wireframe Globe & Responsive Viewport
      // -------------------------------------------------------------
      else if (svc.id === 'design') {
        // Wireframe Geodesic Globe
        const globeGeo = new THREE.IcosahedronGeometry(0.42, 1);
        const globeMat = new THREE.MeshStandardMaterial({
          color: 0x17B4E0,
          emissive: 0x17B4E0,
          emissiveIntensity: 0.9,
          wireframe: true
        });
        const globe = new THREE.Mesh(globeGeo, globeMat);
        nodeGroup.add(globe);

        // Inner glowing core
        const coreGeo = new THREE.SphereGeometry(0.22, 16, 16);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0x0A0E1A,
          emissive: 0x17B4E0,
          emissiveIntensity: 0.5,
          roughness: 0.3
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        nodeGroup.add(core);

        // Equatorial orbital ring
        const ringGeo = new THREE.TorusGeometry(0.56, 0.02, 12, 36);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0x3E7BFA,
          emissive: 0x3E7BFA,
          emissiveIntensity: 0.8
        });
        const orbitRing = new THREE.Mesh(ringGeo, ringMat);
        orbitRing.rotation.x = Math.PI / 2.6;
        nodeGroup.add(orbitRing);

        // Miniature floating responsive layout grid
        const miniCardGeo = new THREE.BoxGeometry(0.35, 0.45, 0.03);
        const miniCardMat = new THREE.MeshStandardMaterial({
          color: 0x101626,
          emissive: 0x1E2945,
          emissiveIntensity: 0.3,
          metalness: 0.8
        });
        const miniCard = new THREE.Mesh(miniCardGeo, miniCardMat);
        miniCard.position.set(0.32, 0.22, 0.2);
        miniCard.rotation.y = -0.3;
        nodeGroup.add(miniCard);
      }

      // -------------------------------------------------------------
      // 3. GRAPHIC DESIGN: 3D Vector Pen Tool & Color Swatch Cubes
      // -------------------------------------------------------------
      else if (svc.id === 'graphic') {
        // Fountain Pen Stylus Nib
        const nibGeo = new THREE.ConeGeometry(0.18, 0.42, 4);
        const nibMat = new THREE.MeshStandardMaterial({
          color: 0xE2E8F0,
          metalness: 0.95,
          roughness: 0.1
        });
        const nib = new THREE.Mesh(nibGeo, nibMat);
        nib.rotation.z = Math.PI;
        nib.position.set(0, -0.15, 0);
        nodeGroup.add(nib);

        // Stylus Body
        const bodyGeo = new THREE.CylinderGeometry(0.12, 0.09, 0.55, 16);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x7B4CF0,
          emissive: 0x7B4CF0,
          emissiveIntensity: 0.5,
          metalness: 0.8
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.set(0, 0.22, 0);
        nodeGroup.add(body);

        // Bezier diamond handle point
        const diamondGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
        const diamondMat = new THREE.MeshStandardMaterial({
          color: 0x17B4E0,
          emissive: 0x17B4E0,
          emissiveIntensity: 1.0
        });
        const diamond = new THREE.Mesh(diamondGeo, diamondMat);
        diamond.rotation.set(Math.PI / 4, Math.PI / 4, 0);
        diamond.position.set(0, -0.42, 0);
        nodeGroup.add(diamond);

        // 3 Floating Color Swatch Cubes (Cobalt, Cyan, Violet)
        const swatchColors = [0x3E7BFA, 0x17B4E0, 0x7B4CF0];
        swatchColors.forEach((col, s) => {
          const sAngle = (s / 3) * Math.PI * 2;
          const swatchGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
          const swatchMat = new THREE.MeshStandardMaterial({
            color: col,
            emissive: col,
            emissiveIntensity: 0.75,
            metalness: 0.7,
            roughness: 0.2
          });
          const swatch = new THREE.Mesh(swatchGeo, swatchMat);
          swatch.position.set(Math.cos(sAngle) * 0.38, 0.1 + Math.sin(sAngle) * 0.18, Math.sin(sAngle) * 0.38);
          nodeGroup.add(swatch);
        });
      }

      // -------------------------------------------------------------
      // 4. VIDEO EDITING: 3D Clapperboard, Film Reel & Play Triangle
      // -------------------------------------------------------------
      else if (svc.id === 'video') {
        // Main Board
        const boardGeo = new THREE.BoxGeometry(0.68, 0.44, 0.04);
        const boardMat = new THREE.MeshStandardMaterial({
          color: 0x101626,
          metalness: 0.8,
          roughness: 0.3
        });
        const board = new THREE.Mesh(boardGeo, boardMat);
        nodeGroup.add(board);

        // Angled Clapper Stick with stripes
        const clapperGeo = new THREE.BoxGeometry(0.68, 0.11, 0.05);
        const clapperMat = new THREE.MeshStandardMaterial({
          color: 0xE056FD,
          emissive: 0xE056FD,
          emissiveIntensity: 0.6,
          metalness: 0.6
        });
        const clapper = new THREE.Mesh(clapperGeo, clapperMat);
        clapper.position.set(0, 0.28, 0.01);
        clapper.rotation.z = -0.18;
        nodeGroup.add(clapper);

        // Film Reel Ring
        const reelGeo = new THREE.TorusGeometry(0.18, 0.04, 12, 24);
        const reelMat = new THREE.MeshStandardMaterial({
          color: 0x17B4E0,
          emissive: 0x17B4E0,
          emissiveIntensity: 0.8
        });
        const reel = new THREE.Mesh(reelGeo, reelMat);
        reel.position.set(0, -0.05, 0.04);
        nodeGroup.add(reel);

        // Glowing 3D Play Triangle in Center
        const playGeo = new THREE.ConeGeometry(0.09, 0.08, 3);
        const playMat = new THREE.MeshStandardMaterial({
          color: 0xFFFFFF,
          emissive: 0xFFFFFF,
          emissiveIntensity: 1.0
        });
        const play = new THREE.Mesh(playGeo, playMat);
        play.rotation.z = -Math.PI / 2;
        play.position.set(0.01, -0.05, 0.05);
        nodeGroup.add(play);
      }

      // -------------------------------------------------------------
      // 5. SHOPIFY / E-COMMERCE: 3D Shopping Bag & Delivery Box
      // -------------------------------------------------------------
      else if (svc.id === 'shopify') {
        // 3D Shopping Bag Body
        const bagGeo = new THREE.BoxGeometry(0.55, 0.62, 0.35);
        const bagMat = new THREE.MeshStandardMaterial({
          color: 0x0E1F18,
          emissive: 0x00E676,
          emissiveIntensity: 0.3,
          metalness: 0.6,
          roughness: 0.4
        });
        const bag = new THREE.Mesh(bagGeo, bagMat);
        nodeGroup.add(bag);

        // Glowing Curved Bag Handle
        const handleGeo = new THREE.TorusGeometry(0.18, 0.025, 12, 24, Math.PI);
        const handleMat = new THREE.MeshStandardMaterial({
          color: 0x00E676,
          emissive: 0x00E676,
          emissiveIntensity: 1.2
        });
        const handle = new THREE.Mesh(handleGeo, handleMat);
        handle.position.set(0, 0.31, 0);
        nodeGroup.add(handle);

        // Shopping Bag Glyph / Emblem on front
        const tagGeo = new THREE.BoxGeometry(0.18, 0.18, 0.02);
        const tagMat = new THREE.MeshStandardMaterial({
          color: 0x00E676,
          emissive: 0x00E676,
          emissiveIntensity: 0.9
        });
        const tag = new THREE.Mesh(tagGeo, tagMat);
        tag.position.set(0, 0, 0.19);
        nodeGroup.add(tag);

        // Small 3D Shipping Parcel Beside It
        const parcelGeo = new THREE.BoxGeometry(0.26, 0.24, 0.24);
        const parcelMat = new THREE.MeshStandardMaterial({
          color: 0x1E2945,
          roughness: 0.5,
          metalness: 0.4
        });
        const parcel = new THREE.Mesh(parcelGeo, parcelMat);
        parcel.position.set(0.38, -0.18, 0.18);
        parcel.rotation.y = 0.4;
        nodeGroup.add(parcel);
      }

      // -------------------------------------------------------------
      // 6. DIGITAL MARKETING: 3D Ascending Bar Chart & Rocket Arrow
      // -------------------------------------------------------------
      else if (svc.id === 'marketing') {
        // Base plate
        const chartBaseGeo = new THREE.BoxGeometry(0.72, 0.05, 0.3);
        const chartBaseMat = new THREE.MeshStandardMaterial({ color: 0x161F36, metalness: 0.8 });
        const chartBase = new THREE.Mesh(chartBaseGeo, chartBaseMat);
        chartBase.position.set(0, -0.3, 0);
        nodeGroup.add(chartBase);

        // 3 Stepped Growth Bars (Ascending heights)
        const heights = [0.28, 0.5, 0.75];
        const barColors = [0x3E7BFA, 0x17B4E0, 0xFFB300];

        heights.forEach((h, b) => {
          const barGeo = new THREE.BoxGeometry(0.15, h, 0.15);
          const barMat = new THREE.MeshStandardMaterial({
            color: barColors[b],
            emissive: barColors[b],
            emissiveIntensity: 0.8,
            metalness: 0.5,
            roughness: 0.2
          });
          const bar = new THREE.Mesh(barGeo, barMat);
          bar.position.set(-0.22 + b * 0.22, -0.3 + h / 2, 0);
          nodeGroup.add(bar);
        });

        // 3D Ascending Growth Curve / Arrow Line
        const arrowStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.72, 8);
        const arrowMat = new THREE.MeshStandardMaterial({
          color: 0xFFB300,
          emissive: 0xFFB300,
          emissiveIntensity: 1.2
        });
        const stem = new THREE.Mesh(arrowStemGeo, arrowMat);
        stem.rotation.z = -Math.PI / 3.4;
        stem.position.set(0.04, 0.05, 0.12);
        nodeGroup.add(stem);

        // Arrow head pointing up
        const arrowHeadGeo = new THREE.ConeGeometry(0.08, 0.18, 8);
        const head = new THREE.Mesh(arrowHeadGeo, arrowMat);
        head.rotation.z = -Math.PI / 3.4;
        head.position.set(0.24, 0.25, 0.12);
        nodeGroup.add(head);
      }

      // -------------------------------------------------------------
      // 7. MOBILE APP DEV: 3D Smartphone with Notch & App Icons
      // -------------------------------------------------------------
      else if (svc.id === 'mobile') {
        const phoneGeo = new THREE.BoxGeometry(0.44, 0.8, 0.05);
        const phoneMat = new THREE.MeshStandardMaterial({
          color: 0x161F36,
          metalness: 0.9,
          roughness: 0.1
        });
        const phone = new THREE.Mesh(phoneGeo, phoneMat);
        nodeGroup.add(phone);

        // Screen
        const screenGeo = new THREE.PlaneGeometry(0.38, 0.72);
        const screenMat = new THREE.MeshStandardMaterial({
          color: 0x101626,
          emissive: 0x17B4E0,
          emissiveIntensity: 0.7,
          metalness: 0.2,
          roughness: 0.2
        });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.set(0, 0, 0.028);
        nodeGroup.add(screen);

        // Dynamic Island / Notch
        const notchGeo = new THREE.BoxGeometry(0.12, 0.035, 0.01);
        const notchMat = new THREE.MeshBasicMaterial({ color: 0x0A0E1A });
        const notch = new THREE.Mesh(notchGeo, notchMat);
        notch.position.set(0, 0.31, 0.032);
        nodeGroup.add(notch);

        // Grid of 4 app icon tiles
        [-0.08, 0.08].forEach((x) => {
          [0.16, 0.01, -0.14].forEach((y) => {
            const tileGeo = new THREE.BoxGeometry(0.09, 0.09, 0.01);
            const tileMat = new THREE.MeshStandardMaterial({
              color: 0x3E7BFA,
              emissive: 0x17B4E0,
              emissiveIntensity: 0.9
            });
            const tile = new THREE.Mesh(tileGeo, tileMat);
            tile.position.set(x, y, 0.032);
            nodeGroup.add(tile);
          });
        });
      }

      // -------------------------------------------------------------
      // 8. E-COMMERCE COMPLETE SOLUTION: 3D Storefront with Awning & Cart Ring
      // -------------------------------------------------------------
      else if (svc.id === 'ecommerce') {
        const storeGeo = new THREE.BoxGeometry(0.68, 0.58, 0.32);
        const storeMat = new THREE.MeshStandardMaterial({
          color: 0x101626,
          metalness: 0.8,
          roughness: 0.2
        });
        const store = new THREE.Mesh(storeGeo, storeMat);
        nodeGroup.add(store);

        // Striped Awning
        const awningGeo = new THREE.BoxGeometry(0.72, 0.09, 0.24);
        const awningMat = new THREE.MeshStandardMaterial({
          color: 0x3E7BFA,
          emissive: 0x3E7BFA,
          emissiveIntensity: 0.8
        });
        const awning = new THREE.Mesh(awningGeo, awningMat);
        awning.position.set(0, 0.25, 0.12);
        awning.rotation.x = 0.28;
        nodeGroup.add(awning);

        // Store Glass Display
        const glassGeo = new THREE.PlaneGeometry(0.5, 0.34);
        const glassMat = new THREE.MeshStandardMaterial({
          color: 0x161F36,
          emissive: 0x17B4E0,
          emissiveIntensity: 0.7,
          transparent: true,
          opacity: 0.85
        });
        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.set(0, -0.04, 0.165);
        nodeGroup.add(glass);

        // Orbiting Currency / Verification Ring
        const ringGeo = new THREE.TorusGeometry(0.48, 0.016, 12, 36);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0x17B4E0,
          emissive: 0x17B4E0,
          emissiveIntensity: 1.2
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 3;
        nodeGroup.add(ring);
      }

      // Store metadata on the group for raycaster detection
      nodeGroup.userData = { serviceData: svc };
      nodeGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.userData = { serviceData: svc, parentGroup: nodeGroup };
          interactiveMeshes.push(child);
        }
      });

      serviceObjectsGroup.add(nodeGroup);

      serviceNodes.push({
        group: nodeGroup,
        data: svc,
        baseAngle,
        orbitRadius,
        orbitHeight,
        orbitSpeed: 0.003 + (index % 2 === 0 ? 0.001 : -0.0005),
        floatPhase: index * 1.1,
        scaleTarget: 1.0,
        currentScale: 1.0
      });
    });

    // ==========================================
    // 6. AMBIENT CYBER PARTICLES (Stars, Dust, Code Sparks)
    // ==========================================
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cBlue = new THREE.Color(0x3E7BFA);
    const cCyan = new THREE.Color(0x17B4E0);
    const cPurple = new THREE.Color(0x7B4CF0);

    for (let p = 0; p < particleCount; p++) {
      // Distribute in sphere around character
      const r = 2.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[p * 3] = r * Math.cos(phi) * Math.cos(theta);
      positions[p * 3 + 1] = r * Math.sin(phi);
      positions[p * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);

      const rand = Math.random();
      const col = rand > 0.6 ? cCyan : rand > 0.3 ? cBlue : cPurple;
      colors[p * 3] = col.r;
      colors[p * 3 + 1] = col.g;
      colors[p * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // ==========================================
    // 7. MOUSE, SCROLL, AND RAYCASTING HANDLERS
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let rawMouseX = 0;
    let rawMouseY = 0;
    let targetHeadRotY = 0;
    let targetHeadRotX = 0;
    let targetWorldRotY = 0;
    let targetWorldRotX = 0;
    let scrollRot = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Normalized coordinates (-1 to 1) for raycasting & parallax
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;

      rawMouseX = mouse.x;
      rawMouseY = mouse.y;

      targetHeadRotY = mouse.x * 0.45;
      targetHeadRotX = -mouse.y * 0.32;

      targetWorldRotY = mouse.x * 0.22;
      targetWorldRotX = -mouse.y * 0.15;

      mouseLight.position.x = mouse.x * 3.5;
      mouseLight.position.y = mouse.y * 3.5;
    };

    const handleClick = () => {
      if (activeServiceRef.current) {
        handleServiceClick(activeServiceRef.current.slug);
      }
    };

    const handleScroll = () => {
      scrollRot = window.scrollY * 0.0012;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause rendering when scrolled out of view
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // ==========================================
    // 8. MAIN ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    const startTime = performance.now();
    let lastTime = startTime;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;
      const time = (now - startTime) * 0.001;

      // Screen code animation every 15 frames
      if (Math.floor(time * 60) % 15 === 0) {
        renderCodeScreen();
      }

      // Smooth idle breathing motion for character
      const breath = Math.sin(time * 2.2) * 0.04;
      characterRoot.position.y = -0.4 + breath;
      torsoGroup.scale.set(1 + breath * 0.2, 1, 1 + breath * 0.2);

      // Smooth character head tracking mouse look-at with damping
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * 0.08;

      // Entire world group subtle parallax + scroll rotation
      worldGroup.rotation.y += (targetWorldRotY + scrollRot - worldGroup.rotation.y) * 0.05;
      worldGroup.rotation.x += (targetWorldRotX - worldGroup.rotation.x) * 0.05;

      // Rotate pedestal rings in opposing directions
      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.006;

      // Rotate particles slowly
      particles.rotation.y += 0.0015;
      particles.rotation.x = Math.sin(time * 0.3) * 0.08;

      // Orbit and float the 6 3D service objects
      serviceNodes.forEach((node) => {
        // Continuous gentle orbit
        node.baseAngle += node.orbitSpeed;
        const currentAngle = node.baseAngle;

        // Elliptical orbit with individual height oscillation
        const x = Math.cos(currentAngle) * node.orbitRadius;
        const z = Math.sin(currentAngle) * node.orbitRadius;
        const y = node.orbitHeight + Math.sin(time * 1.8 + node.floatPhase) * 0.12;

        node.group.position.set(x, y, z);

        // Face towards the camera/front while gently rotating on its axis
        node.group.rotation.y = -currentAngle + Math.PI / 2 + Math.sin(time * 1.2 + node.floatPhase) * 0.2;
        node.group.rotation.x = Math.cos(time * 1.4 + node.floatPhase) * 0.15;

        // Smooth scale lerping for hover state
        node.currentScale += (node.scaleTarget - node.currentScale) * 0.12;
        node.group.scale.set(node.currentScale, node.currentScale, node.currentScale);
      });

      // -------------------------------------------------------------
      // Raycasting for interactive hover on 3D service objects
      // -------------------------------------------------------------
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const svcData = hitMesh.userData?.serviceData as ServiceInfo;

        if (svcData) {
          // Highlight active node
          serviceNodes.forEach((node) => {
            if (node.data.id === svcData.id) {
              node.scaleTarget = 1.25;
            } else {
              node.scaleTarget = 0.95;
            }
          });

          // Screen position for floating tooltip
          const pos = new THREE.Vector3();
          hitMesh.getWorldPosition(pos);
          pos.project(camera);

          const screenX = ((pos.x + 1) * container.clientWidth) / 2;
          const screenY = ((-pos.y + 1) * container.clientHeight) / 2;

          setActiveService(svcData);
          setHoverPosition({ x: screenX, y: screenY });

          container.style.cursor = 'pointer';
        }
      } else {
        // Reset all nodes
        serviceNodes.forEach((node) => {
          node.scaleTarget = 1.0;
        });

        setActiveService(null);
        setHoverPosition(null);
        container.style.cursor = 'default';
      }

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // CLEANUP
    // ==========================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);
      mediaQuery.removeEventListener('change', motionHandler);
      observer.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries and materials
      renderer.dispose();
      codeTexture.dispose();
      kbTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [handleServiceClick]);

  // Fallback rendering if WebGL is unavailable or user requested reduced motion
  if (!hasWebGL || prefersReducedMotion) {
    return (
      <div 
        id="hero-3d-fallback" 
        className="relative flex h-full w-full items-center justify-center p-6"
      >
        <div className="relative flex flex-col items-center justify-center text-center space-y-4 max-w-sm">
          {/* Stylized Avatar Emblem */}
          <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-[#161F36] via-[#101626] to-[#0A0E1A] border-2 border-[#3E7BFA] flex items-center justify-center shadow-[0_0_35px_rgba(62,123,250,0.3)]">
            <Code2 className="h-14 w-14 text-[#17B4E0]" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#F3F5FA]">Aether Studio Core</h4>
            <p className="text-xs text-[#9AA3C2]">
              Web Dev • Mobile Apps • E-Commerce • Design • Video • Shopify • Marketing
            </p>
          </div>

          {/* Service badges list */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {SERVICES_DATA.map((s) => (
              <button
                key={s.id}
                onClick={() => handleServiceClick(s.slug)}
                className="px-2.5 py-1 rounded-full bg-[#101626] border border-[#1E2945] text-[11px] text-[#3E7BFA] hover:border-[#3E7BFA] transition-colors"
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="hero-3d-character-container" 
      ref={mountRef} 
      className="relative h-full w-full select-none"
      aria-label="Interactive 3D digital creator character with orbiting agency services"
    >
      {/* Dynamic 3D Service Hover Tooltip Overlay */}
      {activeService && hoverPosition && (
        <div 
          className="pointer-events-none absolute z-30 transform -translate-x-1/2 -translate-y-full mb-4 animate-in fade-in zoom-in-95 duration-150"
          style={{ 
            left: `${Math.max(60, Math.min(hoverPosition.x, (mountRef.current?.clientWidth || 400) - 60))}px`, 
            top: `${Math.max(40, hoverPosition.y - 12)}px` 
          }}
        >
          <div className="p-3.5 rounded-2xl bg-[#0A0E1A]/95 backdrop-blur-md border border-[#3E7BFA]/60 shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-left space-y-1 min-w-[200px]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#F3F5FA] flex items-center gap-1.5">
                <span>{activeService.emoji}</span>
                <span>{activeService.name}</span>
              </span>
              <ExternalLink className="h-3 w-3 text-[#3E7BFA]" />
            </div>

            <div className="text-[10px] font-semibold text-[#17B4E0]">
              {activeService.category}
            </div>

            <p className="text-[10px] text-[#9AA3C2] leading-tight">
              {activeService.desc}
            </p>

            <div className="pt-1 flex items-center justify-between text-[9px] text-[#3E7BFA] border-t border-[#1E2945]/70">
              <span>Click to view practice</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#17B4E0] animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
