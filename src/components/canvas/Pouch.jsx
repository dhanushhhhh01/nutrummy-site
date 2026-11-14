import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, Preload, RoundedBox } from "@react-three/drei";

import CanvasLoader from "../Loader";
import useIsMobile from "./useIsMobile";
import {
  drawPouchBack,
  drawPouchLabel,
  makeCanvasTexture,
  refreshWhenFontsReady,
} from "./textures";

/** A stand-up product pouch with printed front and back labels. */
export const Pouch = (props) => {
  const front = useMemo(() => makeCanvasTexture(drawPouchLabel), []);
  const back = useMemo(() => makeCanvasTexture(drawPouchBack), []);

  useEffect(() => {
    refreshWhenFontsReady(front, drawPouchLabel);
    refreshWhenFontsReady(back, drawPouchBack);
    return () => {
      front.dispose();
      back.dispose();
    };
  }, [front, back]);

  return (
    <group {...props}>
      <RoundedBox args={[1.6, 2.3, 0.42]} radius={0.12} smoothness={6} castShadow>
        <meshStandardMaterial color='#2a160a' roughness={0.45} metalness={0.15} />
      </RoundedBox>
      <mesh position={[0, 0, 0.212]}>
        <planeGeometry args={[1.5, 2.1]} />
        <meshStandardMaterial map={front} roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0, -0.212]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.5, 2.1]} />
        <meshStandardMaterial map={back} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Heat-sealed top crimp */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.62, 0.16, 0.1]} />
        <meshStandardMaterial color='#f5b82e' roughness={0.3} metalness={0.4} />
      </mesh>
      {[...Array(14)].map((_, i) => (
        <mesh key={i} position={[-0.74 + i * 0.114, 1.2, 0.052]}>
          <boxGeometry args={[0.03, 0.16, 0.01]} />
          <meshStandardMaterial color='#d9940f' />
        </mesh>
      ))}
    </group>
  );
};

const Bean = ({ position, scale = 0.16, color = "#f5b82e", speed = 1 }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.6 * speed;
    ref.current.rotation.y += delta * 0.4 * speed;
  });
  return (
    <mesh ref={ref} position={position} scale={[scale, scale * 0.72, scale * 0.55]} castShadow>
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
    </mesh>
  );
};

const Orbit = () => {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.35;
  });
  const beans = useMemo(
    () =>
      [...Array(9)].map((_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return {
          position: [Math.cos(a) * 2, Math.sin(i * 1.7) * 0.9, Math.sin(a) * 2],
          color: i % 3 === 0 ? "#c98b55" : "#f5b82e",
          scale: 0.12 + (i % 3) * 0.04,
        };
      }),
    []
  );
  return (
    <group ref={ref}>
      {beans.map((b, i) => (
        <Bean key={i} {...b} speed={1 + (i % 3) * 0.3} />
      ))}
    </group>
  );
};

const PouchCanvas = () => {
  const isMobile = useIsMobile();
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.6, 6.2], fov: 40 }}>
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 5, 4]} intensity={1.1} color='#fff1d6' castShadow />
        <pointLight position={[-4, 1, 3]} intensity={0.8} color='#f5b82e' />
        <pointLight position={[3, -2, -3]} intensity={0.5} color='#e2445c' />
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.6}
          enableZoom={false}
          enablePan={false}
          enableRotate={!isMobile}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.6}
        />
        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.8}>
          <Pouch scale={1.25} />
        </Float>
        <Orbit />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={8} blur={2.6} far={4} color='#000' />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default PouchCanvas;
