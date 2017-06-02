
$(document).ready(function() {

  getUserInfo();
});

var coord = document.getElementById("data");   //going to be used for error and getting geo coordinates
var trial = document.getElementById("trial");
var lol = document.getElementById("output");

function getUserInfo () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    coord.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    var api = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0d7939a488c0be7bd998e26ef8c06a7d/" + lat + "," + long;
    // coord.innerHTML = "Lat: " + lat + " & Long: " + long;
    getWeather(api);
}

function getWeather(api){
    $.getJSON(api, function(data){
        getHeader(data.currently);

        lol.innerHTML = Math.round(data.currently.temperature);
        trial.innerHTML = data.hourly.summary;
        // document.getElementById("image").src="icons/cloud-sun.svg";
        weatherIcon(data.currently.icon, "image");

        var d = new Date();
        var n = d.getHours();
        var day = d.getDay();
        
        //4 boxes
        for(var i=1; i<=4; i++){
            if (i!=1) getDayWeek(day, "day"+i);
            document.getElementById("fourDesc"+i).innerHTML=data.daily.data[i-1].summary;
            document.getElementById("fourIcon"+i).innerHTML=data.daily.data[i-1].icon;
            document.getElementById("fourTemp"+i).innerHTML=Math.round(data.daily.data[i-1].temperatureMax)+"&deg";
            document.getElementById("fourPrec"+i).innerHTML+=parseFloat(data.daily.data[i-1].precipProbability)*100+"%";
            day++;
        }     

        getBackground(n, data.currently.icon);
        for(var i=1; i<=8; i++){
            if(n>12) n=n-12;
            document.getElementById("time"+i).innerHTML=n+":00";
            weatherIcon(data.hourly.data[i-1].icon, "logo"+i);
            document.getElementById("desc"+i).innerHTML=data.hourly.data[i-1].summary;
            document.getElementById("temp"+i).innerHTML=Math.round(data.hourly.data[i-1].temperature)+"&deg";
            document.getElementById("prec"+i).innerHTML=parseFloat(data.hourly.data[i-1].precipProbability)*100+"%";
            document.getElementById("wind"+i).innerHTML=data.hourly.data[i-1].windSpeed+" mph";
            n++;
        }
    });
}

function getDayWeek(day, dayId){
    switch(day){
            case 0: 
                document.getElementById(dayId).innerHTML="SUN";
                break;
            case 1: 
                document.getElementById(dayId).innerHTML="MON";
                break;
            case 2: 
                document.getElementById(dayId).innerHTML="TUE";
                break;
            case 3: 
                document.getElementById(dayId).innerHTML="WED";
                break;
            case 4: 
                document.getElementById(dayId).innerHTML="THU";
                break;
            case 5: 
                document.getElementById(dayId).innerHTML="FRI";
                break;
            case 6: 
                document.getElementById(dayId).innerHTML="SAT";
                break;
        }
}

function getHeader(current) {
    document.getElementById("wind").innerHTML+=Math.round(current.windSpeed) + " mph";
    document.getElementById("humidity").innerHTML+=parseFloat(current.humidity)*100 + "%";
    document.getElementById("dew").innerHTML+=current.dewPoint + "&deg";
    document.getElementById("uv").innerHTML+=current.visibility + "+ mi";
    document.getElementById("pressure").innerHTML+=Math.round(current.pressure) + " mb";
}

function getBackground(n, weatherType){
    if (n<6 || n>=22) {$('body').css('background-image', 'url(images/night.jpg)');}
    else if (n>6) {$('body').css('background-image', 'url(images/sunset.jpg)');}
    else{
        switch (weatherType) {
            case "clear-day":
            case "wind":
                $('body').css('background-image', 'url(images/sun.jpg)');
                break;
            case "clear-night":
                $('body').css('background-image', 'url(images/night.jpg)');
                break;
            case "cloudy":
            case "fog":
                $('body').css('background-image', 'url(images/cloud.jpg)');
                break;
            case "partly-cloudy-day":
            case "partly-cloudy-night":
                $('body').css('background-image', 'url(images/partly.jpg)');
                break;
            case "rain":
            case "sleet":
            case "snow":
                $('body').css('background-image', 'url(images/rain.jpg)');
                break;
        }
    }
}

function weatherIcon(weatherType, weatherId) {
    switch (weatherType) {
        case "clear-day":
            document.getElementById(weatherId).src="icons/sun.svg";
            break;
        case "clear-night":
            document.getElementById(weatherId).src="icons/moon.svg";
            break;
        case "partly-cloudy-day":
            document.getElementById(weatherId).src="icons/cloud-sun.svg";
            break;
        case "partly-cloudy-night":
            document.getElementById(weatherId).src="icons/cloud-moon.svg";
            break;
        case "cloudy":
            document.getElementById(weatherId).src="icons/cloud.svg";
            break;
        case "rain":
            document.getElementById(weatherId).src="icons/cloud-rain.svg";
            break;
        case "sleet":
            document.getElementById(weatherId).src="icons/cloud-hail-alt.svg";
            break;
        case "snow":
            document.getElementById(weatherId).src="icons/cloud-snow.svg";
            break;
        case "wind":
            document.getElementById(weatherId).src="icons/wind.svg";
            break;
        case "fog":
            document.getElementById(weatherId).src="icons/cloud-fog.svg";
            break;
        default:
            document.getElementById(weatherId).src="icons/cloud-fog.svg";
            break;
    }
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED: 
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}