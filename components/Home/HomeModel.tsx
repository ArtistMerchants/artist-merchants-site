import React, { useMemo } from 'react'
import {
  useGLTF,
  OrbitControls,
  Environment,
  useTexture,
  Preload,
  StatsGl,
  Lightformer,
  AdaptiveDpr,
} from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  Noise,
  DepthOfField,
  ToneMapping,
  BrightnessContrast,
  SMAA,
} from '@react-three/postprocessing'
import { Canvas, useThree } from '@react-three/fiber'
import { BlendFunction } from 'postprocessing'

export const HomeModel = () => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        shadows={false}
        camera={{ fov: 24, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* <StatsGl /> */}
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={5} />
        <AdaptiveDpr pixelated />
        <Environment
          environmentIntensity={0.35}
          resolution={1024}
          backgroundBlurriness={0.1}
          background={false}
        >
          <Lightformer
            intensity={1}
            rotation-y={Math.PI / 2}
            position={[-6, 0, 0]}
            scale={[16, 5, 1]}
          />
          <Lightformer
            intensity={1.65}
            rotation-y={0}
            rotation-z={0}
            position={[0, 0, -6]}
            scale={[16, 5, 1]}
            color={'#ffffff'}
          />
          <Lightformer
            intensity={0.8}
            rotation-y={0}
            position={[0, 0, 6]}
            scale={[16, 5, 1]}
            color={'#ffffff'}
          />
          <Lightformer
            intensity={1.45}
            rotation-y={-Math.PI / 2}
            position={[6, 0, 0]}
            scale={[16, 5, 1]}
          />

          <Lightformer
            form="circle"
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 0]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, -4, 0]}
            scale={[10, 10, 1]}
          />

          <mesh scale={20}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial color="#000" />
          </mesh>
        </Environment>
        <Model />
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.5}
          enableZoom={false}
          enableDamping={true}
          dampingFactor={0.05}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <Preload all />

        <EffectComposer>
          <SMAA />
          <DepthOfField
            focusDistance={0.5}
            focalLength={0.9}
            bokehScale={20}
            width={1024}
            height={1024}
          />
          <Bloom
            luminanceThreshold={0.95}
            intensity={0.05}
            radius={0.45}
            mipmapBlur={true}
            resolutionX={1024}
            resolutionY={1024}
            levels={12}
          />
          <Noise opacity={0.65} blendFunction={BlendFunction.MULTIPLY} />
          <ToneMapping
            adaptive={false}
            middleGrey={0.09}
            averageLuminance={0.1}
          />
          <BrightnessContrast brightness={-0.35} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

const Model = (props: any) => {
  const { nodes } = useGLTF('/am-stars.glb')
  const { size } = useThree()

  const scale = useMemo(() => {
    if (size.width > 768) return 0.065
    return 0.045
  }, [size.width])

  return (
    <group {...props} scale={scale} position={[0, 0, 0]}>
      <mesh geometry={(nodes.Curve001 as any).geometry}>
        <meshPhysicalMaterial
          attach="material"
          color={'#eeeeee'}
          metalness={0.65}
          roughness={0.05}
          anisotropy={0.175}
          anisotropyRotation={Math.PI / 1.75}
          bumpScale={1}
          clearcoat={0.2}
          clearcoatRoughness={0.8}
          // displacementBias={0}
          // displacementScale={-.01}
          transparent={true}
        />
      </mesh>
    </group>
  )
}

// useGLTF.preload('/am-stars.glb')
