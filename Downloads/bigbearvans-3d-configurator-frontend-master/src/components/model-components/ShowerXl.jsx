import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function ShowerXl({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/shower_XL.glb');

  // Highlighted materials for each unique material
  const highlightedMaterial = useMemo(() => {
    const material = materials.Material.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.Material]);

  const highlightedMaterial007 = useMemo(() => {
    const material = materials['Material.007'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.007']]);

  const highlightedMaterial075 = useMemo(() => {
    const material = materials['Material.075'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.075']]);

  return (
    <group {...props} dispose={null}>
      <group position={[0.477, 1.471, -0.835]} scale={[1, 1, 1.092]}>
        {nodes?.Cube010?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010.geometry}
            material={isSelected ? highlightedMaterial : materials.Material}
          />
        )}
        {nodes?.Cube010_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010_1.geometry}
            material={isSelected ? highlightedMaterial007 : materials['Material.007']}
          />
        )}
        {nodes?.Cube010_2?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010_2.geometry}
            material={isSelected ? highlightedMaterial075 : materials['Material.075']}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/shower_XL.glb');