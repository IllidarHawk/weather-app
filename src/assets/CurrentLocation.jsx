import { useEffect, useState } from "react";


const API_KEY = import.meta.env.VITE_WEATHER_KEY;

let lat, long;



export function CurrentLocation() {
    const [ tempScale, setTempScale] = useState("metric");
    
    const [ localWeather, setLocalWeather ] = useState(null);
    
    const [ error, setError ] = useState(null);



    //* Check for geolocation functionality

    if (!navigator.geolocation) {
        setError("Geolocation is not supported for this browser")
        }

    useEffect( () => {
        
        //* Request user for current location data

        navigator.geolocation.getCurrentPosition(
        // If permitted
        (position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            onPermissionGiven(lat, long);
        },
        // If denied
        ( error) => {
            setError(`Error capturing data: ${error.name}`)
        }
        )}
    , [])

    
    
    
    
    
function onPermissionGiven(lat,long ) {
        
    //* GET location name
        
    fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${API_KEY}`)
        .then( response => response.json())
        .then( data => 
            setLocalWeather( { 
                location: data[0].name
            } )
            );
            
    //* GET location conditions
    
    fetch(`https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${long}&units=${tempScale}&lang=en&appid=${API_KEY}`)
    .then( response => response.json())
    .then( 
        ( { data: [ { temp, humidity, wind_speed, weather: [ {description, icon} ], } ] } ) => 
        setLocalWeather( {
            
                ...localWeather,
                conditions: description,
                temperature: temp, //,
                humidity,
                windSpeed: (Math.floor(wind_speed) * 18) / 5, // Convert m/sec -> km/h
                icon 
            } )
        )
}   //}
    
}
