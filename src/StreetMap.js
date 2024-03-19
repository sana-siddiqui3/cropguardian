import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function StreetMap({ cityCoordinates, weatherData }) {
  useEffect(() => {
    if (cityCoordinates) {
      const leafletMap = L.map('map').setView(cityCoordinates, 13);

      // Leaflet tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

      // Clean up map when component unmounts
      return () => {
        leafletMap.remove();
      };
    }
  }, [cityCoordinates, weatherData]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default StreetMap;






