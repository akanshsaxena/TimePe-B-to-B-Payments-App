import React from "react";
import Loader from "react-js-loader";

export default function LoaderComponent() {
  return (
    <div className="mask-container">
      <Loader
        className="loader"
        type="box-rotate-x"
        bgColor={"#000000"}
        color="#ffffff"
        title=""
        size={100}
      />
    </div>
  );
}
