import React from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Marker} from 'react-leaflet';
import {VenueLocationIcon} from './VenueLocationIcon';

function MyMapComponent({coordinates}) {
    const map = useMap();
    map.setView(coordinates);
    return null;
}

export default function MapView({coordinates}) {
    return (
        <div>
        <MapContainer center={coordinates} zoom={13}>
            <MyMapComponent coordinates={coordinates}/>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={coordinates} icon={VenueLocationIcon} ></Marker>
        </MapContainer>
        </div>
    )
}
