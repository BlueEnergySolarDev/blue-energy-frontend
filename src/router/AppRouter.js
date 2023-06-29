import React, { useEffect } from "react";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";
import { Loading } from "./Loading";
import { LoginScreen } from "../components/auth/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  if (checking) {
    return <Loading checking={checking} />;
  }

  return (
    <Router>
      {/* <div>
        <div> */}
          <Switch>
            <PublicRoute
              exact
              isAuthenticated={!!uid}
              path="/login"
              component={LoginScreen}
            />
            <PublicRoute
              exact
              isAuthenticated={!!uid}
              path="/register"
              component={RegisterScreen}
            />
            <PrivateRoute
              //exact
              isAuthenticated={!!uid}
              path="/"
              component={DashboardRoutes}
            />
            <Redirect to="/" />
          </Switch>
        {/* </div>
      </div> */}
    </Router>
  );
};
