import React , {useState , useEffect} from 'react';


export default function Weather() {
   const [city , setCity] = useState('Germany');
  const [weather , setWeather]= useState(null);
  const [temperature , setTemperature] = useState(null);

 /*using api to fetch weather data implementing useEffect hook */
  const apiKey = 'KxnWYDYcNHt+Wd2vMupUKQ==oeIkErfNMYOumXFF';

  const fetchWeather = () =>{
    fetch(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data =>  { 
       setWeather(data)
       setTemperature(data.temp)
      })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchWeather()
  }, []);

/*dynamic background changes using conditions */
const dynamicBackground = (weather) => {
  if (weather && weather.temp) {
    if (weather.temp > 25) {
      return 'sunny';
    } else if (weather.temp > 10) {
      return 'cloudy';
    } else {
      return 'rainy';
    }
  }
  return 'unknown';
}


const dynamicWeather = dynamicBackground(weather);
 
 /*displaying weather data */
  return (
	 <div className={`weather app ${dynamicWeather}`}>
  
    <div className="weather-display">
    <div className="input-section">
    <label htmlFor="location" className="input-label">Enter Location/City:</label>
    <input type="text" id="location" className="input-field"placeholder="Enter city, country" value={city}
      onChange={(e) => setCity(e.target.value)}/>
    <button onClick={fetchWeather} className="get-weather-button">Get Weather</button>
    <h1 className="city">{city}</h1>
    {weather &&  <h2 className="temp">{weather.temp}°</h2>}
</div>

{weather ? (
  <div className="weather-info">
    <p className="info-class">
    <i className="fa-solid fa-cloud" style={{color: '#fcfcfd'}}></i>clouds: {weather.cloud_pct}%
    </p>
    <p className="info-class">
    <i className="fa-solid fa-temperature-half" style={{color: '#fafcff'}}></i>Max: {weather.max_temp}°
    </p>
    <p className="info-class">
    <i className="fa-solid fa-temperature-half" style={{color: '#fafcff'}}></i>Min: {weather.min_temp}°
    </p>
   <p className="info-class">
   <i className="fa-solid fa-droplet" style={{color: '#ffffff'}}></i>humidity: {weather.humidity}
   </p>
    <p className="info-class">
    <i className="fa-solid fa-temperature-half" style={{color: '#fafcff'}}></i>feels-like: {weather.feels_like}°
    </p>
    <p className="info-class">
    <i className="fa-solid fa-wind" style={{color: '#f7f7f7'}}></i>wind-speed: {weather.wind_speed}
    </p> 
  </div>
) : (
  <p className="">Weather information not available.</p>
)}
 </div>
	</div>
  );
}


