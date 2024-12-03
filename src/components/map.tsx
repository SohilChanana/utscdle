"use client";

import { GoogleMap, Marker, Circle, Polyline } from "@react-google-maps/api";
import { useRef } from "react";
import { useMapContext } from "../hooks/mapProvider";

interface MapComponentProps {
  coords: string;
}

const MapComponent = ({ coords }: MapComponentProps) => {
  const {
    markerPosition,
    setMarkerPosition,
    attempts,
    maxAttempts,
    isSuccessful,
  } = useMapContext();
  const mapCenter = useRef({ lat: 43.78427807639849, lng: -79.18671957505939 });
  const zoom = 18;
  const placeMarker = (event: google.maps.MapMouseEvent) => {
    if (attempts.length < maxAttempts && !isSuccessful && event.latLng) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  const userOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: "auto",
    disableDefaultUI: true,
    mapTypeControl: true,
    fullscreenControl: true,
    scaleControl: true,
    disableDoubleClickZoom: true,
    restriction: {
      // Restrict users to only look around UTSC campus
      latLngBounds: {
        north: 43.78999,
        south: 43.7815,
        east: -79.1825,
        west: -79.19578,
      },
      strictBounds: false,
    },
  };

  const currentPosition = markerPosition;
  const targetLocation = JSON.parse(coords);
  let displayCenter = mapCenter.current;

  if (attempts.length >= maxAttempts || isSuccessful) {
    displayCenter = targetLocation;
  }

  const correctMarker = {
    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    scaledSize: new window.google.maps.Size(40, 40),
  };

  const redLine = {
    strokeColor: "#FF0000", // Red color for the line
    strokeOpacity: 1, // Full opacity for the line
    strokeWeight: 2, // Line width
  };

  return (
    <div className="">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "50vh",
          minHeight: "200px",
          borderRadius: "12px",
        }}
        center={displayCenter}
        clickableIcons={false}
        extraMapTypes={[]}
        zoom={zoom}
        options={userOptions}
        onClick={placeMarker}
      >
        {markerPosition && currentPosition && (
          <Marker position={currentPosition} draggable={false} />
        )}
        {(attempts.length >= maxAttempts || isSuccessful) && (
          <div>
            <Marker
              position={targetLocation}
              draggable={false}
              icon={correctMarker}
            />
            <Circle
              center={displayCenter}
              radius={15} // 15 meters radius
              options={{
                fillColor: "#00FF00",
                fillOpacity: 0.35,
                strokeColor: "#00FF00",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
            <Polyline
              path={[markerPosition, targetLocation]} // Path from last attempt marker to correct marker
              options={redLine}
            />
          </div>
        )}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
