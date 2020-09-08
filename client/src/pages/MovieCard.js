import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { SearchContext } from './SearchContext'
import Snackbar from '@material-ui/core/Snackbar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    height: '600px',
    overflow: 'scroll'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: '10px',
    marginLeft: '10px'
  },
  cardMedia: {
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  added: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '10px',
  },
  imdbLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export const MovieCard = (props) => {
  const classes = useStyles();
  const movie = props.movie
  const [nominated, setNominated] = useState(false)
  let searchParam = useContext(SearchContext)
  const [limitWarning, setLimitWarning] = useState(false)
  const closeSnackbar = () => {
    setLimitWarning(false)
  }
  const addRemoveNominee = () => {
    if (props.buttonMsg === 'Remove') {
      searchParam.setNominee({ ...searchParam.nominees, [movie.imdbID]: undefined })
    }
    if (searchParam.atLimit) {
      setLimitWarning(true)
      return
    }
    if (props.buttonMsg === 'Add Movie') {
      searchParam.setNominee({ ...searchParam.nominees, [movie.imdbID]: movie })
    }
  }
  useEffect(() => {
    if (searchParam.nominees[movie.imdbID]) {
      setNominated(true)
    }
    else {
      setNominated(false)
    }
    localStorage.setItem('storedNominees', JSON.stringify(searchParam.nominees))
  }, [searchParam.nominees])
  return (
    <Grid item key={movie.imdbID} xs={3}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={movie.Poster}
          title={movie.Title}
        />
        <CardContent className={classes.cardContent}>
          <Typography>
            {movie.Title}
          </Typography>
          <Typography>
            {movie.Year}
          </Typography>
        </CardContent>
        {props.inNominee ?
          //first ternary to check if card is being used for nominee or for moviedisplay
          <CardActions
            onClick={(event) => addRemoveNominee(event)}
            classes={{
              root: classes.root
            }}>
            <Button size="small" color="primary">
              {props.buttonMsg}
            </Button>
          </CardActions> : nominated ?
            //second ternary to check if movie is in nomination, or should have buttons available to add / check imdb
            <div className={classes.added}>
              Added!
         </div>
            :
            <div className={classes.buttonContainer}>
              <CardActions
                onClick={(event) => addRemoveNominee(event)}
                classes={{
                  root: classes.root
                }}>
                <Button size="small" color="primary">
                  {props.buttonMsg}
                </Button>
              </CardActions>
              <Button size="small" color="primary">
                <a className={classes.imdbLink} href={`https://www.imdb.com/title/${movie.imdbID}/`}> IMDB Page</a>
              </Button>
            </div>
        }
      </Card>
      <Snackbar
        open={limitWarning}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        message="You can only nominate five. Remove a nominated movie first before adding another"
      ></Snackbar>
    </Grid >
  )
}
