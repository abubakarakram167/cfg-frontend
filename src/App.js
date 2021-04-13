import React from 'react';
import {Provider} from 'react-redux';

import LocaleProvider from '@crema/utility/LocaleProvider';
import CremaThemeProvider from '@crema/utility/CremaThemeProvider';
import CremaStyleProvider from '@crema/utility/CremaStyleProvider';
import ContextProvider from '@crema/utility/ContextProvider';
import configureStore from './redux/store';
import MainApp from 'pages/app';
import {ConnectedRouter} from 'connected-react-router';
import AppLayout from '@crema/core/AppLayout';
import AuthRoutes from '@crema/utility/AuthRoutes';
import CssBaseline from '@material-ui/core/CssBaseline';
import {history} from './redux/store';
import UserHomePage from 'pages/user-home-page';
const store = configureStore();

const App = () => (
  <ContextProvider>
    <Provider store={store}>
      <CremaThemeProvider>
        <CremaStyleProvider>
          <LocaleProvider>
            {/* <ConnectedRouter history={history}>
              <AuthRoutes>
                <CssBaseline />
                <AppLayout />
              </AuthRoutes>
            </ConnectedRouter> */}
            <UserHomePage />
            {/* <MainApp /> */}
          </LocaleProvider>
        </CremaStyleProvider>
      </CremaThemeProvider>
    </Provider>
  </ContextProvider>
);

export default App;
