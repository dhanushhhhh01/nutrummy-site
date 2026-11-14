import React, { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload } from "@react-three/drei";

import CanvasLoader from "../Loader";
import { drawElement, makeCanvasTexture, refreshWhenFontsReady } from "./textures";

const Ball = ({ symbol, stat, color }) => {
  const decal = useMemo(() => makeCanvasTexture(drawElement, symbol, stat), [symbol, stat]);
  useEffect(() => {
    refreshWhenFontsReady(decal, drawElement, symbol, stat);
    return () => decal.dispose();
  }, [decal, symbol, stat]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.05]} intensity={0.9} />
      <pointLight position={[2, 2, 2]} intensity={0.5} color='#f5b82e' />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} polygonOffset polygonOffsetFactor={-5} flatShading roughness={0.55} />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1.1} map={decal} flatShading />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ symbol, stat, color = "#fff4e0" }) => (
  <Canvas frameloop='demand' dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Ball symbol={symbol} stat={stat} color={color} />
    </Suspense>
    <Preload all />
  </Canvas>
);

export default BallCanvas;
