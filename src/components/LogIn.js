import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SignUp from './SignUp';

export default function Login(props) {
  let userIslogged = localStorage.getItem('logged');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    let userIslogged = localStorage.getItem('logged');
    const interval = setInterval(() => {
      setOpen(!userIslogged);
      console.log('login open', open);
    }, 5000);
    return () => clearInterval(interval);
  });

  const handleLogOut = () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('userEmail');
    setOpen(true);
  }

  const handleClose = () => {
    if (userIslogged === true){
      setOpen(false);
    }
  };

  const handleLoginRequest = (el) => {
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-pass');

    if (emailInput.value !== '' && passInput.value !== '') {
      let user = { email: emailInput.value, password: passInput.value };
      props.handleLogin(user);
    }
    setOpen(false);
  }

  return (
    <div>
      <Button
        edge="end"
        aria-label="log out"
        color="inherit"
        size="small"
        onClick={handleLogOut}
      >
        Log out
      </Button>
      {
        (!props.userLogged) && (
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
