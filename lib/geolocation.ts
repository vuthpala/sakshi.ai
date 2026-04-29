"use client";

import { useState, useEffect, useCallback } from "react";

export interface UserLocation {
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  address?: string;
  pincode?: string;
  accuracy?: number;
}

export interface GeolocationState {
  location: UserLocation | null;
  loading: boolean;
  error: string | null;
  permission: "prompt" | "granted" | "denied" | null;
}

// Hook for browser geolocation
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: false,
    error: null,
    permission: null,
  });

  const requestLocation = useCallback(async (): Promise<UserLocation | null> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        const error = "Geolocation is not supported by your browser";
        setState((prev) => ({ ...prev, loading: false, error }));
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude: lat, longitude: lng, accuracy } = position.coords;
          
          // Reverse geocode to get city/state
          try {
            const locationData = await reverseGeocode(lat, lng);
            const location: UserLocation = {
              lat,
              lng,
              accuracy,
              ...locationData,
            };
            
            setState({
              location,
              loading: false,
              error: null,
              permission: "granted",
            });
            
            // Store in localStorage for persistence
            localStorage.setItem("userLocation", JSON.stringify(location));
            resolve(location);
          } catch (error) {
            // If reverse geocoding fails, still return coordinates
            const location: UserLocation = { lat, lng, accuracy };
            setState({
              location,
              loading: false,
              error: null,
              permission: "granted",
            });
            localStorage.setItem("userLocation", JSON.stringify(location));
            resolve(location);
          }
        },
        (error) => {
          let errorMsg = "Unable to retrieve your location";
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = "Location permission denied. Please enable location access.";
            setState((prev) => ({ ...prev, permission: "denied" }));
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = "Location information unavailable";
          } else if (error.code === error.TIMEOUT) {
            errorMsg = "Location request timed out";
          }
          
          setState((prev) => ({ ...prev, loading: false, error: errorMsg }));
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes cache
        }
      );
    });
  }, []);

  // Check for stored location on mount
  useEffect(() => {
    const stored = localStorage.getItem("userLocation");
    if (stored) {
      try {
        const location = JSON.parse(stored);
        setState((prev) => ({ ...prev, location }));
      } catch {
        localStorage.removeItem("userLocation");
      }
    }
  }, []);

  return { ...state, requestLocation };
}

// Reverse geocode coordinates to address using Google Maps Geocoding API
export async function reverseGeocode(lat: number, lng: number): Promise<Partial<UserLocation>> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return {};
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const addressComponents = result.address_components;
      
      let city = "";
      let state = "";
      let pincode = "";
      
      for (const component of addressComponents) {
        const types = component.types;
        if (types.includes("locality") || types.includes("sublocality_level_1")) {
          city = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }
        if (types.includes("postal_code")) {
          pincode = component.long_name;
        }
      }

      return {
        city,
        state,
        pincode,
        address: result.formatted_address,
      };
    }
  } catch (error) {
    console.error("Reverse geocoding error:", error);
  }

  return {};
}

// Geocode address to coordinates
export async function geocodeAddress(address: string): Promise<UserLocation | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const location = result.geometry.location;
      const addressComponents = result.address_components;
      
      let city = "";
      let state = "";
      let pincode = "";
      
      for (const component of addressComponents) {
        const types = component.types;
        if (types.includes("locality") || types.includes("sublocality_level_1")) {
          city = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }
        if (types.includes("postal_code")) {
          pincode = component.long_name;
        }
      }

      return {
        lat: location.lat,
        lng: location.lng,
        city,
        state,
        pincode,
        address: result.formatted_address,
      };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  }

  return null;
}

// Calculate distance between two points using Haversine formula
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Load Google Maps JavaScript API
export function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google?.maps) {
      resolve();
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error("Google Maps API key not configured"));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    // Global callback
    (window as any).initGoogleMaps = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Maps"));
    };

    document.head.appendChild(script);
  });
}

// Declare global types
declare global {
  interface Window {
    google: {
      maps: any;
      [key: string]: any;
    };
    initGoogleMaps: () => void;
  }
}

// Google Maps Types
declare const google: {
  maps: any;
  places: any;
};
