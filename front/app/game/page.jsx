import React from 'react'
import ThreeScene from './components/ThreeScene.jsx'
import './style/playerScore.css'
import Image from 'next/image.js'
import style from './game.module.css'
import { BsFillMicMuteFill } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";


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

function Body(){
  return(
    <div className={style.gameBody}>

    </div>
  )
}


function page() {
  return (
    <div className={style.gamePage}>
        <Head />
        <div className={style.gameBody}>
           <ThreeScene />
        </div>
      </div>
  )
}

export default page
