import React from 'react';
import {Box} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  appHeader: {
    height: 60,
    display: 'flex',
    background: '#EB1B29',
    boxShadow: '0px 1px 2px gainsboro',
    alignItems: 'center',
    [theme.breakpoints.up('xl')]: {
      height: 77,
    },
    position: 'relative',
  },
  checkboxRoot: {
    marginRight: 8,
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const AppsHeader = ({children}) => {
  const classes = useStyles();
  return (
    <Box px={6} py={{xs: 1, xl: 3}} className={classes.appHeader}>
      {children}
    </Box>
  );
};

export default AppsHeader;
AppsHeader.defaultProps = {};
