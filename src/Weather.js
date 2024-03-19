import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';


function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  

const Weather = ({onCityCoordinatesChange}) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState([]);

    const fetchData = async () => {
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
        
        console.log(forecastResponse.data.list); //You can see all the weather data in console log
        const coordinates = [response.data.coord.lat, response.data.coord.lon];
        onCityCoordinatesChange(coordinates); //pass coordinates to App
        } catch (error) {
             console.error(error);
        }
        
    };

    useEffect(() => {
        drawChart(hourlyForecast);
    }, [hourlyForecast]);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    function formatDate(timestamp) {
        var milliseconds = timestamp * 1000;
        var dateObject = new Date(milliseconds);
        var formattedDate = dateObject.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        return formattedDate;
    }

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
                        borderColor:'rgb(186, 232, 191)',
                        lineTension: 0.5,
                        backgroundColor: 'rgba(186, 232, 191, 0.3)',
                        fill: true,
                }
                ]
                }
                ,

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
        <form onSubmit={handleSubmit} className = "form-container">
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
        {weatherData.weather[0].icon && (
            <img src={getWeatherIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" className="current-weather-icon"/>
        )} 
        <div className='style'>
        <div className="moisture">85%</div>
        <div className="humidity"> {weatherData.main.humidity}%</div>
        <div className="rain">{Math.round(weatherData.rain)}mm</div>
        <div className="wind">{Math.round(weatherData.wind.speed)}m/s</div> 
        </div>

        <div className="forecast-container">
        {forecastData && forecastData.slice(0, 7).map((item, index) => (
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

        </>
        ) : (
            <h2>&nbsp;</h2>
        )}

       
        <div className="hourlyforcast-container">
            <canvas id="hourlyChartTemp"></canvas>
        </div>
        
     </div>
    );
};
export default Weather;