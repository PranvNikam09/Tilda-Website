import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';



function ExportScene({ scene  }) {
  const handleExport = () => {

        const exporter = new GLTFExporter();
        exporter.parse(
          scene,
          (gltf) => {
            const blob = new Blob([gltf], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);

            // Trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'scene.glb';
            link.click();
            URL.revokeObjectURL(url);
          },
          (error) => console.error('An error occurred while exporting the scene', error),
          { binary: true } // Export as .glb
        );
  };

  return (
    <button
      onClick={handleExport}
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        background: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      Export Scene
    </button>
  );
}

export default ExportScene;