'use client'
import React from 'react'
import ThreeScene from './components/ThreeScene.jsx'
import './style/playerScore.css'
import Image from 'next/image.js'
import style from './game.module.css'
import { useState, useEffect, useCallback } from 'react';



function PlayerInfo({source, playerName, playerScore, direction}) {
  return (
    <div className={direction ? 'player RightPlayer' : 'player LeftPlayer'} id="player">
        <Image
            src={source}
            width={70}
            height={70}
            className='avatar'
        />
        <h4 className="playerName" >{playerName}</h4>
        <h4 className="Score">{playerScore}</h4>
        <p className="info"> rank info</p>

    </div>
  )
}

// Moved Stats outside of the Canvas
const Stats = () => {
  const [fps, setFps] = useState(0);
  const [ping, setPing] = useState(0);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    const updateFps = () => {
      const time = performance.now();
      frames++;
      if (time >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (time - lastTime)));
        frames = 0;
        lastTime = time;
      }
      requestAnimationFrame(updateFps);
    };

    const updatePing = () => {
      const start = performance.now();
      fetch('/api/ping').then(() => {
        const end = performance.now();
        setPing(Math.round(end - start));
      });
    };

    updateFps();
    updatePing();
    const pingInterval = setInterval(updatePing, 5000);

    return () => {
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <div className={style.stats}>
      <div>FPS: {fps}</div>
      <div>Ping: {ping}ms</div>
    </div>
  );
};

 function Head() {
  return (
    <div className={style.gameHead}>
      {/* direction takes 0 /1 1:for right and 0:for left */}
      <PlayerInfo source="/avatars/1.jpeg" playerName="saad" playerScore={15} direction={1}/>
      <div className={style.scoreDisplay}></div>
      <PlayerInfo source="/avatars/2.jpeg" playerName="taha" playerScore={20} direction={0}/>
    </div>
  )
}


function page() {
  return (
    <div className={style.gamePage}>
        <Head />
        <div className={style.Body}>
          <ThreeScene />
        </div>
        <Stats />
      </div>
  )
}

export default page
