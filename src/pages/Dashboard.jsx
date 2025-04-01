import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import 'leaflet/dist/leaflet.css';

export default function Dashboard() {
  // Animated score
  const [score, setScore] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  // Mock trip data
  const tripPath = [
    [51.505, -0.09], [51.506, -0.091], [51.507, -0.092],
    [51.508, -0.093], [51.509, -0.094], [51.51, -0.095]
  ];
  const [currentPosition, setCurrentPosition] = useState(0);

  // Simulate score calculation
  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setScore(prev => Math.min(prev + 1, 87));
    }, 100);
    return () => clearInterval(scoreInterval);
  }, []);

  // Simulate car movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCurrentPosition(prev => (prev + 1) % tripPath.length);
    }, 800);
    return () => clearInterval(moveInterval);
  }, []);

  // Risk factors data
  const riskFactors = [
    { id: 1, name: "Harsh Braking", count: 5, trend: "↑ 20%" },
    { id: 2, name: "Night Driving", count: 3, trend: "↑ 15%" },
    { id: 3, name: "Speeding", count: 2, trend: "↓ 5%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Alert Banner */}
      {showAlert && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-800">AI detected dangerous speeding (75mph in 50 zone)</span>
          </div>
          <button 
            onClick={() => setShowAlert(false)} 
            className="text-red-500 hover:text-red-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Score Card */}
      <div className={`p-6 rounded-xl shadow-lg mb-6 transition-colors ${
        score > 80 ? 'bg-green-50' : score > 60 ? 'bg-yellow-50' : 'bg-red-50'
      }`}>
        <div className="text-sm text-gray-500 mb-1">YOUR SAFETY SCORE</div>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold" style={{
            color: score > 80 ? '#10B981' : score > 60 ? '#F59E0B' : '#EF4444'
          }}>
            {score}
          </span>
          <span className="text-gray-400 mb-1">/100</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mt-4">
          <div 
            className="h-2 rounded-full transition-all duration-300" 
            style={{ 
              width: `${score}%`,
              backgroundColor: score > 80 ? '#10B981' : score > 60 ? '#F59E0B' : '#EF4444'
            }}
          />
        </div>
      </div>

      {/* Live Map */}
      <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
        <div className="h-64 w-full relative">
          <MapContainer 
            center={tripPath[0]} 
            zoom={15}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={tripPath[currentPosition]}>
              <Popup>Your Vehicle 🚗</Popup>
            </Marker>
            <Polyline 
              positions={tripPath} 
              color="#3B82F6" 
              weight={3}
            />
            {currentPosition > 2 && (
              <Circle
                center={tripPath[3]}
                radius={100}
                color="#EF4444"
                fillOpacity={0.2}
              />
            )}
          </MapContainer>
          <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm text-sm font-medium">
            Live Tracking
          </div>
        </div>
      </div>

      {/* Risk Insights */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-bold text-lg mb-4">AI-DETECTED RISK FACTORS</h3>
        <div className="space-y-4">
          {riskFactors.map((risk) => (
            <div key={risk.id} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{risk.name}</span>
                <span className="text-gray-500 text-sm ml-2">{risk.trend}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                risk.id === 1 ? 'bg-red-100 text-red-800' : 
                risk.id === 2 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-blue-100 text-blue-800'
              }`}>
                {risk.count} events
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}