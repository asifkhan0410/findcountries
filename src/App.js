import React, {useEffect, useState } from 'react'
import './App.css';
import searchicon from './images/search.svg'
import openicon from './images/open.svg'
import closeicon from './images/close.svg'

function App() {  
  const [darkmode, setDarkMode] = useState(false);
  const [countryname, setCountryName] = useState('');
  const [filters, setFilters] = useState('');
  const [togglefilter, setToggleFilter] = useState(true);

  return (
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <h3 onClick={()=> setDarkMode(!darkmode)}>{darkmode? 'Dark Mode' : 'Light Mode'}</h3>
      </header>
      <div className='search__filter'>
        <div className="search">
          <img src={searchicon} alt="searchicon"/>
          <input type="search" value={countryname} onChange={(e) => setCountryName(e.target.value)} placeholder="Search for a country..."/>
        </div>
        <div className="filters">
          <div className="filters__holder" onClick={() => setToggleFilter(!togglefilter)}>
            <h3>{filters? filters : 'Filter by Region'}</h3>
            <img src={togglefilter? openicon : closeicon} alt="filters"/>  
          </div>
          {!togglefilter? 
           <div className="holder__options">
             <option value="Africa" onClick={(e)=> {setFilters(e.target.value); setToggleFilter(!togglefilter)}}>Africa</option>
             <option value="America" onClick={(e)=> {setFilters(e.target.value); setToggleFilter(!togglefilter)}}>America</option>
             <option value="Asia" onClick={(e)=> {setFilters(e.target.value); setToggleFilter(!togglefilter)}}>Asia</option>
             <option value="Europe" onClick={(e)=> {setFilters(e.target.value); setToggleFilter(!togglefilter)}}>Europe</option>
             <option value="Oceania" onClick={(e)=> {setFilters(e.target.value); setToggleFilter(!togglefilter)}}>Oceania</option>
           </div>
          : ""}
        </div>
      </div>
      <div className="countries">
        
      </div>
    </div>
  );
}

export default App;
