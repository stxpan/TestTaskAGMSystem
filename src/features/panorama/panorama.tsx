import React, { Suspense, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { Button } from '@/shared/components/ui/button';

const store = [{ name: 'inside', color: 'lightblue', position: [15, 0, 0], url: '/panorama.jpg', link: 0 }];

const Dome = ({ texture }) => {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

const Portals = () => {
  const [which, set] = useState(0);
  const { link, ...props } = store[which];
  const maps = useLoader(
    THREE.TextureLoader,
    store.map((entry) => entry.url),
  );
  return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />;
};

export const Panorama = () => {
  const ref = React.useRef<any>();

  return (
    <div className="relative h-full w-full">
      <Button className="absolute bottom-10 right-10 z-10 select-none" onClick={() => ref.current?.reset()}>
        Сброс в исходное
      </Button>

      <Canvas frameloop="always" camera={{ position: [-2500, 0, 100] }} style={{ height: '100%', width: '100%' }}>
        <OrbitControls
          enableZoom={true}
          zoomSpeed={12}
          zoomToCursor={true}
          maxDistance={100}
          maxZoom={1}
          enablePan={false}
          enableDamping
          dampingFactor={0.2}
          autoRotate={false}
          rotateSpeed={-0.5}
          ref={ref}
        />
        <Suspense fallback={null}>
          <Portals />
        </Suspense>
      </Canvas>
    </div>
  );
};
