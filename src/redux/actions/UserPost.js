import * as actions from './action.types';
import Post from '../services/post';
import NotificationSubscription from '../services/notification_subscription';
import jsCookie from 'js-cookie';
import {getSignedUrl} from './media';
import $ from 'jquery';

// export const createUserPost = (params) => {
//   return async function (dispatch) {
//     try {
//       if (params.media && params.media !== '')
//         params.media = getRestoredImages(params.media);
//       const response = await Post.addUserPost(params);
//       if (response.status === 200) {
//         const data_resp = await response.data;
//         jsCookie.set('login', 'yes');

//         dispatch({
//           type: actions.CREATE_USER_POST,
//           payload: {...data_resp, error: null},
//         });
//       }
//     } catch (error) {
//       console.log('the error', error.response);
//       if (error.response && error.response.status === 401) {
//         dispatch({
//           type: actions.CREATE_USER_POST,
//           payload: {error: 'A problem occured while creating the post'},
//         });
//       }
//     }
//   };
// };

export const postNotificationSubscription = (params) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      NotificationSubscription.addNotificationSubscription(params)
        .then((response) => {
          console.log('after adding post', response);
          if (response.status === 200) {
            const data_resp = response.data;
            dispatch({
              type: 'CREATE_NOTIFICATION_SUBSCRIPTION',
              payload: {...data_resp},
            });
            res(response);
          }
        })
        .catch((error) => {
          console.log('the error in creating Post', error.response);
          rej(error);
        });
    });
  };
}

export const createUserPost = (params) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      if (params.media && params.media !== '')
        params.imageUrl = params.media;
        params.media = getRestoredImages(params.media);
      Post.addUserPost(params)
        .then((response) => {
          console.log('after adding post', response);
          if (response.status === 200) {
            const data_resp = response.data;
            jsCookie.set('login', 'yes');

            dispatch({
              type: actions.CREATE_USER_POST,
              payload: {...data_resp, error: null},
            });
            res(response);
          }
        })
        .catch((error) => {
          console.log('the error in creating Post', error.response);
          if (error.response && error.response.status === 401) {
            dispatch({
              type: actions.CREATE_USER_POST,
              payload: {error: 'A problem occured while creating the post'},
            });
          }
          rej(error);
        });
    });
  };
};

const getRestoredImages = (featureImageUrl) => {
  console.log({featureImageUrl})
  let pathname = '';
  try {
    const url = new URL(featureImageUrl);
    if(url){
      pathname = url.pathname;
    }

  }
  catch(e) {
    console.log(e.message);
  }
  const index = pathname.lastIndexOf('/');
  return -1 !== index ? pathname.substring(index + 1) : pathname;
};

const getRestoredImage = (featureImageUrl) => {
  return featureImageUrl.substring(featureImageUrl.lastIndexOf('/') + 1);
};

export const CommonLoaderForAll = (payload) => {
  return async function (dispatch) {
    dispatch({
      type: actions.SET_COMMON_LOADING,
      payload,
    });
  };
};

export const getUserPost = (count, isNew, page) => {
  return async function (dispatch) {
    try {
      if (!isNew) dispatch(CommonLoaderForAll(true));
      const response = await Post.getUserPosts(count, page);
      let postCount = 0;
      if (response.status === 200) {
        const data_resp = await response.data;
        postCount = data_resp.count;
        const posts = data_resp.rows;
        const images = [];
        posts.map(async (post) => {
          if (post && post.media !== '' && post.media) {
            post.fileName = await getRestoredImage(post.media);
            images.push(getSignedUrl(post));
          }
        });
        const getImages = await Promise.all(images);
        let transformPosts = posts.map((post) => {
          let specificImage = getImages.filter(
            (image) => post && image.fileName === post.fileName,
          )[0];
          if (post) post.newUrl = specificImage ? specificImage.newUrl : null;
          return post;
        });

        jsCookie.set('login', 'yes');
        if (isNew) {
          dispatch({
            type: actions.NEW_GET_USER_POSTS,
            payload: {postCount, posts: {...transformPosts}},
          });
        } else {
          dispatch({
            type: actions.GET_USER_POSTS,
            payload: {postCount, posts: {...transformPosts}},
          });
        }
      }
    } catch (error) {
      console.log('YES HAS ERROR');
      if (error.response && error.response.status === 401) {
        dispatch({
          type: actions.GET_USER_POSTS,
          payload: {error: 'A problem occured while getting the posts'},
        });
      }
    }
    dispatch(CommonLoaderForAll(false));
  };
};

export const setLoader = () => {
  return async function (dispatch) {
    dispatch({
      type: actions.SET_LOADING,
    });
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
