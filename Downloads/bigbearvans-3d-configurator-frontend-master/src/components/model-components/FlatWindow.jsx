import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function FlatWindow({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/flat-window.glb');

  // Highlighted materials for each unique material
  const highlightedMaterial018 = useMemo(() => {
    const material = materials['Material.018'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.018']]);

  const highlightedMaterial028 = useMemo(() => {
    const material = materials['Material.028'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.028']]);

  const highlightedMaterial029 = useMemo(() => {
    const material= materials['Material.029'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.029']]);

  const highlightedMaterial030 = useMemo(() => {
    const material = materials['Material.030'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.030']]);

  return (
    <group {...props} dispose={null}>
      <group position={[0.001, 1.795, -1.808]} rotation={[-Math.PI, 0, 0]} scale={-1}>
        {nodes?.Mesh013?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh013.geometry}
            material={isSelected ? highlightedMaterial018 : materials['Material.018']}
          />
        )}
        {nodes?.Mesh013_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh013_1.geometry}
            material={isSelected ? highlightedMaterial028 : materials['Material.028']}
          />
        )}
        {nodes?.Mesh013_2?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh013_2.geometry}
            material={isSelected ? highlightedMaterial029 : materials['Material.029']}
          />
        )}
        {nodes?.Mesh013_3?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh013_3.geometry}
            material={isSelected ? highlightedMaterial030 : materials['Material.030']}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/flat-window.glb');