import React, { useEffect, useState } from "react";
import { PrivateRoute } from "./PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";
import { Loading } from "./Loading";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { NotFoundScreen } from "../components/ui/NotFoundScreen";
import { Layout } from "./Layout";
import { PublicRoute } from "./PublicRoute";
import { AddSitDown } from "../components/sitdowns/AddSitDown";
import { ProfileScreen } from "../components/user/ProfileScreen";
import { AdminScreen } from "../components/user/AdminScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  // const [isAdmin, setisAdmin] = useState(false);
  // useEffect(() => {
  //   if (role === 'ADMIN') {
  //     setisAdmin(true);
  //   }
  //   // if(rol === 'CLIENTE'){
  //   //   setisCliente(true);
  //   // }
  // }, [setisAdmin, role]);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  if (checking) {
    return <Loading checking={checking} />;
  }

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute isAuthenticated={!!uid} />}>
          <Route element={<Layout />}>
            <Route path="/" element={<AdminScreen />} />
            <Route path="/addsitdown" element={<AddSitDown />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
        </Route>
        <Route element={<PublicRoute isAuthenticated={!!uid} />}>
          <Route exact index path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
        </Route>
      </Routes>
    </Router>
  );
};
