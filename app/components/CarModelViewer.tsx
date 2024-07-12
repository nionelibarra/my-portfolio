'use client'

import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { Mode } from 'fs';

interface ModelProps {
    scale: number;
}

function Model(props:ModelProps) {
  const { scene } = useGLTF('/porsche911.glb');

  return <primitive object={scene} {...props} />;
}

function CarModelViewer() {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows={'percentage'}
      camera={{ fov: 45 }}
    //   style={{ position: 'absolute' }}
    style={{height: '100vh', width: '100vw'}}
    >
        <color attach={'background'} args={['#ffffff']} />
        <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1,Math.PI/4]}>
            <Stage environment={'night'} >
                <Model scale={0.01}/>
            </Stage>

        </PresentationControls>
    </Canvas>
  );
}

export default CarModelViewer;
