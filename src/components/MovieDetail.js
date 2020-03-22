import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InfoIcon from '@material-ui/icons/Info';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Comments from './Comments';
import CommentController from '../controllers/CommentController';

class MovieDetail extends React.Component {

  constructor() {
    super();
    this.state = {
      comments: [],
      detailOpen: false,
    }
    this.handleDetailsOpen = this.handleDetailsOpen.bind(this);
    this.handleDetailsClose = this.handleDetailsClose.bind(this);
    this.handleCommentsRequest = this.handleCommentsRequest.bind(this);
  }

  handleDetailsOpen(){
    this.setState({detailOpen: true});
  }
  handleDetailsClose(){
    this.setState({detailOpen: false});
  }
  componentDidMount(){
      CommentController.getAllComments(this.props.movieId, this.handleCommentsRequest);
  }
  handleCommentsRequest(comments) {
      this.setState({ comments: comments });
  }

  render(){
    const { classes, movie } = this.props;

    const transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    return(
      <div>
        <IconButton variant="outlined" aria-label={`info about ${movie.title}`} className={classes.icon} onClick={this.handleDetailsOpen}>
            <InfoIcon />
        </IconButton>
        <Dialog fullScreen open={this.state.detailOpen} onClose={this.handleDetailsClose} TransitionComponent={transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleDetailsClose} aria-label="close">
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
            <Comments comments={this.state.comments} />
            <Divider />
            <div>
              <b>You:</b>
              <TextareaAutosize rowsMin={10} cols={150} />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
};

const classes = theme => ({
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
});

export default withStyles(classes)(MovieDetail);