"use client";
import * as React from 'react';
import classes from './Settings.module.css';
import ChangeImage from '@/Components/Settings/ChangeImage/ChangeImage';
import ChangeUsername from '@/Components/Settings/ChangeUsername/ChangeUsername';
import ChangeFirstname from '@/Components/Settings/ChangeFirstname/ChangeFirstname';
import ChangeLastname from '@/Components/Settings/ChangeLastname/ChangeLastname';
import ChangePassword from '@/Components/Settings/ChangePassword/ChangePassword'; // Fixed incorrect import
import { UserContext } from "@/app/context/UserContext";
import axios from 'axios';
import Image from 'next/image';
import ChangeTFA from '@/Components/Settings/ChangeTFA/ChangeTFA';
import loadMyData from '@/Components/LoadMyData';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/Components/Settings/ChangeImage/ImageUpload';

const Settings: React.FC = () => {

  const [currentPage, setCurrentPage] = React.useState("");
  const router = useRouter();
  const { UserData, updateUserData, updateCurrentPage } = React.useContext(UserContext);

  React.useEffect(() => {
    updateCurrentPage("Settings");
    const fetchData = async () => {
      if (!UserData.username) {
        const res = await loadMyData(localStorage.getItem("access"),localStorage.getItem("refresh"), updateUserData);
        if(res !== 0){
          router.push("/login");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.Settings}>
        <h1 className={classes.editProfileTitle}>Edit your profile</h1>
        <div className={classes.editContainer} onClick={() => setCurrentPage("avatar")}>
          <label className={classes.label} htmlFor="Avatar">Avatar:</label>
          <div className={classes.imageProvisoir} >
            <Image alt='Avatar' src={UserData.avatar} width={100} height={100} className={classes.image}></Image>
          </div>
          <button className={classes.editButton}>Edit</button>
        </div>
        <div className={classes.editContainer} onClick={() => setCurrentPage("username")}>
          {/* Username Input with Label */}
          <label className={classes.label} htmlFor="usernameInput">Username:</label>
          <input
            id="usernameInput"
            disabled={true}
            className={classes.inputProvisoir}
            value={UserData.username}
          />
          <button className={classes.editButton}>Edit</button>
        </div>

        <div className={classes.editContainer} onClick={() => setCurrentPage("password")}>
          {/* Password Input with Label */}
          <label className={classes.label} htmlFor="passwordInput">Password:</label>
          <input
            id="passwordInput"
            disabled={true}
            className={classes.inputProvisoir}
            value="******"
          />
          <button className={classes.editButton}>Edit</button>
        </div>

        <div className={classes.editContainer} onClick={() => setCurrentPage("firstname")}>
          <label className={classes.label} htmlFor="firstnameInput">First Name:</label>
          <input
            id="firstnameInput"
            disabled={true}
            className={classes.inputProvisoir}
            value={UserData.first_name ? UserData.first_name : "insert new firstname"}
          />
          <button className={classes.editButton}>Edit</button>
        </div>
        <div className={classes.editContainer} onClick={() => setCurrentPage("TFA")}>
          <label className={classes.label} htmlFor="TFA">TFA:</label>
          <input
            id="TFA"
            disabled={true}
            className={classes.inputProvisoir}
            value={`2FA now is ${UserData.TFA ? "ON" : "OFF"}`}
          />
          <button className={classes.editButton}>Edit</button>
        </div>

        <div className={classes.editContainer} onClick={() => setCurrentPage("lastname")}>
          {/* Last Name Input with Label */}
          <label className={classes.label} htmlFor="lastnameInput">Last Name:</label>
          <input
            id="lastnameInput"
            disabled={true}
            className={classes.inputProvisoir}
            value={UserData.last_name ? UserData.last_name : "insert new lastname"}
          />
          <button className={classes.editButton}>Edit</button>
        </div>
        {currentPage === "avatar" && <ImageUpload setCurrentPage={setCurrentPage}/>}
        {currentPage === "username" && <ChangeUsername setCurrentPage={setCurrentPage} />}
        {currentPage === "password" && <ChangePassword setCurrentPage={setCurrentPage} />}
        {currentPage === "firstname" && <ChangeFirstname setCurrentPage={setCurrentPage} />}
        {currentPage === "lastname" && <ChangeLastname setCurrentPage={setCurrentPage} />}
        {currentPage === "TFA" && <ChangeTFA setCurrentPage={setCurrentPage} />}
      </div>
    </div>
  );
};

export default Settings;
