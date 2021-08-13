import React, { useState } from "react";
import axios from "axios";
import { addMobile } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import LoaderComponent from "./LoaderComponent";
import { changeIsLoading } from "../slices/userSlice";

export default function GetMobileNumber({ setIsOtpCreated }) {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    if (number.length < 10) setError("Please enter a valid mobile number");
    else {
      try {
        dispatch(changeIsLoading({ isLoading: true }));
        const response = await axios.get(
          `https://zetahacks.herokuapp.com/login?phonenumber=+91${number}&channel=sms`
        );
        // const data = await response.data;
        const data = response.data;
        if (data.status.toLowerCase() === "success") {
          dispatch(addMobile({ number }));
          setIsOtpCreated(true);
        } else setError(response.data.response.error);
        dispatch(changeIsLoading({ isLoading: false }));
        //const setIsVerified = await dispatch(addMobile({ mobile: number }));
      } catch (err) {
        console.log("err", err);
        dispatch(changeIsLoading({ isLoading: false }));
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length <= 10) {
      setNumber(e.target.value);
      setError("");
    }
  };
  return (
    <div className="start-page-inner-inner">
      <div>
        <h1 className="medium-heading">Enter mobile number</h1>
        <p className="small-text light-text">
          Please enter your mobile number to continue with the process
        </p>
      </div>
      <div className="input-div">
        <input
          className="input"
          value={number}
          onChange={handleChange}
          name="number"
          type="number"
          maxLength={10}
          placeholder="Mobile number"
          autoComplete="off"
        />
      </div>
      <button onClick={handleClick} className="btn big-btn">
        Get OTP
      </button>
      {error.length > 0 && <p className="error small-text">{error}</p>}
      {isLoading && <LoaderComponent />}
    </div>
  );
}

/*success
{
    "response": {
        "message": "OTP sent Successfully",
        "statusCode": 200,
        "status": "Success",
        "data": {},
        "error": null
    }
}
*/
/*failure
{
    "response": {
        "message": "OTP cannot be sent!",
        "statusCode": 500,
        "status": "Fail",
        "data": {},
        "error": {
            "status": 400,
            "code": 60200,
            "moreInfo": "https://www.twilio.com/docs/errors/60200"
        }
    }
}
*/
