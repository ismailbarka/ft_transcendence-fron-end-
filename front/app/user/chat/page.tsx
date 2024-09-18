"use client"
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import classes from './chat.module.css'
import Image from 'next/image'
import searchImage from '../../../public/Search icon.svg'
import { ChatList } from '@/Components/ChatList/ChatList'
import { ChatField } from '@/Components/ChatField/ChatField'
import { ChatDetails } from '@/Components/ChatDetails/ChatDetails'
import { useRouter } from 'next/navigation'
import avatar from '../../../public/chat/avatar.png'

const Chat = () => {
  const router = useRouter();
  const [friend, onSelectFriendId] = useState(null);
  // usecontext to track the user's access token and 
          




  
  useEffect(() => {
    updateCurrentPage("Chat");
    const access = localStorage.getItem("access");
    if(!access)
      router.push("/login");
  }, []);
  return (
    <div className={classes.chat}>
      <div className={classes.ChatList}>
        <ChatList userName={"smail"} avatar={avatar} onSelectFriend={onSelectFriendId}/>
      </div>
      <div className={classes.ChatField}>
        <ChatField FriendId={friend}/>
      </div>
      <div className={classes.ChatDetails}>
        <ChatDetails FriendId={friend}/>
      </div>
    </div>
  )
}

export default Chat
