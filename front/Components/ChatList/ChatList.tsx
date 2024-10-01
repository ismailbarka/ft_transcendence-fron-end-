import React from 'react'
import { UserInfo } from './UserInfo/UserInfo'
import { ChatFriends } from './ChatFriends/ChatFriends'

export const ChatList = ({userdata, onSelectFriend}) => {
  return (
    <div>
      <UserInfo userName={userdata.UserData.username} Avatar={userdata.UserData.avatar?userdata.UserData.avatar:''}/>
      <ChatFriends userdata={userdata} onSelectFriend={onSelectFriend}/>
    </div>
  )
}
