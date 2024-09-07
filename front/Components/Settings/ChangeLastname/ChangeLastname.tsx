"use client";
import { useContext, useState, useEffect } from 'react';
import classes from './change.module.css';
import axios from 'axios';
import loadMyData from '@/Components/LoadMyData';
import { UserContext } from '@/app/context/UserContext';

const ChangeLastname = ({setCurrentPage}) => {

  const [oldLastName, setOldLastName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [error, setError] = useState([]);

  const {UserData, updateUserData} = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!UserData.last_name) {
        await loadMyData(localStorage.getItem("access"), updateUserData);
      }
      setOldLastName(UserData.last_name);
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewLastName(e.target.value);
    setError([]);
  };


  const handleChangeLastName  = async() =>{
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/users/me/",
        {
          last_name: newLastName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res.data);
      updateUserData({...UserData, last_name: newLastName})
      setCurrentPage("");
    } catch (err) {
      setError(err.response.data.last_name);
    }
  }

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window} onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log("test") }}>
        <div className={classes.element}>
          <label className={classes.label}>Old LastName:</label>
          <input disabled={true} className={classes.input} value={oldLastName} />
          <label className={classes.label}>New LastName:</label>
          <input className={classes.input} value={newLastName} onChange={handleInputChange} />
          {error.length > 0 && error.map((item, index) => <span className={classes.errors} key={index}>{item}</span>)}
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={handleChangeLastName}>Update Infos</button>
            <button className={classes.button} onClick={() => setCurrentPage("")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeLastname;