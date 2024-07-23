import React from 'react'
import classes from './chatList.module.css'
import { UserInfo } from './UserInfo/UserInfo'
import { ChatFriends } from './ChatFriends/ChatFriends'
export const ChatList = () => {
  return (
    <div className={classes.ChatList}>
      <UserInfo />
      <ChatFriends />
    </div>
  )
}
