import React from 'react'

const Search = ({ filterCountries, searchInputValue }) => {
    return (<div>
        <input onChange={filterCountries} value={searchInputValue} />
    </div>
    )
}

export default Search;
