"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { useMapSIContext } from "../hooks/mapSIProvider";

const MapComponentSI = () => {
	const {markerPosition, setMarkerPosition} = useMapSIContext();
	const mapCenter = useRef({ lat: 43.78427807639849, lng: -79.18671957505939 });
	const zoom = 18;


	const placeMarker = (event: google.maps.MapMouseEvent) => {
		if (event.latLng) {
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
	const displayCenter = mapCenter.current;

	if (markerPosition) {
		localStorage.setItem("setLocation", JSON.stringify(markerPosition));
		console.log(localStorage.getItem("setLocation"));
	}
	else {
		localStorage.setItem("setLocation", "0");
		console.log(localStorage.getItem("setLocation"));
	}

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
				{markerPosition && (
					<Marker position={markerPosition} draggable={false} />
				)}

			</GoogleMap>
			<div className="flex items-center justify-center mt-5 bg-black w-50 rounded-lg">
				{!markerPosition && (
					<p>Lat: --------, Lng: --------</p>
				)}
				{markerPosition && (
					<p>Lat: {markerPosition.lat.toFixed(5)}, Lng: {markerPosition.lng.toFixed(5)}</p>
				)}

			</div>
		</div>
	);


};

export { MapComponentSI };