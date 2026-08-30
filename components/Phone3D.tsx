'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Float, Environment, ContactShadows, Html } from '@react-three/drei'
import { useInView } from 'framer-motion'
import * as THREE from 'three'
import { useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { PhoneChat } from './PhoneChat'

function PhoneMesh({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current || reduced) return
    const targetY = state.pointer.x * 0.25
    const targetX = -state.pointer.y * 0.18
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.06)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.06)
  })

  return (
    <group ref={group} rotation={[0, -0.15, 0]}>
      {/* Body */}
      <RoundedBox args={[2.15, 4.35, 0.24]} radius={0.32} smoothness={8} castShadow receiveShadow>
        <meshStandardMaterial color="#f2f5f2" roughness={0.4} metalness={0.25} />
      </RoundedBox>
      {/* Screen inset */}
      <RoundedBox args={[1.92, 4.08, 0.06]} radius={0.26} smoothness={8} position={[0, 0, 0.13]}>
        <meshStandardMaterial color="#e7f8ed" roughness={0.2} metalness={0} />
      </RoundedBox>
      {/* Chat UI in 3D space */}
      <Html
        transform
        position={[0, 0, 0.18]}
        distanceFactor={2.6}
        className="pointer-events-none select-none"
        style={{ width: 200 }}
      >
        <PhoneChat />
      </Html>
    </group>
  )
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 6, 4]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 1, -2]} intensity={0.35} color="#16a65a" />
      <Float
        speed={reduced ? 0 : 1.3}
        rotationIntensity={reduced ? 0 : 0.3}
        floatIntensity={reduced ? 0 : 0.8}
        floatingRange={[-0.08, 0.08]}
      >
        <PhoneMesh reduced={reduced} />
      </Float>
      <ContactShadows position={[0, -2.6, 0]} opacity={0.22} scale={9} blur={2.8} far={5} />
      <Environment preset="city" />
    </>
  )
}

export function Phone3D({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { amount: 0.15 })
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  return (
    <div ref={containerRef} className={cn('h-full w-full', className)}>
      {mounted && (
        <Canvas
          dpr={[1, 1.5]}
          shadows
          frameloop={inView && !reduced ? 'always' : 'demand'}
          camera={{ position: [0, 0, 7], fov: 38 }}
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
