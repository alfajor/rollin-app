import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const GeoLocateMapCenter = () => {
    const map = useMap();

    useEffect(() => { 
        // get geolocation permission from localstorage 
        let userGeoLocationAccess = localStorage.getItem('location-granted')

        if(userGeoLocationAccess === 'false') {
            console.log('User blocked geo location access') // comment / remove in prod
            return
        }

        // get user device location: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
        let currentCoordinates = []; 
        navigator.geolocation.getCurrentPosition((position) => {
            currentCoordinates.push(position.coords.latitude, position.coords.longitude);
        
            map.flyTo(currentCoordinates, 10)
            localStorage.setItem('location-granted', true) // allow geo-location
            
        }, (err) =>  {
            console.log(`Location denied`, err)
            localStorage.setItem('location-granted', false) // deny geo-location
        })

    }, []);

    return null
}

export default GeoLocateMapCenter;