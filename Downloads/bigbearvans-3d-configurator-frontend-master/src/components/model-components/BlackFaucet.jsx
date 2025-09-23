import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function BlackFaucet({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/black-faucet.glb');

  // Highlighted material for the Black.001 material
  const highlightedMaterial = useMemo(() => {
    const material = materials['Black.001'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Black.001']]);

  return (
    <group {...props} dispose={null}>
      {nodes?.Cube014?.geometry && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={isSelected ? highlightedMaterial : materials['Black.001']}
          position={[-0.693, 1.701, -0.432]}
        />
      )}
    </group>
  );
}

useGLTF.preload('./models/parts144/black-faucet.glb');