let lat, long


export function CurrentLocation() {

    // Check for geolocation functionality
    if (!('geolocation' in navigator)) {
        return <h3>Browser does not support geolocation</h3>;
        }

    // Request user for current location data
    navigator.geolocation.getCurrentPosition(
        // If permitted
        (position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            onPermissionGiven(lat, long)
        },
        // If denied
        ( error) => {
            return (
                <>
                <h3>
                    "Unable to get local weather data"
                </h3>
                <p>Error: {error.message}</p>
                </>
            )
        }
    )

    function onPermissionGiven(lat,long ) {
        // GET current location weather info
        fetch(`https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${long}&lang=el&appid=${import.meta.env.VITE_WEATHER_KEY}`)
        .then( response => response.json())
        .then( data => console.log(data))
    }

}
