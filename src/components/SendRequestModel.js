import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeIsLoading,
  changeTypeOfMessage,
  changeIsRefresh
} from "../slices/userSlice";

import LoadingComponent from "./LoaderComponent";
export default function SendRequestModel({ setVisibility }) {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const { isLoading, isRefresh } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleVisibility = (e) => {
    e.preventDefault();
    setVisibility(false);
  };
  const addSendRequest = async (e) => {
    e.preventDefault();
    if (number.length < 10) {
      console.log("Enter valid mobile number");
      dispatch(
        changeTypeOfMessage({
          typeOfMessage: "err",
          disMessage: "Enter valid mobile number"
        })
      );
    } else if (amount < 100 || amount === "") {
      console.log("Minimum request amount is ₹ 100");
      dispatch(
        changeTypeOfMessage({
          typeOfMessage: "err",
          disMessage: "Minimum request amount is ₹ 100"
        })
      );
    } else {
      try {
        dispatch(changeIsLoading({ isLoading: true }));
        const data = JSON.stringify({
          phoneNumber: ` 91${number}`,
          amount: amount
        });
        const config = {
          method: "post",
          url: "https://zetahacks.herokuapp.com/paymentrequest",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
          data: data
        };
        const response = await axios(config);
        const resData = response.data;
        if (resData.status.toLowerCase() === "success") {
          dispatch(
            changeTypeOfMessage({
              typeOfMessage: "success",
              disMessage: "Request sent successfully"
            })
          );
          dispatch(
            changeIsRefresh({
              isRefresh: !isRefresh
            })
          );
        } else {
          dispatch(
            changeTypeOfMessage({
              typeOfMessage: "err",
              disMessage: resData.data.message
            })
          );
        }
      } catch (err) {
        console.log(err);
        dispatch(
          changeTypeOfMessage({
            typeOfMessage: "err",
            disMessage: "Something went wrong"
          })
        );
      }
      dispatch(changeIsLoading({ isLoading: false }));
    }
  };
  return (
    <div className="mask-container">
      <div className="mask-inner-container">
        <div className="heading-container">
          <h2>Send a new request</h2>
          <p className="small-text">
            Enter the receiver's mobile number and amount to generate a request
          </p>
        </div>
        <div className="middle-div">
          <div className="add-input input-div">
            <input
              className="input"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              name="number"
              type="number"
              maxLength={10}
              placeholder="Enter mobile number"
              autoComplete="off"
            />
          </div>
          <div className="add-input input-div">
            <input
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              name="number"
              type="number"
              maxLength={10}
              placeholder="Enter amount"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="action-btn-div">
          <p className="action-btn cancel" onClick={handleVisibility}>
            Cancel
          </p>
          <p className="action-btn accept" onClick={addSendRequest}>
            Request
          </p>
        </div>
      </div>

      {isLoading && <LoadingComponent />}
    </div>
  );
}
