import { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { getJsonData, getTestJsonData } from "../../utils/fetch-data";

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

    return (
        <>
            <MapContainer center={[40.760780, -111.891045]} style={{width: '100%', height: '600px'}} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    maxZoom={15}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapData.map((data, idx) => {
                    return (
                        <GeoJSON key={idx} data={data} onEachFeature={(feature, layer) => {
                            const results = {
                                name: feature.properties.name,
                                city: feature.properties.city,
                                state: feature.properties.state
                            }
                            const formattedResults = `${results.name}. ${results.city}, ${results.state}`; 
                            layer.bindPopup(formattedResults)
                        }} />
                    );
                })}

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
            </MapContainer>
        </>
    )
}


export default Map;