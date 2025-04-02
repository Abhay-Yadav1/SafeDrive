import { useState } from 'react';
import { UserIcon, TruckIcon, MapIcon, TrophyIcon } from '@heroicons/react/24/outline';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('trips'); // 'trips' or 'achievements'

  // Mock user data
  const user = {
    name: "Alex Johnson",
    license: "DL-12345678",
    vehicle: "Toyota Camry (MH-01-AB-1234)",
    totalTrips: 24,
    avgScore: 82,
  };

  // Mock trip history
  const trips = [
    { id: 1, date: "2023-10-01", score: 78, distance: "12.3 km", time: "45 mins" },
    { id: 2, date: "2023-10-02", score: 85, distance: "8.7 km", time: "32 mins" },
  ];

  // Mock achievements
  const achievements = [
    { id: 1, name: "Safe Start", earned: true, desc: "5 trips with score > 80" },
    { id: 2, name: "Night Rider", earned: false, desc: "10 night trips" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Driver Profile</h1>
        
        {/* User Card */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.license}</p>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
          <TruckIcon className="h-5 w-5 text-gray-700" />
          <span className="font-medium">{user.vehicle}</span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Total Trips</p>
          <p className="text-2xl font-bold">{user.totalTrips}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500">Avg. Score</p>
          <p className="text-2xl font-bold text-green-600">{user.avgScore}/100</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab('trips')}
          className={`pb-2 px-4 font-medium ${activeTab === 'trips' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <MapIcon className="h-5 w-5 inline mr-2" />
          Trip History
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`pb-2 px-4 font-medium ${activeTab === 'achievements' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <TrophyIcon className="h-5 w-5 inline mr-2" />
          Achievements
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'trips' ? (
        <div className="space-y-3">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <span className="font-medium">{trip.date}</span>
                <span className={`font-bold ${trip.score > 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {trip.score}/100
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {trip.distance} • {trip.time}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 rounded-lg shadow-sm ${item.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-100'}`}
            >
              <TrophyIcon className={`h-6 w-6 mb-2 ${item.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}