"use client"
import React, { useState } from 'react'
import classes from './ChatFriends.module.css'
import Image from 'next/image'
import search from "../../../public/chat/search.png"
import plus from "../../../public/chat/plus.png"
import minus from "../../../public/chat/minus.png"
import avatar from "../../../public/chat/avatar.png"

export const ChatFriends = () => {
  
  const [addMode, setAddMode] = useState(false)
  return (
    <div className={classes.ChatFriends}>
      <div className={classes.search}>
        <div className={classes.searchBar}>
          <Image src={search} alt='' width={20} height={20}/>
          <input type='text' placeholder='Search' className={classes.input} />
        </div>
        <Image alt='' src={ addMode ? plus: minus} className={classes.add} width={36} height={36} onClick={()=> setAddMode(!addMode)}/>
      </div>
      <div className={classes.item}>
        <Image src={avatar} alt='' className={classes.imageAvatar}/>
        <div className={classes.text}>
          <span className={classes.span}>ismail barka</span>
          <p className={classes.message}>hello</p>
        </div>
      </div>
      <div className={classes.item}>
        <Image src={avatar} alt='' className={classes.imageAvatar}/>
        <div className={classes.text}>
          <span className={classes.span}>ismail barka</span>
          <p className={classes.message}>hello</p>
        </div>
      </div>
      <div className={classes.item}>
        <Image src={avatar} alt='' className={classes.imageAvatar}/>
        <div className={classes.text}>
          <span className={classes.span}>ismail barka</span>
          <p className={classes.message}>hello</p>
        </div>
      </div>
      <div className={classes.item}>
        <Image src={avatar} alt='' className={classes.imageAvatar}/>
        <div className={classes.text}>
          <span className={classes.span}>ismail barka</span>
          <p className={classes.message}>hello</p>
        </div>
      </div>
      <div className={classes.item}>
        <Image src={avatar} alt='' className={classes.imageAvatar}/>
        <div className={classes.text}>
          <span className={classes.span}>ismail barka</span>
          <p className={classes.message}>hello</p>
        </div>
      </div>
    </div>
  )
}
