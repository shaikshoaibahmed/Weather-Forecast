const apikey="8d164da8068af3dcf829e779770ffff6";
const apilink = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const checkbox = document.querySelector(".search input");
const checkbtn = document.querySelector(".button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city){
    const response = await fetch(apilink + city + `&appid=${apikey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp )+ "°c";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        
        if(data.weather[0].main == "Clouds"){
            weathericon.src = "images/clouds.png"
        }else if (data.weather[0].main == "Drizzle"){
            weathericon.src = "images/drizzle.png"
        }else if (data.weather[0].main == "Mist"){
            weathericon.src = "images/mist.png"
        }else if (data.weather[0].main == "Rain"){
            weathericon.src = "images/rain.png"
        }else if (data.weather[0].main == "Clear"){
            weathericon.src = "images/clear.png"
        }else{
            weathericon.src = "images/snow.png"
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

checkbtn.addEventListener("click", ()=>{
    checkweather(checkbox.value);

})