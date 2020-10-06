import React, { useContext, useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { SearchContext } from '../hooks/SearchContext'
import { MovieCard } from './MovieCard.js'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar'
import axios from 'axios'

import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId();

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
  saveButton: {
    height: '20%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}))

const Nominees = () => {
  let movieParam = useContext(SearchContext)
  const classes = useStyles();
  const [instructions, setInstructions] = useState(true)
  const [saveButton, triggerSaveButton] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [listName, setListName] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('storedNominees')) || ""
    movieParam.setNominee(movies)
    const stringMovies = JSON.stringify(movies)
    localStorage.setItem('storedNominees', stringMovies)
  }, [])
  const handleOpen = () => {
    setOpenDialog(true)
  }
  const handleClose = () => {
    setOpenDialog(false)
  }
  const saveList = async () => {
    const saveNominees = {}
    for (let movie in movieParam.nominees) {
      if (movieParam.nominees[movie]) saveNominees[movie] = movieParam.nominees[movie]
    }

    try {
      const res = await axios.post('/movies', { user: listName + '-' + uid(), list: saveNominees })
      setSaveMessage(`Saved! Enter ${res.data} in the bar above to view at any time.`)

      handleClose()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let nomineeCount = 0
    //checks for number of nominees to trigger save button
    let noNominees = true
    Object.keys(movieParam.nominees).forEach((current) => {
      if (movieParam.nominees[current]) {
        nomineeCount += 1
        noNominees = false
      }
    })

    if (nomineeCount < 5) triggerSaveButton(false)
    else triggerSaveButton(true)
    if (noNominees) setInstructions(true)
    else setInstructions(false)
  }, [movieParam.nominees])

  return (
    <Container className={classes.root}>
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
      {saveButton ?
        <div className={classes.buttonContainer}>
          <Button className={classes.saveButton} variant="contained" color="primary" onClick={handleOpen} >
            Save your list
          </Button>
          <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <DialogTitle>Save Your Nominee List</DialogTitle>
              <DialogContentText>
                Enter your first and last name to share your list with others
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Full Name"
                type="name"
                fullWidth
                onChange={(event) => { setListName(event.target.value) }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={saveList} color="primary">
                Save
          </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
          </Button>
            </DialogActions>
          </Dialog>
        </div>
        : ""}
    </Container>
  )
}

export default Nominees
