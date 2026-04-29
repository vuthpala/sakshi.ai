"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMapsScript, calculateDistance } from "@/lib/geolocation";
import type { Lawyer } from "@/types/lawyer";
import type { UserLocation } from "@/lib/geolocation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Send, Star, X } from "lucide-react";

interface GoogleMapProps {
  userLocation: UserLocation;
  lawyers: Lawyer[];
  onSelectLawyer: (lawyer: Lawyer) => void;
  selectedLawyerId?: string;
  radius?: number;
  height?: string;
}

interface MapMarker {
  lawyer: Lawyer;
  marker: any;
  infoWindow: any;
}

export function GoogleMap({
  userLocation,
  lawyers,
  onSelectLawyer,
  selectedLawyerId,
  radius = 50,
  height = "500px",
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<MapMarker[]>([]);
  const userMarkerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLawyer, setActiveLawyer] = useState<Lawyer | null>(null);

  // Initialize map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      try {
        await loadGoogleMapsScript();
        
        if (!isMounted || !mapRef.current || !window.google?.maps) return;

        // Create map
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: userLocation.lat, lng: userLocation.lng },
          zoom: 11,
          mapTypeId: "roadmap",
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        mapInstanceRef.current = map;

        // Add user marker (blue pin)
        userMarkerRef.current = new window.google.maps.Marker({
          position: { lat: userLocation.lat, lng: userLocation.lng },
          map,
          title: "Your Location",
          icon: {
            url: "/icons/user-location.svg",
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });

        // Add radius circle
        circleRef.current = new window.google.maps.Circle({
          map,
          center: { lat: userLocation.lat, lng: userLocation.lng },
          radius: radius * 1000, // Convert km to meters
          fillColor: "#3B82F6",
          fillOpacity: 0.1,
          strokeColor: "#3B82F6",
          strokeOpacity: 0.3,
          strokeWeight: 1,
        });

        // Fit bounds to show circle
        const bounds = circleRef.current.getBounds();
        if (bounds) {
          map.fitBounds(bounds);
        }

        setIsLoading(false);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load map");
          setIsLoading(false);
        }
      }
    }

    initMap();

    return () => {
      isMounted = false;
      // Cleanup markers
      markersRef.current.forEach(({ marker }) => marker.setMap(null));
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
    };
  }, [userLocation, radius]);

  // Update lawyer markers
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google?.maps) return;

    // Clear existing markers
    markersRef.current.forEach(({ marker }) => marker.setMap(null));
    markersRef.current = [];

    // Add lawyer markers
    lawyers.forEach((lawyer) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        lawyer.latitude,
        lawyer.longitude
      );

      // Determine marker color based on status
      let pinColor;
      switch (lawyer.status) {
        case "online":
          pinColor = "#22C55E"; // Green
          break;
        case "busy":
          pinColor = "#EAB308"; // Yellow
          break;
        case "offline":
        default:
          pinColor = "#6B7280"; // Gray
          break;
      }

      // Create marker
      const marker = new window.google.maps.Marker({
        position: { lat: lawyer.latitude, lng: lawyer.longitude },
        map: mapInstanceRef.current,
        title: lawyer.fullName,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: pinColor,
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
          scale: 12,
        },
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(lawyer, distance),
        maxWidth: 300,
      });

      // Add click listener
      marker.addListener("click", () => {
        // Close all other info windows
        markersRef.current.forEach(({ infoWindow: iw }) => iw.close());
        infoWindow.open(mapInstanceRef.current, marker);
        setActiveLawyer(lawyer);
      });

      // Store marker reference
      markersRef.current.push({ lawyer, marker, infoWindow });

      // Highlight selected lawyer
      if (selectedLawyerId === lawyer.id) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 2000);
      }
    });
  }, [lawyers, userLocation, selectedLawyerId]);

  function createInfoWindowContent(lawyer: Lawyer, distance: number): string {
    const statusColors = {
      online: "#22C55E",
      busy: "#EAB308",
      offline: "#6B7280",
    };

    return `
      <div style="padding: 8px; max-width: 280px; font-family: system-ui, sans-serif;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="
            width: 10px; height: 10px; border-radius: 50%;
            background-color: ${statusColors[lawyer.status]};
          "></div>
          <span style="font-weight: 600; font-size: 14px; color: #1F2937;">
            ${lawyer.fullName}
          </span>
        </div>
        <div style="font-size: 12px; color: #6B7280; margin-bottom: 4px;">
          ${distance.toFixed(1)} km away • ${lawyer.barCouncilNumber}
        </div>
        <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
          <span style="color: #F59E0B;">★</span>
          <span style="font-weight: 500; font-size: 13px;">${lawyer.rating.toFixed(1)}</span>
          <span style="font-size: 12px; color: #6B7280;">(${lawyer.totalReviews} reviews)</span>
        </div>
        <button 
          id="send-agreement-btn-${lawyer.id}"
          style="
            width: 100%; padding: 8px 16px;
            background: linear-gradient(135deg, #F59E0B, #D97706);
            color: white; border: none; border-radius: 6px;
            font-weight: 600; font-size: 13px;
            cursor: pointer;
          "
        >
          Send Agreement
        </button>
      </div>
    `;
  }

  // Handle send agreement from info window
  useEffect(() => {
    if (!activeLawyer) return;

    const btnId = `send-agreement-btn-${activeLawyer.id}`;
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.onclick = () => {
        onSelectLawyer(activeLawyer);
      };
    }
  }, [activeLawyer, onSelectLawyer]);

  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-slate-800 rounded-xl"
        style={{ height }}
      >
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">{error}</p>
          <p className="text-slate-500 text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center bg-slate-800 rounded-xl"
        style={{ height }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div ref={mapRef} style={{ width: "100%", height }} className="rounded-xl" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate-300">Online</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-slate-300">Busy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="text-slate-300">Offline</span>
        </div>
      </div>

      {/* Active Lawyer Card */}
      {activeLawyer && (
        <div className="absolute top-4 right-4 w-72">
          <Card className="bg-slate-900/95 backdrop-blur-sm border-slate-700 shadow-xl">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-white">{activeLawyer.fullName}</h3>
                  <p className="text-sm text-slate-400">
                    {calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      activeLawyer.latitude,
                      activeLawyer.longitude
                    ).toFixed(1)} km away
                  </p>
                </div>
                <button
                  onClick={() => setActiveLawyer(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  className={
                    activeLawyer.status === "online"
                      ? "bg-green-500/20 text-green-400"
                      : activeLawyer.status === "busy"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-gray-500/20 text-gray-400"
                  }
                >
                  {activeLawyer.status}
                </Badge>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-sm font-medium">{activeLawyer.rating.toFixed(1)}</span>
                </div>
              </div>

              <Button
                onClick={() => onSelectLawyer(activeLawyer)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Agreement
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
