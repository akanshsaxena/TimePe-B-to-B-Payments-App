import React, { useState } from "react";
import { GiCancel, GiProgression } from "react-icons/gi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import PaymentAcceptDiv from "./PaymentAcceptDiv";
export default function Request({ request, type }) {
  const [visibility, setVisibility] = useState(false);

  const payRequest = (e) => {
    e.preventDefault();
    if (
      request.payment_state.toLowerCase() === "payment_request" &&
      type !== "sent"
    ) {
      setVisibility(true);
    }
  };
  return (
    <div className={`request-div`}>
      <div className={`request-inner-div`}>
        <div className={request.payment_state.toLowerCase()}>
          {request.payment_state.toLowerCase() === "payment_failed" && (
            <GiCancel />
          )}
          {request.payment_state.toLowerCase() === "payment_complete" && (
            <IoCheckmarkDoneSharp />
          )}
          {request.payment_state.toLowerCase() === "payment_request" && (
            <GiProgression />
          )}
        </div>{" "}
        <h4 className="very-small-text">{request.user_name}</h4>
        <div
          className={
            "send-amount" +
            (type !== "sent" &&
              request.payment_state.toLowerCase() === "payment_request" &&
              " send-amount-active")
          }
          onClick={payRequest}
        >
          <h5 className="very-small-text">₹ {request.amount}</h5>
          {type !== "sent" &&
            request.payment_state.toLowerCase() === "payment_request" && (
              <FiSend />
            )}
        </div>
      </div>
      {visibility && (
        <PaymentAcceptDiv request={request} setVisibility={setVisibility} />
      )}
    </div>
  );
}
