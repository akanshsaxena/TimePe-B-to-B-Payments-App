import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Request from "./Request";
import SendRequestModel from "./SendRequestModel";

export default function RequestBox({ requestType }) {
  const [requests, setRequests] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const { sentRequests, receivedRequests } = useSelector((state) => state.user);
  useEffect(() => {
    if (requestType === "sent") setRequests(sentRequests);
    else setRequests(receivedRequests);
  }, [requestType]);
  const handleVisibility = (e) => {
    e.preventDefault();
    setVisibility(true);
  };
  return (
    <div className="request-box">
      {requestType === "sent" && (
        <button className="add-fund-btn create-req" onClick={handleVisibility}>
          Create a new request
        </button>
      )}
      <div className="individual-request-container">
        {requests.length > 0 ? (
          requests.map((element) => (
            <Request request={element} type={requestType} />
          ))
        ) : (
          <p>You don't have any {requestType} requests</p>
        )}
      </div>
      {visibility && <SendRequestModel setVisibility={setVisibility} />}
    </div>
  );
}
