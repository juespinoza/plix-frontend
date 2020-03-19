import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import MoviesGrid from './components/MoviesGrid';

import MovieFinder from './controllers/MovieFinder';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      findTitle: '',
      movies: [],
    }
  }

  componentDidMount(){
    MovieFinder.findNewReleases(this.okMoviesRequest.bind(this));
  }

  okMoviesRequest(newRealeases){
    this.setState({movies: newRealeases});
  }

  updateMovies(title){
    if(title === ""){
      return MovieFinder.findNewReleases(this.okMoviesRequest.bind(this));
    }
    MovieFinder.findTitle(title, this.okMoviesRequest.bind(this));
  }
  
  render (){
    return (
      <div className="App">
        <NavigationBar updateMoviesGrid={this.updateMovies.bind(this)} />
        <MoviesGrid movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
