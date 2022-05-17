import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import image from '../../../images/searchMenus.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: `url(${image})`,
      zIndex: 10,
      height: 500,
      position: 'relative',
      transform: 'scale(1)',
      minheight: '364px',
      transition: 'all 150ms cubic-bezier(0.25, -0.5, 0.75, 1.5)',
      marginBottom: '3rem',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 35%',
    },
    overImage: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
      background: 'rgba(0,0,0,.59)',
    },
    seacrhContainer: {
      top: '50%',
      left: '50%',
      width: '100%',
      display: 'flex',
      opacity: 1,
      position: 'absolute',
      transform: 'translate(-50%,-50%)',
      transition: 'all 150ms ease-out',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    typography: {
      color: 'white',
      fontFamily: 'cursive',
      marginBottom: 0,
      fontWeight: 700,
    },
  })
);

export const SearchSection = (): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.overImage}></div>
      <div className={classes.seacrhContainer}>
        <h1 className={classes.typography}>Fresh. Local. Homemade.</h1>
        <h2 className={classes.typography}>
          Order from the best permitted home restaurants near you!
        </h2>
      </div>
    </div>
  );
};
