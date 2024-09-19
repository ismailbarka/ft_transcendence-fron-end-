"use client";
import { useContext, useState, useEffect, useRef, ChangeEvent } from 'react';
import classes from './change.module.css';
import axios from 'axios';
import loadMyData from '@/Components/LoadMyData';
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';

interface ChangeFirstnameProps {
  setCurrentPage: (page: string) => void;
}

const ChangeFirstname: React.FC<ChangeFirstnameProps> = ({ setCurrentPage }) => {
  const [oldFirstName, setOldFirstName] = useState<string>("");
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [error, setError] = useState<string[]>([]);
  const router = useRouter();
  const { UserData, updateUserData } = useContext(UserContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!UserData.username) {
        const res = await loadMyData(localStorage.getItem("access") || "", localStorage.getItem("refresh") || "", updateUserData);
        if (res === 0) {
          router.push("/login");
        }
      }
      setOldFirstName(UserData.first_name);
    };

    fetchData();
  }, [UserData, updateUserData, router]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFirstName(e.target.value);
    setError([]);
  };

  const handleChangeFirstName = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/users/me/",
        {
          first_name: newFirstName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res.data);
      localStorage.setItem("first_name", newFirstName);
      updateUserData({ ...UserData, first_name: newFirstName });
      setCurrentPage("");
    } catch (err: any) {
      if (err.response && err.response.data.first_name) {
        setError(err.response.data.first_name);
      }
    }
  };

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window} onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log("test") }}>
        <div className={classes.element}>
          <label className={classes.label}>Old FirstName:</label>
          <input disabled={true} className={classes.input} value={oldFirstName} />
          <label className={classes.label}>New FirstName:</label>
          <input ref={inputRef} className={classes.input} value={newFirstName} onChange={handleInputChange} />
          {error.length > 0 && error.map((item, index) => <span className={classes.errors} key={index}>{item}</span>)}
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={handleChangeFirstName}>Update Infos</button>
            <button className={classes.button} onClick={() => setCurrentPage("")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeFirstname;
