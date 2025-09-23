import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function StoveLarge({ isSelected, ...props }) {
    const { nodes, materials } = useGLTF('./models/parts144/stove_Large.glb');
  
    // Highlighted material for the BigPlateMat
    const highlightedMaterial = useMemo(() => {
      const material = materials.BigPlateMat.clone();
      material.emissive.set('red');
      material.emissiveIntensity = 1;
      return material;
    }, [materials.BigPlateMat]);
  
    return (
      <group {...props} dispose={null}>
        {nodes?.Plane014?.geometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane014.geometry}
            material={isSelected ? highlightedMaterial : materials.BigPlateMat}
            position={[-0.579, 1.517, -0.874]}
            rotation={[-Math.PI, 1.57, -Math.PI]}
          />
        )}
      </group>
    );
  }
  
  useGLTF.preload('./models/parts144/stove_Large.glb');