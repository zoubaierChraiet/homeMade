import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem, Select } from '@material-ui/core';
import client from '../../../utils/feathersConfig';
import { IUser } from '../../../domain/Domain';

export const SignUp = ({ open, closeForm }: any) => {
  const [user, setUser] = React.useState<IUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  });
  const handleClose = () => {
    closeForm();
  };

  const onInputsChange = (e: any) => {
    if (e.target.name) {
      setUser({ ...user, [e.target.name]: e.target.value });
    } else {
      setUser({ ...user, [e.target.id]: e.target.value });
    }
  };

  const onSignUp = () => {
    client
      .service('users')
      .create(user)
      .then(() => {
        setUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          gender: '',
        });
        closeForm();
      })
      .catch((err: any) => {
        console.log(err);
        closeForm();
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
        <DialogContent>
          <TextField
            value={user.firstName}
            autoFocus
            margin="dense"
            onChange={onInputsChange}
            id="firstName"
            variant="outlined"
            label="First name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            onChange={onInputsChange}
            value={user.lastName}
            id="lastName"
            label="Last name"
            variant="outlined"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            onChange={onInputsChange}
            value={user.email}
            name="email"
            id="email"
            label="Email Address"
            variant="outlined"
            type="email"
            fullWidth
          />
          <Select
            labelId="gender"
            label="Gender"
            variant="outlined"
            id="gender"
            name="gender"
            fullWidth
            margin="dense"
            onChange={onInputsChange}
            value={user.gender}
          >
            <MenuItem value={'m'}>Male</MenuItem>
            <MenuItem value={'f'}>Female</MenuItem>
          </Select>
          <TextField
            margin="dense"
            onChange={onInputsChange}
            value={user.password}
            name="password"
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSignUp} color="primary">
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
