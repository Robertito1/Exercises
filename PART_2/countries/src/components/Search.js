import React from 'react'

const Search = ({ filterCountries, searchInputValue }) => {
    return (
        <input onChange={filterCountries} value={searchInputValue} />
    )
}

export default Search;
