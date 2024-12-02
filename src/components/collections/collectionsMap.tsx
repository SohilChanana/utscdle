"use client";

import {
  GoogleMap,
  Marker,
  Circle,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { useRef } from "react";
import { useCollectionsContext } from "@/hooks/collectionsProvider";

const CollectionMapComponent = () => {
  const {
    markerPosition,
    setMarkerPosition,
    attempts,
    maxAttempts,
    isSuccessful,
    currentImageData,
    
  } = useCollectionsContext();

  const mapCenter = useRef({ lat: 43.78427807639849, lng: -79.18671957505939 });
  const zoom = 18;

  // Ensure the Google Maps API is loaded
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  if (!currentImageData) {
    return <div>Loading...</div>;
  }

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

  const targetLocation = currentImageData.coordinates;
  let displayCenter = mapCenter.current;

  if (attempts.length >= maxAttempts || isSuccessful) {
    displayCenter = targetLocation;
  }

  const currentPosition = markerPosition;

  // Ensure window.google is available before accessing it
  const correctMarkerIcon = {
    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    scaledSize: new window.google.maps.Size(40, 40),
  };

  const redLineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 1,
    strokeWeight: 2,
  };

  return (
    <div>
      <GoogleMap
        key={currentImageData._id}
        mapContainerStyle={{
          width: "100%",
          height: "50vh",
          minHeight: "200px",
          borderRadius: "12px",
        }}
        center={displayCenter}
        clickableIcons={false}
        zoom={zoom}
        options={userOptions}
        onClick={placeMarker}
      >
        {currentPosition && (
          <Marker position={currentPosition} draggable={false} />
        )}
        {(attempts.length >= maxAttempts || isSuccessful) && (
          <>
            <Marker
              position={targetLocation}
              draggable={false}
              icon={correctMarkerIcon}
            />
            <Circle
              center={targetLocation}
              radius={10} // 10 meters radius
              options={{
                fillColor: "#00FF00",
                fillOpacity: 0.35,
                strokeColor: "#00FF00",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
            {currentPosition && (
              <Polyline
                path={[currentPosition, targetLocation]}
                options={redLineOptions}
              />
            )}
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export { CollectionMapComponent };
