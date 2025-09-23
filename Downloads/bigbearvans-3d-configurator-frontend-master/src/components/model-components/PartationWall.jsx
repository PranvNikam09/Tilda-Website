import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function PartationWall({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/partation-wall.glb');

  // Highlighted material for the Material.025
  const highlightedMaterial = useMemo(() => {
    const material = materials['Material.025'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.025']]);

  return (
    <group {...props} dispose={null}>
      {nodes?.['�����-�������7']?.geometry && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['�����-�������7'].geometry}
          material={isSelected ? highlightedMaterial : materials['Material.025']}
          position={[-0.599, 1.492, -1.179]}
        />
      )}
    </group>
  );
}

useGLTF.preload('./models/parts144/partation-wall.glb');