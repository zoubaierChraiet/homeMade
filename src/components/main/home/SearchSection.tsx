import React, { ReactElement, useEffect, useState } from 'react';

import {
  makeStyles,
  Typography,
} from '@material-ui/core';

import sectionImage from '../../../images/searchSection.png';
import { IUser } from '../../../domain/Domain';
import { UsersSelect } from './UsersSearchMenu';
import client from '../../../utils/feathersConfig';

const useStyles = makeStyles({
  root: {
    height: '90vh',
    position: 'relative',
    background:`url(${sectionImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 35%"
  },
  titleTypography: {
    fontSize: '3rem',
  },
  description: {
    fontSize: '3rem',
  },
  serchWrapper: {
    width: '60%',
    display: 'flex',
    zIndex: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: '40%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  devider: {
    width: '50%',
    border: '2px solid #fa8a4a',
    height: '1px',
    backgroundColor: '#fa8a4a',
  },
  title: {
    width: '80%',
    maxWidth: 500,
  },
  button: {
    color: '#fff',
    borderRadius: '0rem 1rem 1rem 0px',
    backgroundColor: '#fa8a4a',
    width: '242px',
    height: '100%',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#fa8a4a',
    },
  },
  searchSelect: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    '& .Mui-focused': {
      borderColor: 'red',
    },
  },
  selectInput: {
    width: 400,
    border:"2px solid",
    borderRadius: '1rem',
    '& .Mui-focused': {
      background: '#fa8a4a',
    },
    '&.MuiOutlinedInput-adornedEnd': {
      paddingRight: 0,
    },
  },
});

export const SearchSection = (): ReactElement => {
  const classes = useStyles();
  const [users,setUsers] = useState<IUser[]>([])
  const [loadingUsers, setLoadingUsers] = React.useState<boolean>(true);


  useEffect(() => {
    client.service("users").find({query : {
      $limit : -1
    }}).then((res : IUser[]) => {
      setLoadingUsers(false)
      setUsers(res)
    }).catch((err:any) => {
      setLoadingUsers(false)
    })
  },[])

  return (
    <div className={classes.root}>
      <div className={classes.serchWrapper}>
        <div className={classes.title}>
          <Typography
            variant="h1"
            gutterBottom
            className={classes.titleTypography}
          >
            Fresh. Local. Homemade.
          </Typography>
          <div className={classes.devider}></div>
          <Typography
            variant="h2"
            gutterBottom
            style={{ marginTop: 20 }}
            className={classes.description}
          >
            Find delicious, authentic food made by permitted cooks in your
            neighborhood.
          </Typography>
          <div>
            <UsersSelect users={users} loading={loadingUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};


