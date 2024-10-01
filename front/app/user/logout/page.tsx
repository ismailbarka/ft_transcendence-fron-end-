"use client";
import Link from 'next/link';
import classes from './Logout.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import loadMyData from '@/Components/LoadMyData';
import { UserContext } from '@/app/context/UserContext';
import {useWebSocket} from '@/app/context/socketContext';

const Logout: React.FC = () => {
  const router = useRouter();
  const { UserData, updateUserData,updateCurrentPage } = useContext(UserContext);
  const { disconnect, isconnected } = useWebSocket();

  useEffect(() => {
    updateCurrentPage("Logout");

    const fetchData = async () => {
      if (!UserData.username) {
        const res = await loadMyData(localStorage.getItem("access"),localStorage.getItem("refresh"), updateUserData);
        if(res !== 0)
          router.push("/login");
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/token/blacklist/", {
        refresh: localStorage.getItem("refresh"),
      });
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      isconneted?disconnect():null;
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      router.push("/login");
    }
  };

  return (
    <div className={classes.logout}>
      <h1>Logout?</h1>
      <div className={classes.yesOrNo}>
        <Link href="/user/home" className={classes.buttonNo}>No</Link>
        <Link href="#" onClick={handleLogout} className={classes.buttonYes}>Yes</Link>
      </div>
    </div>
  );
};

export default Logout;
