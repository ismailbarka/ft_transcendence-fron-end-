"use client"
import React, { useEffect } from 'react'
import classes from './chat.module.css'
import Image from 'next/image'
import searchImage from '../../../public/Search icon.svg'
import { ChatList } from '@/Components/chatList/ChatList'
import { ChatField } from '@/Components/ChatField/ChatField'
import { ChatDetails } from '@/Components/ChatDetails/ChatDetails'
import { useRouter } from 'next/navigation'
import avatar from '../../../public/chat/avatar.png'

const Chat = () => {
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if(!access)
      router.push("/login");
  }, []);
  return (
    <div className={classes.chat}>
      <div className={classes.ChatList}>
        <ChatList userName={"smail"} avatar={avatar}/>
      </div>
      <div className={classes.ChatField}>
        <ChatField />
      </div>
      <div className={classes.ChatDetails}>
        <ChatDetails />
      </div>
    </div>
  )
}

export default Chat
