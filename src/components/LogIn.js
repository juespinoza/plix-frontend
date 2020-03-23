import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SignUp from './SignUp';
import UserController from '../controllers/UserController';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function Login(props) {
  const [open, setOpen] = React.useState(false);
  const [logged, setLogged] = React.useState(localStorage.getItem('logged'));
  
  const handleLogOut = () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('userEmail');
    setLogged(false);
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSetUser = (user) => {
    console.log('this is the user state: ', user);
    if (user !== null) {
      localStorage.setItem('logged', true);
      localStorage.setItem('userEmail', user.email);
      setLogged(true);
      setOpen(false);
    } else {
      localStorage.setItem('logged', false);
      localStorage.removeItem('userEmail');
    }
  };

  const handleLoginRequest = (el) => {
    el.preventDefault();
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-pass');

    if (emailInput.value !== '' && passInput.value !== '') {
      let user = { email: emailInput.value, password: passInput.value };
      if(user !== null) {
        UserController.login(user, handleSetUser);
      }
    }
  }

  return (
    <div>
      { (logged) && (
        <span>
          <i>
            Connected as { localStorage.getItem('userEmail') }
          </i>
          <IconButton color="inherit" >
              <AccountCircle />
          </IconButton>
          <Button
            edge="end"
            aria-label="log out"
            color="inherit"
            size="small"
            onClick={handleLogOut}
          >
            Log out
          </Button>
        </span>
      )}
      {
        (!logged) && (
          <Button
            edge="end"
            aria-label="log in"
            color="inherit"
            size="small"
            onClick={handleOpen}
          >
            Log in
          </Button>
        )
      }
      {
        (!logged) && (
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="login-email"
              label="Email"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="login-pass"
              label="Password"
              type="password"
              fullWidth
            />
            <br />
            <div>
              <SignUp />
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleLoginRequest} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
        )
      }
    </div>
  );
}
