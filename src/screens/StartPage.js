import React, { useState } from "react";
import GetMobileNumber from "../components/GetMobileNumber";
import OtpVerification from "../components/OtpVerification";

export default function StartPage() {
  const [isOtpCreated, setIsOtpCreated] = useState(false);
  return (
    <div className="start-page">
      <div className="start-page-inner">
        <div className="image-div">
          <img src="/images/fintech11.gif" alt="" />
        </div>
        {!isOtpCreated ? (
          <GetMobileNumber setIsOtpCreated={setIsOtpCreated} />
        ) : (
          <OtpVerification setIsOtpCreated={setIsOtpCreated} />
        )}
      </div>
    </div>
  );
}
