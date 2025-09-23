import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function Solar({ isSelected, ...props }) {
  const { nodes, materials } = useGLTF('./models/parts144/solar-pannel.glb');

  // Highlighted material for the unique material
  const highlightedMaterial = useMemo(() => {
    const material = materials['Ekran Resmi 2020-07-10 11.50.07 kopyası'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Ekran Resmi 2020-07-10 11.50.07 kopyası']]);

  return (
    <group {...props} dispose={null}>
      {nodes?.SP?.geometry && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SP.geometry}
          material={isSelected ? highlightedMaterial : materials['Ekran Resmi 2020-07-10 11.50.07 kopyası']}
          position={[0.038, 2.673, -1.87]}
        />
      )}
    </group>
  );
}

useGLTF.preload('./models/parts144/solar-pannel.glb');