import React, { createContext, useState } from "react";

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [nominees, setNominee] = useState({})

  function nomineeCount() {
    let limitFive = 0
    let nomineeKeys = Object.keys(nominees)
    for (let key of nomineeKeys) {
      if (nominees[key]) limitFive += 1
    }
    return limitFive
  }
  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        nominees,
        setNominee,
        nomineeCount,

      }}>
      {children}
    </SearchContext.Provider>
  )
}
