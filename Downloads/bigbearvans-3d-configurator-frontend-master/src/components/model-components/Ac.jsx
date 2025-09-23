import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function Ac({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/ac.glb');

  // Highlighted materials for each unique material
  const highlightedMaterial015 = useMemo(() => {
    const material = materials['Material.015'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.015']]);

  const highlightedMaterial016 = useMemo(() => {
    const material = materials['Material.016'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.016']]);

  const highlightedMaterial018 = useMemo(() => {
    const material = materials['Material.018'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.018']]);

  const highlightedMaterial019 = useMemo(() => {
    const material = materials['Material.019'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.019']]);

  const highlightedMaterial024 = useMemo(() => {
    const material = materials['Material.024'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.024']]);

  const highlightedMaterial025 = useMemo(() => {
    const material = materials['Material.025'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.025']]);

  const highlightedMaterialPCFanBlade = useMemo(() => {
    const material = materials['PCFanBlade.001'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['PCFanBlade.001']]);

  const highlightedMaterial026 = useMemo(() => {
    const material = materials['Material.026'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.026']]);

  const highlightedMaterial027 = useMemo(() => {
    const material = materials['Material.027'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.027']]);

  const highlightedMaterial028 = useMemo(() => {
    const material = materials['Material.028'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.028']]);

  const highlightedMaterial029 = useMemo(() => {
    const material = materials['Material.029'].clone();
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

  const highlightedMaterial031 = useMemo(() => {
    const material = materials['Material.031'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.031']]);

  return (
    <group {...props} dispose={null}>
      <group position={[0, 2.576, -0.168]}>
        {nodes?.Cube003?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={isSelected ? highlightedMaterial015 : materials['Material.015']}
          />
        )}
        {nodes?.Cube003_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={isSelected ? highlightedMaterial016 : materials['Material.016']}
          />
        )}
        {nodes?.Cube003_2?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_2.geometry}
            material={isSelected ? highlightedMaterial018 : materials['Material.018']}
          />
        )}
        {nodes?.Cube003_3?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_3.geometry}
            material={isSelected ? highlightedMaterial019 : materials['Material.019']}
          />
        )}
        {nodes?.Cube003_4?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_4.geometry}
            material={isSelected ? highlightedMaterial024 : materials['Material.024']}
          />
        )}
        {nodes?.Cube003_5?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_5.geometry}
            material={isSelected ? highlightedMaterial025 : materials['Material.025']}
          />
        )}
        {nodes?.Cube003_6?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_6.geometry}
            material={isSelected ? highlightedMaterialPCFanBlade : materials['PCFanBlade.001']}
          />
        )}
        {nodes?.Cube003_7?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_7.geometry}
            material={isSelected ? highlightedMaterial026 : materials['Material.026']}
          />
        )}
        {nodes?.Cube003_8?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_8.geometry}
            material={isSelected ? highlightedMaterial027 : materials['Material.027']}
          />
        )}
        {nodes?.Cube003_9?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_9.geometry}
            material={isSelected ? highlightedMaterial028 : materials['Material.028']}
          />
        )}
        {nodes?.Cube003_10?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_10.geometry}
            material={isSelected ? highlightedMaterial029 : materials['Material.029']}
          />
        )}
        {nodes?.Cube003_11?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_11.geometry}
            material={isSelected ? highlightedMaterial030 : materials['Material.030']}
          />
        )}
        {nodes?.Cube003_12?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_12.geometry}
            material={isSelected ? highlightedMaterial031 : materials['Material.031']}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload('./models/parts144/ac.glb');