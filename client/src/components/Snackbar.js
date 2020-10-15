import React, { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar';

export const CustomSnackbar = (props) => {
  const [snackbar, displaySnackbar] = useState(props.trigger)
  const closeSnackbar = () => displaySnackbar(false)
  useEffect(() => {
    console.log('hello from snackbar', props.trigger)
    displaySnackbar(props.trigger)
    console.log(snackbar)
  }, [props.trigger])
  console.log(snackbar)
  return (
    <Snackbar
      message={props.message}
      autoHideDuration={2000}
      open={snackbar}
      onClose={closeSnackbar}
    />
  )
}

