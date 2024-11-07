/* eslint-disable */
import { RGBELoader } from 'three-stdlib';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { easing } from 'maath';

import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial,
  useProgress,
} from '@react-three/drei';
import { Suspense } from 'react';
import { useSpectrum } from '@cbhq/cds-common';

const textureUrls = {
  light:
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/kloofendal_48d_partly_cloudy_puresky_1k.hdr',
  dark: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/autumn_field_puresky_1k.hdr',
};

useLoader.preload(RGBELoader, textureUrls.light);
useLoader.preload(RGBELoader, textureUrls.dark);

const finalConfig = {
  backside: true,
  backsideThickness: 2.0,
  samples: 16,
  resolution: 1024,
  transmission: 1,
  clearcoat: 0.4,
  clearcoatRoughness: 0.0,
  thickness: 0.3,
  chromaticAberration: 0.5,
  anisotropy: 0.25,
  roughness: 0,
  distortion: 0.35,
  distortionScale: 0.1,
  temporalDistortion: 0,
  ior: 1.25,
  color: '#ffffff',
  autoRotate: false,
};

const font = '/Inter_Medium_Regular.json';
const text = 'v7';

export function CDS7Hero() {
  const { loaded } = useProgress();
  const spectrum = useSpectrum();
  const isDarkMode = spectrum === 'dark';

  return (
    <>
      <style type="text/css">{`
      aside {display: none;}
      header {width: 100%; margin: 0 auto;}
      footer {width: 100%; margin: 0 auto;}
      main {width: 1000px !important; max-width: unset !important; margin: 0 auto !important; flex: unset !important; padding: 32px !important;}
      @media (max-width: 1064px) { main { width: 800px !important; padding: 16px !important; } .canvas-container { width: 800px !important; } }
      article {margin: 0 auto; padding-left: 0; padding-bottom: 64px;}
      #post-content {width: 100%;margin: 0 auto; font-size: 18px;}
      `}</style>
      <Canvas
        shadows
        orthographic
        camera={{ position: [7, 10, 10], zoom: 80 }}
        gl={{ preserveDrawingBuffer: true }}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out 500ms',
          cursor: 'pointer',
          borderRadius: 16,
        }}
      >
        <Suspense fallback={null}>
          <Scene isDarkMode={isDarkMode} />
        </Suspense>
      </Canvas>
    </>
  );
}

function Rig(props: any) {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [7 + state.pointer.x * 2, 10 + state.pointer.y * 2, 10],
      0.4,
      delta,
    );
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group {...props} />;
}

export function Scene({ isDarkMode }: { isDarkMode: boolean }) {
  const background = isDarkMode ? '#14151a' : '#f2f2f5';
  const shadow = isDarkMode ? '#000000' : '#94cbff';
  return (
    <>
      <color attach="background" args={[background]} />
      <Rig>
        <Text config={finalConfig} isDarkMode={isDarkMode}>
          {text}
        </Text>
        <OrbitControls
          autoRotate={false}
          autoRotateSpeed={0}
          zoomSpeed={0.1}
          minZoom={75}
          maxZoom={85}
          enablePan={false}
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 3}
          rotateSpeed={0.1}
        />
        <Environment resolution={32}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer
              intensity={20}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={[10, 2, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, -1, -1]}
              scale={[10, 2, 1]}
            />
            <Lightformer
              intensity={2}
              rotation-y={-Math.PI / 2}
              position={[10, 1, 0]}
              scale={[20, 2, 1]}
            />
            <Lightformer
              type="ring"
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-0.1, -1, -5]}
              scale={10}
            />
          </group>
        </Environment>
      </Rig>
      <AccumulativeShadows
        frames={100}
        color={shadow}
        colorBlend={5}
        toneMapped={true}
        alphaTest={0.5}
        opacity={0.9}
        scale={30}
        position={[0, -1.01, 0]}
      >
        <RandomizedLight
          amount={4}
          radius={10}
          ambient={0.5}
          intensity={2}
          position={[0, 10, -10]}
          size={15}
          mapSize={1024}
          bias={0.0001}
        />
      </AccumulativeShadows>
    </>
  );
}

const Grid = ({ number = 23, lineWidth = 0.026, height = 0.5 }) => (
  <Instances position={[0, -1.02, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: number }, (_, y) =>
      Array.from({ length: number }, (_, x) => (
        <group
          key={x + ':' + y}
          position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}
        >
          <Instance rotation={[-Math.PI / 2, 0, 0]} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
        </group>
      )),
    )}
    <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} />
  </Instances>
);

function Text({
  children,
  config,
  isDarkMode,
}: {
  children: React.ReactNode;
  config: any;
  isDarkMode: boolean;
}) {
  const textureUrl = isDarkMode ? textureUrls.dark : textureUrls.light;
  const texture = useLoader(RGBELoader, textureUrl);

  return (
    <group>
      <Center scale={[0.8, 1, 1]} front top rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 2]}>
        <Text3D
          castShadow
          bevelEnabled
          font={font}
          scale={5}
          letterSpacing={-0.03}
          height={0.25}
          bevelSize={0.01}
          bevelSegments={10}
          curveSegments={128}
          bevelThickness={0.01}
        >
          {children}
          <MeshTransmissionMaterial {...config} background={texture} />
        </Text3D>
      </Center>
      <Grid />
    </group>
  );
}
