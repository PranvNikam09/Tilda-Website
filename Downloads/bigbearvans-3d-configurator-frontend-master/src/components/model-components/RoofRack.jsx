import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function RoofRack({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/roof-rack.glb');

  // Highlighted material for the Material.009
  const highlightedMaterial = useMemo(() => {
    const material = materials['Material.009'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.009']]);

  return (
    <group {...props} dispose={null}>
      {nodes?.Cube023?.geometry && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube023.geometry}
          material={isSelected ? highlightedMaterial : materials['Material.009']}
          position={[0.009, 2.662, -0.873]}
        />
      )}
    </group>
  );
}

useGLTF.preload('./models/parts144/roof-rack.glb');