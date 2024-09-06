import Image from "next/image";
import messagesImage from '../../../public/Messages.svg';
import classes from './NotifNotif.module.css'
import { useState } from "react";
import avatar from '../../../public/chat/avatar.png'

const NotifNotif = ({setNotifOpen}) => {

  return (
    <div className={classes.NotifNotif} onClick={() => setNotifOpen(false)}>
      <div className={classes.window} onClick={(e) => { e.preventDefault() ; e.stopPropagation(); console.log("test")}}>
        <div className={classes.element}>
          <Image alt="" src={avatar} className={classes.avatar}/>
          <div>
            <h2>title</h2>
            <p>this this the message</p>
            <p>12 min ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotifNotif;
