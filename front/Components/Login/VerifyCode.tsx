"use client";
import {useState} from 'react';
import classes from './VerifyCode.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const VerifyCode = ({username, password, setErrors, errors }) => {


    const router = useRouter();

    const [code , setCode] = useState("");
    const [error , setError] = useState("");


    const handleEntreCode = async () =>{
        console.log("username: " + username);
        console.log("password: " + password);
        

        try {
            const res = await axios.post("http://localhost:8000/api/auth/token/", {
              username,
              password,
              "otp_code": code,
            });
            localStorage.setItem("refresh", res.data.refresh);
            localStorage.setItem("access", res.data.access);
            router.push("/user/home");
          } catch (err) {
            console.log(err.response.data.otp_code[0]);
            setError(code + " " + err.response.data.otp_code[0]);
          } finally {
            
          }
    }

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window} onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
        <h2>Please entre the code in your authenticator app:</h2>
        <input onChange={(e) => setCode(e.target.value)}></input>
        {error && <span>{error} try an other one</span>}
        <div className={classes.buttonContainer}>
            <button disabled={code.length !== 6} className={classes.button} onClick={handleEntreCode}>Verify</button>
            <button className={classes.button} onClick={() => setErrors({ ...errors, password: "", otp_code: "" })}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;