"use client";
import { useContext, useState, useEffect } from 'react';
import classes from './change.module.css';
import axios from 'axios';
import loadMyData from '@/Components/LoadMyData';
import { UserContext } from '@/app/context/UserContext';

const ChangePassword = ({ setCurrentPage }) => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState([]);

  const {UserData, updateUserData} = useContext(UserContext);

  const handleInputChange = (e) => {
    setNewPassword(e.target.value);
    setError([]);
  };


  const handleChangePassword  = async() =>{
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/users/me/",
        {
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setCurrentPage("");
    } catch (err) {
      setError(err.response.data.password);
    }
  }

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window} onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log("test") }}>
        <div className={classes.element}>
          <label className={classes.label}>Old Password:</label>
          <input disabled={true} className={classes.input} value="******" />
          <label className={classes.label}>New Password:</label>
          <input className={classes.input} value={newPassword} onChange={handleInputChange} />
          {error.length > 0 && error.map((item, index) => <span className={classes.errors} key={index}>{item}</span>)}
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={handleChangePassword}>Update Infos</button>
            <button className={classes.button} onClick={() => setCurrentPage("")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;