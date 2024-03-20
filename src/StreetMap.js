import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function StreetMap({ cityCoordinates, currentTemperature }) {
  useEffect(() => {
    if (cityCoordinates) {
      // Create the map
      const leafletMap = L.map('map').setView(cityCoordinates, 10);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

      // Customize marker icon
      const customIcon = L.icon({
        iconUrl: process.env.PUBLIC_URL + '/locpin.png', 
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Position of the icon 
        popupAnchor: [0, -32], // Position of popup 
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

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default StreetMap;







