import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, Divider, Collapse } from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import TextField from '@material-ui/core/TextField';
import SignUp from './SignUp';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

export default function Login(props) {
  const [open, setOpen] = React.useState(false);
  const [errorAlertOpen, setErrorAlert] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (props.userLogged === true){
      setOpen(false);
    }
  };

  const handleLoginRequest = () => {
    console.log('in login.js');
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-pass');

    if (emailInput.value !== '' && passInput.value !== '') {
      let user = { email: emailInput.value, password: passInput.value };
      props.handleLogin(user);
    }
  }

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="log out"
        color="inherit"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <ExitToAppRoundedIcon />
      </IconButton>
      {
        (!props.userLogged) && (
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>
              <Collapse in={errorAlertOpen}>
                <Alert 
                  severity="warning"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setErrorAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  You are disconnected.
                </Alert>
              </Collapse>
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
            <Button variant="outlined" onClick={handleClose} color="secondary">
              Cancel
            </Button>
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
