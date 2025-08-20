export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Teams</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our talented squads competing at various age groups and levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder team cards */}
          {[
            { name: "U18 Boys", ageGroup: "Under 18", gender: "Male", players: 22 },
            { name: "U18 Girls", ageGroup: "Under 18", gender: "Female", players: 18 },
            { name: "U16 Boys", ageGroup: "Under 16", gender: "Male", players: 20 },
            { name: "U16 Girls", ageGroup: "Under 16", gender: "Female", players: 16 },
            { name: "U14 Boys", ageGroup: "Under 14", gender: "Male", players: 24 },
            { name: "U14 Girls", ageGroup: "Under 14", gender: "Female", players: 19 },
          ].map((team, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="text-xl font-semibold">{team.name}</h3>
                <p className="text-blue-100">{team.ageGroup} • {team.gender}</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Squad Size</span>
                  <span className="font-semibold text-gray-900">{team.players} players</span>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors duration-200">
                  View Roster
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}