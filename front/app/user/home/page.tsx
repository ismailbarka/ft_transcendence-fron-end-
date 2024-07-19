import React from 'react'
import classes from "./home.module.css"
import PlayerInfos from '@/Components/PlayerInfos/PlayerInfos'
import WeeklyAttendance from '@/Components/weeklyAttendance/WeeklyAttendance'
import Rate from '@/Components/Rate/Rate'
import ProgressBar from '@/Components/ProgressBar/ProgressBar'
import Friends from '@/Components/Friends/Friends'
const Home = () => {
  return (
    <div className={classes.home}>

      <div className={classes.box1}><PlayerInfos/></div>
      <div className={classes.box2}><WeeklyAttendance/></div>
      <div className={classes.box3}><Rate/></div>
      <div className={classes.line}><ProgressBar/></div>
      <div className={classes.box4}><Friends/></div>
      <div className={classes.box5}>lin5</div>
      <div className={classes.box6}>lin6</div>
    </div>
  )
}

export default Home
