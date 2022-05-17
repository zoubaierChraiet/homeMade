import React from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../images/homemade.png';

import { SignUp } from '../main/signIn/SignIn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bar: {
      backgroundColor: 'white',
      color: '#fa8a4a',
      borderBottom: 'solid 1px #d3d3d3',
      boxShadow: 'none',
    },
    logo: {
      width: 60,
      height: 50,
      objectFit: 'cover',
      marginRight: 5,
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <AppBar className={classes.bar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="logo" className={classes.logo} />
          <Button color="inherit" onClick={handleClickOpen}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <SignUp open={open} closeForm={handleClose} />
    </div>
  );
};

export default Header;
