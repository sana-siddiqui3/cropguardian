import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import StreetMap from './StreetMap';
import {Soil, Humidity, Rain, Wheat, Wind, Barley, Corn, Cotton, Potato} from './Icons';

function App() {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [cityCoordinates, setCityCoordinates]=useState(null);
  const[currentTemperature, setCurrentTemperature] = useState(null);
  const [enlargeMap, setEnlargeMap] = useState(false);
  
  
  const fetchCoordinates = () => {
    try{
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async position => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              setCityCoordinates([latitude, longitude]);
          })
      }
    }catch(error){
      console.error('Error fetching location:', error);
    }
  };
  
  useEffect(() => {
      fetchCoordinates();
  }, []);

  const handleTemperatureChange = (temperature) => {
    setCurrentTemperature(temperature);
  };

  const handleCityCoordinatesChange = (coordinates) => {
    setCityCoordinates(coordinates);
  } //updates cityCoordinates from Weather

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
  };

  const closePopOut = () => {
    setSelectedCrop(null);
  };

  const toggleMapSize = () => {
    setEnlargeMap(!enlargeMap); // Enlarge the map
  };

  return (
    
    <div className="App">
      

      <div className="search">
        <Weather onCityCoordinatesChange={handleCityCoordinatesChange} onTemperatuerChange={handleTemperatureChange}/>
      </div>

      <div className="weather-main">

        <div className="main-title">
          <p>Current Weather</p>
        </div>

        <div className="weather-info">
          <div className="info-item">
            <Soil width={28} height={28} fill="#327338" />
            <p>&nbsp;</p>
            <p>Soil moisture</p>
          </div>

          <div className="info-item">
            <Humidity width={28} height={28} fill="#327338" />
            <p>&nbsp;</p>
            <p>Humidity</p>
          </div>

          <div className="info-item">
            <Rain width={34} height={28} fill="#327338" />
            <p>&nbsp;</p>
            <p>Precipitation</p>
          </div>

          <div className="info-item">
            <Wind width={28} height={28} fill="#327338" />
            <p>&nbsp;</p>
            <p>Wind</p>
          </div>
        </div>
      </div>

      <div className="forecast">
        <div className="forecast-title">
          <p>Forecast</p>
        </div>
      </div>

      <div className = "mid-container">
       <div className="crop-container">
          <div className="crop" onClick={() => handleCropClick('Wheat')}>
            <Wheat width={80} height={90} />
          </div>
          <div className="crop1" onClick={() => handleCropClick('Barley')}>
            <Barley width={70} height={100} />
          </div>
          <div className="crop" onClick={() => handleCropClick('Corn')}>
            <Corn width={70} height={90} />
          </div>
          <div className="crop1" onClick={() => handleCropClick('Potato')}>
            <Potato width={50} height={100} />
          </div>
          <div className="crop" onClick={() => handleCropClick('Cotton')}>
            <Cotton width={50} height={100} />
         </div>
        </div>
        <div className={enlargeMap ? "map-container enlarged" : "map-container"}> 
           <StreetMap cityCoordinates={cityCoordinates} currentTemperature={currentTemperature} />
        </div> 
        <div className="map-controls">
          {!enlargeMap && <button className="extend" onClick={toggleMapSize}>Extend Map</button>}
          {enlargeMap && <button className="close" onClick={toggleMapSize}>Close Extension</button>}
        </div>
      </div>
      
      

      {selectedCrop && (
        <div className="crop-popout">
          <div className="crop-popout-content">
            <h2>The best conditions for {selectedCrop} are:</h2>
            {selectedCrop === 'Wheat' && (
              <p>Best conditions for Wheat include well-drained soil and temperatures between 10°C to 24°C.</p>
            )}
            {selectedCrop === 'Barley' && (
              <p>Barley thrives in cooler temperatures ranging from 10°C to 20°C and requires moderate moisture.</p>
            )}
            {selectedCrop === 'Corn' && (
              <p>Corn prefers warm temperatures between 18°C to 32°C and requires consistent moisture throughout the growing season.</p>
            )}
            {selectedCrop === 'Potato' && (
              <p>Potatoes grow best in cool temperatures between 15°C to 20°C and well-drained, loose soil.</p>
            )}
            {selectedCrop === 'Cotton' && (
              <p>Cotton requires hot temperatures above 20°C and a long growing season with ample sunlight.</p>
            )}
            <button onClick={closePopOut}>Close</button>
          </div>
        </div>
      )}
      
      <div className="soil">
        <div className="soil-title">
        <p>Crop Recommendations</p>
        </div>
      </div>

      <img src="herb.svg" alt="Herb" className="herb-image" />

      <div className="hour">
        <div className="hourlyforecast-title">
          <p>Hourly forecast</p>
        </div>
      </div>
     
    </div>
  );
}

export default App;
