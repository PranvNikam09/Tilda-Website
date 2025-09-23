import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function WallCabinetBehindDriver({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/WallCabinetBehindDriver.glb');

  const highlightedMaterial017 = useMemo(() => {
    const material = materials['Material.017'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.017']]);

  const highlightedMaterialSimpleWood = useMemo(() => {
    const material = materials['Simple wood'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Simple wood']]);

  const highlightedMaterial1002 = useMemo(() => {
    const material = materials['Материал_1.002'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Материал_1.002']]);

  const highlightedMaterial2001 = useMemo(() => {
    const material = materials['Material_2.001'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material_2.001']]);

  return (
    <group {...props} dispose={null}>
      <group position={[0.438, 2.132, 0.369]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={isSelected ? highlightedMaterial017 : materials['Material.017']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012_1.geometry}
          material={isSelected ? highlightedMaterialSimpleWood : materials['Simple wood']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012_2.geometry}
          material={isSelected ? highlightedMaterial1002 : materials['Материал_1.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012_3.geometry}
          material={isSelected ? highlightedMaterial2001 : materials['Material_2.001']}
        />
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/WallCabinetBehindDriver.glb');