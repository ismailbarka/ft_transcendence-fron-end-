'use client'
import * as THREE from 'three';
import React, { useRef, useState, useEffect } from 'react';
import { Sphere, OrbitControls, useTexture } from '@react-three/drei';


const planeH = 15;
const planeW = 10;

//plane
const Plane = () => {
    const meshRef = React.useRef();
  const [insideTex, outsideTex] = useTexture([
    '/arena/black.jpg',
    '/arena/arena1.jpg'
  ])

  const materials = [
    new THREE.MeshStandardMaterial({map: outsideTex, side: THREE.BackSide}), // right
    new THREE.MeshStandardMaterial({map: outsideTex, side: THREE.BackSide}), // left
    new THREE.MeshStandardMaterial({transparent: true, opacity: 0, side: THREE.DoubleSide}), // top
    new THREE.MeshStandardMaterial({map: insideTex, side: THREE.BackSide}), // bottom
    new THREE.MeshStandardMaterial({map: outsideTex, side: THREE.BackSide}), // front
    new THREE.MeshStandardMaterial({map: outsideTex, side: THREE.BackSide})  // back
  ]

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[0, -5, 0]} intensity={1} /> {/* Add light inside the box */}
      <mesh ref={meshRef} material={materials}>
        <boxGeometry args={[planeW, 0, planeH]} /> {/* Increased height to 2 so the 2d plane becomes a box */}
      </mesh>
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(planeW, 0.5, planeH)]} />
        <lineBasicMaterial attach="material" color="#ff0" /> {/*change the color for the line segments of the box*/}
      </lineSegments>
    </group>
  );
};

export default Plane;