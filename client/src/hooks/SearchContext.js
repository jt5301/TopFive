import React, { createContext, useState } from "react";

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [nominees, setNominee] = useState({})
  const [atLimit, setLimit] = useState(false)
  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        nominees,
        setNominee,
        atLimit,
        setLimit
      }}>
      {children}
    </SearchContext.Provider>
  )
}
