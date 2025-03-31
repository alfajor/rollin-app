import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const GeoLocateMapCenter = () => {
    const map = useMap();

    // TODO: remember selection and don't re-prompt after refresh
    useEffect(() => { 
        // get user device location: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
        let currentCoordinates = []; 
        navigator.geolocation.getCurrentPosition((position) => {
            currentCoordinates.push(position.coords.latitude, position.coords.longitude);
        
            map.flyTo(currentCoordinates)
            
        }, (err) => console.log(`Location denied`, err))
    }, []);

    return null
}

export default GeoLocateMapCenter;