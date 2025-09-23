import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function SideLadder({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/ex-parts144/side-ladder.glb');

  // Optimized material with conditional highlighting
  const material = useMemo(() => {
    const mat = materials['Material.062'].clone();
    if (isSelected) {
      mat.emissive.set('red');
      mat.emissiveIntensity = 0.7;
      mat.roughness = 0.3; // Slightly shinier when active
    } else {
      mat.emissive.setHex(0x000000);
      mat.roughness = 0.5; // Default roughness
    }
    return mat;
  }, [isSelected, materials['Material.062']]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube113.geometry}
        material={material}
        position={[0.86, 0.3, -0.516]}
        // position={[0.915, 1.525, -0.986]}
        rotation={[0, 0, -0.052]}
        scale={0.9}
      />
    </group>
  );
}

useGLTF.preload('./models/ex-parts144/side-ladder.glb');