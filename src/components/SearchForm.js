import React from 'react';

const SearchForm = ({
    searchFor,
    setSearchFor,
    handleSearch
}) => {
    return (
        <form className='search-form '>
            <input type='text' value={searchFor} onChange={(e) => setSearchFor(e.target.value)} />
            <button onClick={(e) => handleSearch(e)}>
                <i className="fas fa-search"></i>
            </button>
        </form>
    );
}

export default SearchForm;