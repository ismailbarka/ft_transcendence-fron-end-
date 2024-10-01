"use client"
import React, { useEffect, useState } from 'react'
import classes from './ChatFriends.module.css'
import Image from 'next/image'
import search from "../../../public/chat/search.png"
import plus from "../../../public/chat/plus.png"
import minus from "../../../public/chat/minus.png"
import avatar from "../../../public/chat/avatar.png"
import axios from 'axios'

const FriendField = ({ userName, AvatarImg, lastMsg, isSelected, onClick }) => {
  return (
    <div 
      className={`${classes.item} ${isSelected ? classes.selectedItem : ''}`} 
      onClick={onClick}
    >
      <Image src={AvatarImg} alt='' className={classes.imageAvatar}/>
      <div className={classes.text}>
        <span className={classes.span}>{userName}</span>
        <p className={classes.message}>{lastMsg}</p>
      </div>
    </div>
  )
}

export const ChatFriends = ({userdata, onSelectFriend}) => {
  const [friends, setFriends] = useState([])
  const [addMode, setAddMode] = useState(false)
  const [selectedFriendId, setSelectedFriendId] = useState(null)
  
  useEffect(() => {
    const access = localStorage.getItem('access')
    axios.get('http://127.0.0.1:8000/api/relationships/friends_list/',{
      headers: {
        Authorization: `Bearer ${access}`
      }
    }
    )
      .then((response) => {
        setFriends(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleFriendClick = (userfriend) => {
    setSelectedFriendId(userfriend)
    onSelectFriend(userfriend)
  }

  return (
    <div className={classes.ChatFriends}>
      <div className={classes.search}>
        {/* ... search bar code ... */}
      </div>
      <div className={classes.friendsList}>
        {friends.map((friend, index) => {
          if (index < 10) {
            return (
              friend.userfriend.id!=userdata.UserData.id?<FriendField 
                key={friend.userfriend.id} 
                userName={friend.userfriend.username} 
                AvatarImg={friend.userfriend.avatar?friend.userfriend.avatar:avatar} 
                lastMsg={friend.userfriend.email}
                isSelected={selectedFriendId === friend.userfriend}
                onClick={() => handleFriendClick(friend.userfriend)}/>:
                <FriendField 
                key={friend.user1.id} 
                userName={friend.user1.username} 
                AvatarImg={friend.user1.avatar?friend.user1.avatar:avatar} 
                lastMsg={friend.user1.email}
                isSelected={selectedFriendId === friend.user1}
                onClick={() => handleFriendClick(friend.user1)}
                />
            )
          }
          return null;
        })}
      </div>
    </div>)
}