"use client";
import { useState } from 'react';
import classes from './VerifyCode.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface VerifyCodeProps {
  username: string;
  password: string;
  setErrors: React.Dispatch<React.SetStateAction<{ password: string; otp_code: string }>>;
  errors: { password: string; otp_code: string };
}

const VerifyCode: React.FC<VerifyCodeProps> = ({ username, password, setErrors, errors }) => {
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false); // New state for verification process

  const handleVerifyCode = async () => {
    setIsVerifying(true); // Disable button by setting state
    try {
      const res = await axios.post("http://localhost:8000/api/auth/token/", {
        username,
        password,
        otp_code: code,
      });
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("access", res.data.access);
      router.push("/user/home");
    } catch (err) {
      setError(err.response?.data?.otp_code?.[0] || "Code is not correct"); // Changed message
    } finally {
      setIsVerifying(false); // Re-enable button when done
    }
  };

  const handleCancel = () => {
    setErrors({ ...errors, password: "", otp_code: "" });
    setCode(""); // Clear code input if needed
    setError(""); // Clear error message
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={classes.title}>Please enter the code from your authenticator app:</h2>
        <input
          type="text"
          value={code}
          onChange={(e) => {setCode(e.target.value);setError("")}}
          className={classes.input}
          placeholder="Enter code"
          aria-label="OTP code input"
        />
        {error && <span className={classes.errorMsg}>{error}</span>}
        <div className={classes.buttonContainer}>
          <button
            className={classes.button}
            onClick={handleVerifyCode}
            disabled={isVerifying}
          >
            Verify
          </button>
          <button
            className={classes.button}
            onClick={handleCancel}
            disabled={isVerifying}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
