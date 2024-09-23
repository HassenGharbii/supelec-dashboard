import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { FaNetworkWired } from 'react-icons/fa';

// Set custom marker icon (using Leaflet's default marker)
const switchIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapComponent() {
  const [markers, setMarkers] = useState([]);

  // Function to add marker on map click
  const AddMarker = () => {
    useMapEvents({
      click: (e) => {
        const newMarker = {
          position: [e.latlng.lat, e.latlng.lng],
          name: `Switch-${markers.length + 1}`,
        };
        setMarkers([...markers, newMarker]); // Add new marker to state
      },
    });
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[51.505, -0.09]} // Initial center of the map
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Add a marker on click */}
        <AddMarker />

        {/* Render markers */}
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position} icon={switchIcon}>
            <Popup>
              <span>
                <FaNetworkWired className="text-blue-500 text-xl mr-2" />
                {marker.name}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
