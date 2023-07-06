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
import { SitDownsScreen } from "../components/sitdowns/SitDownsScreen";
import { OfficeManagerScreen } from "../components/user/OfficeManagerScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid, role } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOfficeManager, setIsOfficeManager] = useState(false);
  useEffect(() => {
    if (role === 'admin') {
      setIsAdmin(true);
    }
    if (role === 'office_manager') {
      setIsOfficeManager(true);
    }
  }, [role]);

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
            <Route path="/" element={isAdmin ? <AdminScreen /> : <OfficeManagerScreen />} />
            <Route path="/addsitdowndetail" element={isOfficeManager && <AddSitDown />} />
            <Route path="/sitdowndetail" element={<SitDownsScreen />} />
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
