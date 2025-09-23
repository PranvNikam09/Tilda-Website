import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function KitchenWithoutShakerStyle({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/kitchen-without-shaker-style.glb');

  // Highlighted materials
  const highlightedW_ma = useMemo(() => {
    const material = materials.W_ma.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.W_ma]);

  const highlightedBlack = useMemo(() => {
    const material = materials.Black.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.Black]);

  return (
    <group {...props} dispose={null}>
      <group position={[-0.489, 1.057, -0.375]}>
        {nodes?.Cube001?.geometry && (
          <mesh
          visible={false}
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={isSelected ? highlightedW_ma : materials.W_ma}
          />
        )}
        {nodes?.Cube001_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={isSelected ? highlightedBlack : materials.Black}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/kitchen-without-shaker-style.glb');