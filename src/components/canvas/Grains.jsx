import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

// Drifting golden grains (replaces the template's starfield).
const Grains = () => {
  const ref = useRef();
  // Length must be a multiple of 3 (x,y,z) or three.js produces NaN bounds.
  const [sphere] = useState(() => random.inSphere(new Float32Array(3600), { radius: 1.2 }));

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 14;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color='#8A5100' size={0.0035} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

const GrainsCanvas = () => (
  <div className='w-full h-auto absolute inset-0 z-[-1] pointer-events-none'>
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <Grains />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

export default GrainsCanvas;
