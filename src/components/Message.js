import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTypeOfMessage } from "../slices/userSlice";
export default function Message() {
  const message = useRef(null);
  const dispatch = useDispatch();
  const { typeOfMessage, disMessage } = useSelector((state) => state.user);
  useEffect(() => {
    if (typeOfMessage !== "" && disMessage !== "") {
      console.log("showing message", message.current.style.display);
      message.current.style.display = "block";
      setTimeout(() => {
        message.current.style.display = "none";
        dispatch(changeTypeOfMessage({ typeOfMessage: "", disMessage: "" }));
      }, 2500);
    }
  }, [typeOfMessage, disMessage]);
  return (
    <div
      ref={message}
      style={{ display: "none" }}
      className={`${typeOfMessage} float`}
    >
      <p>{disMessage}</p>
    </div>
  );
}
