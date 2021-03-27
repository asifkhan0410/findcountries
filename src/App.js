import React, {useEffect, useState } from 'react'
import './App.css';
import searchicon from './images/search.svg'

function App() {  
  const [darkmode, setDarkMode] = useState(false);
  const [countryname, setCountryName] = useState('');
  const [filters, setFilters] = useState('');
  return (
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <h3 onClick={()=> setDarkMode(!darkmode)}>{darkmode? 'Dark Mode' : 'Light Mode'}</h3>
      </header>
      <div className='search__filter'>
        <div>
          <img src={searchicon} alt="searchicon"/>
          <input type="search" value={countryname} onChange={(e) => setCountryName(e.target.value)} placeholder="Search for a country..."/>
        </div>
        <select value={filters} onChange={(e)=> setFilters(e.target.value)}>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}

export default App;
