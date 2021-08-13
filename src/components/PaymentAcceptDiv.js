import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "./LoaderComponent";
import {
  changeIsLoading,
  changeBalance,
  changeTypeOfMessage,
  changeIsRefresh
} from "../slices/userSlice";
import axios from "axios";

export default function PaymentAcceptDiv({ request, setVisibility }) {
  const { isLoading, isRefresh } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleVisibility = (e) => {
    e.preventDefault();
    setVisibility(false);
  };

  const acceptReceivedRequest = async (e) => {
    e.preventDefault();
    try {
      dispatch(changeIsLoading({ isLoading: true }));
      const data = JSON.stringify({ paymentId: request.payment_id });
      const config = {
        method: "post",
        url: "https://zetahacks.herokuapp.com/sendmoney",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        data: data
      };
      const response = await axios(config);
      const resData = response.data;
      if (resData.status.toLowerCase() === "success") {
        dispatch(changeBalance({ balance: resData.data.balance }));
        // getRequests();
        dispatch(
          changeTypeOfMessage({
            typeOfMessage: "success",
            disMessage: resData.message
          })
        );
        dispatch(
          changeIsRefresh({
            isRefresh: !isRefresh
          })
        );
        setVisibility(false);
      } else {
        console.log(resData.message);
        dispatch(
          changeTypeOfMessage({
            typeOfMessage: "err",
            disMessage: resData.message
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
  };
  return (
    <div className="mask-container">
      <div className="payment-mask-inner">
        <div className="payment-heading">
          <h2>Approve payment request</h2>
          <p className="small-text">
            Post request approval, the amount will be deducted from your
            available balance
          </p>
        </div>
        <div className="payment-details">
          <div className="detail">
            <p className="key">Requested By: </p>
            <p className="value">{request.user_name}</p>
          </div>
          <div className="detail">
            <p className="key">Requested On: </p>
            <p className="value">
              {moment(request.created_at).format("MMM Do YY")}
            </p>
          </div>
          <div className="detail">
            <p className="key">Amount: </p>
            <p className="value">₹ {Math.floor(request.amount)}</p>
          </div>
        </div>
        <div className="action-btn-div">
          <p className="action-btn cancel" onClick={handleVisibility}>
            Back
          </p>
          <p className="action-btn accept" onClick={acceptReceivedRequest}>
            Accept
          </p>
        </div>
        {isLoading && <LoadingComponent />}
      </div>
    </div>
  );
}
