import React, { useState, useEffect, useRef, useContext } from "react";
import "./PasswordResetPopup.css";
import httpClient from "../../services/httpClient";
import toast from "react-hot-toast";
import { UserContext } from "../../App";
import { lookInSession } from "../../common/session";

const PasswordResetPopup = ({ user, setPasswordResetUser }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const popupRef = useRef(null); // Ref for the popup container
  const otpRefs = useRef([]);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPasswordResetUser(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setPasswordResetUser]);

  // Handle OTP input change
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus the next input
      if (index < otp.length - 1 && value !== "") {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  // Handle focus on previous input when backspace is pressed
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSendOtp = () => {
    httpClient
      .post("admin/send-otp", { email: user.email })
      .then(({ data }) => {
        if (data.success) {
          toast.success("OTP sent successfully");
          setOtpSent(true);
          setResendTimer(120); // 2 minutes cooldown
        } else {
          toast.error("Failed to send OTP");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const handleSave = () => {
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    httpClient
      .post("admin/reset-password", {
        username: user.username,
        otp: otp.join(""),
        password,
      })
      .then(({ data }) => {
        if (data.success) {
          toast.success("Password reset successfully");
          setPasswordResetUser(null);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  // Timer logic for resend button
  useEffect(() => {
    let timer;
    if (otpSent && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setOtpSent(false);
    }
    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="overlay">
      <div className="password-reset-popup" ref={popupRef}>
        <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
        <p className="mb-4">An OTP will be send to your email.</p>
        <div className="otp-inputs mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              className="otp-input"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              ref={(el) => (otpRefs.current[index] = el)}
            />
          ))}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password" className="block mb-2">
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-input"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div className="form-actions flex justify-between">
          <button
            type="button"
            className="cancel-button"
            onClick={() => setPasswordResetUser(null)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="send-otp-button"
            onClick={handleSendOtp}
            disabled={otpSent && resendTimer > 0}
          >
            {otpSent ? `Resend OTP (${formatTime(resendTimer)})` : "Send OTP"}
          </button>
          <button type="button" className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPopup;
