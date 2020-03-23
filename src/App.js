import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import MoviesGrid from './components/MoviesGrid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import MovieFinder from './controllers/MovieFinder';
import UserController from './controllers/UserController';
import MovieDetail from './components/MovieDetail';
import { withStyles } from '@material-ui/core';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      findTitle: '',
      movies: [],
      currentUser: null,
      logged: localStorage.getItem('logged'),
    }
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  setCurrentUser(user) {
    console.log('this is the user state: ', user);
    this.setState({ currentUser: user });
  }

  handleMoviesRequest(newRealeases){
    console.log('new releases: ', newRealeases);
    this.setState({ movies: newRealeases });
  }

  componentDidMount(){
    MovieFinder.findNewReleases(this.handleMoviesRequest.bind(this));
  }

  updateMovies(title){
    if(title !== "") {
      MovieFinder.findTitle(title, this.handleMoviesRequest.bind(this));
    } else {
      this.setState({ movies: [] })
      MovieFinder.findNewReleases(this.handleMoviesRequest.bind(this));
    }
  }

  handleLogin(user) {
    console.log('in app.js', user);
    if(user !== null) {
      UserController.login(user, this.setCurrentUser);
    }
  }
  
  render (){
    const { classes } = this.props;
    return (
      <div className="App">
        <NavigationBar 
          updateMoviesGrid={this.updateMovies.bind(this)}
          setCurrentUser={this.setCurrentUser.bind(this)}
          userIsLogged={this.state.isLogged}
        />
        <div className={classes.root}>
          <GridList cellHeight={350} className={classes.gridList} cols={5}>
            { (
                this.state.movies.map(movie => (
                  <GridListTile key={movie.image}>
                    <img src={movie.image} alt={movie.title} />
                    <GridListTileBar
                        title={movie.title}
                        subtitle={<span>Author: {movie.author}</span>}
                        actionIcon={
                        <MovieDetail movie={movie} />
                        }
                    />
                  </GridListTile>
                ))
              )
            }
          </GridList>
        </div>
      </div>
    );
  }
}

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  gridList: {
    width: '90%',
  },
});
export default withStyles(useStyles)(App);
