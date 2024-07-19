"use client"
import React, { useState } from 'react'
import classes from "./friends.module.css"

const buttons: string[] = ["Online", "Request", "Blocked"];

const Friends = () => {

    const [clicked, setClicked] = useState("Online");
    const handleClick = (name:string) =>{
        console.log('====================================');
        setClicked(name)
        console.log(name);
        console.log('====================================');

    }
  return (
    <div className={classes.Friends}>
        <div className={classes.buttons}>
            {buttons.map((item, index) =>{
                return(
                    <button key={index} onClick={() => handleClick(item)} className={ clicked === item ? classes.buttonClicked : classes.button}>{item}</button>
                )
            })}        
        </div>
        <div>
            asd
        </div>
    </div>
  )
}

export default Friends
