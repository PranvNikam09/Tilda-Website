import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Microwave({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/Microwave.glb');

  const highlightedMaterial = useMemo(() => {
    const material = materials.MicrowaveMat.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.MicrowaveMat]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Document004.geometry}
        material={isSelected ? highlightedMaterial : materials.MicrowaveMat}
        position={[0.525, 2.3, -0.273]}
        rotation={[0.011, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('./models/parts144/Microwave.glb');