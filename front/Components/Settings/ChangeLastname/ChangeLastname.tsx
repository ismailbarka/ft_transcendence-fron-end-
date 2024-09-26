"use client";
import { useContext, useState, useEffect, useRef } from 'react';
import classes from './change.module.css';
import axios from 'axios';
import loadMyData from '@/Components/LoadMyData';
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';

const ChangeLastname = ({ setCurrentPage }) => {
  const [oldLastName, setOldLastName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [error, setError] = useState([]);
  const router = useRouter();
  const { UserData, updateUserData } = useContext(UserContext);

  // Create a ref for the "New LastName" input
  const newLastNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!UserData.username) {
        const res = await loadMyData(localStorage.getItem("access"), localStorage.getItem("refresh"), updateUserData);
        if (res !== 0) router.push("/login");
      }
      setOldLastName(UserData.last_name);
    };

    fetchData();

    // Focus on the "New LastName" input when the component mounts
    if (newLastNameInputRef.current) {
      newLastNameInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    setNewLastName(e.target.value);
    setError([]);
  };

  const handleChangeLastName = async () => {
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
      updateUserData({ ...UserData, last_name: newLastName });
      setCurrentPage("");
    } catch (err) {
      setError(err.response.data.last_name);
    }
  };

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window} onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
        <form className={classes.element}>
          <label className={classes.label}>Old LastName:</label>
          <input disabled={true} className={classes.input} value={oldLastName} />
          <label className={classes.label}>New LastName:</label>
          {/* Attach the ref to the "New LastName" input */}
          <input
            ref={newLastNameInputRef}
            className={classes.input}
            value={newLastName}
            onChange={handleInputChange}
          />
          {error.length > 0 && error.map((item, index) => (
            <span className={classes.errors} key={index}>{item}</span>
          ))}
          <div className={classes.buttonContainer}>
            <button type='submit' className={classes.button} onClick={handleChangeLastName}>Update Infos</button>
            <button className={classes.button} onClick={() => setCurrentPage("")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeLastname;
