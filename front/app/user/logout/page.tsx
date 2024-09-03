"use client"
import Link from 'next/link';
import classes from './Logout.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Logout: React.FC = () => {
  const router = useRouter();
  const handleLogout = async () =>{


    try {
      const res = await axios.post("http://localhost:8000/api/auth/token/blacklist/",{
        "refresh" : localStorage.getItem("refresh")
      })
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
    } catch (err) {
      console.log(err);
      
    }finally{
      router.push("/login");
    }
  }

  return (
    <div className={classes.logout}>
      <h1>logout ?</h1>
      <div className={classes.yesOrNo}>
        <Link href="/user/home" className={classes.buttonNo}>No</Link>
        <Link onClick={handleLogout} href="/login" className={classes.buttonYes}>Yes</Link>
      </div>
    </div>
  );
};

export default Logout;
