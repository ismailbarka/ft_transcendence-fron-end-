"use client";
import { useContext, useState, useEffect } from 'react';
import classes from './change.module.css';
import loadMyData from '@/Components/LoadMyData';
import { UserContext } from '@/app/context/UserContext';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ChangeTFA = ({ setCurrentPage }) => {
  const { UserData, updateUserData } = useContext(UserContext);
  const [toggled, setToggled] = useState(false);
  const [otpUri, setOtpUri] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!UserData.last_name) {
        const res = await loadMyData(localStorage.getItem("access"),localStorage.getItem("refresh"), updateUserData);
        if(res !== 0)
          router.push("/login");
      }
    };

    fetchData();
  }, [UserData.last_name, updateUserData]);

  const enableTFA = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/enable-2fa/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setOtpUri(res.data.otp_uri);
      updateUserData({ ...UserData, TFA: true });
    } catch (err) {
      console.error("Error enabling TFA:", err.response?.data || err.message);
    }
  };

  const handleClickONOFFButton = () => {
    if (!toggled) {
      enableTFA();
    }
    setToggled(!toggled);
  };

  const handleDoneButton = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/activate-2fa/",
        { otp_code: code },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            'Content-Type': 'application/json',
          },
        }
      );
      updateUserData({ ...UserData, TFA: true });
      setCurrentPage("");
    } catch (err) {
      console.error("Error activating TFA:", err.response?.data || err.message);
      setError(err.response?.data?.non_field_errors[0] || "An error occurred");
    }
  };

  return (
    <div className={classes.NotifNotif}>
      <div className={classes.window} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
        <div className={classes.element}>
          <button className={toggled ? classes.toggleON : classes.toggleOFF} onClick={handleClickONOFFButton}>
            <Image alt='' src="/dot.png" width={45} height={45} className={classes.togglePoint} />
          </button>
          <h2>{toggled ? "ON" : "OFF"}</h2>
          {otpUri && (
            <div className={classes.qrCode}>
              <QRCode value={otpUri} size={256} />
              <span>Please scan this QR code using an authenticator app like Microsoft Authenticator and enter the code:</span>
              <label htmlFor="otp-code" className={classes.label}>Enter OTP Code:</label>
              <input
                id="otp-code"
                className={classes.input}
                onChange={(e) => setCode(e.target.value)}
              />
              {error && <span className={classes.error}>{error}</span>}
            </div>
          )}
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={handleDoneButton}>Done</button>
            <button className={classes.button} onClick={() => setCurrentPage("")}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeTFA;
