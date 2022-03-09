import React, {useState, useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CommonComponent from 'pages/user-home-page/common-component';
import {Typography, Box, makeStyles} from '@material-ui/core';
import {transformImagesInContent} from 'components/ReUsable';
import {red} from '@material-ui/core/colors';
import Posts from './posts';
import {getUserPost} from 'redux/actions/UserPost';
import {Loader} from '../../@crema';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'inherit',
    padding: '16px 48px',
    '@media (max-width: 520px)': {
      padding: 16,
    },
  },
  heading: {
    color: '#74788d',
    marginBottom: 36,
  },
  card: {
    maxWidth: '100%',
    margin: '16px 0',
    borderRadius: 8,
    border: '1px solid lightgray',
  },
  title: {
    color: '#74788d',
    fontWeight: 'bolder',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  btnContainer: {
    paddingLeft: 0,
    paddingRight: 48,
    outline: 'none !important',
    backgroundColor: 'transparent !important',
    '@media (max-width: 520px)': {
      paddingRight: 20,
    },
  },
  btnDown: {
    outline: 'none !important',
    backgroundColor: 'transparent !important',
  },
  block: {
    display: 'block',
  },
  hide: {
    display: 'none',
  },
  relative: {
    position: 'relative',
  },
  arrowUp: {
    position: 'absolute',
    right: 15,
    bottom: 5,
    outline: 'none !important',
    backgroundColor: 'transparent !important',
  },
  avatar: {
    backgroundColor: red[500],
  },
  iconTxt: {
    marginLeft: 10,
  },
  fontPointer: {
    cursor: 'pointer',
  },
  comment: {
    '& .MuiFilledInput-root': {
      borderRadius: '36px !important',
    },
  },
}));

const TimeLinePosts = () => {
  const classes = useStyles();
  const getposts = useSelector((state) => state.userPost.posts);
  const loading = useSelector((state) => state.userPost.getPostLoader);

  const dispatch = useDispatch();

  const [count] = useState(3);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([...getposts]);
  }, [getposts]);

  useEffect(() => {
    dispatch(getUserPost(count));
  }, []);

  const returnPosts = () => {
    if (loading) {
      return <Loader />;
    }
    return posts.map((post, index) => {
      return (
        <Fragment key={index}>
          <Posts
            post={post}
            index={index}
            classes={classes}
            getPostCount={count}
          />
        </Fragment>
      );
    });
  };

  return (
    <CommonComponent left='noMenu' right='noMenu'>
      <Box className={classes.root}>
        <Typography class={classes.heading} variant='h2'>
          Timeline Posts
        </Typography>
        {returnPosts()}
      </Box>
    </CommonComponent>
  );
};

export default TimeLinePosts;