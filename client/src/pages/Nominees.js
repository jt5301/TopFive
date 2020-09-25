import React, { useContext, useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { SearchContext } from './SearchContext'
import { MovieCard } from './MovieCard.js'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}))

const Nominees = () => {
  let movieParam = useContext(SearchContext)
  const classes = useStyles();
  const [instructions, setInstructions] = useState(true)
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('storedNominees')) || ""
    movieParam.setNominee(movies)
    const stringMovies = JSON.stringify(movies)
    localStorage.setItem('storedNominees', stringMovies)
  }, [])
  useEffect(() => {
    let noNominees = true
    Object.keys(movieParam.nominees).forEach((current) => {
      if (movieParam.nominees[current]) noNominees = false
    })
    if (noNominees) setInstructions(true)
    else setInstructions(false)
  }, [movieParam.nominees])
  return (
    <Container
      className={classes.cardGrid} maxwidth='xl'
      classes={{
        root: classes.root
      }} maxWidth="sm">
      {instructions ?
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Your nominee list is empty! Use the search bar above to find and add up to five films that you think should be up for nomination. They'll be displayed here.
          </Typography>
        :
        Object.keys(movieParam.nominees).map(
          (current) => {
            if (movieParam.nominees[current]) {
              return (<MovieCard key={current} movie={movieParam.nominees[current]}
                inNominee={true}
                buttonMsg={'Remove'} />)
            }
            else return ''
          })}
    </Container>
  )
}

export default Nominees
