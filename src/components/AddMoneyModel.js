import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeBalance,
  changeIsLoading,
  changeTypeOfMessage
} from "../slices/userSlice";
import Message from "./Message";
import LoadingComponent from "./LoaderComponent";

export default function AddMoneyModel({ setVisibility }) {
  const [amount, setAmount] = useState("");
  const { balance } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const handleVisibility = (e) => {
    e.preventDefault();
    setVisibility(false);
  };

  const addSuggestion = (e) => {
    e.preventDefault();
    setAmount(parseInt(e.target.innerText.split(" ")[1]));
  };
  const addMoney = async (e) => {
    e.preventDefault();
    if (amount < 100 || amount === "") {
      dispatch(
        changeTypeOfMessage({
          typeOfMessage: "err",
          disMessage: "Minimum amount is 100"
        })
      );
    } else {
      const data = JSON.stringify({
        money: amount
      });
      const config = {
        method: "post",
        url: "https://zetahacks.herokuapp.com/addmoney",
        data: data,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      };
      try {
        dispatch(changeIsLoading({ isLoading: true }));
        const response = await axios(config);
        const data = response.data;
        if (data.status.toLowerCase() === "success") {
          setVisibility(false);
          dispatch(
            changeTypeOfMessage({
              typeOfMessage: "success",
              disMessage: data.message
            })
          );
          dispatch(changeBalance({ balance: data.data.balance }));
        } else {
          dispatch(
            changeTypeOfMessage({
              typeOfMessage: "err",
              disMessage: data.message
            })
          );
        }
        dispatch(changeIsLoading({ isLoading: false }));
      } catch (err) {
        console.log(err);
        dispatch(changeIsLoading({ isLoading: false }));
        dispatch(
          changeTypeOfMessage({
            typeOfMessage: "err",
            disMessage: "Something went wrong"
          })
        );
      }
    }
  };
  return (
    <div className="mask-container">
      <div className="mask-inner-container">
        <div className="add-money-detail-div">
          <h2>Add Money to your account</h2>
          <p className="small-text">Available balance: {balance}</p>
        </div>
        <div className="add-input input-div">
          <input
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            name="number"
            type="number"
            maxLength={10}
            placeholder="Enter amount to add"
            autoComplete="off"
          />
        </div>
        <div className="suggestions">
          <p>Suggestions: </p>
          <div>
            <p className="suggestion" onClick={addSuggestion}>
              ₹ 500
            </p>
            <p className="suggestion" onClick={addSuggestion}>
              ₹ 1000
            </p>
            <p className="suggestion" onClick={addSuggestion}>
              ₹ 5000
            </p>
            <p className="suggestion" onClick={addSuggestion}>
              ₹ 10000
            </p>
          </div>
        </div>
        <div className="action-btn-div">
          <p className="action-btn cancel" onClick={handleVisibility}>
            Cancel
          </p>
          <p className="action-btn accept" onClick={addMoney}>
            Add Money
          </p>
        </div>
        {isLoading && <LoadingComponent />}
      </div>
    </div>
  );
}
