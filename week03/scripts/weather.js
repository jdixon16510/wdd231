// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const lat = 49.75;
const lon = 6.64;
const apiid = '20d7c303d7045bf62ea7b94225fb20b4';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiid}&units=imperial`;


async function apiFetch() {
   try {
     const response = await fetch(url);
     if (response.ok) {
       const data = await response.json();
       console.log(data); // testing only
       displayResults(data); // uncomment when ready
     } else {
         throw Error(await response.text());
     }
   } catch (error) {
       console.log(error);
   }
}
 
apiFetch();

function displayResults(data) {
   currentTemp.innerHTML = `${data.main.temp}&deg;F`;
   const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
   let desc = data.weather[0].description;
   weatherIcon.setAttribute('src', iconsrc);
   weatherIcon.setAttribute('alt', desc);
   captionDesc.textContent = `${desc}`;
}
