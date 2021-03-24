import React, {useEffect, useState } from 'react'
import './App.css';
import MapView from './components/MapView';
import {ThreeDots} from 'svg-loaders-react';

function App() {
  const [ip, setIp] = useState('');
  const [address, setAddress] = useState();
  const [lat, setLat] =useState('');
  const [lng, setLng] =useState('');
  const coordinates = [lat,lng];
  const [toggle,setToggle] = useState(true);

  //used to fetch the initial location of the user
  useEffect(() => {
     fetch(`https://geo.ipify.org/api/v1?apiKey=at_OePuO3dGE6fMS6fksNAPi4hSXSCZe`).then(res => res.json()).then(data => {
      setAddress(data);
      setLat(data.location.lat);
      setLng(data.location.lng);
    })
  }, [])

//used to fetch the location on search
  async function searchIp(){
    setToggle(false);
    await fetch(`https://geo.ipify.org/api/v1?apiKey=at_OePuO3dGE6fMS6fksNAPi4hSXSCZe&ipAddress=${ip}`).then(res => res.json()).then(data => {
      if(data.code!==422){
        setAddress(data);
        setLat(data.location.lat);
        setLng(data.location.lng);
      }else{
        // this sets the message when user is putting wrong ip
        alert(data.messages);
      }
    })
    setToggle(true);
    setIp('');
  }
  console.log(address)

  return (
    <div className="App">
      <h1>IP Address Tracker</h1>
      <input type="text" value={ip} placeholder="Search for any IP address or domain" onChange={(e) => setIp(e.target.value)}/>
      <button onClick={searchIp}>{toggle?<svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>: <div className="searchspinner"><ThreeDots fill="#66fcf1" trokeopacity=".125" /></div>}</button>
      <div className = "address">
        <div className="addressbody"><span>IP ADDRESS</span><h2>{address? address.ip :<div className="spinner"><ThreeDots fill="#66fcf1" trokeopacity=".125" /></div> }</h2></div>
        <div className="addressbody"><span>LOCATION</span><h2>{address? address.location.city + ',' : <div className="spinner"><ThreeDots fill="#66fcf1" trokeopacity=".125" /></div>} {address? address.location.country : ''} {address?  address.location.postalCode : ''}</h2></div>
        <div className="addressbody"><span>TIMEZONE </span><h2>{address? 'UTC' + address.location.timezone : <div className="spinner"><ThreeDots fill="#66fcf1" trokeopacity=".125" /></div>}</h2></div>
        <div className="addressbody last"><span>ISP </span><h2>{address? address.isp : <div className="spinner"><ThreeDots fill="#66fcf1" trokeopacity=".125" /></div>}</h2></div>
      </div>
      <MapView coordinates={coordinates}/>
    </div>
  );
}

export default App;
