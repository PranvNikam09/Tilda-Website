import React, { useMemo, useState } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';


export function UndermountSink({ isSelected, showWater = false, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/undermount-sink.glb');


  // Highlighted materials
  const highlightedW_ma = useMemo(() => {
    const material = materials.W_ma.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 0.6;
    return material;
  }, [materials.W_ma]);

  const highlightedMaterial031 = useMemo(() => {
    const material = materials['Material.031'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 0.6;
    return material;
  }, [materials['Material.031']]);



  return (
    <group {...props} dispose={null}>
      <group position={[-0.559, 1.417, -0.491]} scale={0.924}>
        {nodes?.Cube012?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube012.geometry}
            material={isSelected ? highlightedW_ma : materials.W_ma}
          />
        )}
        {nodes?.Cube012_1?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube012_1.geometry}
            material={isSelected ? highlightedMaterial031 : materials['Material.031']}
          />
        )}
      </group>


    </group>
  );
}

useGLTF.preload('./models/parts144/undermount-sink.glb');