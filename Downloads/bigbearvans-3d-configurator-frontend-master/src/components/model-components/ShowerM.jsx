import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function ShowerM({ isVisible, isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/shower-m.glb');

  // Highlighted materials
  const highlightMaterial = useMemo(() => {
    const material = materials.Material.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.Material]);

  const highlightMaterial007 = useMemo(() => {
    const material = materials['Material.007'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.007']]);

  const highlightMaterial075 = useMemo(() => {
    const material = materials['Material.075'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.075']]);

  return (
    <group {...props} dispose={null} visible={isVisible}>
      <group position={[0.477, 1.471, -0.873]} scale={[1, 1, 0.97]}>
        {nodes?.Cube010?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010.geometry}
            material={isSelected ? highlightMaterial : materials.Material}
          />
        )}
        {nodes?.Cube010_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010_1.geometry}
            material={isSelected ? highlightMaterial007 : materials['Material.007']}
          />
        )}
        {nodes?.Cube010_2?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010_2.geometry}
            material={isSelected ? highlightMaterial075 : materials['Material.075']}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/shower-m.glb');