"use client"
import React, { use, useState } from 'react'
import { useEffect } from 'react'
import classes from './ChatFriends.module.css'
import Image from 'next/image'
import search from "../../../public/chat/search.png"
import plus from "../../../public/chat/plus.png"
import minus from "../../../public/chat/minus.png"
import avatar from "../../../public/chat/avatar.png"
import axios from 'axios'

const FriendField = ({userName, AvatarImg, lastMsg}) =>{
  return (  
    <div className={classes.item}>
      <Image src={AvatarImg} alt='' className={classes.imageAvatar}/>
        <div className={classes.text}>
          <span className={classes.span}>{userName}</span>
          <p className={classes.message}>{lastMsg}</p>
        </div>
    </div>
  )
}

export const ChatFriends = () => {
  const [friends, setFriends] = useState([])
  const [addMode, setAddMode] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then((response) => {
        setFriends(response.data)

      })
      .catch((error) => {
        console.log(error)
      })
  },[])
  console.log(friends)

  return (
    <div className={classes.ChatFriends}>
      <div className={classes.search}>
        <div className={classes.searchBar}>
          <Image src={search} alt='' width={20} height={20}/>
          <input type='text' placeholder='Search' className={classes.input} />
        </div>
        <Image alt='' src={ addMode ? plus: minus} className={classes.add} width={36} height={36} onClick={()=> setAddMode(!addMode)}/>
      </div>
    {/* map throw the friends and put them in the friend field 1 by 1 just 5 times*/}
    {friends.map((friend, index) => {
      if(index < 15){
        return <FriendField key={friend.id} userName={friend.username} AvatarImg={avatar} lastMsg="{friend.email}"/>
      }
    })}
    {/* if addMode is true show all the friends */}
    </div>
  )
  }
