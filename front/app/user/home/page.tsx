"use client"
import React, { useContext, useEffect, useState } from 'react'
import classes from "./home.module.css"
import PlayerInfos from '@/Components/PlayerInfos/PlayerInfos'
import WeeklyAttendance from '@/Components/weeklyAttendance/WeeklyAttendance'
import Rate from '@/Components/Rate/Rate'
import ProgressBar from '@/Components/ProgressBar/ProgressBar'
import Friends from '@/Components/Friends/Friends'
import { Achievements } from '@/Components/Achievements/Achievements'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/app/context/UserContext'
import loadMyData from '@/Components/LoadMyData'
const Home = () => {
  const {UserData, updateUserData, updateCurrentPage } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    updateCurrentPage("Home");

    const fetchData = async () => {
      if (!UserData.username)
          router.push("/login");
        else
          setLoaded(true);
    };

    fetchData();
  }, []);
  return loaded ?(
    <div className={classes.home}>
      <div className={classes.container}>
        <div className={classes.box1}><PlayerInfos/></div>
        <div className={classes.box2}><WeeklyAttendance/></div>
        <div className={classes.box3}><Rate/></div>
        <div className={classes.line}><ProgressBar/></div>
        <div className={classes.box4}><Friends/></div>
        <div className={classes.box5}><Achievements/></div>
        <div className={classes.box6}>lin6</div>
      </div>
    </div>
  ) : <div>loading</div>;
}

export default Home
