import React, { useContext, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { SearchContext } from './SearchContext'
import { makeStyles, } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  root: {
    border: '1px solid #e2e2e1',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
  },
  logo: {
    marginTop: '18px'
  }
}))

const NavbarSearch = () => {
  const classes = useStyles()
  let searchTerm = useContext(SearchContext)
  const [search, setSearch] = useState('')
  const submitSearch = (event) => {
    event.preventDefault()
    searchTerm.setSearchTerm(search)
  }
  return (
    <AppBar position="relative">
      <Toolbar className={classes.navContainer} >
        <Typography className={classes.logo} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          The Shoppies
      </Typography>
        <Typography variant="h6" color="inherit" noWrap>
          <form onSubmit={(event) => { submitSearch(event) }}>
            <TextField InputProps={{ classes, disableUnderline: true }}
              id="standard-full-width"
              // style={{ margin: 8 }}
              placeholder="Title Keywords"
              fullWidth
              // margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavbarSearch
