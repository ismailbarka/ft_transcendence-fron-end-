import React from 'react'
import classes from './chat.module.css'
import Image from 'next/image'
import searchImage from '../../../public/Search icon.svg'
import { ChatList } from '@/Components/chatList/ChatList'
import { ChatField } from '@/Components/ChatField/ChatField'
import { ChatDetails } from '@/Components/ChatDetails/ChatDetails'


const Chat = () => {
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
