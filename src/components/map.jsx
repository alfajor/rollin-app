import { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet'
import { getJsonData, getTestJsonData } from "../../utils/fetch-data";
import Search from "./search";
import styled from 'styled-components';

const Map = () => {    
    const [mapData, setMapData] = useState([])

    const renderMapJson = async () => {
        // const geoJson = await getJsonData(); // API data 
        const geoJson = await getTestJsonData(); // test local data
        setMapData(geoJson.academies)
    }

    useEffect(() => {
        renderMapJson()
    }, []);

    const customMarkerIcon = new L.Icon({
        iconUrl: '../public/vite.svg',
        iconRetinaUrl: '../public/vite.svg',
        popupAnchor: [-0, -0],
        iconSize: [32,45],     
    });

    // TODO: req user location as map center / default to somewhere
    return (
        <>
            <StyledMapContainer center={[40.760780, -111.891045]} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    maxZoom={15}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png" // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
                />
                
                {mapData && mapData.map((data, idx) => {
                    return (
                        <>    
                            {/* TODO: custom markers all around */}
                            <Marker icon={customMarkerIcon} position={[40, -111]}>                    
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
                            }} />
                            </Marker>
                       </>
                    );
                })}

                {/* API data shape: */}
                {/* {mapData.map((data) => {
                        return data.data.map((item, idx) => {
                            return (
                                <GeoJSON key={idx} data={item} onEachFeature={(feature, layer) => {
                                    const results = {
                                        name: feature.properties.name,
                                        city: feature.properties.city,
                                        state: feature.properties.state
                                    }
                                    const formattedResults = `${results.name}. ${results.city}, ${results.state}`; 
                                    layer.bindPopup(formattedResults)
                                }} />
                            )
                        });
                    })
                } */}
                <Search dataList={mapData} />
            </StyledMapContainer>
        </>
    )
}

const StyledMapContainer = styled(MapContainer)`
    width: 60%;
    height: 100vh;
`;

export default Map;