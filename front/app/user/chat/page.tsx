"use client"
import React, { useContext, useEffect } from 'react'
import classes from './chat.module.css'
import Image from 'next/image'
import searchImage from '../../../public/Search icon.svg'
import { ChatList } from '@/Components/chatList/ChatList'
import { ChatField } from '@/Components/ChatField/ChatField'
import { ChatDetails } from '@/Components/ChatDetails/ChatDetails'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/app/context/UserContext'



const Chat = () => {
  const { updateCurrentPage } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    updateCurrentPage("Chat");
    const access = localStorage.getItem("access");
    if(!access)
      router.push("/login");
  }, []);
  return (
    <div className={classes.chat}>
      <div className={classes.ChatList}>
        <ChatList />
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
