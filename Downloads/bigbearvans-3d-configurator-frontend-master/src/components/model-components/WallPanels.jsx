import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function WallPanels({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/WallPanels.glb');

  const highlightedMaterialOakWood = useMemo(() => {
    const material = materials['Oak wood'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Oak wood']]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall.geometry}
        material={isSelected ? highlightedMaterialOakWood : materials['Oak wood']}
        position={[0.781, 1.566, -1.029]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall001.geometry}
        material={isSelected ? highlightedMaterialOakWood : materials['Oak wood']}
        position={[-0.794, 1.566, -1.966]}
      />
    </group>
  );
}

useGLTF.preload('./models/parts144/WallPanels.glb');