import React from 'react'
import classes from "./playerInfos.module.css"
import { UserContext } from '@/app/context/UserContext';
import { useContext } from "react";





const PlayerInfos = () => {
    const {UserData} = useContext(UserContext);

  return (
    <div className={classes.playerinfos}>
    <div className={classes.info}>
        <h2>Username:</h2>
        <h2>{UserData.username}</h2>
    </div>
    <div className={classes.info}>
        <h2>Fist Name:</h2>
        <h2>{UserData.first_name ? UserData.first_name : "empty"}</h2>
    </div>
    <div className={classes.info}>
        <h2>Last Name:</h2>
        <h2>{UserData.last_name ? UserData.last_name : "empty"}</h2>
    </div>
    <div className={classes.info}>
        <h2>Id:</h2>
        <h2>{UserData.id}</h2>
    </div>
    </div>
  )
}

export default PlayerInfos
