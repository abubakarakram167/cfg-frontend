import React, {useState, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import Admin from './admin';
import Auth from 'pages/auth-pages';
import ResetPassword from 'pages/auth-pages/reset-password/index';
import CreatePassword from 'pages/auth-pages/create-password/index';
import ProtectedRoute from './protectedRouter';
import AdminHeader from 'pages/auth-pages/auth-header';

const RouteComponent = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [localStorage.getItem('auth-token')]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/createPassword'>
            <CreatePassword />
          </Route>

          <Route exact path='/reset'>
            <ResetPassword />
          </Route>
          {Admin}
          <Route path='/'>
            <Auth />
          </Route>

          
        </Switch>
      </Router>
    </div>
  );
};

export default RouteComponent;
