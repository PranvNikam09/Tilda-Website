import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function KitchenExtendedCountertop({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/kitchen-extended-countertop.glb');

  // Highlighted material for Material.019
  const highlightedMaterial019 = useMemo(() => {
    const material = materials['Material.019'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.019']]);

  // Highlighted material for W_ma
  const highlightedMaterialW_ma = useMemo(() => {
    const material = materials.W_ma.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.W_ma]);

  return (
    <group {...props} dispose={null}>
      <group position={[-0.582, 1.491, 0.077]}>
        {nodes?.Cube023?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube023.geometry}
            material={isSelected ? highlightedMaterial019 : materials['Material.019']}
          />
        )}
        {nodes?.Cube023_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube023_1.geometry}
            material={isSelected ? highlightedMaterialW_ma : materials.W_ma}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/kitchen-extended-countertop.glb');