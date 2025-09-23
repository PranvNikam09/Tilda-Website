import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function ShowerBox({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/ShowerBox.glb');

  const highlightedMaterial = useMemo(() => {
    const material = materials.phong1.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.phong1]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shower_box.geometry}
        material={isSelected ? highlightedMaterial : materials.phong1}
        position={[0.408, 0.824, -2.644]}
      />
    </group>
  );
}

useGLTF.preload('./models/parts144/ShowerBox.glb');