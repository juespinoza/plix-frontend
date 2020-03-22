import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InfoIcon from '@material-ui/icons/Info';
import { List, ListItem } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  dialog: {
    width: '80%',
    margin: '10px auto',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MovieDetail(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { movie } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton variant="outlined" aria-label={`info about ${movie.title}`} className={classes.icon} onClick={handleClickOpen}>
          <InfoIcon />
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {movie.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.dialog} >
          <Typography variant="h6">
            Description:
          </Typography>
          <div>
            {movie.author}
          </div>
          <Typography variant="h6">
            Rate:
          </Typography>
          <div>
            8/10
          </div>
          <br />
          <Divider />
          <br />
          <Typography variant="h4">
            Comments:
          </Typography>
          <List>
            <ListItem><b>Laura:</b> Cup cream, plunger pot saucer grounds a fair trade in black ut flavour. Cup mug, kopi-luwak espresso single shot est fair trade aged extra.</ListItem>
            <Divider />
            <ListItem><b>Juan:</b> Cup cream, plunger pot saucer grounds a fair trade in black ut flavour. Cup mug, kopi-luwak espresso single shot est fair trade aged extra.</ListItem>
            <Divider />
            <ListItem><b>Lena:</b> Cup cream, plunger pot saucer grounds a fair trade in black ut flavour. Cup mug, kopi-luwak espresso single shot est fair trade aged extra.</ListItem>
            <Divider />
            <ListItem>
              <b>You:</b>
              <TextareaAutosize rowsMin={10} cols={150} />
            </ListItem>
          </List>
        </div>
      </Dialog>
    </div>
  );
}
