'use client'

import { useJsApiLoader } from "@react-google-maps/api";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Type definitions
type MarkerPosition = { lat: number; lng: number } | null;

type MapSIContextType = {
	markerPosition: MarkerPosition;
	setMarkerPosition: React.Dispatch<React.SetStateAction<MarkerPosition>>;
};

const MapSIContext = createContext<MapSIContextType | undefined>(undefined);

export function MapSIProvider({ children }: { children: ReactNode }) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
	});
	const [markerPosition, setMarkerPosition] = useState<MarkerPosition>(() => {
		// Initialize from localStorage or set to null
		if (typeof window !== "undefined") {
			const storedPosition = localStorage.getItem("markerPosition2");
			return storedPosition ? JSON.parse(storedPosition) : null;
		}
		return null;
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				if (markerPosition !== null) {
					localStorage.setItem("markerPosition2", JSON.stringify(markerPosition));
				} else {
					localStorage.removeItem("markerPosition2");
				}
			} catch (error) {
				console.error("Failed to save markerPosition to localStorage:", error);
			}
		}
	}, [markerPosition]);

	if (!isMounted || !scriptLoaded) {
    return <p>Loading...</p>;
  }

  if (loadError) {
    return <p>Encountered error while loading Google Maps</p>;
  }
	return (
		<MapSIContext.Provider value={{ markerPosition, setMarkerPosition }}>
			{children}
		</MapSIContext.Provider>
	);
}

export const useMapSIContext = () => {
	const context = useContext(MapSIContext);
	if (!context) {
		throw new Error("useMapSIContext must be used within a MapSIProvider");
	}
	return context;
};
