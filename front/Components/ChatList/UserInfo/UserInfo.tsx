import React from 'react'
import classes from './UserInfo.module.css'
import Image from 'next/image'

import more from '../../../public/chat/more.png'
import video from '../../../public/chat/video.png'
import edit from '../../../public/chat/edit.png'
import avatar from '../../../public/chat/avatar.png'


export const UserInfo = () => {
  return (
    <div className={classes.container}>
        <div className={classes.user}>
            <Image alt='' src={avatar} width={50} height={50} className={classes.avatar}/>
            <h2 className={classes.userName}>ismail barka</h2>
        </div>
        <div className={classes.icons}>
            <Image alt='' src={more} width={20} height={20} className={classes.img}/>
            <Image alt='' src={video} width={20} height={20} className={classes.img}/>
            <Image alt='' src={edit} width={20} height={20} className={classes.img}/>
        </div>
    </div>
  )
}
