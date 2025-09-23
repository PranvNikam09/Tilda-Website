import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function PopoutWindowsAcrylic({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/PopoutWindowsAcrylic.glb');

  const highlightedMaterialLambert1 = useMemo(() => {
    const material = materials['lambert1.001'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['lambert1.001']]);

  const highlightedMaterial019 = useMemo(() => {
    const material = materials['Material.019'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.019']]);

  const highlightedMaterial001 = useMemo(() => {
    const material = materials['Material.001'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.001']]);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.acrilyc_buble.geometry}
        material={isSelected ? highlightedMaterialLambert1 : materials['lambert1.001']}
        position={[-0.001, 1.864, -1.685]}
      />
      <group position={[-0.001, 1.85, -1.686]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh010.geometry}
          material={isSelected ? highlightedMaterialLambert1 : materials['lambert1.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh010_1.geometry}
          material={isSelected ? highlightedMaterial019 : materials['Material.019']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={isSelected ? highlightedMaterial001 : materials['Material.001']}
        position={[1.041, 1.868, -1.873]}
      />
    </group>
  );
}

useGLTF.preload('./models/parts144/PopoutWindowsAcrylic.glb');