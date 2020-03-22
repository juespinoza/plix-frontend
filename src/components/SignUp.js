import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import UserController from '../controllers/UserController';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignUpRequest = () => {
    const dniInput = document.getElementById('signup-dni');
    const nameInput = document.getElementById('signup-name');
    const usernameInput = document.getElementById('signup-username');
    const emailInput = document.getElementById('signup-email');
    const passInput = document.getElementById('signup-password');

    if (emailInput.value !== '' && passInput.value !== '') {
      let user = { 
        dni: dniInput.value,
        name: nameInput.value,
        username: usernameInput.value,
        email: emailInput.value, 
        password: passInput.value 
      };
      UserController.signUp(user, (response) => {
        console.log('User Registered', response);
        setOpen(false);
      })
    }
  }

  return (
    <div>
      <Button color="primary" aria-label="signup" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sing Up</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField autoFocus margin="dense" id="signup-dni" label="DNI" type="text" fullWidth />
          <TextField margin="dense" id="signup-name" label="Name" type="text" fullWidth />
          <TextField margin="dense" id="signup-username" label="Username" type="text" fullWidth />
          <TextField  margin="dense" id="signup-email" label="Email" type="email" fullWidth />
          <TextField margin="dense" id="signup-password" label="Password" type="password" fullWidth />
          <FormControlLabel
            control={<Checkbox name="terms" />}
            label="Terms&Conditions"
          />
        </DialogContent>
        <DialogActions>
          <Button  variant="outlined" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button  variant="outlined" onClick={handleSignUpRequest} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
