import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

const JumpSeat = React.forwardRef(({ isSelected,isVisible, ...props }, ref) => {
  const { nodes, materials } = useGLTF('./models/parts144/JumpSeat.glb');

  const highlightedMaterial = useMemo(() => {
    const material = materials['Material.021'].clone();
    material.emissive.set('red');
    material.emissiveIntensity = 1;
    return material;
  }, [materials['Material.021']]);

  return (
    <group ref={ref} {...props} dispose={null} visible={isVisible}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube019.geometry}
        material={isSelected ? highlightedMaterial : materials['Material.021']}
        position={[-0.002, 1.077, 1.054]}
      />
    </group>
  );
});

useGLTF.preload('./models/parts144/JumpSeat.glb');

export default JumpSeat;