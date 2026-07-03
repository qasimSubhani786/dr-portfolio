'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import DNAHelix from './DNAHelix';

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 1.5;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 1.0;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    mouse.current.x += (target.current.x - mouse.current.x) * 0.04;
    mouse.current.y += (target.current.y - mouse.current.y) * 0.04;
    camera.position.x = mouse.current.x * 0.8;
    camera.position.y = mouse.current.y * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function RingOrbit({ radius, speed, tilt, color }: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 8, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.25}
        roughness={0.5}
        metalness={0.8}
      />
    </mesh>
  );
}

function SceneContents() {
  return (
    <>
      <CameraRig />
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#5c6bc0" />

      <Stars
        radius={30}
        depth={20}
        count={800}
        factor={0.6}
        saturation={0.5}
        fade
        speed={0.3}
      />

      <RingOrbit radius={2.0} speed={0.4}  tilt={Math.PI / 3}  color="#c9a84c" />
      <RingOrbit radius={2.6} speed={-0.3} tilt={Math.PI / 5}  color="#5c6bc0" />
      <RingOrbit radius={3.2} speed={0.2}  tilt={Math.PI / 7}  color="#42a5f5" />

      <Suspense fallback={null}>
        <DNAHelix />
      </Suspense>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <SceneContents />
    </Canvas>
  );
}
