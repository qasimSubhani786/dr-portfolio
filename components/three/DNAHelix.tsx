'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STRAND_POINTS = 80;
const TOTAL_TURNS   = 4;
const HEIGHT        = 5.5;
const RADIUS        = 0.75;
const BASE_PAIR_STEP = 4;

function buildHelixPoints(phaseOffset: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < STRAND_POINTS; i++) {
    const t = (i / (STRAND_POINTS - 1)) * TOTAL_TURNS * Math.PI * 2;
    const y = (i / (STRAND_POINTS - 1) - 0.5) * HEIGHT;
    pts.push(new THREE.Vector3(
      RADIUS * Math.cos(t + phaseOffset),
      y,
      RADIUS * Math.sin(t + phaseOffset),
    ));
  }
  return pts;
}

function StrandTube({ points, color, emissive }: {
  points: THREE.Vector3[];
  color: string;
  emissive: string;
}) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const geo   = useMemo(() => new THREE.TubeGeometry(curve, 200, 0.05, 8, false), [curve]);

  return (
    <mesh geometry={geo}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function Nucleotides({ points, color, emissive }: {
  points: THREE.Vector3[];
  color: string;
  emissive: string;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useMemo(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    points.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [points]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, points.length]}>
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={1.2}
        roughness={0.1}
        metalness={0.6}
      />
    </instancedMesh>
  );
}

function BasePairs({ strand1: s1, strand2: s2 }: {
  strand1: THREE.Vector3[];
  strand2: THREE.Vector3[];
}) {
  const pairs = useMemo(() => {
    const result: { position: THREE.Vector3; quaternion: THREE.Quaternion; length: number }[] = [];
    for (let i = 0; i < s1.length; i += BASE_PAIR_STEP) {
      const p1 = s1[i];
      const p2 = s2[i];
      const dir = p2.clone().sub(p1);
      const len = dir.length();
      const mid = p1.clone().lerp(p2, 0.5);
      const q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize(),
      );
      result.push({ position: mid, quaternion: q, length: len });
    }
    return result;
  }, [s1, s2]);

  return (
    <>
      {pairs.map((pair, i) => (
        <mesh key={i} position={pair.position} quaternion={pair.quaternion}>
          <cylinderGeometry args={[0.025, 0.025, pair.length, 6]} />
          <meshStandardMaterial
            color="#7986cb"
            emissive="#5c6bc0"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);

  const { positions } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r     = 1.5 + Math.random() * 2.5;
      pos[i * 3]     = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * HEIGHT * 1.4;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return { positions: pos };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7986cb"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export default function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const floatRef  = useRef({ y: 0, phase: 0 });

  const strand1Points = useMemo(() => buildHelixPoints(0), []);
  const strand2Points = useMemo(() => buildHelixPoints(Math.PI), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.35;
    floatRef.current.phase += delta * 0.5;
    groupRef.current.position.y = Math.sin(floatRef.current.phase) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <StrandTube
        points={strand1Points}
        color="#3949ab"
        emissive="#1a237e"
      />
      <StrandTube
        points={strand2Points}
        color="#1565c0"
        emissive="#0d47a1"
      />
      <Nucleotides
        points={strand1Points.filter((_, i) => i % 4 === 0)}
        color="#5c6bc0"
        emissive="#3949ab"
      />
      <Nucleotides
        points={strand2Points.filter((_, i) => i % 4 === 0)}
        color="#42a5f5"
        emissive="#1565c0"
      />
      <BasePairs strand1={strand1Points} strand2={strand2Points} />
      <FloatingParticles />

      <pointLight position={[0, 2, 0]} color="#5c6bc0" intensity={3} distance={6} />
      <pointLight position={[0, -2, 0]} color="#1565c0" intensity={2} distance={5} />
      <pointLight position={[2, 0, 0]} color="#c9a84c" intensity={1} distance={4} />
    </group>
  );
}
