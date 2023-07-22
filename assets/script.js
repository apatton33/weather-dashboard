var accesscityform = document.getElementById("search-cities");
var inputCity = document.getElementById("city");
var APIKey = "ddb15e7d75aebd51637150663ef14582";
var dateE1 = document.querySelector(".card-title");
var tempE1 = document.getElementById("temp");
var humidE1 = document.getElementById("humid");
var windE1 = document.getElementById("wind");
var uvlE1 = document.getElementById("uvl");
var futureE1 = document.getElementById("future-cast");
var getDateBack = document.getElementById("weather-card");
var searchHistory = JSON.parse(localStorage.getItem("searchHistoryList")) || [];
var containerE1 = document.getElementById("container");
var clearE1 = document.getElementById("clear-history");

function showweatherData(city) {
    console.log(city);
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=&appid=" + APIKey).then(function (response) {
      return response.json().then(function(data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
         fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey).then(function (response) {
          return response.json().then(function (weatherData) {
             console.log(weatherData);
             tempE1.textContent = "Temp:" + weatherData.list[0].main.temp + "F";
            humidE1.textContent = "Hum:" + weatherData.list[0].main.humidity + "%";
            windE1.textContent = "Wind Speed:" + weatherData.list[0].wind.speed + "MPH";

            var date = dayjs.unix(weatherData.list[0].dt).format("MM/DD/YYYY");
            dateE1.textContent = city + "" + date;
            document.getElementById("future-header").textContent = "5 Day Forecast:"
            futureE1.innerHTML = "";
            for (let i = 0; i < weatherData.list.length; i+=7) {
                var col = document.createElement("div");
                col.setAttribute("class", "col");
                var cards = document.createElement("div");
                cards.setAttribute("class", "card");
                var cardBody = document.createElement("div");
                cardBody.setAttribute("class", "card-body");
                var h4  = document.createElement("h4").textContent = dayjs.unix(weatherData.list[i].dt).format("MM/DD/YYYY");
                var newTemp = document.createElement("p").textContent = "Temp: " + weatherData.list[i].main.temp + "F\n";
                var newHumid = document.createElement("p").textContent = "Humid: " + weatherData.list[i].main.humidity + "%";
                //cardBody.append(h4, newTemp, newHumid);
                //cardBody.appendChild(cardBody);
                //cards.append(cards);
                cardBody.append(h4)
                cardBody.append(newTemp)
                cardBody.append(newHumid)
                cards.append(cardBody)
                col.append(cards);
                futureE1.append(col);

                }  
               })  
            })
         })
     })
 }

containerE1.addEventListener("click", function (e) {
console.log(e.target);
var city = e.target.getAttribute("data-city");
showweatherData(city)
})


accesscityform.addEventListener("submit", function(event) {
    event.preventDefault();
    getDateBack.classList.remove("weather")
    getDateBack.style.display = "block";
    var city = document.getElementById("city").value;
    saveSearch(city);
    showweatherData(city)
})

clearE1.addEventListener("click", function() {
localStorage.removeItem("searchHistoryList");
containerE1.innerHTML = "";
searchHistory = [];

}
)

function saveSearch(city) {
    searchHistory.push(city);
    localStorage.setItem("searchHistoryList", JSON.stringify(searchHistory));
    containerE1.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        var btn = document.createElement("button");
        btn.textContent = searchHistory[i];
        btn.classList.add("searched-city");
        btn.setAttribute("data-city" , searchHistory[i]);
        containerE1.append(btn);
        
    }
}

        
    //fetch("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}")
   // return outcome.JSON().then(function(weatherData) {
        //console.log(weatherData);
        //var weatherIcon = weatherData.currnet.weather[0].icon; 
        //tempE1.textContent = "Temperature:" + weatherData.current.temp + "F";
        //humidE1.textconten = "Humididty:" + weatherData.current.humidity + "%";
        //windE1.textContent = "Wind Speed:" + weatherData.current.wind_speed + "mph";
       // uvlE1.textContent = "UVI:" + weatherData.current.uvl;
    //}))};





