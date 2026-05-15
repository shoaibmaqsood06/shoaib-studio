"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * SpaceCanvas Component
 * Provides an interactive 3D background using Three.js.
 * Optimized for performance and follows "Modern Minimalist" aesthetic.
 */
export default function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Initialize Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    
    const updateSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      return { w, h };
    };

    const { w, h } = updateSize();

    // 2. Setup Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 8;

    // 3. Design Tokens (Electric Blue)
    const electricBlue = new THREE.Color("#4DA3FF");

    // 4. Create Starfield
    const starCount = 1200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 160;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: electricBlue,
      size: 0.1,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 5. Central Geometry (Icosahedron)
    const geoIco = new THREE.IcosahedronGeometry(1.5, 0);
    const matIco = new THREE.MeshStandardMaterial({
      color: electricBlue,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const ico = new THREE.Mesh(geoIco, matIco);
    scene.add(ico);

    // 6. Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const pointLight = new THREE.PointLight(electricBlue, 2, 20);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // 7. Animation Loop
    let animId: number;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Respect accessibility preferences
      if (!motionQuery.matches) {
        ico.rotation.y += 0.003;
        ico.rotation.x += 0.001;
        stars.rotation.y += 0.0001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Event Listeners
    const onResize = () => {
      const { w, h } = updateSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      
      // Memory management
      renderer.dispose();
      geoIco.dispose();
      matIco.dispose();
      starGeo.dispose();
      starMat.dispose();
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-50"
    />
  );
}
