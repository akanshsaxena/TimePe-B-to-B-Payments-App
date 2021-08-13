import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  changeIsLoading,
  changeBalance,
  changeSentRequests,
  changeReceivedRequests
} from "../slices/userSlice";

import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Message from "../components/Message";
import LoadingComponent from "../components/LoaderComponent";
import RequestBox from "../components/RequestBox";

export default function Dashboard() {
  const [reqType, setReqType] = useState("sent-requests");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isRefresh } = useSelector((state) => state.user);
  // useEffect(() => {
  //   getRequests();
  // }, []);
  useEffect(() => {
    getRequests();
  }, [isRefresh]);
  const getRequests = async () => {
    try {
      dispatch(changeIsLoading({ isLoading: true }));
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://zetahacks.herokuapp.com/getuser",
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      const resData = response.data;
      if (resData.status.toLowerCase() === "success") {
        const { data } = resData;
        setName(data.receiver_name);
        dispatch(changeBalance({ balance: data.balance }));
        dispatch(changeSentRequests({ sentRequests: data.paymentRequestSent }));
        dispatch(
          changeReceivedRequests({
            receivedRequests: data.paymentRequestReceived
          })
        );
      }
      dispatch(changeIsLoading({ isLoading: false }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!isLoading ? (
        <div className="dashboard-container">
          <Header name={name} />
          <div className="request-container">
            <div className="nav">
              <div
                id="sent-requests"
                className={
                  "nav-option" + (reqType === "sent-requests" ? " current" : "")
                }
                onClick={(e) => setReqType(e.target.id)}
              >
                Sent Requests
              </div>
              <div
                id="received-requests"
                className={
                  "nav-option" +
                  (reqType === "received-requests" ? " current" : "")
                }
                onClick={(e) => setReqType(e.target.id)}
              >
                Received Requests
              </div>
            </div>
            {reqType === "sent-requests" ? (
              <RequestBox requestType="sent" />
            ) : (
              <RequestBox requestType="received" />
            )}
          </div>
          <Message />
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}
