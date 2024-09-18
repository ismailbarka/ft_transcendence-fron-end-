import React from 'react'
import classes from './chatDetails.module.css'
import arrowUp from '../../public/chat/arrowUp.png'
import arrowDown from '../../public/chat/arrowDown.png'
import avatar from '../../public/chat/avatar.png'
import download from '../../public/chat/download.png'
import Image from 'next/image'

export const ChatDetails = ({FriendId}) => {
  return (
    <div className={classes.ChatDetails}>
      <div className={classes.users}>
        <Image alt='' src={avatar} className={classes.userPhoto} />
        <h2 className={classes.name}>ismail barka</h2>
        <p className={classes.desc}>Lorem ipsum dolor sit</p>
      </div>
      <div className={classes.info}>
        <div className={classes.option}>
          <div className={classes.title}>
            <span>Privacy & help</span>
            <Image alt='' src={arrowUp} className={classes.image}/>
          </div>
        </div>
        <div className={classes.option}>
          <div className={classes.title}>
            <span>Shared photos</span>
            <Image alt='' src={arrowDown} className={classes.image}/>
          </div>
          <div className={classes.photos}>
            <div className={classes.photoItem}>
              <div className={classes.photoDetail}>
                <Image alt='' src={avatar} className={classes.avatarImagee} />
                <span className={classes.photoName}>photo_20123.png</span>
              </div>
              <Image alt='' src={download} className={classes.DownloadPng} />
            </div>
            <div className={classes.photoItem}>
              <div className={classes.photoDetail}>
                <Image alt='' src={avatar} className={classes.avatarImagee} />
                <span className={classes.photoName}>photo_20123.png</span>
              </div>
              <Image alt='' src={download} className={classes.DownloadPng} />
            </div>
            <div className={classes.photoItem}>
              <div className={classes.photoDetail}>
                <Image alt='' src={avatar} className={classes.avatarImagee} />
                <span className={classes.photoName}>photo_20123.png</span>
              </div>
              <Image alt='' src={download} className={classes.DownloadPng} />
            </div>
            <div className={classes.photoItem}>
              <div className={classes.photoDetail}>
                <Image alt='' src={avatar} className={classes.avatarImagee} />
                <span className={classes.photoName}>photo_20123.png</span>
              </div>
              <Image alt='' src={download} className={classes.DownloadPng} />
            </div>
            <div className={classes.photoItem}>
              <div className={classes.photoDetail}>
                <Image alt='' src={avatar} className={classes.avatarImagee} />
                <span className={classes.photoName}>photo_20123.png</span>
              </div>
              <Image alt='' src={download} className={classes.DownloadPng} />
            </div>
            <div className={classes.photoItem}>
              <div className={classes.photoDetail}>
                <Image alt='' src={avatar} className={classes.avatarImagee} />
                <span className={classes.photoName}>photo_20123.png</span>
              </div>
              <Image alt='' src={download} className={classes.DownloadPng} />
            </div>
            <div className={classes.photoItem}>
              <div className={classes.photoDetail}>
                <Image alt='' src={avatar} className={classes.avatarImagee} />
                <span className={classes.photoName}>photo_20123.png</span>
              </div>
              <Image alt='' src={download} className={classes.DownloadPng} />
            </div>
            <div className={classes.photoItem}>
              <div className={classes.photoDetail}>
                <Image alt='' src={avatar} className={classes.avatarImagee} />
                <span className={classes.photoName}>photo_20123.png</span>
              </div>
              <Image alt='' src={download} className={classes.DownloadPng} />
            </div>
          </div>
        </div>
        <div className={classes.option}>
          <div className={classes.title}>
            <span>Shared files</span>
            <Image alt='' src={arrowUp} className={classes.image}/>
          </div>
        </div>
        <button className={classes.blockButton}>block user</button>
      </div>
    </div>
  )
}
