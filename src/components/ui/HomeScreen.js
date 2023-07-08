import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AdminScreen } from "../auth/AdminScreen";
import { LoadingSpinner } from "./LoadingSpinner";

export const HomeScreen = () => {
  // const { role } = useSelector((state) => state.auth);
  // const [isAdmin, setisAdmin] = useState(false);
  // useEffect(() => {
  //   if (rol === 'ADMIN') {
  //     setisAdmin(true);
  //   }
  // }, [setisAdmin, rol]);
  return (
    <div className="container">
      <AdminScreen />
      {/* {isAdmin && <AdminScreen />} */}
    </div>
  );
};
