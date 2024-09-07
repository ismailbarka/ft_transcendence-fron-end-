"use client";
import React, { useContext, useEffect, useState, FormEvent, ChangeEvent } from 'react';
import classes from './page.module.css';
import playerSigningInImage from "../../public/image 1.png";
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UserContext } from '../context/UserContext';
import VerifyCode from '@/Components/Login/VerifyCode';

// Define the schema for validation using Zod
const schema = z.object({
  username: z.string(),
  password: z.string(),
});

// Define the shape of the error state
interface Errors {
  username: string;
  password: string;
  detail: string;
  otp_code: string;
}

// Define the component
const Login: React.FC = () => {
  const { updateUserData } = useContext(UserContext);
  const router = useRouter();
  
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    username: "",
    password: "",
    detail: "",
    otp_code: ""
  });

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      router.push("/user/home");
    } else {
      setLoaded(true);
    }
  }, [router]);

  const setUserInfos = async (access: string) => {
    try {
      const res = await axios.get("http://localhost:8000/api/users/me/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      updateUserData({
        id: res.data.id,
        username: res.data.username,
        avatar: res.data.avatar,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
      });
    } catch (err: any) {
      setErrors((prevErrors) => ({ ...prevErrors, ...err.response?.data }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ username: "", password: "", detail: "", otp_code: "" });
    setIsloading(true);

    const result = schema.safeParse({ username, password });
    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: errorMessages.username ? errorMessages.username[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : "",
      }));
      setIsloading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/auth/token/", {
        username,
        password,
      });
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("access", res.data.access);
      await setUserInfos(res.data.access);
      router.push("/user/home");
    } catch (err: any) {
      setErrors((prevErrors) => ({ ...prevErrors, ...err.response.data }));
      if (err.response.data.otp_code) {
        setErrors((prevErrors) => ({ ...prevErrors, otp_code: err.response.data.otp_code[0] }));
      }
    } finally {
      setIsloading(false);
    }
  };

  return loaded ? (
    <div className={classes.Container}>
      <div className={classes.loginInput}>
        <h1 className={classes.title}>Login</h1>
        <h1 className={classes.desc}>Welcome to the Ping Pong World</h1>
        <p className={classes.welcomeMsg}>Welcome back! Please login to your account.</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            disabled={isloading}
            className={errors.username ? classes.inputError : classes.input}
            placeholder="username"
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value); setErrors({ ...errors, username: "", otp_code: "" }); }}
          />
          {errors.username && <p className={classes.errorMsg}>{errors.username}</p>}
          <input
            disabled={isloading}
            className={errors.password ? classes.inputError : classes.input}
            placeholder="password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); setErrors({ ...errors, password: "", otp_code: "" }); }}
          />
          {errors.password && <p className={classes.errorMsg}>{errors.password}</p>}

          {errors.detail && <p className={classes.errorMsg}>{errors.detail}</p>}
          {errors.otp_code && <VerifyCode username={username} password={password} setErrors={setErrors} errors={errors} />}

          <button disabled={isloading} className={classes.button} type="submit">Login</button>
        </form>
        <p className={classes.welcomeMsg}>
          If you don't have an account <Link href="/signup" className={classes.signUp}>SignUp</Link>
        </p>
      </div>
      <div className={classes.loginImage}>
        <Image src={playerSigningInImage} className={classes.PlayerSigningInStyle} alt="Player Signing In" />
      </div>
    </div>
  ) : <div>Loading...</div>;
};

export default Login;
