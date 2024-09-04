"use client"
import React, { useEffect, useRef, useState } from 'react'
import classes from './chatField.module.css'
import Image from 'next/image'
import avatar from '../../public/chat/avatar.png'
import phone from '../../public/chat/phone.png'
import video from '../../public/chat/video.png'
import info from '../../public/chat/info.png'
import emoji from '../../public/chat/emoji.png'
import mic from '../../public/chat/mic.png'
import camera from '../../public/chat/camera.png'
import img from '../../public/chat/img.png'
import EmojiPicker from 'emoji-picker-react'

export const ChatField = () => {

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");


  const endRef = useRef(null);

  useEffect(() =>{
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  },[])


  const handleEmoji = (e) =>{
    setText((prev) => prev + e.emoji);
    setOpen(false);
  }

  return (
    <div className={classes.ChatField}>
      <div className={classes.top}>
        <div className={classes.user}>
          <Image alt='' src={avatar} className={classes.img}/>
          <div className={classes.texts}>
            <span className={classes.span}>Ismail barka</span>
            <p className={classes.desc}>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className={classes.icons}>
          <Image alt='' src={info} className={classes.icon}></Image>
        </div>
      </div>
      <div className={classes.center}>
        <div className={classes.message}>
          <Image alt='' src={avatar} className={classes.messangerProfile}></Image>
          <div className={classes.texts}>
            <p className={classes.pa}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti cupiditate facere officia commodi sunt quaerat, minima at ducimus et quam odit ex est dolore dolorem, a ab aut. Debitis, neque!</p>
            <span className={classes.date}>1 min ago</span>
          </div>
        </div>
        <div className={classes.messageOwn}>
          <div className={classes.texts}>
            <p className={classes.pa}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti cupiditate facere officia commodi sunt quaerat, minima at ducimus et quam odit ex est dolore dolorem, a ab aut. Debitis, neque!</p>
            <span className={classes.date}>1 min ago</span>
          </div>
        </div>
        <div className={classes.message}>
          <Image alt='' src={avatar} className={classes.messangerProfile}></Image>
          <div className={classes.texts}>
            <p className={classes.pa}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti cupiditate facere officia commodi sunt quaerat, minima at ducimus et quam odit ex est dolore dolorem, a ab aut. Debitis, neque!</p>
            <span className={classes.date}>1 min ago</span>
          </div>
        </div>
        <div className={classes.messageOwn}>
          <div className={classes.texts}>
            <p className={classes.pa}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti cupiditate facere officia commodi sunt quaerat, minima at ducimus et quam odit ex est dolore dolorem, a ab aut. Debitis, neque!</p>
            <span className={classes.date}>1 min ago</span>
          </div>
        </div>
        <div className={classes.message}>
          <Image alt='' src={avatar} className={classes.messangerProfile}></Image>
          <div className={classes.texts}>
            <p className={classes.pa}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti cupiditate facere officia commodi sunt quaerat, minima at ducimus et quam odit ex est dolore dolorem, a ab aut. Debitis, neque!</p>
            <span className={classes.date}>1 min ago</span>
          </div>
        </div>
        <div className={classes.messageOwn}>
         <Image alt='' src={avatar} className={classes.imageMessage}></Image>
          <div className={classes.texts}>
            <p className={classes.pa}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti cupiditate facere officia commodi sunt quaerat, minima at ducimus et quam odit ex est dolore dolorem, a ab aut. Debitis, neque!</p>
            <span className={classes.date}>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>

      <div className={classes.bottom}>
        <input type='text' placeholder='type a message...' className={classes.msgInput} onChange={(e) => setText(e.target.value)} value={text}/>
        <div className={classes.emoji}>
          <Image alt='' src={emoji} className={classes.imagesButton} onClick={() => {setOpen(!open)}}></Image>
          <div className={classes.picker}>
            <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className={classes.sendButton}>Send</button>
      </div>
    </div>
  )
}
