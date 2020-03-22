import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import MovieDetail from './MovieDetail';

const useStyles = makeStyles(theme => ({
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
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const { movies, currentUser } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={350} className={classes.gridList} cols={5}>
        { 
          (!currentUser) && (
            <GridListTile key="Subheader" cols={5} style={{ height: 'auto' }}>
              <ListSubheader component="div">No access to movies.</ListSubheader>
            </GridListTile>
          )
        }
        { (currentUser) && (
            movies.map(movie => (
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
  );
}
