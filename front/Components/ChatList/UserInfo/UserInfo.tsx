import React from 'react'
import classes from './UserInfo.module.css'
import Image from 'next/image'

export const UserInfo = ({userName, Avatar}) => {
  return (
    <div className={classes.container}>
        <div className={classes.user}>
            <Image alt='' src={Avatar} width={50} height={50} className={classes.avatar}/>
            <h2 className={classes.userName}>{userName}</h2>
        </div>
    </div>
  )
}
