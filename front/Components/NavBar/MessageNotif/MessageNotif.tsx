import Image from "next/image";
import messagesImage from '../../../public/Messages.svg';
import classes from './messageNotif.module.css'
import { useState } from "react";
import avatar from '../../../public/chat/avatar.png'

const MessageNotif = ({setMsgOpen}) => {

  return (
    <div className={classes.MessageNotif} onClick={() => setMsgOpen(false)}>
      <div className={classes.window} onClick={(e) => { e.preventDefault() ; e.stopPropagation();}}>
        <div className={classes.element}>
          <Image alt="" src={avatar} className={classes.avatar}/>
          <div>
            <h2>title</h2>
            <p>this this the message</p>
            <p>12 min ago</p>
          </div>
        </div>
        <div className={classes.element}>
          <Image alt="" src={avatar} className={classes.avatar}/>
          <div>
            <h2>title</h2>
            <p>this this the message</p>
            <p>12 min ago</p>
          </div>
        </div>
        <div className={classes.element}>
          <Image alt="" src={avatar} className={classes.avatar}/>
          <div>
            <h2>title</h2>
            <p>this this the message</p>
            <p>12 min ago</p>
          </div>
        </div>
        <div className={classes.element}>
          <Image alt="" src={avatar} className={classes.avatar}/>
          <div>
            <h2>title</h2>
            <p>this this the message</p>
            <p>1 min ago</p>
          </div>
        </div>
        <div className={classes.element}>
          <Image alt="" src={avatar} className={classes.avatar}/>
          <div>
            <h2>title</h2>
            <p>this this the message</p>
            <p>1 min ago</p>
          </div>
        </div>
        <div className={classes.element}>
          <Image alt="" src={avatar} className={classes.avatar}/>
          <div>
            <h2>title</h2>
            <p>this this the message</p>
            <p>1 min ago</p>
          </div>
        </div>
        <div className={classes.element}>
          <Image alt="" src={avatar} className={classes.avatar}/>
          <div>
            <h2>title</h2>
            <p>this this the message</p>
            <p>1 min ago</p>
          </div>
        </div>
        <div className={classes.element}>
          <Image alt="" src={avatar} className={classes.avatar}/>
          <div>
            <h2>title</h2>
            <p>this this the message</p>
            <p>1 min ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageNotif;
