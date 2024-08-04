"use client"
import React, { useEffect, useState } from 'react'
import classes from './page.module.css'
import playerSigningInImage from "../../public/image 1.png"
import Image from 'next/image'
import Link from 'next/link'
import { z } from 'zod'
import axios from 'axios';
import { useRouter } from 'next/navigation'

// Define the validation schema using zod
const schema = z.object({
  email: z.string(),
  password: z.string()
});

const Login = () => {


  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        email: errorMessages.email ? errorMessages.email[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : "",
      });
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
    const infos = {
      "username": email,
      "password": password
    }
    axios.post("http://localhost:8000/api/auth/login/", {
      "username": email,
      "password": password
    }).then((res) => {
      console.log("res", res);
    }).catch(error => {
      console.log("error", error.message)
    })
  };

  const RenderField = ({ name, value, setValue }) => (
    <>
      <input
        className={errors[name] ? classes.inputError : classes.input}
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        type="text"
        value={value}
        onChange={(e) => { setValue(e.target.value); setErrors({ ...errors, [name]: "" }); }}
      />
      <div className={classes.errorMsgContainer}>
        {errors[name] && <p className={classes.errorMsg}>{errors[name]}</p>}
      </div>
    </>
  );
  const router = useRouter();

    // ()=> router.push("/test"); 


  return (

    <div className={classes.Container}>
      <button onClick={() =>console.log(document.cookie)}>test</button>
      <div className={classes.loginInput}>
        <h1 className={classes.title}>Login</h1>
        <h1 className={classes.desc}>Welcome to the Ping Pong World</h1>
        <p className={classes.welcomeMsg}>Welcome back! Please login to your account.</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <>
            <input
              className={errors["email"] ? classes.inputError : classes.input}
              placeholder="email"
              type="text"
              onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, "email": "" }); }}
            />
            <div className={classes.errorMsgContainer}>
              {errors["email"] && <p className={classes.errorMsg}>{errors["email"]}</p>}
            </div>
          </>
          <>
            <input
              className={errors["password"] ? classes.inputError : classes.input}
              placeholder="password"
              type="password"
              onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, "password": "" }); }}
            />
            <div className={classes.errorMsgContainer}>
              {errors["password"] && <p className={classes.errorMsg}>{errors["password"]}</p>}
            </div>
          </>
          <button className={classes.button} type='submit'>Login</button>
        </form>
        <p className={classes.welcomeMsg}>
          If you don't have an account <Link href="/" className={classes.signUp}>SignUp</Link>
        </p>
      </div>
      <div className={classes.loginImage}>
        <Image src={playerSigningInImage} className={classes.PlayerSigningInStyle} alt="Player Signing In" />
      </div>
    </div>
  )
}

export default Login
