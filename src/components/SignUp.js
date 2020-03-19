import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, Divider, Checkbox } from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
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
      <IconButton
        edge="end"
        aria-label="log out"
        color="inherit"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <ExitToAppRoundedIcon />
      </IconButton>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
