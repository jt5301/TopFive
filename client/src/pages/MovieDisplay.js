import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { SearchContext } from './SearchContext'
import axios from 'axios'
import { MovieCard } from './MovieCard.js'
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    height: '750px',
    overflow: 'scroll'
  },
}))

const MovieDisplay = () => {
  const classes = useStyles();
  let searchParam = useContext(SearchContext)
  const [movies, setMovies] = useState([])
  const [nomineeComplete, setNomineeComplete] = useState(false)

  useEffect(() => {
    let limitFive = 0
    let nomineeKeys = Object.keys(searchParam.nominees)
    for (let key of nomineeKeys) {
      if (searchParam.nominees[key]) limitFive += 1
      if (limitFive === 5) {
        searchParam.setLimit(true)
        setNomineeComplete(true)
        break
      }
      else searchParam.setLimit(false)
    }
  }, [searchParam.nominees])

  const closeSnackbar = () => {
    setNomineeComplete(false)
  }

  useEffect(() => {
    const defaultMovies = async () => {
      try {
        const res = await axios.get(`/movies/search/avengers`)
        setMovies([...res.data.Search])
      } catch (error) {
        console.log(error)
      }
    }
    defaultMovies()
  }, [])

  useEffect(() => {
    let formattedQuery = ''
    for (let i = 0; i < searchParam.searchTerm.length; i++) {
      if (searchParam.searchTerm[i] === ' ') formattedQuery += '+'
      else formattedQuery += searchParam.searchTerm[i]
    }
    const getMovies = async () => {
      try {
        const res = await axios.get(`/movies/search/${formattedQuery}`)
        setMovies([...res.data.Search])
      } catch (error) {
        console.log(error)
      }
    }
    getMovies()
  }, [searchParam.searchTerm])
  return (
    <Container className={classes.cardGrid} maxWidth="xl">
      <Grid container spacing={5}>
        {movies.map((current) => {
          return (<MovieCard key={current.imdbID} movie={current} buttonMsg={'Add Movie'} />)
        })}
      </Grid>
      <Snackbar
        open={nomineeComplete}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        message="Nomination Complete! Feel free to change your choices by removing a nominee to add a different one."
      ></Snackbar>
    </Container>
  )
}

export default MovieDisplay
