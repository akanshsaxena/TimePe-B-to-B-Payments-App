import React, { useState, useEffect } from "react";
import StartPage from "./StartPage";
import Dashboard from "./Dashboard";

export default function AuthCheck() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) setIsLoggedIn(false);
    else setIsLoggedIn(true);
  }, []);
  return <>{isLoggedIn ? <Dashboard /> : <StartPage />}</>;
}
