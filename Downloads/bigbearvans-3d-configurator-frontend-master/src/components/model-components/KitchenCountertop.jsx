import React, { useMemo, useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';

export function KitchenCountertop({ 
  isSelected, 

  ...props 
}) {
  const { nodes, materials } = useGLTF('./models/parts144/kitchen-countertop.glb');

  
  // Highlight material
  const highlightedMaterial = useMemo(() => {
    const material = materials.W_ma.clone();
    material.emissive.set('red');
    material.emissiveIntensity = 0.5;
    return material;
  }, [materials.W_ma]);



 return (
    <group {...props} dispose={null}>
      {/* Main countertop */}
      {nodes?.Cube018?.geometry && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={isSelected ? highlightedMaterial : materials.W_ma}
          position={[-0.559, 1.417, -0.491]}
          scale={0.924}
        />
      )}


    </group>
  );
}

useGLTF.preload('./models/parts144/kitchen-countertop.glb');