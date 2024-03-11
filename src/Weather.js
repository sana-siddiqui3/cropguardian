import React, { useEffect, useState } from 'react';
import axios from 'axios';

function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [mapUrl, setMapUrl] = useState('');
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=88d6094d2110332d5e287f88c6ceea6f`
        );
        setWeatherData(response.data);
        setMapUrl(
            `https://tile.openweathermap.org/map/rain_new/2/1/1.png?appid=88d6094d2110332d5e287f88c6ceea6f` // Replace YOUR_API_KEY with your actual API key
          );
        console.log(response.data); //You can see all the weather data in console log
        } catch (error) {
             console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };
    return (
    <div>
        <form onSubmit={handleSubmit}>
         <input
         type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
        </form>
        {weatherData ? (
        <><h2>&nbsp;</h2>
        
        <div className="main-temp">{Math.round(weatherData.main.temp)}°C</div>
        <div className="main-description">{capitalizeFirstLetter(weatherData.weather[0].description)}</div>
        <div className='style'>
        <div className="moisture">{ weatherData.main.grnd_level}m</div>
        <div className="humidity"> {weatherData.main.humidity}%</div>
        <div className="rain">{Math.round(weatherData.rain)}mm</div>
        <div className="wind">{Math.round(weatherData.wind.speed)}m/s</div> 
        </div>
        <img src={mapUrl} alt="Weather Map" style={{ width: '100%', marginTop: '10px' }} />

        </>
        ) : (
            <h2>&nbsp;</h2>
        )}
     </div>
    );
};
export default Weather;