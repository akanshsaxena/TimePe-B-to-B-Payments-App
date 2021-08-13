import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function WelcomeAboard() {
  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [typeOfDoc, setTypeOfDoc] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const { mobile, isVerified } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (mobile === "" || isVerified === false) {
      history.push("/");
    }
  }, []);

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setSelectedDate(e.target.value);
  };
  const handleChange = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "typeOfDoc") {
      setDocument(e.target.value);
      if (e.target.value !== "") {
        if (e.target.value === "aadhar") setTypeOfDoc("number");
        else if (e.target.value === "pan") setTypeOfDoc("text");
        setDocNumber("");
        setIsDisabled(false);
      }
    } else if (e.target.name === "document") {
      if (
        (e.target.value.length <= 12 && document === "aadhar") ||
        (e.target.value.length <= 10 && document === "pan")
      ) {
        setDocNumber(e.target.value);
      }
    }
    setError("");
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || selectedDate === "") {
      setError("All fields are mandatory");
    } else {
      try {
        const token = localStorage.getItem("token");
        console.log("Line 55", token);
        const data = JSON.stringify({
          name: name,
          dob: selectedDate
        });
        var config = {
          method: "post",
          url: "https://zetahacks.herokuapp.com/signup",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          data: data
        };

        const response = await axios(config);
        console.log(response);
        if (response.data.status.toLowerCase() === "success") history.push("/");
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      }
    }
  };
  return (
    <div className="details-container">
      <div className="details-inner-container flex-column">
        <div>
          <h1 className="heading">Welcome Aboard</h1>
          <p className="small-text light-text">
            To complete your registration, we would require a few details from
            your side
          </p>
        </div>
        <div className="input-div-container flex-column flex-height-big">
          <div className="input-div">
            <input
              className="input small-text"
              type="text"
              value={name}
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="off"
            />
          </div>
          <div className="input-div">
            <input
              className="input small-text"
              type="text"
              value={selectedDate}
              name="date"
              onChange={handleDateChange}
              placeholder="Choose your DOB"
              onFocus={(e) => (e.target.type = "date")}
            />
          </div>
          <div className="input-div">
            <select
              className="input small-text"
              value={document}
              name="typeOfDoc"
              onChange={handleChange}
            >
              <option value="" disabled={true}>
                Choose your Document
              </option>
              <option value="aadhar">Aadhar Card</option>
              <option value="pan">PAN card</option>
            </select>
          </div>
          <div className="input-div">
            <input
              disabled={isDisabled}
              className={
                isDisabled ? "input disabled small-text" : "input small-text"
              }
              type={typeOfDoc}
              value={docNumber}
              name="document"
              onChange={handleChange}
              placeholder="Enter document ID"
            />
          </div>
        </div>
        <button className="btn big-btn" onClick={handleDataSubmit}>
          Complete Sign Up
        </button>
      </div>
      {error.length > 0 && <p>{error}</p>}
    </div>
  );
}
