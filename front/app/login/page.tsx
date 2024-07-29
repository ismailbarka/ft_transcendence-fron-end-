"use client"
import React, { useState } from 'react'
import classes from './page.module.css'
import playerSigningInImage from "../../public/image 1.png"
import Image from 'next/image'
import Link from 'next/link'
import { z } from 'zod'

// Define the validation schema using zod
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
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
  };

  const RenderField = ({ name, value, setValue }) => (
    <>
      <input
        className={errors[name] ? classes.inputError : classes.input}
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        type={name === "email" ? "email" : "text"}
        value={value}
        onChange={(e) => { setValue(e.target.value); setErrors({ ...errors, [name]: "" }); }}
      />
      <div className={classes.errorMsgContainer}>
        {errors[name] && <p className={classes.errorMsg}>{errors[name]}</p>}
      </div>
    </>
  );

  return (
    <div className={classes.Container}>
      <div className={classes.loginInput}>
        <h1 className={classes.title}>Login</h1>
        <h1 className={classes.desc}>Welcome to the Ping Pong World</h1>
        <p className={classes.welcomeMsg}>Welcome back! Please login to your account.</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <>
            <input
              className={errors["email"] ? classes.inputError : classes.input}
              placeholder="email"
              type="email"
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
