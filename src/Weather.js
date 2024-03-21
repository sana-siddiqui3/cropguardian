import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import {Search} from './Icons';


function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  
//API Data from OpenWeather 
const Weather = ({onCityCoordinatesChange, onTemperatuerChange}) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState([]);

    const fetchData = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7de782c975d88bc1d52483ddf682d5e3`
        );

        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&appid=7de782c975d88bc1d52483ddf682d5e3`
        );

        const hourlyResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=72bc0dc335e7839c0c085d683e32a15c`
        );

        setWeatherData(response.data);
        setForecastData(forecastResponse.data.list);
        const hourlyData = hourlyResponse.data.list.slice(0, 9); // Get next 24 hours' forecasts with 3 hour breaks
        setHourlyForecast(hourlyData);
        drawChart(hourlyData);
        
        console.log(hourlyResponse.data.list.slice(0, 9)); //You can see all the weather data in console log
        const coordinates = [response.data.coord.lat, response.data.coord.lon];
        onCityCoordinatesChange(coordinates); //pass coordinates to App
        const temperature = response.data.main.temp; //pass temperature to onTemperatureChange callback
        onTemperatuerChange(temperature); //pass to App
        } catch (error) {
             console.error(error);
        }
        
    };

    //access location, automatically locate map 
    const showLoc = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    .then(response => {
                        const city = response.data.address.city;
                        setCity(city);
                        fetchData(city);
                    })
                    .catch(error => {
                        console.error("Error fetching city information:", error);
                    });
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        showLoc(); // Get current city on component mount
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        if (hourlyForecast.length > 0) {
            drawChart(hourlyForecast);
        }
    }, [hourlyForecast]);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(city);
    };

    //Weekly forcecast 
    function formatDate(timestamp) {
        var milliseconds = timestamp * 1000;
        var dateObject = new Date(milliseconds);
        var formattedDate = dateObject.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        return formattedDate;
    }
    
    //Recommendations based on temperature 
    const getRecommendation = () => {
        if (weatherData) {
            const temperature = weatherData.main.temp; //35, 0, 14, 6
            const windSpeed = weatherData.wind.speed;

            let recommendation = '';
            
            if (temperature > 30) {
                recommendation = 'Extreme heat warning. Provide shade and ample water for your crops and livestock to prevent heat stress and maintain their well-being.';
            }
            else if (temperature <= 0) {
                recommendation = 'Extreme cold warning. Consider using row covers or mulch to protect crops from frost damage.';
            } 
            else if (temperature > 20) {
                recommendation = 'Ensure both yourself and your crops have access to plenty of clean water to stay hydrated.';
            } 
            else if (temperature < 10){
                recommendation = 'In cold, dry weather, protect your crops by providing insulation and ensuring adequate heat sources and moisture levels in the soil.';
            }
            else {
                recommendation = 'Maintain regular crop monitoring and ensure proper irrigation and nutrition during average temperatures for optimal growth and yield.';
            }

            if (windSpeed > 9) {
                recommendation = 'High wind speeds detected. Secure loose objects and structures on the farm to prevent damage and ensure the safety of crops and livestock.';
            }
            return recommendation;
        }
        return '';

    };

    //Hourly forecast graph 
    const drawChart = (hourlyData) => {
        const label = hourlyData.map(entry => {
            const dateTime = new Date(entry.dt_txt);
            return dateTime.toLocaleTimeString('en-UK', {hour: '2-digit'});
        });
    
        const chartElement1 = document.getElementById('hourlyChartTemp');
        if (!chartElement1) {
            console.error("Canvas element not found.");
            return;
        }

        //Destroy existing chart if it exists
       if (window.chartInstance1) {
            window.chartInstance1.destroy();
       }
       
        window.chartInstance1 = new Chart( document.getElementById('hourlyChartTemp'), 
            {
                type: 'line',
                data: {
                    labels: label,
                    datasets: [{
                        label: 'Temperature °C',
                        data: hourlyData.map(entry => Math.round(entry.main.temp)),
                        borderColor:'rgb(227, 178, 172)',
                        lineTension: 0.5,
                        backgroundColor: 'rgba(227, 178, 172, 0.3)',
                        fill: true,
                    }, 
                    {
                        label: 'Humidity %',
                        data: hourlyData.map(entry => Math.round(entry.main.humidity)),
                        borderColor:'rgb(186, 232, 191)',
                        lineTension: 0.5,
                        backgroundColor: 'rgba(186, 232, 191, 0.3)',
                        fill: true,
                    }, 
                
                    {
                        label: 'Wind m/s',
                        data: hourlyData.map(entry => Math.round(entry.wind.speed)),
                        borderColor:'rgb(170, 226, 227)',
                        lineTension: 0.5,
                        backgroundColor: 'rgba(170, 226, 227, 0.3)',
                        fill: true,
                    }]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            }
        )

    };

    const getWeatherIconUrl = (iconCode) => {
        return `http://openweathermap.org/img/w/${iconCode}.png`;
    };

    return (
    <div>
        <form onSubmit={handleSubmit} className="form-container">
        <div className="search-container">
            <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            className="search-input"
            />
            <button type="submit" className="search-button">
            <Search width={15} height={15} />
            </button>
        </div>
        </form>
        {/*Current weather conditions*/} 
        {weatherData ? (
        <><h2>&nbsp;</h2>
        <div className="city">{(weatherData.name)}</div>
        <div className="main-temp">{Math.round(weatherData.main.temp)}°C</div>
        <div className="main-description">{capitalizeFirstLetter(weatherData.weather[0].description)}</div>
        {weatherData.weather[0].icon && (
            <img src={getWeatherIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" className="current-weather-icon"/>
        )} 
        <div className="style"> 
            <div className="moisture">85%</div>
            <div className="humidity"> {weatherData.main.humidity}%</div>
            <div className="rain">{forecastData && forecastData.length > 0 ? `${forecastData[0].rain || 0}mm` : '0'}</div>
            <div className="wind">{Math.round(weatherData.wind.speed)}m/s</div> 
        </div> 
        <div className="forecast-container">
        {forecastData && forecastData.slice(0,7).map((item, index) => (
            <div key={index}>
                <div className="forecast-content">
                    {item.weather[0].icon && (
                        <img src={getWeatherIconUrl(item.weather[0].icon)} alt="Weather Icon" className="days-weather-icon"/>
                    )}
                    <div>{Math.round(item.temp.max)}°/{Math.round(item.temp.min)}°</div>
                    <div>{formatDate(item.dt)}</div>
                </div>
            </div>
        ))}
        </div>

      <div className="recommendation">{getRecommendation()}</div>

        </>
        ) : (
            <h2>&nbsp;</h2>
        )}

        {/*graph*/} 
        <div className="hourlyforecast-container">
            <canvas id="hourlyChartTemp"></canvas>
        </div>
        
     </div>
    );
};
export default Weather;