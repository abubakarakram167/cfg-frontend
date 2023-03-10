import * as actions from './action.types';
import Post from '../services/post';
import jsCookie from 'js-cookie';

export const createUserPost = (params) => {
  return async function (dispatch) {
    try {
      const response = await Post.addUserPost(params);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.CREATE_USER_POST,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.CREATE_USER_POST,
          payload: {error: 'A problem occured while creating the post'},
        });
      }
    }
  };
};

export const getUserPost = (count) => {
  return async function (dispatch) {
    try {
      const response = await Post.getUserPosts(count);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.GET_USER_POSTS,
          payload: {...data_resp},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.GET_USER_POSTS,
          payload: {error: 'A problem occured while getting the posts'},
        });
      }
    }
  };
};

export const deleteUserPost = (id) => {
  return async function (dispatch) {
    try {
      const response = await Post.deleteUserPost(id);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.DELETE_USER_POST,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.DELETE_USER_POST,
          payload: {error: 'A problem occured while deleting the posts'},
        });
      }
    }
  };
};
export const getPostById = (id) => {
  return async function (dispatch) {
    try {
      const response = await Post.getPostById(id);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.GET_POST_BY_ID,
          payload: {...data_resp, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.GET_POST_BY_ID,
          payload: {error: 'A problem occured while fetching the posts'},
        });
      }
    }
  };
};
export const updateUserPost = (id, params) => {
  return async function (dispatch) {
    try {
      const response = await Post.updatePost(id, params);
      if (response.status === 200) {
        const data_resp = await response.data;
        jsCookie.set('login', 'yes');
        dispatch({
          type: actions.UPDATE_USER_POST,
          payload: {...data_resp, id: id, error: null},
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.UPDATE_USER_POST,
          payload: {error: 'A problem occured while deleting the posts'},
        });
      }
    }
  };
};
