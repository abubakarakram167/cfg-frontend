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
import Preferences from 'pages/preferences';
import MediaLibrary from 'pages/media-library';
import MiniCfg from 'pages/mini-cfg';
import Rewards from 'pages/rewards';
import Editor from 'pages/editor/index';
import CfgElement from 'pages/cfg-element';
import CfgToolElement from 'pages/cfg-tool-element';
import ContentDisplay from 'pages/content-display';
import EditContent from 'pages/edit-content';
import ProtectedRoute from './protectedRouter';
import {
  QuizContentScreen,
  PreviewQuizScreen,
  QuizAddScreen,
  QuizListingScreen,
} from 'pages/Quiz/Loadable';

export default [
  <ProtectedRoute exact path='/admin' component={AdminHome} />,
  <ProtectedRoute
    exact
    path='/admin/editor/:type/:id/:contentHeaderId'
    component={withRouter(Editor)}
  />,
  <ProtectedRoute
    exact
    path='/admin/content/display/:id'
    component={withRouter(ContentDisplay)}
  />,
  <ProtectedRoute
    exact
    path='/admin/content/edit/:id/:content_id/:type/:contentType'
    component={withRouter(EditContent)}
  />,
  <ProtectedRoute
    exact
    path='/admin/dashboard'
    component={withRouter(Dashboard)}
  />,
  <ProtectedRoute
    exact
    path='/admin/user-management'
    component={withRouter(UserManagement)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-tools'
    component={withRouter(CfgTool)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-tools/:id'
    component={withRouter(CfgToolElement)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-tools/:type/:id/:contentHeaderId/cfgType'
    component={withRouter(Editor)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-session'
    component={withRouter(CfgSession)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-session/:id'
    component={withRouter(CfgElement)}
  />,
  <ProtectedRoute
    exact
    path='/admin/cfg-session/:type/:id/:contentHeaderId/:cfgType'
    component={withRouter(Editor)}
  />,
  <ProtectedRoute
    exact
    path='/admin/timeline'
    component={withRouter(Timeline)}
  />,
  <ProtectedRoute exact path='/admin/events' component={withRouter(Events)} />,
  <ProtectedRoute path='/add/quiz' component={withRouter(QuizAddScreen)} />,
  <ProtectedRoute
    path='/content/quiz'
    component={withRouter(QuizContentScreen)}
  />,
  <ProtectedRoute
    path='/preview/quiz'
    component={withRouter(PreviewQuizScreen)}
  />,
  <ProtectedRoute
    path='/listing/quiz'
    component={withRouter(QuizListingScreen)}
  />,
  <ProtectedRoute
    exact
    path='/admin/preferences'
    component={withRouter(Preferences)}
  />,
  <ProtectedRoute
    exact
    path='/admin/media-library'
    component={withRouter(MediaLibrary)}
  />,
  <ProtectedRoute
    exact
    path='/admin/mini-cfg'
    component={withRouter(MiniCfg)}
  />,
  <ProtectedRoute
    exact
    path='/admin/rewards'
    component={withRouter(Rewards)}
  />,
];
