"use client"
import React, { useEffect, useState } from 'react';
import classes from './navBar.module.css';
import Image from 'next/image';
import mainLogo from '../../public/Main Logo.svg';
import searchImage from '../../public/Search icon.svg';
import messagesImage from '../../public/Messages.svg';
import notificationsImage from '../../public/Notifications.svg';
import playerImage from '../../public/player.png'
import MessageNotif from './MessageNotif/MessageNotif';
import NotifNotif from './NotifNotif/NotifNotif';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/context/UserContext';
import { useContext } from "react";

const NavBar = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);  // State to control when the component is loaded
  const {UserData, updateUserData} = useContext(UserContext);

  useEffect(() => {
    console.log(UserData);
     
    const access = localStorage.getItem("access");
    if (!access) {
      router.push("/login");  // Redirect if access token is not available
    } else {
      setLoaded(true);  // Set loaded to true only if access token is present
    }
  }, [router]);

  const [msgOpen, setMsgOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  if (!loaded) {
    return null;  // Return nothing until the component is loaded
  }

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
          {msgOpen && <MessageNotif setMsgOpen={setMsgOpen}/>}
          <Image src={notificationsImage} alt='notifications' className={classes.img} onClick={() => setNotifOpen(!notifOpen)}/>
          {notifOpen && <NotifNotif setNotifOpen={setNotifOpen}/>}
        </div>
        <div className={classes.profile}>
          <Image src={UserData.avatar} alt='profile' className={classes.profileImage} width={100} height={100}/>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
