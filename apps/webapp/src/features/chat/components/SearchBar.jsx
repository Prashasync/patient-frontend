import React from 'react'
import { IoFilterSharp } from "react-icons/io5";

const SearchBar = () => {
return (
  <div className="search-bar">
    <form>
      <input
        type="text"
        placeholder="Search messages..."
        className="search-input"
      />
    </form>
    <IoFilterSharp size={30}/>
  </div>
);
}

export default SearchBar