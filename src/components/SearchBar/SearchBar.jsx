import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <input className="searchBar" type="text" placeholder="Search"
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar 