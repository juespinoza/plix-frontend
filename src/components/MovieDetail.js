import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Comments from './Comments';
import CommentController from '../controllers/CommentController';
import Button from '@material-ui/core/Button';

class MovieDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
      detailOpen: false,
    }
    this.handleDetailsOpen = this.handleDetailsOpen.bind(this);
    this.handleDetailsClose = this.handleDetailsClose.bind(this);
    this.handleCommentsRequest = this.handleCommentsRequest.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  handleDetailsOpen(){
    this.setState({detailOpen: true});
    this.getComments();
  }
  handleDetailsClose(){
    this.setState({detailOpen: false});
  }
  getComments(){
    const movieId = { movieId: this.props.movie.id }
    CommentController.getAllComments(movieId, this.handleCommentsRequest);
  }
  handleCommentsRequest(comments) {
      this.setState({ comments: comments });
  }
  handleAddComment(el) {
    el.preventDefault();
    const movieId = this.props.movie.id;
    const commentText = { 
      comment: document.getElementById('comment-text').value,
      movieId: movieId,
      email: localStorage.getItem('userEmail'),
    };
    this.setState({ comment: document.getElementById('comment-text').value });
    console.log('Enviando comentario', this.state.comment);
    CommentController.createComment(commentText, (newComment) => {
      console.log('after comment added', newComment);
      let comments = this.state.comments;
      comments.push(newComment);
      this.handleCommentsRequest(comments);
    })
  }

  render(){
    const { classes, movie } = this.props;

    const currentEmail = localStorage.getItem('userEmail');

    return(
      <div>
        <IconButton variant="outlined" aria-label={`info about movie-${movie.id}`} className={classes.icon} onClick={this.handleDetailsOpen}>
            <InfoIcon />
        </IconButton>
        <Dialog fullScreen open={this.state.detailOpen} onClose={this.handleDetailsClose} >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleDetailsClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {movie.title} ({movie.id})
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.dialog} >
            <Typography variant="h4">Movie info: </Typography>
            <br />
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
            <Typography variant="h4">Comments: </Typography>
            <Comments comments={this.state.comments} />
            <Divider />
            { (localStorage.getItem('userEmail')) && (
                <div>
                  <br />
                  <TextareaAutosize id="comment-text" rowsMin={10} cols={150} />
                  <br />
                  <i><b>Commenting as:</b> {currentEmail}</i>
                  <br />
                  <div width="100%" style={{"text-align": "right"}}>
                    <Button variant="outlined" onClick={this.handleAddComment} color="primary">
                      Send Comment
                    </Button>
                  </div>
                </div>
              )
            }
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