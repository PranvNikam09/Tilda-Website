import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Control_Panel({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/Control_Panel.glb');

  // Create a new material instance to avoid modifying the original material
  const highlightedMaterial = useMemo(() => {
    const material = materials.CP.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Control_Panel.geometry}
        material={isSelected ? highlightedMaterial : materials.CP}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload('./models/Control_Panel.glb');