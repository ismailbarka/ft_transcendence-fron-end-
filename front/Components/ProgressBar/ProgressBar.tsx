"use client"
import React from 'react'
import classes from './progressBar.module.css'
import { Container } from 'react-bootstrap';

const percentage:string = "15%";
const ProgressBar = () => {
  return (
    <div className={classes.container}>
        <div className={classes.progressBar} style={{width: `15%`}}></div>
        
        <div className={classes.textContainer}>
            <p className={classes.level}>level 3 - {percentage}</p>
        </div>
    </div>
  )
}

export default ProgressBar
