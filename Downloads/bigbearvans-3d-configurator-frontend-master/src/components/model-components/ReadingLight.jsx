import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export default function ReadingLight({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/reading-light.glb');

  // Highlighted material for the reading light
  const highlightedMaterial = useMemo(() => {
    const material = materials['Reading light'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Reading light']]);

  return (
    <group {...props} dispose={null}>
      {nodes?.Reading_light001?.geometry && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Reading_light001.geometry}
          material={isSelected ? highlightedMaterial : materials['Reading light']}
          position={[-0.013, 1.761, -2.409]}
        />
      )}
    </group>
  );
}

useGLTF.preload('./models/parts144/reading-light.glb');