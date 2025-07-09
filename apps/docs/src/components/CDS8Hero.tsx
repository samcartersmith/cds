/* eslint-disable react/no-unknown-property */
import { memo, Suspense, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { animated, useSpring } from '@react-spring/three';
import {
  AccumulativeShadows,
  Center,
  Environment,
  Html,
  MeshTransmissionMaterial,
  PresentationControls,
  RandomizedLight,
  Sky,
  Text3D,
  useProgress,
} from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { useUnifiedTheme } from '@site/src/theme/Layout/Provider/UnifiedThemeContext';
import * as THREE from 'three';
import { RGBELoader } from 'three-stdlib';
import type { ColorScheme } from '@cbhq/cds-common/core/theme';
import { useTheme } from '@cbhq/cds-web/hooks/useTheme';

const AnimatedMeshTransmissionMaterial = animated(MeshTransmissionMaterial);

const font = '/Inter_Medium_Regular.json';
const textureUrl = '/hdr/wasteland_clouds_puresky_1k.hdr';
// 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/wasteland_clouds_puresky_1k.hdr';
// 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/syferfontein_1d_clear_puresky_1k.hdr';
// 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/rosendal_park_sunset_puresky_1k.hdr';
// 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/autumn_field_puresky_1k.hdr';
// 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/marry_hall_1k.hdr';

const themeColors = {
  dark: {
    blue: '#90daff',
    green: '#80e66a',
    red: '#ff9090',
    purple: '#eb90ff',
  },
  light: {
    blue: '#00aaff',
    green: '#0ad928',
    red: '#ff1b1b',
    purple: '#d107ff',
  },
} satisfies Record<ColorScheme, Record<string, string>>;

const transmissionConfig = {
  backside: true,
  backsideThickness: 0.15,
  samples: 16,
  resolution: 1024,
  transmission: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.0,
  thickness: 0.3,
  chromaticAberration: 0.15,
  anisotropy: 0.25,
  roughness: 0,
  distortion: 0.5,
  distortionScale: 0.1,
  temporalDistortion: 0,
  ior: 1.25,
};

const GlassText = memo(
  ({ texture, animatedColor }: { texture: THREE.Texture; animatedColor: any }) => {
    return (
      <Text3D
        bevelEnabled
        castShadow
        bevelSegments={10}
        bevelSize={0.01}
        bevelThickness={0.01}
        curveSegments={128}
        font={font}
        height={0.25}
        letterSpacing={-0.03}
        scale={5.5}
      >
        {'v8'}
        {/* @ts-expect-error Infinitely recursive types */}
        <AnimatedMeshTransmissionMaterial
          {...transmissionConfig}
          background={texture}
          color={animatedColor.color}
          toneMapped={false}
        />
      </Text3D>
    );
  },
);

const ColorPicker = memo(
  ({
    colorState,
    setColorState,
  }: {
    colorState: string;
    setColorState: (color: string) => void;
  }) => (
    <Html transform position={[0, 5, 0.3]} rotation={[0, 0, 0]} scale={0.5}>
      <div onPointerDown={(e) => e.stopPropagation()}>
        <HexColorPicker
          color={colorState}
          onChange={setColorState}
          style={{
            position: 'absolute',
            top: -200,
            left: -200,
            cursor: 'pointer',
          }}
        />
      </div>
    </Html>
  ),
);

const TextShadows = memo(() => (
  <AccumulativeShadows
    alphaTest={0.5}
    color={'#94cbff'}
    colorBlend={10}
    frames={100}
    opacity={0.5}
    position={[0, 0, 0]}
    rotation={[0, Math.PI, 0]}
    scale={20}
    toneMapped={false}
  >
    <RandomizedLight
      ambient={0.5}
      amount={4}
      bias={0.0001}
      intensity={2}
      mapSize={1024}
      position={[0, 10, -10]}
      radius={10}
      size={15}
    />
  </AccumulativeShadows>
));

const EnvironmentEffects = memo(({ texture }: { texture: THREE.Texture }) => (
  <>
    <ambientLight />
    <Environment map={texture} />
    <Sky />
  </>
));

const Stage = memo(() => {
  const { activeColorScheme } = useTheme();
  const { themeOption } = useUnifiedTheme();
  const [previousThemeOption, setPreviousThemeOption] = useState(themeOption);
  const [previousActiveColorScheme, setPreviousActiveColorScheme] = useState(activeColorScheme);

  const colorSchemeColors = themeColors[activeColorScheme];
  const themeColor = colorSchemeColors[themeOption.id as keyof typeof colorSchemeColors];
  const [colorState, setColorState] = useState(themeColor);
  const animatedColor = useSpring({ color: colorState });

  const texture = useLoader(RGBELoader, textureUrl);
  texture.mapping = 303; // THREE.EquirectangularReflectionMapping === 303

  if (
    themeOption.id !== previousThemeOption.id ||
    activeColorScheme !== previousActiveColorScheme
  ) {
    // Reset the color state when the theme changes
    setPreviousThemeOption(themeOption);
    setPreviousActiveColorScheme(activeColorScheme);
    setColorState(themeColor);
  }

  return (
    <>
      <Center top>
        <GlassText animatedColor={animatedColor} texture={texture} />
        <ColorPicker colorState={colorState} setColorState={setColorState} />
      </Center>
      <TextShadows />
      <EnvironmentEffects texture={texture} />
    </>
  );
});

const Scene = memo(() => (
  <PresentationControls
    global
    azimuth={[-Math.PI / 1.75, Math.PI / 4]}
    config={{ mass: 1, tension: 250, friction: 25 }}
    polar={[-Math.PI / 6, Math.PI / 4]}
    rotation={[0.35, 0.5, 0]}
    snap={{ mass: 2, tension: 250, friction: 50 }}
    zoom={1.25}
  >
    <group position={[1, -3.5, 0]}>
      <Stage />
    </group>
  </PresentationControls>
));

export const CDS8Hero = memo(() => {
  const { loaded } = useProgress();

  return (
    <div
      style={{
        background: '#eff0ef',
        borderRadius: 16,
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 15], fov: 35, near: 1, far: 30 }}
        gl={{ preserveDrawingBuffer: true }}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out 500ms',
          height: 500,
          borderRadius: 16,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
});
