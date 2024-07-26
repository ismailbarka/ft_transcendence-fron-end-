import React from 'react'
import classes from './chat.module.css'
import Image from 'next/image'
import searchImage from '../../../public/Search icon.svg'
import { ChatList } from '@/Components/ChatList/ChatList'
import { ChatField } from '@/Components/ChatField/ChatField'
import { ChatDetails } from '@/Components/ChatDetails/ChatDetails'


const Chat = () => {
  return (
    <div className={classes.chat}>
      <ChatList />
      <ChatField />
      <ChatDetails />
    </div>
  )
}

export default Chat
