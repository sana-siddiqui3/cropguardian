import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function StreetMap({ cityCoordinates, currentTemperature }) {
  useEffect(() => {
    if (cityCoordinates) {
      const leafletMap = L.map('map').setView(cityCoordinates, 10);

      // Add OpenStreetMap 
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

      // Customize marker icon
      const customIcon = L.icon({
        iconUrl: process.env.PUBLIC_URL + '/locpin.png', 
        iconSize: [32, 32], 
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32], 
      });

      // Add marker with custom icon
      if (currentTemperature) {
        L.marker(cityCoordinates, { icon: customIcon })
          .addTo(leafletMap)
          .bindPopup(`${currentTemperature} °C`) 
          .openPopup();
      }

      
      return () => {
        leafletMap.remove();
      };
    }
  }, [cityCoordinates, currentTemperature]);

  return <div id="map" style={{ width: '100%', height: '200px' }}></div>;
}

export default StreetMap;







