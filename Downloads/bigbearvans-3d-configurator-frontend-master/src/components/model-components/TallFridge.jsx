import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function TallFridge({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/TallFridge.glb');

  const highlightedMaterialAluminum = useMemo(() => {
    const material = materials['Brushed Aluminum'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Brushed Aluminum']]);

  const highlightedMaterialSteel = useMemo(() => {
    const material = materials['Brushed Steel Procedural.001'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Brushed Steel Procedural.001']]);

  const highlightedMaterial020 = useMemo(() => {
    const material = materials['Material.020'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.020']]);

  const highlightedMaterial022 = useMemo(() => {
    const material = materials['Material.022'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.022']]);

  const highlightedMaterial023 = useMemo(() => {
    const material = materials['Material.023'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.023']]);

  const highlightedMaterial024 = useMemo(() => {
    const material = materials['Material.024'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.024']]);

  return (
    <group {...props} dispose={null}>
      <group position={[0.469, 1.818, -0.917]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          material={isSelected ? highlightedMaterialAluminum : materials['Brushed Aluminum']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020_1.geometry}
          material={isSelected ? highlightedMaterialSteel : materials['Brushed Steel Procedural.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020_2.geometry}
          material={isSelected ? highlightedMaterial020 : materials['Material.020']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020_3.geometry}
          material={isSelected ? highlightedMaterial022 : materials['Material.022']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020_4.geometry}
          material={isSelected ? highlightedMaterial023 : materials['Material.023']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020_5.geometry}
          material={isSelected ? highlightedMaterial024 : materials['Material.024']}
        />
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/TallFridge.glb');