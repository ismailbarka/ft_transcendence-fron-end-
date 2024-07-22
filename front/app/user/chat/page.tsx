import React from 'react'
import classes from './chat.module.css'
import Image from 'next/image'
import searchImage from '../../../public/Search icon.svg'


const Chat = () => {
  return (
    <div className={classes.chat}>
        <div className={classes.searchAndFriends}>
          <h1 className={classes.title}>Messages</h1>
          <div className={classes.search}>
            <input placeholder="FIND NEW FRIENDS" className={classes.input} />
            <Image alt="search" className={classes.imageStyle} src={searchImage} width={20} height={20} />
          </div>
          <div className={classes.friendsList}></div>
        </div>
        <div className={classes.msgField}>sssssss</div>
    </div>
  )
}

export default Chat
