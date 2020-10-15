import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { SearchContext } from '../hooks/SearchContext'
import axios from 'axios'
import { MovieCard } from '../components/MovieCard.js'
import { CustomSnackbar } from '../components/Snackbar.js'

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
    if (searchParam.nomineeCount() === 5) {
      setNomineeComplete(true)
    }
    else {
      setNomineeComplete(false)

    }
  }, [searchParam])//supposed to be searchParam.nominees

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
      <CustomSnackbar message={"Nomination Complete! Feel free to change your choices by removing a nominee to add a different one."} trigger={nomineeComplete} />
    </Container>
  )
}

export default MovieDisplay
