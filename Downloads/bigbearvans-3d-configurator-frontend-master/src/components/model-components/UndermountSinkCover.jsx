import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function UndermountSinkCover({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/undermount-sink-cover.glb');
  
  // Highlight material for W_ma
  const highlightedMaterial = useMemo(() => {
    const material = materials.W_ma.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1; // Slightly less intense for covers
    return material;
  }, [materials.W_ma]);

  return (
    <group {...props} dispose={null}>
      {nodes?.Cube013?.geometry && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={isSelected ? highlightedMaterial : materials.W_ma}
          position={[-0.558, 1.505, -0.424]}
          scale={[1.016, 1, 1.007]}
        />
      )}
    </group>
  );
}

useGLTF.preload('./models/parts144/undermount-sink-cover.glb');