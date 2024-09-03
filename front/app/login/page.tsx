"use client"
import React, { useContext, useEffect, useState } from 'react';
import classes from './page.module.css';
import playerSigningInImage from "../../public/image 1.png";
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UserContext } from '../context/UserContext';

const schema = z.object({
  username: z.string(),
  password: z.string()
});

const Login = () => {

  // const {updateUserData} = useContext(UserContext);

  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "", detail: "" });

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      router.push("/user/home");
    } else {
      setLoaded(true);
    }
  }, [router]);

  const setUserInfos = async (access) =>{
    try {
      const res = await axios.post("http://localhost:8000/api/users/me", {
      
      });
      console.log(res);
    } catch (err) {
      setErrors({ ...errors, ...err.response.data });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ username: "", password: "", detail: "" });
    setIsloading(true);
    const result = schema.safeParse({ username, password });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        username: errorMessages.username ? errorMessages.username[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : "",
        detail: errors.detail
      });
      setIsloading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/auth/token/", {
        username: username,
        password: password
      });
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("access", res.data.access);
      setUserInfos(res.data.access)
      router.push("/user/home");
    } catch (err) {
      setErrors({ ...errors, ...err.response.data });
    } finally {
      setIsloading(false);
    }
  };

  return (
    loaded ? (
      <div className={classes.Container}>
        <div className={classes.loginInput}>
          <h1 className={classes.title}>Login</h1>
          <h1 className={classes.desc}>Welcome to the Ping Pong World</h1>
          <p className={classes.welcomeMsg}>Welcome back! Please login to your account.</p>
          <form className={classes.form} onSubmit={handleSubmit}>
            <>
              <input
                disabled={isloading}
                className={errors["username"] ? classes.inputError : classes.input}
                placeholder="username"
                type="text"
                onChange={(e) => { setUsername(e.target.value); setErrors({ ...errors, "username": "" }); }}
              />
              <div className={classes.errorMsgContainer}>
                {errors["username"] && <p className={classes.errorMsg}>{errors["username"]}</p>}
              </div>
            </>
            <>
              <input
                disabled={isloading}
                className={errors["password"] ? classes.inputError : classes.input}
                placeholder="password"
                type="password"
                onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, "password": "" }); }}
              />
              <div className={classes.errorMsgContainer}>
                {errors["password"] && <p className={classes.errorMsg}>{errors["password"]}</p>}
              </div>
            </>
            <div className={classes.errorMsgContainer}>
              {errors["detail"] && <p className={classes.errorMsg}>{errors["detail"]}</p>}
            </div>
            <button disabled={isloading} className={classes.button} type='submit'>Login</button>
          </form>
          <p className={classes.welcomeMsg}>
            If you don't have an account <Link href="/signup" className={classes.signUp}>SignUp</Link>
          </p>
        </div>
        <div className={classes.loginImage}>
          <Image src={playerSigningInImage} className={classes.PlayerSigningInStyle} alt="Player Signing In" />
        </div>
      </div>
    ) : <div>Loading...</div>
  );
}

export default Login;
