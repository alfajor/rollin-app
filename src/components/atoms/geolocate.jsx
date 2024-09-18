import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const GeoLocateMapCenter = () => {
    const map = useMap();

    useEffect(() => { 
        // get user device location: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
        // TODO: request once & remember selection - local storage?
      
        let currentCoordinates = []; 
        navigator.geolocation.getCurrentPosition((position) => {
            currentCoordinates.push(position.coords.latitude, position.coords.longitude);

            localStorage.setItem('geoCoord', currentCoordinates)
            map.flyTo(currentCoordinates)

        }, (err) => console.log(`Location denied`, err))

    }, []);

    return null
}

export default GeoLocateMapCenter;