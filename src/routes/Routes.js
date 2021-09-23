import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { dashboard as dashboardRoutes } from "./index";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { localizePath, localizeRoute } from "@app/i18next/utils";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import SignIn from "@pages/auth/SignIn";
import Page404 from "@pages/auth/Page404";
import ScrollToTop from "@components/ScrollToTop";

const childRoutes = (routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={localizeRoute(path)}
          render={props => (<Component {...props} />)}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={localizeRoute(path)}
        render={props => (<Component {...props} />)}
      />
    )
  );

const rootRoutes = (routes) => routes.reduce((acc, curVal) => {
  if (curVal.children) {
    return acc.concat(curVal.children.map(({ path }) => localizeRoute(path)))
  }
  return [...acc, localizeRoute(curVal.path)];
}, []);

const Routes = () => {
  const { i18n } = useTranslation();
  const loggedIn = useSelector(state => state.auth.loggedIn);

  return (
    <Router basename="/adm">
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            {!loggedIn ? (
              <AuthLayout>
                <SignIn />
              </AuthLayout>
            ) : (
              <Redirect to={localizePath("/dashboard", i18n.language)} />
            )}
          </Route>
          <Route exact path={rootRoutes(dashboardRoutes)}>
            {loggedIn ? (
              <DashboardLayout>
                <Switch>
                  {childRoutes(dashboardRoutes)}
                </Switch>
              </DashboardLayout>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="*">
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          </Route>
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default Routes;
