"use client"
import React, { useEffect, useState } from 'react';
import classes from './page.module.css';
import playerSigningInImage from "../../public/image 1.png";
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Define the validation schema using zod
const schema = z.object({
  username: z.string().min(6, { message: "Username must be at least 6 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  first_name: z.string().min(6, { message: "First Name must be at least 6 characters" }),
  last_name: z.string().min(6, { message: "Last Name must be at least 6 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confermPassword: z.string().min(6, { message: "Password must be at least 6 characters" })
}).refine((data) => data.password === data.confermPassword, {
  message: "Passwords do not match",
  path: ["confermPassword"],
});

const Signup = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      router.push("/user/home");
    } else {
      setLoaded(true);  // Ensure page is loaded only if access token is not present
    }
  }, [router]);

  const [isloading, setIsloading] = useState(false);
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confermPassword, setConfermPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", email: "", password: "", confermPassword: "", first_name: "", last_name: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const result = schema.safeParse({ username, email, password, confermPassword, first_name, last_name });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        username: errorMessages.username ? errorMessages.username[0] : "",
        first_name: errorMessages.first_name ? errorMessages.first_name[0] : "",
        last_name: errorMessages.last_name ? errorMessages.last_name[0] : "",
        email: errorMessages.email ? errorMessages.email[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : "",
        confermPassword: errorMessages.confermPassword ? errorMessages.confermPassword[0] : "",
      });
      setIsloading(false);  // Ensure loading state is reset after validation errors
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/users/", {
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "password": password,
        "avatar": "https://picsum.photos/1024/1024",
        "email": email
      });
      router.push("/login");
    } catch (err) {
      console.log(err.response.data);
      setErrors({ ...errors, ...err.response.data });
    } finally {
      setIsloading(false);
    }
  };

  return (
    loaded ? (
      <div className={classes.Container}>
        <div className={classes.SignupInput}>
          <h1 className={classes.title}>Signup</h1>
          <h1 className={classes.desc}>Welcome to the Ping Pong World</h1>
          <p className={classes.welcomeMsg}>Welcome back! Please Signup to your account.</p>
          <form className={classes.form} onSubmit={handleSubmit}>
            <>
              <input
                disabled={isloading}
                className={errors["username"] ? classes.inputError : classes.input}
                placeholder="Username"
                type="username"
                onChange={(e) => { setUsername(e.target.value); setErrors({ ...errors, "username": "" }); }}
              />
              <div className={classes.errorMsgContainer}>
                {errors["username"] && <p className={classes.errorMsg}>{errors["username"]}</p>}
              </div>
            </>
            <>
              <input
                disabled={isloading}
                className={errors["first_name"] ? classes.inputError : classes.input}
                placeholder="First Name"
                type="text"
                onChange={(e) => { setFirst_name(e.target.value); setErrors({ ...errors, "first_name": "" }); }}
              />
              <div className={classes.errorMsgContainer}>
                {errors["first_name"] && <p className={classes.errorMsg}>{errors["first_name"]}</p>}
              </div>
            </>
            <>
              <input
                disabled={isloading}
                className={errors["last_name"] ? classes.inputError : classes.input}
                placeholder="Last Name"
                type="text"
                onChange={(e) => { setLast_name(e.target.value); setErrors({ ...errors, "last_name": "" }); }}
              />
              <div className={classes.errorMsgContainer}>
                {errors["last_name"] && <p className={classes.errorMsg}>{errors["last_name"]}</p>}
              </div>
            </>
            <>
              <input
                disabled={isloading}
                className={errors["email"] ? classes.inputError : classes.input}
                placeholder="Email"
                type="email"
                onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, "email": "" }); }}
              />
              <div className={classes.errorMsgContainer}>
                {errors["email"] && <p className={classes.errorMsg}>{errors["email"]}</p>}
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
            <>
              <input
                disabled={isloading}
                className={errors["confermPassword"] ? classes.inputError : classes.input}
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => { setConfermPassword(e.target.value); setErrors({ ...errors, "confermPassword": "" }); }}
              />
              <div className={classes.errorMsgContainer}>
                {errors["confermPassword"] && <p className={classes.errorMsg}>{errors["confermPassword"]}</p>}
              </div>
            </>
            <button disabled={isloading} className={classes.button} type='submit'>Signup</button>
          </form>
          <p className={classes.signupP}>
            If you already have an account <Link href="/login" className={classes.signUp}>SignUp</Link>
          </p>
        </div>
        <div className={classes.SignupImage}>
          <Image src={playerSigningInImage} className={classes.PlayerSigningInStyle} alt="Player Signing In" />
        </div>
      </div>
    ) : <div>Loading...</div>
  );
}

export default Signup;
