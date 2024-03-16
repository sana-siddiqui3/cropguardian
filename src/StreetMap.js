
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 

function StreetMap() {
  useEffect(() => {
    const leafletMap = L.map('map').setView([51.505, -0.09], 13); // set to London (will update to zoom based on search)

    // Leaflet tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

    // Clean up map when component unmounts
    return () => {
      leafletMap.remove();
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default StreetMap;





