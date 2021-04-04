import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import AdminHome from 'pages/admin-home';
import Dashboard from 'pages/dashboard';
import Events from 'pages/events';
import UserManagement from 'pages/user-management';
import CfgSession from 'pages/cfg-session';
import CfgTool from 'pages/cfg-tools';
import Timeline from 'pages/timeline';
import Quiz from 'pages/quiz';
import Preferences from 'pages/preferences';
import MediaLibrary from 'pages/media-library';
import MiniCfg from 'pages/mini-cfg';
import Rewards from 'pages/rewards';
import Editor from 'pages/editor/index';
import CfgElement from 'pages/cfg-element';
import ContentDisplay from 'pages/content-display';
import EditContent from 'pages/edit-content';
import ProtectedRoute from './protectedRouter';
const Admin = () => {
  return (
    <Switch>
      <ProtectedRoute exact path='/admin' component={Admin} />
      <ProtectedRoute
        exact
        path='/admin/editor/:type/:id/:contentHeaderId'
        component={withRouter(Editor)}
      />
      <ProtectedRoute
        exact
        path='/admin/content/display/:id'
        component={withRouter(ContentDisplay)}
      />
      <ProtectedRoute
        exact
        path='/admin/content/edit/:id'
        component={withRouter(EditContent)}
      />
      <ProtectedRoute
        exact
        path='/admin/dashboard'
        component={withRouter(Dashboard)}
      />
      <ProtectedRoute
        exact
        path='/admin/user-management'
        component={withRouter(UserManagement)}
      />
      <ProtectedRoute
        exact
        path='/admin/cfg-session'
        component={withRouter(CfgSession)}
      />
      <ProtectedRoute
        exact
        path='/admin/cfg-session/:id'
        component={withRouter(CfgElement)}
      />
      <ProtectedRoute
        exact
        path='/admin/cfg-session/:type/:id/:contentHeaderId'
        component={withRouter(Editor)}
      />
      {/* <ProtectedRoute exact path='/admin' component={withRouter(Admin)} /> */}
      <ProtectedRoute
        exact
        path='/admin/timeline'
        component={withRouter(Timeline)}
      />
      <ProtectedRoute
        exact
        path='/admin/cfg-tools'
        component={withRouter(CfgTool)}
      />
      <ProtectedRoute
        exact
        path='/admin/events'
        component={withRouter(Events)}
      />
      <ProtectedRoute exact path='/admin/quiz' component={withRouter(Quiz)} />
      <ProtectedRoute
        exact
        path='/admin/preferences'
        component={withRouter(Preferences)}
      />
      <ProtectedRoute
        exact
        path='/admin/media-library'
        component={withRouter(MediaLibrary)}
      />
      <ProtectedRoute
        exact
        path='/admin/mini-cfg'
        component={withRouter(MiniCfg)}
      />
      <ProtectedRoute
        exact
        path='/admin/rewards'
        component={withRouter(Rewards)}
      />

      {/* <Route path='/admin' exact>
          <AdminHome />
        </Route>
        <Route path='/admin/editor/:type/:id/:contentHeaderId'>
          <Editor />
        </Route>
        <Route path='/admin/content/display/:id'>
          <ContentDisplay />
        </Route> */}
      {/* <Route path='/admin/content/edit/:id'>
          <EditContent />
        </Route>
        <Route path='/admin/dashboard' exact={true}>
          <Dashboard />
        </Route> */}
      {/* <Route path='/admin/user-management'>
          <UserManagement />
        </Route> */}
      {/* <Route path='/admin/cfg-session' exact>
          <CfgSession />
        </Route> */}
      {/* <Route path='/admin/cfg-session/:id' exact>
          <CfgElement />
        </Route> */}
      {/* <Route path='/admin/cfg-session/:type/:id/:contentHeaderId'>
          <Editor />
        </Route> */}
      {/* <Route path='/admin/timeline'>
          <Timeline />
        </Route> */}
      {/* <Route path='/admin/cfg-tools'>
          <CfgTool />
        </Route> */}
      {/* <Route path='/admin/events'>
          <Events />
        </Route> */}
      {/* <Route path='/admin/quiz'>
          <Quiz />
        </Route>
        <Route path='/admin/preferences'>
          <Preferences />
        </Route>
        <Route path='/admin/media-library'>
          <MediaLibrary />
        </Route>
        <Route path='/admin/mini-cfg'>
          <MiniCfg />
        </Route>
        <Route path='/admin/rewards'>
          <Rewards />
        </Route> */}
    </Switch>
  );
};

export default Admin;
