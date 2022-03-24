var form = document.querySelector('form')
var input = document.querySelector('input')
var weather = document.getElementById('weather')

form.onsubmit = function(e) {
  e.preventDefault();

  while (weather.firstChild)
  weather.firstChild.remove()

  var userInput = input.value.trim()
  if (!userInput) return
  getWeather(userInput)
    .then(displayWeatherInfo)
    .catch(displayLocNotFound)

  input.value = ""
}

function getWeather(query) {
  if (!query.includes(",")) query += ',us'

  return fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=c287dea7bd0a8c10bff8c6946abef101'
  )

  .then(function(res) {
    return res.json()
  })

  .then(function(data){

    var div = document.createElement('div')
    var h2 = document.createElement('h2')

    h2.textContent = data.name + "," + " " +data.sys.country
    div.appendChild(h2) // Name of the Searched City with Country Code

    var img = document.createElement('img')
    img.src =  'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
    div.appendChild(img) // Icon image for current weather condition


    var des = document.createElement('p')
    des.textContent = data.weather[0].description
    div.appendChild(des) // Description of current weather

    var br = document.createElement('br')
    div.appendChild(br) // Line break

    var temp = document.createElement('p')
    temp.textContent = 'Current Temperature:' + " " + data.main.temp + "°F"
    div.appendChild(temp) // Current Temperature

    var ftemp = document.createElement('p')
    ftemp.textContent = 'Feels Like:' + " " + data.main.feels_like + "°F"
    div.appendChild(ftemp) // Current "feels like" Temperature

    weather.appendChild(div)
  })
}
