"use client";
import { useContext, useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import classes from './changeUsername.module.css';
import axios from 'axios';
import loadMyData from '@/Components/LoadMyData';
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';

// Define the props type
interface ChangeUsernameProps {
  setCurrentPage: (page: string) => void;
}

// Define the error type
type ErrorType = string[];

const ChangeUsername: React.FC<ChangeUsernameProps> = ({ setCurrentPage }) => {
  const [oldUsername, setOldUsername] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [error, setError] = useState<ErrorType>([]);
  const router = useRouter();
  const { UserData, updateUserData } = useContext(UserContext);
  const newUsernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!UserData.username) {
        const res = await loadMyData(localStorage.getItem("access") || "", localStorage.getItem("refresh") || "", updateUserData);
        if (res !== 0) router.push("/login");
      }
      setOldUsername(UserData.username);
    };

    fetchData();

    if (newUsernameInputRef.current) {
      newUsernameInputRef.current.focus();
    }
  }, [UserData.username, updateUserData, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
    setError([]);
  };

  const handleChangeUsername = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/users/me/",
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res.data);
      updateUserData({ ...UserData, username: newUsername });
      setCurrentPage("");
    } catch (err: any) {
      setError(err.response?.data?.username || []);
    }
  };

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
        <div className={classes.element}>
          <label className={classes.label}>Old Username:</label>
          <input disabled={true} className={classes.input} value={oldUsername} />
          <label className={classes.label}>New Username:</label>
          <input
            ref={newUsernameInputRef}
            className={classes.input}
            value={newUsername}
            onChange={handleInputChange}
          />
          {error.length > 0 && error.map((item, index) => (
            <span className={classes.errors} key={index}>{item}</span>
          ))}
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
