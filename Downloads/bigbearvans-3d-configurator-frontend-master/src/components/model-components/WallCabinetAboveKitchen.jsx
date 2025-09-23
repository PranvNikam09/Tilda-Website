import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function WallCabinetAboveKitchen({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/WallCabinetAboveKitchen.glb');

  const highlightedMaterialFF00FF = useMemo(() => {
    const material = materials['STEP_ff00ff.001'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['STEP_ff00ff.001']]);

  const highlightedMaterialSimpleWood = useMemo(() => {
    const material = materials['Simple wood'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Simple wood']]);

  const highlightedMaterialBlack = useMemo(() => {
    const material = materials.Black.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials.Black]);

  return (
    <group {...props} dispose={null}>
      <group position={[-0.568, 2.327, -0.7]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Document007_1.geometry}
          material={isSelected ? highlightedMaterialFF00FF : materials['STEP_ff00ff.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Document007_2.geometry}
          material={isSelected ? highlightedMaterialSimpleWood : materials['Simple wood']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Document007_3.geometry}
          material={isSelected ? highlightedMaterialBlack : materials.Black}
        />
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/WallCabinetAboveKitchen.glb');