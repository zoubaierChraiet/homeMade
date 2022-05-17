/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IUser } from '../../../domain/Domain';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

interface IProps {
  users : IUser[],
  loading : boolean
}


export const UsersSelect = ({users,loading} : IProps) => {
  const handleChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const history = useHistory()
  const handleSelectChange = (e:any,newValue:any) => {
    history.push(`/profile/${newValue._id}`)
  }

  if(loading) {
    return <CircularProgress />
  }

  return (
    <Autocomplete
      id="combo-box-demo"
      options={users}
      getOptionLabel={(option) => option.firstName}
      style={{ width: 300 }}
      onChange={handleSelectChange}
      renderInput={(params) => {
        return  <TextField {...params} label="Users" variant="outlined" onChange={handleChangeInput} />
      }}
    />
  );
}


