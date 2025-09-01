// Fichier : src/components/AgencesMap.js
import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 9.6414,
  lng: -13.5784
};

// Données des agences avec leurs coordonnées
const agences = [
  { id: 1, name: 'Agence A', lat: 9.6414, lng: -13.5784 },
  { id: 2, name: 'Agence B', lat: 9.6450, lng: -13.5850 },
  { id: 3, name: 'Agence C', lat: 9.6380, lng: -13.5700 },
];

function AgencesMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY",
  });

  if (loadError) return "Erreur lors du chargement de la carte";
  if (!isLoaded) return "Chargement de la carte...";

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {agences.map(agence => (
        <Marker
          key={agence.id}
          position={{ lat: agence.lat, lng: agence.lng }}
          title={agence.name}
        />
      ))}
    </GoogleMap>
  );
}

export default AgencesMap;