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
        <Typography variant="h6">
          Description:
        </Typography>
        <p>
          {movie.author}
        </p>
        <Divider />
        <Typography variant="h6">
          Comments:
        </Typography>
        <p>
          ....
        </p>
      </Dialog>
    </div>
  );
}
