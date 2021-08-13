import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeIsVerified, changeIsLoading } from "../slices/userSlice";
import LoaderComponent from "./LoaderComponent";
export default function OtpVerification({ setIsOtpCreated }) {
  //all states decleration
  const [otp1, setOtp1] = useState(null);
  const [otp2, setOtp2] = useState(null);
  const [otp3, setOtp3] = useState(null);
  const [otp4, setOtp4] = useState(null);
  const [inputDivClass, setInputDivClass] = useState("otp-input-div");
  const [error, setError] = useState("");

  //all refs decleartion
  const resend = useRef(null);
  const otp1ref = useRef(null);
  const otp2ref = useRef(null);
  const otp3ref = useRef(null);
  const otp4ref = useRef(null);
  const { number, isVerified, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.value.length <= 1) {
      if (e.target.value.length === 0) {
        if (e.target.name === "otp1") {
          setOtp1(e.target.value);
        } else if (e.target.name === "otp2") {
          setOtp2(e.target.value);
          otp1ref.current.focus();
        }
        if (e.target.name === "otp3") {
          setOtp3(e.target.value);
          otp2ref.current.focus();
        }
        if (e.target.name === "otp4") {
          setOtp4(e.target.value);
          otp3ref.current.focus();
        }
      } else {
        if (e.target.name === "otp1") {
          setOtp1(e.target.value);
          otp2ref.current.focus();
        } else if (e.target.name === "otp2") {
          setOtp2(e.target.value);
          otp3ref.current.focus();
        }
        if (e.target.name === "otp3") {
          setOtp3(e.target.value);
          otp4ref.current.focus();
        }
        if (e.target.name === "otp4") {
          setOtp4(e.target.value);
          otp1ref.current.focus();
        }
      }
    } else {
      if (e.target.name === "otp1") {
        otp2ref.current.focus();
      } else if (e.target.name === "otp2") {
        otp3ref.current.focus();
      }
      if (e.target.name === "otp3") {
        otp4ref.current.focus();
      }
      if (e.target.name === "otp4") {
        otp1ref.current.focus();
      }
    }
    setError("");
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otp = `${otp1}${otp2}${otp3}${otp4}`;
    if (otp.length < 4) setError("Please give complete OTP");
    else {
      //perform api call to validate otp
      // also check for invalid otp count
      try {
        dispatch(changeIsLoading({ isLoading: true }));
        const response = await axios.get(
          `https://zetahacks.herokuapp.com/verify?phonenumber=+91${number}&code=${otp}`
        );
        const data = await response.data;
        console.log("Line 89", response);
        if (data.status.toLowerCase() === "success") {
          dispatch(changeIsVerified({ isVerified: true }));
          if (data.data.is_Registered === false) {
            localStorage.setItem("token", data.data.resToken);
            history.push("/welcome-aboard");
          } else {
            console.log("Line 95", data.data.is_Registered);
            localStorage.setItem("token", data.data.resToken);
            history.push("/redirection");
          }
        } else {
          setError(data.message);
          setInputDivClass("otp-input-div shaken");
          setTimeout(() => {
            setInputDivClass("otp-input-div");
          }, 1500);
        }
        dispatch(changeIsLoading({ isLoading: true }));
      } catch (err) {
        console.log("err", err);
        dispatch(changeIsLoading({ isLoading: false }));
        setError("Something went wrong!");
      }
    }
  };
  useEffect(() => {
    otp1ref.current.focus();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      resend.current.style.display = "block";
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="start-page-inner-inner">
      <div>
        <h1 className="medium-heading">Verify OTP</h1>
        <p className="small-text light-text">
          Otp has been sent to your number{" "}
          {`${number.slice(0, 4)}****${number.slice(
            number.length - 2,
            number.length - 0
          )}`}
          , if this is not you{" "}
          <a href onClick={() => setIsOtpCreated(false)}>
            <span className="highlight-text">enter number again</span>
          </a>
        </p>
      </div>
      <div className={inputDivClass}>
        <input
          ref={otp1ref}
          className="input otp-input"
          value={otp1}
          onChange={handleChange}
          name="otp1"
          type="number"
          maxLength={2}
          autoComplete="off"
        />
        <input
          ref={otp2ref}
          className="input otp-input"
          value={otp2}
          onChange={handleChange}
          name="otp2"
          type="number"
          maxLength={1}
          autoComplete="off"
        />
        <input
          ref={otp3ref}
          className="input otp-input"
          value={otp3}
          onChange={handleChange}
          name="otp3"
          type="number"
          maxLength={4}
          autoComplete="off"
        />
        <input
          ref={otp4ref}
          className="input otp-input"
          value={otp4}
          onChange={handleChange}
          name="otp4"
          type="number"
          maxLength={4}
          autoComplete="off"
        />
        {/* <div className="edit-btn">
          <FaEdit />
        </div> */}
      </div>
      <div className="button-div">
        <button className="btn big-btn" onClick={handleVerifyOtp}>
          Verify
        </button>
        <a href>
          <p
            ref={resend}
            style={{ display: "none" }}
            className="highlight-text"
          >
            Resend OTP
          </p>
        </a>
      </div>
      {error.length > 0 && <p className="small-text error">{error}</p>}
      {isLoading && <LoaderComponent />}
    </div>
  );
}
