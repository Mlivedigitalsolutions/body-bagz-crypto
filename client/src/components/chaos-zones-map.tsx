import { useEffect, useRef, useState } from "react";
import { MapPin, Users, Zap, Globe } from "lucide-react";

// Chaos zone locations around the world
const chaosZones = [
  { id: 1, name: "Tokyo Neon District", lat: 35.6762, lng: 139.6503, members: 2847, country: "Japan", activity: "high" },
  { id: 2, name: "Los Angeles Crypto Hub", lat: 34.0522, lng: -118.2437, members: 4231, country: "USA", activity: "extreme" },
  { id: 3, name: "London Underground", lat: 51.5074, lng: -0.1278, members: 3156, country: "UK", activity: "high" },
  { id: 4, name: "Berlin Chaos Collective", lat: 52.5200, lng: 13.4050, members: 1892, country: "Germany", activity: "medium" },
  { id: 5, name: "São Paulo Street Brigade", lat: -23.5505, lng: -46.6333, members: 2674, country: "Brazil", activity: "high" },
  { id: 6, name: "Sydney Harbor Hackers", lat: -33.8688, lng: 151.2093, members: 1543, country: "Australia", activity: "medium" },
  { id: 7, name: "Moscow Digital Rebels", lat: 55.7558, lng: 37.6176, members: 2218, country: "Russia", activity: "high" },
  { id: 8, name: "Dubai Crypto Oasis", lat: 25.2048, lng: 55.2708, members: 3847, country: "UAE", activity: "extreme" },
  { id: 9, name: "Singapore Tech District", lat: 1.3521, lng: 103.8198, members: 2954, country: "Singapore", activity: "high" },
  { id: 10, name: "Toronto Digital Underground", lat: 43.6532, lng: -79.3832, members: 1765, country: "Canada", activity: "medium" }
];

export default function ChaosZonesMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedZone, setSelectedZone] = useState<typeof chaosZones[0] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [totalMembers] = useState(26127);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google || !import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      (window as any).initMap = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !(window as any).google) return;

      const map = new (window as any).google.maps.Map(mapRef.current, {
        zoom: 2,
        center: { lat: 20, lng: 0 },
        styles: [
          {
            "elementType": "geometry",
            "stylers": [{ "color": "#0a0a0a" }]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#0a0a0a" }]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#39ff14" }]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#ff0040" }]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#d59563" }]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{ "color": "#1a1a1a" }]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{ "color": "#2a2a2a" }]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#212a37" }]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#9ca5b3" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{ "color": "#3a3a3a" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#1f2937" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#f3d250" }]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{ "color": "#2f3948" }]
          },
          {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#d59563" }]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#17263c" }]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#515c6d" }]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#17263c" }]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          style: (window as any).google.maps.ZoomControlStyle.SMALL,
          position: (window as any).google.maps.ControlPosition.RIGHT_BOTTOM
        }
      });

      // Add markers for each chaos zone
      chaosZones.forEach(zone => {
        const activityColor = zone.activity === 'extreme' ? '#ff0040' : 
                             zone.activity === 'high' ? '#39ff14' : '#ffff00';
        
        const marker = new (window as any).google.maps.Marker({
          position: { lat: zone.lat, lng: zone.lng },
          map: map,
          title: zone.name,
          icon: {
            path: (window as any).google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: activityColor,
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });

        marker.addListener('click', () => {
          setSelectedZone(zone);
        });
      });

      setMapLoaded(true);
    };

    loadGoogleMaps();
  }, []);

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'extreme': return 'text-blood-red';
      case 'high': return 'text-toxic-green';
      case 'medium': return 'text-yellow-400';
      default: return 'text-dim-gray';
    }
  };

  const getActivityBadge = (activity: string) => {
    switch (activity) {
      case 'extreme': return 'bg-blood-red/20 text-blood-red border-blood-red';
      case 'high': return 'bg-toxic-green/20 text-toxic-green border-toxic-green';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400';
      default: return 'bg-dim-gray/20 text-dim-gray border-dim-gray';
    }
  };

  return (
    <section className="relative z-10 py-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-onyx to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Globe className="text-toxic-green w-8 h-8" />
            <h2 className="text-4xl md:text-6xl font-display font-bold text-ash-white">
              GLOBAL CHAOS ZONES
            </h2>
            <Globe className="text-blood-red w-8 h-8" />
          </div>
          <p className="text-xl text-dim-gray max-w-3xl mx-auto">
            The Body Bagz revolution spreads across the globe. Join chaos zones in major cities and connect with fellow crypto rebels worldwide.
          </p>
          
          {/* Global Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="bg-jet-black/50 border border-toxic-green/30 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-toxic-green">{totalMembers.toLocaleString()}</div>
              <div className="text-dim-gray text-sm">Total Members</div>
            </div>
            <div className="bg-jet-black/50 border border-blood-red/30 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-blood-red">{chaosZones.length}</div>
              <div className="text-dim-gray text-sm">Active Zones</div>
            </div>
            <div className="bg-jet-black/50 border border-glitch-purple/30 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold text-glitch-purple">24/7</div>
              <div className="text-dim-gray text-sm">Chaos Activity</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-jet-black border border-toxic-green/30 rounded-lg overflow-hidden h-96 lg:h-[500px]">
              {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
                <div ref={mapRef} className="w-full h-full"></div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-onyx">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-toxic-green mx-auto mb-4" />
                    <p className="text-ash-white text-lg mb-2">Interactive Map Loading...</p>
                    <p className="text-dim-gray">Connect Google Maps API for live chaos zones</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chaos Zones List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-ash-white mb-6">Active Zones</h3>
            <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-toxic-green scrollbar-track-transparent">
              {chaosZones.map(zone => (
                <div 
                  key={zone.id}
                  className={`bg-jet-black border border-dim-gray/30 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-toxic-green/50 ${
                    selectedZone?.id === zone.id ? 'border-toxic-green bg-toxic-green/5' : ''
                  }`}
                  onClick={() => setSelectedZone(zone)}
                  data-testid={`chaos-zone-${zone.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-ash-white font-bold text-sm">{zone.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs border ${getActivityBadge(zone.activity)}`}>
                      {zone.activity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-dim-gray text-xs mb-3">{zone.country}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-toxic-green" />
                      <span className="text-toxic-green text-xs font-bold">{zone.members.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className={`w-3 h-3 ${getActivityColor(zone.activity)}`} />
                      <span className={`text-xs ${getActivityColor(zone.activity)}`}>
                        {zone.activity === 'extreme' ? 'CHAOS MODE' : 
                         zone.activity === 'high' ? 'HIGH ENERGY' : 'STEADY GROWTH'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Zone Details */}
        {selectedZone && (
          <div className="mt-8 bg-gradient-to-r from-jet-black via-onyx to-jet-black border border-toxic-green/50 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-2xl font-bold text-ash-white mb-2">{selectedZone.name}</h4>
                <p className="text-toxic-green mb-4">{selectedZone.country}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-toxic-green" />
                    <span className="text-ash-white">{selectedZone.members.toLocaleString()} Active Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${getActivityColor(selectedZone.activity)}`} />
                    <span className="text-ash-white">Activity Level: </span>
                    <span className={getActivityColor(selectedZone.activity)}>
                      {selectedZone.activity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button 
                  className="cyber-button px-6 py-2"
                  data-testid="button-join-zone"
                >
                  JOIN CHAOS ZONE
                </button>
                <p className="text-dim-gray text-sm mt-2">
                  Connect with local Body Bagz rebels and participate in exclusive events
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}