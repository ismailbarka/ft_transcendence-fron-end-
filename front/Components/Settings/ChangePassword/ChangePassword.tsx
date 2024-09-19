"use client";
import { useContext, useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import classes from './change.module.css';
import axios from 'axios';
import loadMyData from '@/Components/LoadMyData';
import { UserContext } from '@/app/context/UserContext';

// Define the props type
interface ChangePasswordProps {
  setCurrentPage: (page: string) => void;
}

// Define the state and error types
type ErrorType = string[];

const ChangePassword: React.FC<ChangePasswordProps> = ({ setCurrentPage }) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<ErrorType>([]);
  const newPasswordInputRef = useRef<HTMLInputElement>(null);

  const { UserData, updateUserData } = useContext(UserContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setError([]);
  };

  useEffect(() => {
    if (newPasswordInputRef.current) {
      newPasswordInputRef.current.focus();
    }
  }, []);

  const handleChangePassword = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    } catch (err: any) {
      setError(err.response?.data?.password || []);
    }
  };

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window} onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log("test") }}>
        <div className={classes.element}>
          <label className={classes.label}>Old Password:</label>
          <input disabled={true} className={classes.input} value="******" />
          <label className={classes.label}>New Password:</label>
          <input ref={newPasswordInputRef} className={classes.input} value={newPassword} onChange={handleInputChange} />
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
