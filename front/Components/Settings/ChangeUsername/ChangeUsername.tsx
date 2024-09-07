"use client";
import { useContext, useState, useEffect } from 'react';
import classes from './changeUsername.module.css';
import axios from 'axios';
import loadMyData from '@/Components/LoadMyData';
import { UserContext } from '@/app/context/UserContext';

const ChangeUsername = ({ setCurrentPage }) => {
  const [oldUsername, setOldUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState([]);

  const {UserData, updateUserData} = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!UserData.username) {
        await loadMyData(localStorage.getItem("access"), updateUserData);
      }
      setOldUsername(UserData.username);
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewUsername(e.target.value);
    setError([]);
  };


  const handleChangeUsername  = async() =>{
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/users/me/",
        {
          username: newUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res.data);
      updateUserData({...UserData, username: newUsername})
      setCurrentPage("");
    } catch (err) {
      setError(err.response.data.username);
    }
  }

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window} onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log("test") }}>
        <div className={classes.element}>
          <label className={classes.label}>old username:</label>
          <input disabled={true} className={classes.input} value={oldUsername} />
          <label className={classes.label}>new username:</label>
          <input className={classes.input} value={newUsername} onChange={handleInputChange} />
          {error.length > 0 && error.map((item, index) => <span className={classes.errors} key={index}>{item}</span>)}
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={handleChangeUsername}>Update Infos</button>
            <button className={classes.button} onClick={() => setCurrentPage("")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUsername;
