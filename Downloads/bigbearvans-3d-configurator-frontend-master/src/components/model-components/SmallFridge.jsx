import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function SmallFridge({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/small-fridge.glb');

  // Highlighted materials
  const highlightedBlackMetal = useMemo(() => {
    const material = materials.Black_Matel.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 0.8;
    return material;
  }, [materials.Black_Matel]);

  const highlightedMaterial041 = useMemo(() => {
    const material = materials['Material.041'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 0.8;
    return material;
  }, [materials['Material.041']]);

  const highlightedBlackS = useMemo(() => {
    const material = materials.Bleck_S.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 0.8;
    return material;
  }, [materials.Bleck_S]);

  return (
    <group {...props} dispose={null}>
      <group position={[-0.537, 0.997, -0.887]}>
        {nodes?.Cube004?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004.geometry}
            material={isSelected ? highlightedBlackMetal : materials.Black_Matel}
          />
        )}
        {nodes?.Cube004_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_1.geometry}
            material={isSelected ? highlightedMaterial041 : materials['Material.041']}
          />
        )}
        {nodes?.Cube004_2?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_2.geometry}
            material={isSelected ? highlightedBlackS : materials.Bleck_S}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/small-fridge.glb');