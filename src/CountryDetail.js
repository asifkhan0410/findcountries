import React from 'react'
import { useHistory } from 'react-router';
import backicon from './images/back.svg';
import './CountryDetails.css'
import { Link } from 'react-router-dom';

function CountryDetail({country}) {
    
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
    
  const history = useHistory(); 
    return (
        <div className="countrypage">
            <button className="backbtn" onClick={()=> history.push('/')}><img src={backicon} alt="backbtn"/>Back</button>
            <div className="countrydetails">
                <img src={country.flag} alt={country.name}/>
                <div className="country__detail">
                    <h1>{country.name}</h1>
                    <div className="country__info">
                        <div className="info__left">
                        <p>Native Name :  <span>{country.nativeName}</span> </p>
                        <p>Population : <span>{numberWithCommas(country.population)}</span> </p>
                        <p>Region : <span>{country.region}</span></p>
                        <p>Sub Region : <span>{country.subregion}</span></p>
                        <p>Capital : <span>{country.capital}</span></p>
                        </div>
                        <div className="info__right">
                        <p>Top Level Domains : <span>{country.topLevelDomain[0]}</span> </p>
                        <p>Curencies : <span>{country.currencies[0].name}</span> </p>
                        <p>Languages: {country.languages.map(lang => {
                            return <span>{lang.name}</span>
                        })}</p>
                        </div>
                    </div>
                    <div className="country__border">
                        <p>Border Countries: {country.borders.length>0 ? country.borders.map(border =>{
                            return <Link to={`/${border}`} ><span>{border}</span></Link>
                        }): "  Yay!!! you found a Island"} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryDetail
