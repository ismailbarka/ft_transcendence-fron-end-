'use client'
import React, { useRef, useState, useEffect } from 'react';
import {Canvas,  useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three'
import { Html } from '@react-three/drei';

const planeH = 15;
const planeW = 10;

const SuperBall = ({ paddlePositions, onScoreUpdate }) => {
    const ballRef = useRef();
    const velocity = useRef(new THREE.Vector3(0, 0, 0));
    const radius = 0.2; // Ball radius
    const maxX = 5 - radius; // cho3a3 howa radius
    const maxZ = (planeH / 2) - radius;
    const winScore = 3;
    const [countdown, setCountdown] = useState(2);
    const [gameStarted, setGameStarted] = useState(false);
    const lastCollisionTime = useRef(0); //
    const COLLISION_COOLDOWN = 0.1; // seconds
    const [score, setScore] = useState({ player1: 0, player2: 0 });
    const [winner, setWinner] = useState(null);
    const getRandomStartAngle = () => {
      const randomQuadrant = Math.random() < 0.5 ? 0 : Math.PI;
      return randomQuadrant + Math.PI / 4 + Math.random() * Math.PI / 2;
    };
  
    const resetBall = () => {
      const angle = getRandomStartAngle();
      const speed = 10;
      velocity.current.set( speed,
        0,
        Math.sin(angle) * speed
      );
      if (ballRef.current) {
        ballRef.current.position.set(0, 0.2, 0);
      }
    };
  
    useEffect(() => {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 0 && !gameStarted) {
        setGameStarted(true);
        resetBall();
      }
    }, [countdown, gameStarted]);
  
    useFrame((state, delta) => {
      if (ballRef.current && gameStarted && !winner) {
        const PADDLE_DEPTH = 0.1; //lghold
        const PADDLE_HALF_WIDTH = 1;
        const ANGLE_SENSITIVITY = 3;
        const MIN_VELOCITY = 8;
        const MAX_VELOCITY = 15;
  
        let newX = ballRef.current.position.x + velocity.current.x * delta;
        let newZ = ballRef.current.position.z + velocity.current.z * delta;
  
        // Wall collisions
        if (Math.abs(newX) > maxX) {
          newX = Math.sign(newX) * maxX;
          velocity.current.x = -velocity.current.x;
        }
  
        const currentTime = state.clock.getElapsedTime();
  
        // Paddle collisions
        paddlePositions.forEach(paddlePos => {
          const movingTowardsPaddle = Math.sign(velocity.current.z) === Math.sign(paddlePos.z);
          if (movingTowardsPaddle &&
              Math.abs(newZ - paddlePos.z) < (PADDLE_DEPTH + radius) &&
              Math.abs(newX - paddlePos.x) < PADDLE_HALF_WIDTH &&
              currentTime - lastCollisionTime.current > COLLISION_COOLDOWN) {
            
            newZ = paddlePos.z - Math.sign(paddlePos.z) * (PADDLE_DEPTH + radius);
            velocity.current.z = -velocity.current.z;
            
            const paddleCenter = paddlePos.x;
            const ballOffset = newX - paddleCenter;
            const angleFactor = ballOffset / ANGLE_SENSITIVITY;
            velocity.current.x = angleFactor * Math.abs(velocity.current.z);
            
            const speed = new THREE.Vector3().copy(velocity.current).length();
            if (speed < MIN_VELOCITY) {
              velocity.current.normalize().multiplyScalar(MIN_VELOCITY);
            }
            if (speed > MAX_VELOCITY) {
              velocity.current.normalize().multiplyScalar(MAX_VELOCITY);
            }
  
            lastCollisionTime.current = currentTime;
          }
        });
        // End zone collisions
        if (Math.abs(newZ) > maxZ) {
          let newScore;
          if (newZ > maxZ) {
            newScore = { ...score, player1: score.player1 + 1 };
          } else {
            newScore = { ...score, player2: score.player2 + 1 };
          }
          setScore(newScore);
          
          // Check for winner
          if (newScore.player1 >= winScore) {
            setWinner('Player 1');
            newX = 0;
            newZ = 0;
          } else if (newScore.player2 >= winScore) {
            setWinner('Player 2');
            newX = 0;
            newZ = 0;
          } else {
            resetBall();
            newX = 0;
            newZ = 0;
          }
        }
  
        // Update position
        ballRef.current.position.set(newX, 0.2, newZ);
      }
    });
  
    useEffect(() => {
      onScoreUpdate(score);
    }, [score, onScoreUpdate]);
  
    return (
      <>
        <Sphere ref={ballRef} args={[radius, 32, 32]} position={[0, 0.2, 0]}>
          <meshPhysicalMaterial 
            color="white" 
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
        {countdown > 0 && (
          <Html center>
            <div style={{
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              {countdown}
            </div>
          </Html>
        )}

        {winner && (
          <Html center>
            <div style={{
              position: 'relative',
              maxWidth:'fit-content',
              display:'flex',
              width:'500px',
              justifyContent:'center',
              alignItems:'center',
              color: 'white',
              fontSize: '40px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              backgroundColor: 'rgba(0,0,0,0.9)',
              padding: '40px',
              borderRadius: '10px'
            }}>
              {winner} wins! <br/>
              score :
              {score.player1} : {score.player2}
  
            </div>
          </Html>
        )}
      </>
    );
  }

export default SuperBall;