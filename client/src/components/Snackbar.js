import React, { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar';

export const CustomSnackbar = (props) => {
  const [snackbar, displaySnackbar] = useState(props.trigger)
  const closeSnackbar = () => displaySnackbar(false)
  useEffect(() => {
    displaySnackbar(props.trigger)
  }, [props.trigger])
  return (
    <Snackbar
      message={props.message}
      autoHideDuration={3000}
      open={snackbar}
      onClose={closeSnackbar}
    />
  )
}

