import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { NotFoundScreen } from "../components/ui/NotFoundScreen";
import { Layout } from "./Layout";
import { Loading } from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { AddSitDown } from "../components/sitdowns/AddSitDown";
import { ProfileScreen } from "../components/user/ProfileScreen";
import { AdminScreen } from "../components/admin/AdminScreen";
import { OfficeManagerScreen } from "../components/office_manager/OfficeManagerScreen";
import { EditUser } from "../components/admin/EditUser";
import { UsersScreen } from "../components/admin/UsersScreen";
import { SitDownsScreen } from "../components/sitdowns/SitDownsScreen";
import { EditSitDown } from "../components/sitdowns/EditSitDown";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid, role, userAsoc } = useSelector((state) => state.auth);
  // const { sitDownSelected } = useSelector((state) => state.sitDown);
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
            <Route path="/editsitdowndetail" element={isOfficeManager &&  <EditSitDown />} />
            <Route path="/edituser" element={isAdmin && <EditUser />} />
            <Route path="/users" element={isAdmin && <UsersScreen />} />
            <Route path="/sitdowndetail" element={<SitDownsScreen />} />
            <Route path="/profile" element={<ProfileScreen user={userAsoc}/>} />
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
