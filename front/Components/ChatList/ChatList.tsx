import React from 'react'
import classes from './chatList.module.css'
import { UserInfo } from './UserInfo/UserInfo'
import { ChatFriends } from './ChatFriends/ChatFriends'

export const ChatList = ({userName, avatar}) => {
  return (
    <div className={classes.ChatList}>
      <UserInfo userName={userName} Avatar={avatar}/>
      <ChatFriends />
    </div>
  )
}
