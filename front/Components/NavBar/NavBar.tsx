"use client"
import React, { useState } from 'react';
import classes from './navBar.module.css';
import Image from 'next/image';
import mainLogo from '../../public/Main Logo.svg';
import searchImage from '../../public/Search icon.svg';
import messagesImage from '../../public/Messages.svg';
import notificationsImage from '../../public/Notifications.svg';
import playerImage from '../../public/player.png'
import MessageNotif from './MessageNotif/MessageNotif';
import NotifNotif from './NotifNotif/NotifNotif';

const NavBar = () => {
  const [msgOpen, setMsgOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Image src={mainLogo} alt='logo' className={classes.logoImage}/>
        <h1 className={classes.title}>title</h1>
      </div>
      <div className={classes.search}>
        <input placeholder="FIND NEW FRIENDS" className={classes.input} />
        <Image alt="search" className={classes.imageStyle} src={searchImage} width={20} height={20} />
      </div>
      <div className={classes.profileAndIcons}>
        <div className={classes.icons}>  
          <Image src={messagesImage} alt='messages' className={classes.img} onClick={() => setMsgOpen(!msgOpen)}/>
          {
          msgOpen && <MessageNotif setMsgOpen={setMsgOpen}/>
          }
          <Image src={notificationsImage} alt='messages' className={classes.img} onClick={() => setNotifOpen(!notifOpen)}/>
          {
          notifOpen && <NotifNotif setNotifOpen={setNotifOpen}/>
          }
        </div>
        <div className={classes.profile}>
        <Image src={playerImage} alt='messages' className={classes.profileImage}/>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
