import { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { getJsonData, getTestJsonData } from "../../utils/fetch-data";
import MapSearch from "./mapSearch";
import GeoLocateMapCenter from './atoms/geolocate';
import styled from 'styled-components';

const Map = () => {    
    const [mapData, setMapData] = useState([]);

    const customMarkerIcon = new L.Icon({
        iconUrl: '/icons/belt.png',
        iconRetinaUrl: '/icons/belt.png',
        popupAnchor: [-0, -0],
        iconSize: [32,32],     
    });

    const renderMapJson = async () => {
        //const geoJson = await getJsonData(); // API data 
        const geoJson = await getTestJsonData(); // test local data
        setMapData(geoJson.academies) // test data: geoJson.academies / api data: geojson
    }

    useEffect(() => {
        renderMapJson()
    }, []);

    // default map center & request user location
    return (
        <>
            <StyledMapContainer center={[50, -121]} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    maxZoom={15}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png" // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
                />
                {mapData && mapData.map((data, idx) => {
                    return (
                        <>             
                            <GeoJSON key={idx} data={data}  
                                    onEachFeature={(feature, layer) => {
                                        const results = {
                                            name: feature.properties.name,
                                            city: feature.properties.city,
                                            state: feature.properties.state,
                                            address: feature.properties.address,
                                            website: feature.properties.website
                                        }
                                    const formattedResults = `${results.name}. ${results.city}, ${results.state}
                                                              ${results.address}. ${results.website}`; 
                                    layer.bindPopup(formattedResults)
                            }} pointToLayer={(feature, latlng) => { 
                                // set custom icon
                                return L.marker(latlng, { icon: customMarkerIcon }) 
                            }} />
                       </>
                    );
                })}

                {/* API data shape: */}
                {/* {mapData && mapData.map((data) => {
                        return data.data.map((item, idx) => {
                            return (
                                <>
                                    <GeoJSON key={idx} data={item} onEachFeature={(feature, layer) => {
                                        const results = {
                                            name: feature.properties.name,
                                            city: feature.properties.city,
                                            state: feature.properties.state,
                                            address: feature.properties.address,
                                            website: feature.properties.website
                                        }
                                        const formattedResults = `${results.name}. ${results.city}, ${results.state}
                                                                ${results.address}. ${results.website}`; 
                                        layer.bindPopup(formattedResults)
                                    }} pointToLayer={(feature, latlng) => { 
                                        // set custom icon
                                        return L.marker(latlng, { icon: customMarkerIcon }) 
                                    }} />
                                </>
                            );
                        });
                    })
                } */}
                <GeoLocateMapCenter />
                <MapSearch dataList={mapData} />
            </StyledMapContainer>         
        </>
    )
}

const StyledMapContainer = styled(MapContainer)`
    width: 60%;
    height: 100vh;
`;

export default Map;