import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
