import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import MovieFinder from './controllers/MovieFinder';
import UserController from './controllers/UserController';
import MoviesGrid from './components/MoviesGrid';

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
        this.setState({ movies: [] })
    if(title !== "") {
      MovieFinder.findTitle(title, this.handleMoviesRequest.bind(this));
    } else {
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
    return (
      <div className="App">
        <NavigationBar 
          updateMoviesGrid={this.updateMovies.bind(this)}
          setCurrentUser={this.setCurrentUser.bind(this)}
          userIsLogged={this.state.isLogged}
        />
        <MoviesGrid movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
