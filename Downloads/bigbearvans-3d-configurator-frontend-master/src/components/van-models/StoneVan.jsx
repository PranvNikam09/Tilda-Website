import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";



export default function Van_StoneGrey({ hidePartsWhenFacingCamera, showExterior }) {
  const { nodes, materials } = useGLTF('./models/AllColorGLB144/Van_StoneGrey.glb')
  const { camera } = useThree();
    const groupRef = useRef();
    const driverSideRef = useRef();
    const passengerSideRef = useRef();
    const roofRef = useRef();
    const rearDoorRef = useRef(); // NEW: Added rear door reference
  
    // Function to determine if a part is facing the camera
    const isFacingCamera = (mesh, normalDirection) => {
      if (!mesh) return false;
  
      const meshWorldPosition = new THREE.Vector3();
      mesh.getWorldPosition(meshWorldPosition);
  
      const vectorToCamera = new THREE.Vector3()
        .subVectors(camera.position, meshWorldPosition)
        .normalize();
  
      // Get the mesh's normal in world space
      const normalMatrix = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);
      const meshNormal = normalDirection
        .clone()
        .applyMatrix3(normalMatrix)
        .normalize();
  
      // Dot product tells us if the surface is facing the camera
      return meshNormal.dot(vectorToCamera) > 0.3; // Lowered threshold for better detection
    };
  
    useFrame(() => {
      if (!groupRef.current) return;
  
      if (hidePartsWhenFacingCamera && !showExterior) {
        // Check if driver_side is facing the camera (assuming +X is outward normal)
        const driverFacing = isFacingCamera(
          driverSideRef.current,
          new THREE.Vector3(1, 0, 0)
        );
        // Check if passenger_side is facing the camera (assuming -X is outward normal)
        const passengerFacing = isFacingCamera(
          passengerSideRef.current,
          new THREE.Vector3(-1, 0, 0)
        );
        // Check if roof is facing the camera (assuming **+Y is upward normal, NOT -Y**)
        const roofFacing = isFacingCamera(
          roofRef.current,
          new THREE.Vector3(0, 1, 0)
        ); // FIXED NORMAL DIRECTION
        // Check if rear door is facing the camera (assuming **+Z is outward normal**)
        const rearDoorFacing = isFacingCamera(
          rearDoorRef.current,
          new THREE.Vector3(0, 0, -1)
        ); // NEW: Rear Door Hiding
  
        // Hide the side facing the camera
        driverSideRef.current.visible = !driverFacing;
        passengerSideRef.current.visible = !passengerFacing;
        roofRef.current.visible = !roofFacing;
        rearDoorRef.current.visible = !rearDoorFacing; // NEW: Hide the rear door if facing camera
      } else {
        // Show all parts in exterior view
        driverSideRef.current.visible = true;
        passengerSideRef.current.visible = true;
        roofRef.current.visible = true;
        rearDoorRef.current.visible = true; // NEW: Show rear door in exterior view
      }
    });
  return (
    <group rotation={[0, 0, 0]} ref={groupRef} dispose={null}>
      <group position={[0.101, 1.17, 1.168]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh.geometry}
          material={materials['MainBody.1001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={materials['MainBody.1002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_2.geometry}
          material={materials.Glass}
        />
      </group>
      <mesh
        ref={roofRef}
        castShadow
        receiveShadow
        geometry={nodes.Top.geometry}
        material={materials.RoofTop}
        position={[0.002, 2.594, -1.136]}
      />
      <mesh
      ref={rearDoorRef}
        castShadow
        receiveShadow
        geometry={nodes.Van_body004.geometry}
        material={materials.RearDoor}
        position={[0.03, 1.372, -2.807]}
      />
      <mesh
      ref={passengerSideRef}
        castShadow
        receiveShadow
        geometry={nodes.passenger_side.geometry}
        material={materials.SlidingDoor}
        position={[-0.897, 1.619, -1.629]}
      />
      <mesh
      ref={driverSideRef}
        castShadow
        receiveShadow
        geometry={nodes.driver_side.geometry}
        material={materials.DriverSide}
        position={[0.829, 1.832, -1.337]}
      />
    </group>
  )
}

useGLTF.preload('./models/AllColorGLB144/Van_StoneGrey.glb')