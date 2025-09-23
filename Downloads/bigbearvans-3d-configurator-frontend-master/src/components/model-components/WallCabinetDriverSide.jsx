import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function WallCabinetDriverSide({ isVisible,isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/microwave-cabinet.glb');

  // Highlighted materials for each unique material
  const highlightedMicrowaveMat = useMemo(() => {
    const material = materials.MicrowaveMat.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.MicrowaveMat]);

  const highlightedSimpleWood = useMemo(() => {
    const material = materials['Simple wood'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Simple wood']]);

  const highlightedMaterial1 = useMemo(() => {
    const material = materials['Материал_1.002'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Материал_1.002']]);

  const highlightedMaterial2 = useMemo(() => {
    const material = materials['Material_2.001'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material_2.001']]);

  return (
    <group {...props} dispose={null} visible={isVisible}>
      <group position={[0.374, 2.204, 0.200]} rotation={[0.011, 0, 0]}>
        {nodes?.Document004_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Document004_1.geometry}
            material={isSelected ? highlightedMicrowaveMat : materials.MicrowaveMat}
          />
        )}
        {nodes?.Document004_2?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Document004_2.geometry}
            material={isSelected ? highlightedSimpleWood : materials['Simple wood']}
          />
        )}
        {nodes?.Document004_3?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Document004_3.geometry}
            material={isSelected ? highlightedMaterial1 : materials['Материал_1.002']}
          />
        )}
        {nodes?.Document004_4?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Document004_4.geometry}
            material={isSelected ? highlightedMaterial2 : materials['Material_2.001']}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/microwave-cabinet.glb');