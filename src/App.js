import React, {useEffect, useState } from 'react'
import './App.css';
import searchicon from './images/search.svg'
import searchicon2 from './images/search2.svg'
import openicon from './images/open.svg'
import closeicon from './images/close.svg'
import moon from './images/moon.svg';
import moon2 from './images/moon2.svg';
import {ThreeDots} from 'svg-loaders-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import CountryDetail from './CountryDetail';

function App() { 
  const [darkmode, setDarkMode] = useState(false);
  const [countryname, setCountryName] = useState('');
  const [filters, setFilters] = useState('');
  const [togglefilter, setToggleFilter] = useState(true);
  const [countries,setCountries] = useState([]);

  useEffect(()=>{
    fetch(`https://restcountries.eu/rest/v2/all`).then(res => res.json()).then(data => {
      setCountries(data);
    })
  },[])
  
  useEffect(()=>{
    if(filters){
      fetch(`https://restcountries.eu/rest/v2/region/${filters}`).then(res => res.json()).then(data => {
      setCountries(data);
    })
    }
  },[filters])

  useEffect(()=>{
    if(countryname){
      fetch(`https://restcountries.eu/rest/v2/name/${countryname}`).then(res => res.json()).then(data => {
      setCountries(data);
    })
  }
  else{
    fetch(`https://restcountries.eu/rest/v2/all`).then(res => res.json()).then(data => {
      setCountries(data);
    })
  }
  },[countryname])

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <Router>
    <div className={`App ${!darkmode? 'light' : 'dark'}`}>
      <header>
        <h1>Where in the world?</h1>
        <h3 onClick={()=> setDarkMode(!darkmode)}><img src={!darkmode? moon: moon2} alt="Light/Dark Mode"/>{!darkmode? 'Dark Mode' : 'Light Mode'}</h3>
      </header>
      <Switch>
        {countries.length>0? countries.map(
          (country,index) =>{
            return <Route path={`/${country.alpha3Code}`}>
              <CountryDetail country={country}/>
            </Route>
          }
        ):""}
        <Route path="/">
      <div className='search__filter'>
        <div className="search">
          <img src={darkmode? searchicon2 :searchicon} alt="searchicon"/>
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
            {countries.length>0? countries.map((country,index) =>{
            return <Link to={`/${country.alpha3Code}`} ><div key={index} className="country">
                      <div className="country__flag" style={{backgroundImage:`url(${country.flag})`}}></div>
                      <div className="country__details">
                        <h1>{country.name}</h1>
                        <p>Population: <span>{numberWithCommas(country.population)}</span></p>
                        <p>Region: <span>{country.region}</span></p>
                        <p>Capital: <span>{country.capital}</span></p>
                      </div>
                    </div></Link>
            }):<div className="spinner"><ThreeDots fill="#66fcf1" trokeopacity=".125" /></div>}
      </div>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
