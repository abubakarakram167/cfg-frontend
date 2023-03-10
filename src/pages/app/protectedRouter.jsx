import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {isAuthenticUser} from './validateUser';
import React from 'react';

const ProtectedRoute = ({component: Component, ...rest}) => {
  const authenticatedUser = isAuthenticUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticatedUser) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          );
        }
      }}
    />
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.func,
};
export default ProtectedRoute;
