// Get user's location

const locationText = document.getElementById("location");

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        success,

        error

    );

} else {

    locationText.innerHTML = "📍 Location not supported";

}

function success(position){

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    locationText.innerHTML =
    "📍 Latitude: " +
    latitude.toFixed(4) +
    " Longitude: " +
    longitude.toFixed(4);

}

function error(){

    locationText.innerHTML =
    "📍 Location permission denied";

}