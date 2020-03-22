import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" aria-label="signup" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sing Up</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField autoFocus margin="dense" id="signup-name" label="Name" type="text" fullWidth />
          <TextField  margin="dense" id="login-email" label="Email" type="email" fullWidth />
          <TextField margin="dense" id="login-pass" label="Password" type="password" fullWidth />
          <FormControlLabel
            control={<Checkbox name="terms" />}
            label="Terms&Conditions"
          />
        </DialogContent>
        <DialogActions>
          <Button  variant="outlined" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button  variant="outlined" onClick={handleClose} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
