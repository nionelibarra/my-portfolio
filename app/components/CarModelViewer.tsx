'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { Mode } from 'fs';

interface ModelProps {
  scale: number;
}

function Model(props: ModelProps) {
  const { scene } = useGLTF('/porsche911.glb');

  return <primitive object={scene} {...props} />;
}

function CarModelViewer() {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows={'soft'}
      camera={{ fov: 45 }}
      //   style={{ position: 'absolute' }}
      // style={{ height: 'full', width: 'full' }}
      className='rounded-lg w-full h-full'
    >
      <color attach={'background'} args={['#000000']} />

      <PresentationControls
        speed={1.5}
        global
        zoom={0.5}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage>
          <directionalLight position={[1, 0, 0]} args={['white', 5]} />
          <directionalLight position={[-1, 0, 0]} args={['white', 5]} />
          <directionalLight position={[0, 1, 0]} args={['white', 5]} />
          <directionalLight position={[0, -1, 0]} args={['white', 5]} />
          <directionalLight position={[0, 0, 1]} args={['white', 5]} />
          <directionalLight position={[0, 0, -1]} args={['white', 5]} />
          <Model scale={0.01} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default CarModelViewer;
