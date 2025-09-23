import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function StoveSmall({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/stove_Small.glb');

  // Highlighted material for the InductionMat
  const highlightedMaterial = useMemo(() => {
    const material = materials.InductionMat.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.InductionMat]);

  return (
    <group {...props} dispose={null}>
      {nodes?.Cube006?.geometry && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={isSelected ? highlightedMaterial : materials.InductionMat}
          position={[-0.598, 1.483, -0.89]}
        />
      )}
    </group>
  );
}

useGLTF.preload('./models/parts144/stove_Small.glb');