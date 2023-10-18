import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { Decal, useTexture } from '@react-three/drei';
import state from '../store';
import * as THREE from 'three'; // Import Three.js

const download = (url, name) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes } = useGLTF('/shirt_baked.glb');
  const [rotationY, setRotationY] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useEffect(() => {
    // Listen for messages from Customizer.js
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'captureShirtImage') {
        captureImage();
      }
    });

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('message', () => {});
    };
  }, []);

  useFrame((state, delta) => {
    if (isRotating) {
      const newRotationY = rotationY + (0.2 * Math.PI * delta);
      const isCompleteRotation = newRotationY >= Math.PI * 2;

      if (isCompleteRotation) {
        setRotationY(0);
        setIsRotating(false);
      } else {
        setRotationY(newRotationY);
      }
    }

    easing.dampC(nodes.T_Shirt_male.material.color, snap.color, 0.25, delta);
  });

  const handleShirtClick = () => {
    setIsRotating(!isRotating);
  };
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const context = canvas.getContext("2d");
  
    // Set the canvas size to match the renderer
    const width = 512;
    const height = 512;
    canvas.width = width;
    canvas.height = height;
  
    renderer.setSize(width, height);
  
    renderer.render(
      <group rotation={[0, rotationY, 0]}>
        {/* Add your mesh and decal components here */}
      </group>,
      camera
    );
  
    // Draw the rendered frame onto the canvas
    context.drawImage(renderer.domElement, 0, 0);
  
    // Convert the canvas content to a data URL
    const imageDataURL = canvas.toDataURL("image/png");
  
    // Download the image
    download(imageDataURL, "shirt_image.png");
  };

  return (
    <group rotation={[0, rotationY, 0]} onClick={handleShirtClick}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={nodes.T_Shirt_male.material}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
