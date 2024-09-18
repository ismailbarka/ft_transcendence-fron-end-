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

export const ChatFriends = ({onSelectFriend}) => {
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
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleFriendClick = (friendId) => {
    setSelectedFriendId(friendId)
    onSelectFriend(friendId)
  }

  return (
    <div className={classes.ChatFriends}>
      <div className={classes.search}>
        <div className={classes.searchBar}>
          <Image src={search} alt='' width={20} height={20}/>
          <input type='text' placeholder='Search' className={classes.input} />
        </div>
        <Image alt='' src={addMode ? plus : minus} className={classes.add} width={36} height={36} onClick={() => setAddMode(!addMode)}/>
      </div>
      {friends.map((friend, index) => {
        if (index < 15) {
          return (
            <FriendField 
              key={friend.user2.id} 
              userName={friend.user2.username} 
              AvatarImg={avatar} 
              lastMsg={friend.user2.email}
              isSelected={selectedFriendId === friend.id}
              onClick={() => handleFriendClick(friend.id)}
            />
          )
        }
        return null;
      })}
    </div>
  )
}