import React from 'react';
import Nominees from './Nominees.js'
import NavbarSearch from './NavbarSearch.js'
import MovieDisplay from './MovieDisplay.js'
import { SearchProvider } from './SearchContext.js'


export default function Landing() {


  return (
    <React.Fragment>
      <SearchProvider>
        <NavbarSearch />
        <Nominees />
        <MovieDisplay />
      </SearchProvider>

    </React.Fragment>
  );
}
