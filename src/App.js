import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import MoviesGrid from './components/MoviesGrid';

import MovieFinder from './controllers/MovieFinder';
import UserController from './controllers/UserController';

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
    this.handleMoviesRequest = this.handleMoviesRequest.bind(this);
    this.updateMovies = this.updateMovies.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  setCurrentUser(user) {
    console.log('this is the user state: ', user);
    this.setState({ currentUser: user });
    if (user !== null) {
      localStorage.setItem('logged', true);
      localStorage.setItem('userEmail', user.email);
    } else {
      localStorage.setItem('logged', false);
      localStorage.removeItem('userEmail');
    }
  }

  handleMoviesRequest(newRealeases){
    this.setState({ movies: newRealeases });
  }

  componentDidMount(){
    MovieFinder.findNewReleases(this.handleMoviesRequest);
  }

  updateMovies(title){
    if(title === ""){
      return MovieFinder.findNewReleases(this.handleMoviesRequest);
    }
    MovieFinder.findTitle(title, this.handleMoviesRequest);
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
          updateMoviesGrid={this.updateMovies}
          handleLogin={this.handleLogin}
          userIsLogged={this.state.isLogged}
        />
        <MoviesGrid
          movies={this.state.movies}
          currentUser={this.state.currentUser}
          userIsLogged={localStorage.getItem('logged')}
        />
      </div>
    );
  }
}

export default App;
