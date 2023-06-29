import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { HomeScreen } from "../components/ui/HomeScreen";
import { AddRpp } from "../components/rpps/AddRpp";
import { Navbar } from "../components/ui/Navbar";
import { NotFoundScreen } from "../components/ui/NotFoundScreen";
export const DashboardRoutes = () => {
  const { rol } = useSelector((state) => state.auth);
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(() => {
    if (rol === 'ADMIN') {
      setisAdmin(true);
    }
  }, [setisAdmin, rol]);

  return (
    <>
      <Navbar />
      <div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            {/* {isAdmin && <Route path={`/adduser`} component={AddRpp} /> } */}
            <Route path="*" component={NotFoundScreen} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </>
  );
};
