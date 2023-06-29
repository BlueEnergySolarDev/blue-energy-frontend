import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AdminScreen } from "../auth/AdminScreen";

export const HomeScreen = () => {
  const { rol } = useSelector((state) => state.auth);
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(() => {
    if (rol === 'ADMIN') {
      setisAdmin(true);
    }
  }, [setisAdmin, rol]);
  return (
    <div className="container">
      {isAdmin && <AdminScreen />}
    </div>
  );
};
