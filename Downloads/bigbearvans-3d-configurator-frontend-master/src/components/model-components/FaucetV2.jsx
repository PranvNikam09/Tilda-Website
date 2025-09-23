import React, { useMemo, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';


export function FaucetV2({ isSelected, isWaterOn = false, ...props }) {
  const { nodes, materials, animations } = useGLTF('./models/parts144/faucet2.glb');

  const groupRef = useRef();


  // Highlight material
  const highlightedMaterial = useMemo(() => {
    const material = materials['Material.044'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 0.7;
    return material;
  }, [materials['Material.044']]);

  // Enhanced metal material
  const faucetMaterial = useMemo(() => {
    const material = materials['Material.044'].clone();
    material.roughness = 0.2;
    material.metalness = 1.0;
    material.envMapIntensity = 1.5;
    return material;
  }, [materials['Material.044']]);



  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Main faucet model */}
      {nodes?.Cylinder?.geometry && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={isSelected ? highlightedMaterial : faucetMaterial}
          position={[-0.699, 1.687, -0.42]}
        />
      )}


    </group>
  );
}

useGLTF.preload('./models/parts144/faucet2.glb');