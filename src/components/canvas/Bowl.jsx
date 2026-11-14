import React, { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, Preload } from "@react-three/drei";

import CanvasLoader from "../Loader";
import useIsMobile from "./useIsMobile";
import { Pouch } from "./Pouch";

// Deterministic pseudo-random so the bowl looks the same every load.
const rand = (seed) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const CLUSTER_COLORS = ["#8a5a2b", "#6b3f1d", "#c48a3a", "#f5b82e", "#a8692f"];

const BowlBody = () => {
  const geometry = useMemo(() => {
    const pts = [
      [0, 0],
      [0.85, 0],
      [0.95, 0.06],
      [1.45, 0.48],
      [1.8, 1.05],
      [1.92, 1.42],
      [1.86, 1.46],
      [1.74, 1.1],
      [1.38, 0.56],
      [0.9, 0.17],
      [0, 0.17],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 96);
  }, []);

  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color='#f3e6d3' roughness={0.28} metalness={0.05} />
      </mesh>
      {/* Gold rim stripe */}
      <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.585, 0.025, 12, 128]} />
        <meshStandardMaterial color='#f5b82e' roughness={0.25} metalness={0.7} />
      </mesh>
      {/* Milk */}
      <mesh position={[0, 1.18, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.76, 96]} />
        <meshStandardMaterial color='#fffaf0' roughness={0.15} />
      </mesh>
    </group>
  );
};

const Toppings = () => {
  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 90; i++) {
      const r = Math.sqrt(rand(i + 1)) * 1.5;
      const a = rand(i + 101) * Math.PI * 2;
      const kindRoll = rand(i + 201);
      const kind = kindRoll < 0.68 ? "cluster" : kindRoll < 0.84 ? "almond" : kindRoll < 0.94 ? "berry" : "straw";
      list.push({
        kind,
        position: [Math.cos(a) * r, 1.22 + rand(i + 301) * 0.08, Math.sin(a) * r],
        rotation: [rand(i + 401) * 3, rand(i + 501) * 3, rand(i + 601) * 3],
        size: 0.09 + rand(i + 701) * 0.08,
        color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
      });
    }
    return list;
  }, []);

  return (
    <group>
      {items.map((it, i) => {
        if (it.kind === "cluster")
          return (
            <mesh key={i} position={it.position} rotation={it.rotation} scale={it.size} castShadow>
              <dodecahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color={it.color} roughness={0.85} flatShading />
            </mesh>
          );
        if (it.kind === "almond")
          return (
            <mesh
              key={i}
              position={it.position}
              rotation={[0, it.rotation[1], 0.3]}
              scale={[it.size * 1.6, it.size * 0.55, it.size * 0.9]}
              castShadow
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color='#c98b55' roughness={0.6} />
            </mesh>
          );
        if (it.kind === "berry")
          return (
            <mesh key={i} position={it.position} scale={it.size * 0.9} castShadow>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color='#2b2c5e' roughness={0.35} />
            </mesh>
          );
        return (
          <mesh
            key={i}
            position={[it.position[0], 1.25, it.position[2]]}
            rotation={[Math.PI / 2 + 0.2, 0, it.rotation[2]]}
            scale={[it.size * 1.8, it.size * 1.8, it.size * 0.3]}
            castShadow
          >
            <cylinderGeometry args={[1, 0.7, 1, 18]} />
            <meshStandardMaterial color='#e2445c' roughness={0.45} />
          </mesh>
        );
      })}
    </group>
  );
};

const FloatingBits = () => {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.18;
  });
  const bits = useMemo(
    () =>
      [...Array(14)].map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r = 2.6 + rand(i + 900) * 0.8;
        return {
          position: [Math.cos(a) * r, 1.4 + rand(i + 950) * 1.8, Math.sin(a) * r],
          lupin: i % 2 === 0,
          size: 0.1 + rand(i + 990) * 0.08,
        };
      }),
    []
  );
  return (
    <group ref={ref}>
      {bits.map((b, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1.2}>
          <mesh
            position={b.position}
            scale={b.lupin ? [b.size, b.size * 0.75, b.size * 0.55] : b.size}
            castShadow
          >
            {b.lupin ? <sphereGeometry args={[1, 20, 20]} /> : <dodecahedronGeometry args={[1, 0]} />}
            <meshStandardMaterial
              color={b.lupin ? "#f5b82e" : "#8a5a2b"}
              roughness={b.lupin ? 0.3 : 0.85}
              flatShading={!b.lupin}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const Scene = ({ isMobile }) => (
  <group position={isMobile ? [0, -1.3, 0] : [0.9, -1.4, 0]} scale={isMobile ? 0.85 : 1}>
    <BowlBody />
    <Toppings />
    <FloatingBits />
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.5}>
      <Pouch position={[1.9, 1.75, -1.6]} rotation={[0, -0.45, 0.08]} scale={1} />
    </Float>
    <ContactShadows position={[0, -0.01, 0]} opacity={0.6} scale={10} blur={2.4} far={3} color='#000' />
  </group>
);

const BowlCanvas = () => {
  const isMobile = useIsMobile();
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 3.6, 10.5], fov: 34 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <hemisphereLight intensity={0.35} color='#fff1d6' groundColor='#1a0d05' />
        <spotLight
          position={[-6, 9, 6]}
          angle={0.35}
          penumbra={1}
          intensity={1.6}
          color='#fff3dc'
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight position={[5, 3, 3]} intensity={0.9} color='#f5b82e' />
        <pointLight position={[-4, 2, -6]} intensity={0.5} color='#e2445c' />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.7}
          enableZoom={false}
          enablePan={false}
          enableRotate={!isMobile}
          target={[0, 0.3, 0]}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 3.2}
        />
        <Scene isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BowlCanvas;
