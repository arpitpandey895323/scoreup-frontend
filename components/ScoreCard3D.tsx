'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Float, Environment, ContactShadows } from '@react-three/drei'
import { useInView } from 'framer-motion'
import * as THREE from 'three'
import { useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

const GREEN = '#16a65a'
const CARD = '#ffffff'
const SOFT = '#eef2ef'

function CardMesh({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current || reduced) return
    const targetY = state.pointer.x * 0.28
    const targetX = -state.pointer.y * 0.2
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.06)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.06)
  })

  return (
    <group ref={group}>
      {/* Card body */}
      <RoundedBox args={[2.4, 3.3, 0.18]} radius={0.16} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color={CARD} roughness={0.35} metalness={0.05} />
      </RoundedBox>

      {/* Score ring (torus) */}
      <group position={[0, 0.75, 0.14]}>
        <mesh>
          <torusGeometry args={[0.52, 0.07, 20, 64]} />
          <meshStandardMaterial color={SOFT} roughness={0.6} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI * 0.35]}>
          {/* partial arc via thetaLength */}
          <torusGeometry args={[0.52, 0.075, 20, 64, Math.PI * 1.35]} />
          <meshStandardMaterial color={GREEN} roughness={0.3} metalness={0.1} emissive={GREEN} emissiveIntensity={0.12} />
        </mesh>
        {/* center dot */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.34, 48]} />
          <meshStandardMaterial color={SOFT} roughness={0.7} />
        </mesh>
      </group>

      {/* UI lines */}
      {[-0.35, -0.75, -1.15].map((y, i) => (
        <RoundedBox
          key={y}
          args={[i === 0 ? 1.7 : i === 1 ? 1.4 : 1.0, 0.12, 0.06]}
          radius={0.05}
          smoothness={4}
          position={[-0.28 + (i === 0 ? 0 : 0), y, 0.14]}
        >
          <meshStandardMaterial color={SOFT} roughness={0.7} />
        </RoundedBox>
      ))}

      {/* accent pill */}
      <RoundedBox args={[0.6, 0.24, 0.08]} radius={0.1} smoothness={4} position={[0.62, -1.55, 0.15]}>
        <meshStandardMaterial color={GREEN} roughness={0.35} emissive={GREEN} emissiveIntensity={0.15} />
      </RoundedBox>
    </group>
  )
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color={GREEN} />
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.35}
        floatIntensity={reduced ? 0 : 0.9}
        floatingRange={[-0.08, 0.08]}
      >
        <CardMesh reduced={reduced} />
      </Float>
      <ContactShadows position={[0, -2.1, 0]} opacity={0.25} scale={8} blur={2.6} far={4} />
      <Environment preset="city" />
    </>
  )
}

export function ScoreCard3D({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { amount: 0.15 })
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  return (
    <div ref={containerRef} className={cn('h-full w-full', className)} aria-hidden>
      {mounted && (
        <Canvas
          dpr={[1, 1.5]}
          shadows
          frameloop={inView && !reduced ? 'always' : 'demand'}
          camera={{ position: [0, 0, 6], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene reduced={reduced} />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
