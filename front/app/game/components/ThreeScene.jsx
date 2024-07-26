'use client'
import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Plane from './plane.jsx'
import SuperBall from './SuperBall.jsx'

const planeH = 15;
const planeW = 10;

const Paddle = ({position}) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[2, 0.2, 0.2]} /> 
      <meshPhongMaterial color="red" />
    </mesh>
  );
};

const ResponsiveCamera = () => {
  const { viewport, camera } = useThree()

  useFrame(() => {
    camera.aspect = viewport.width / viewport.height
    camera.updateProjectionMatrix()
  })

  return null
}

const ThreeScene = () => {
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [paddle1Pos, setPaddle1Pos] = useState([0, 0, (planeH / 2 ) - 0.1]);
  const [paddle2Pos, setPaddle2Pos] = useState([0, 0, -(planeH / 2) + 0.1]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let paddle1Direction = 0;
    let paddle2Direction = 0;
  
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          paddle1Direction = -1;
          break;
        case 'ArrowRight':
          paddle1Direction = 1;
          break;
        case 'a':
          paddle2Direction = -1;
          break;
        case 'd':
          paddle2Direction = 1;
          break;
      }
    };
  
    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          paddle1Direction = 0;
          break;
        case 'a':
        case 'd':
          paddle2Direction = 0;
          break;
      }
    };
  
    const animate = () => {
      setPaddle1Pos(prev => [
        Math.max(Math.min(prev[0] + paddle1Direction * 0.5, 4), -4),
        prev[1],
        prev[2]
      ]);
      setPaddle2Pos(prev => [
        Math.max(Math.min(prev[0] + paddle2Direction * 0.5, 4), -4),
        prev[1],
        prev[2]
      ]);
      requestAnimationFrame(animate);
    };
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    animate();
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  const canvasStyle = {
    width: '100%',
    height: '100%',
    minWidth: '300px',
    minHeight: '300px',
    maxWidth: '1000px',
    maxHeight: '1000px',
    margin: '0 auto',
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }}>
      <div style={canvasStyle}>
        <Canvas camera={{ position: [10, 10, 0], fov: 90 }}>
          <ResponsiveCamera />
          <OrbitControls
            enableZoom={false}
            minAzimuthAngle={Math.PI /2}
            minPolarAngle={Math.PI / 6} 
            maxPolarAngle={Math.PI / 6} 
          />
          <ambientLight intensity={0.4} />
          <Plane />
          <SuperBall
            paddlePositions={[
              {x: paddle1Pos[0], y: paddle1Pos[1], z: paddle1Pos[2]},
              {x: paddle2Pos[0], y: paddle2Pos[1], z: paddle2Pos[2]}
            ]}
            onScoreUpdate={handleScoreUpdate}
          />
          <Paddle position={paddle1Pos} />
          <Paddle position={paddle2Pos} />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeScene;