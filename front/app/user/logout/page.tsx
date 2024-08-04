"use client"
import Link from 'next/link';
import classes from './Logout.module.css'
import axios from 'axios';

const Logout: React.FC = () => {

  const handleLogout = () =>{
    axios.post("http://localhost:8000/api/auth/logout/").then((res) => {
      console.log("res", res);
    }).catch(error => {
      console.log("error", error.message)
    })
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
