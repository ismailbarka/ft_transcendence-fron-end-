"use client";
import React, { useState } from 'react';
import classes from './page.module.css';
import playerSigningInImage from "../../public/image 1.png";
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';

// Define the validation schema using Zod
const schema = z.object({
  username: z.string()
    .min(6, { message: "Username must be at least 6 characters" })
    .max(10, { message: "Username must be at most 10 characters" }),
  email: z.string()
    .email({ message: "Invalid email address" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
    .min(6, { message: "Password must be at least 6 characters" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Define error type for better type checking
type Errors = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({ username: "", email: "", password: "", confirmPassword: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse({ username, email, password, confirmPassword });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        username: errorMessages.username ? errorMessages.username[0] : "",
        email: errorMessages.email ? errorMessages.email[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : "",
        confirmPassword: errorMessages.confirmPassword ? errorMessages.confirmPassword[0] : "",
      });
      return;
    }

    // Reset errors if validation is successful
    setErrors({ username: "", email: "", password: "", confirmPassword: "" });

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("ConfirmPassword:", confirmPassword);
  };

  const RenderField: React.FC<{ name: keyof Errors; value: string; setValue: React.Dispatch<React.SetStateAction<string>> }> = ({ name, value, setValue }) => (
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
      <div className={classes.signupInput}>
        <h1 className={classes.title}>Signup</h1>
        <h1 className={classes.desc}>Welcome to the Ping Pong World</h1>
        <p className={classes.welcomeMsg}>Welcome back! Please signup to your account.</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <RenderField name="username" value={username} setValue={setUsername} />
          <RenderField name="email" value={email} setValue={setEmail} />
          <RenderField name="password" value={password} setValue={setPassword} />
          <RenderField name="confirmPassword" value={confirmPassword} setValue={setConfirmPassword} />
          <button className={classes.button} type='submit'>Signup</button>
        </form>
        <p className={classes.welcomeMsg}>
          If you already have an account <Link href="/" className={classes.signUp}>Login</Link>
        </p>
      </div>
      <div className={classes.signupImage}>
        <Image src={playerSigningInImage} className={classes.PlayerSigningInStyle} alt="Player Signing In" />
      </div>
    </div>
  );
};

export default Signup;
