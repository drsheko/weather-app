import './css/style.css';
var moment = require('moment-timezone');


async function getWeather (){
    let city = document.querySelector('.search').value;
    let cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0a4f4275928acafd3d539ecb15022ee3`


   try{
        const weather = await fetch(cityURL, {mode:'cors'}) ;
        const weatherResponse = await weather.json();
        console.log(weatherResponse)
        
        let lat = weatherResponse[0].lat ; 
        let lon = weatherResponse[0].lon ;

        let requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0a4f4275928acafd3d539ecb15022ee3`
   
        var reqWeather = await fetch (requestURL,{mode:'cors'})
        var w2response = await reqWeather.json()

        console.log(w2response)

      cityName.textContent = weatherResponse[0].name ;
      currentTemperature.textContent =Math.floor(w2response.current.temp -273);
      currentDescription.textContent = w2response.current.weather[0].description ;
       feelLike.textContent += w2response.current.feels_like 
       humidity.textContent += w2response.current.humidity
      
      var timeZone = w2response.timezone
      currentTime.textContent = moment.tz(timeZone).format('ddd h:mm a')
      
      let currentHour = moment.tz(timeZone).add(1,'hours').format('ha')
      
    
      fillHourlyContainer(timeZone, w2response)

      //createDailyCard (4, timeZone, w2response)

      fillDailyContainer(timeZone, w2response)
     
      
    }

   catch{

   }


}


const searchBtn = document.querySelector('.searchBtn')
searchBtn.addEventListener('click',getWeather)


const cityName = document.querySelector('.cityName')
const currentTemperature = document.querySelector('.currentTemperature');

const currentDescription = document.querySelector('.currentDescription') ;
const currentTime = document.querySelector('.currentTime')

const feelLike = document.querySelector(".feelLike")

const humidity = document.querySelector(".humidity")

const hourlyContainer = document.querySelector('.hourlyContainer')
const dailyContainer = document.querySelector('.dailyContainer')




function createDailyCard (index, tz, resp) {

  const card2 = document.createElement('div')
  card2.className="card2"
  dailyContainer.appendChild(card2)
  const cardDay = document.createElement('div')
  const cardImage2 = document.createElement('img')
  const cardMaxTemp = document.createElement('div')
  const cardMinTemp = document.createElement('div')
  card2.appendChild(cardDay)
  card2.appendChild(cardImage2)
  card2.appendChild(cardMaxTemp)
  card2.appendChild(cardMinTemp)
//console.log(moment.tz(timeZone).add(1,'hours').format('ha'))
cardDay.textContent =  moment.tz(tz).add(index,'days').format('ddd')
cardMaxTemp.textContent =Math.floor( resp.daily[index].temp.max -273) + 'C';
cardMinTemp.textContent =Math.floor( resp.daily[index].temp.min -273) + 'C';
cardImage2.src = '../src/icons/day.svg'
//cardImage.className='rain'
let imageSource ;
//getImage (index , resp)
//cardImage.src = './icons/day.svg';
}



function getImage (index , resp){
  alert('image')
let a = resp.hourly[index].weather.main ;
if (a==="rain"){ imageSource = './icons/rainy-1.svg'}
else { imageSource = './icons/day.svg'}

  return imageSource
}


function fillHourlyContainer(tz, resp){
  
  for (let i =1 ; i < 8 ; i++){
    
    createHourlyCard(i, tz, resp)
  }
}

function fillDailyContainer(tz, resp){
  
  for (let j = 0 ; j < 6 ; j++) {
    
    createDailyCard(j, tz, resp)
  }
}


function createHourlyCard (index, tz, resp) {

  const card = document.createElement('div')
  hourlyContainer.appendChild(card)
  const cardTime = document.createElement('div')
  const cardImage = document.createElement('img')
  const cardTemp = document.createElement('div')
  card.appendChild(cardTime)
  card.appendChild(cardImage)
  card.appendChild(cardTemp)
//console.log(moment.tz(timeZone).add(1,'hours').format('ha'))
cardTime.textContent =  moment.tz(tz).add(index,'hours').format('ha')
cardTemp.textContent = Math.floor( resp.hourly[index].temp -273) + 'C';
cardImage.src = "./icons/cloudy.svg"
}

