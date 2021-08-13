import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import randomcolor from "randomcolor";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addMobile,
  changeIsLoading,
  changeIsVerified
} from "../slices/userSlice";
import AddMoneyModel from "./AddMoneyModel";

export default function Header({ name }) {
  const [visibility, setVisibility] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.user);

  const addMoney = (e) => {
    e.preventDefault();
    setVisibility(true);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      dispatch(addMobile({ number: "" }));
      dispatch(changeIsVerified({ isVerified: false }));
      dispatch(changeIsLoading({ isLoading: false }));
      history.push("/redirection");
    } catch (err) {
      console.log(err);
      dispatch(changeIsLoading({ isLoading: false }));
    }
  };
  return (
    <header className="header">
      <div className="upper-div">
        <div>
          <div className="user-icon" style={{ background: randomcolor() }}>
            <p className="abbr" style={{ color: "white", fontSize: "1.1rem" }}>
              {name.charAt(0)}
            </p>
          </div>
          <h1
            style={{
              fontWeight: "normal",
              fontSize: "1.3rem",
              textAlign: "left"
            }}
          >
            Hello,{" "}
            <span style={{ fontWeight: "bold" }}>{name.split(" ")[0]}</span>
          </h1>
        </div>
        <div id="logout" onClick={handleLogout}>
          <AiOutlineLogout className="abbr" />
        </div>
      </div>
      <div className="view-balance">
        <div className="balance">
          <h2 className="highlight-text">₹ {balance}</h2>
          <p className="very-small-text light-text">Available balance</p>
        </div>
        <button className="add-fund-btn" onClick={addMoney}>
          + Add Funds
        </button>
      </div>
      {visibility && <AddMoneyModel setVisibility={setVisibility} />}
    </header>
  );
}
