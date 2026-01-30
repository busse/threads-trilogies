import React, { useState } from 'react';

const trilogiesData = [
  { id: 1, user: "busse", movies: ["Full Metal Jacket", "Apocalypse Now", "Fear and Loathing in Las Vegas"], theme: "Vietnam/War/Madness", category: "War", likes: 183 },
  { id: 6, user: "marsarieswar", movies: ["RoboCop", "Total Recall", "Starship Troopers"], theme: "Verhoeven Satire", category: "Sci-Fi", likes: 84 },
  { id: 8, user: "dangerous.moos", movies: ["Saving Private Ryan", "Interstellar", "The Martian"], theme: "Saving Matt Damon", category: "Actor", likes: 71 },
  { id: 33, user: "den_the_hip", movies: ["Shaun of the Dead", "Hot Fuzz", "The World's End"], theme: "Cornetto Trilogy", category: "Director", likes: 51 },
  { id: 9, user: "detmachstudios", movies: ["Time Bandits", "Brazil", "Baron Munchausen"], theme: "Gilliam Dreams", category: "Director", likes: 39 },
  { id: 50, user: "alexanderdcass", movies: ["Apollo 13", "Gravity", "The Martian"], theme: "Space Crisis", category: "Sci-Fi", likes: 31 },
  { id: 44, user: "ibeeric", movies: ["Dark City", "Truman Show", "Pleasantville"], theme: "Simulated Reality", category: "Sci-Fi", likes: 24 },
  { id: 55, user: "reilly_skywalker93", movies: ["Independence Day", "Pacific Rim", "Edge of Tomorrow"], theme: "Alien Invasion", category: "Sci-Fi", likes: 18 },
  { id: 7, user: "michaeldegs", movies: ["Chinatown", "LA Confidential", "The Big Lebowski"], theme: "LA Noir", category: "Location", likes: 14 },
  { id: 21, user: "english_way_j_j", movies: ["Schindler's List", "Zone of Interest", "Downfall"], theme: "WWII/Holocaust", category: "War", likes: 7 },
  { id: 37, user: "blakebyles", movies: ["Fear and Loathing in Las Vegas", "Rango", "Dead Man"], theme: "Johnny Depp Desert", category: "Actor", likes: 5 },
  { id: 10, user: "disruptive_tactical", movies: ["Solaris", "Event Horizon", "Pandorum"], theme: "Space Horror", category: "Horror", likes: 5 },
  { id: 26, user: "detroitvintagecity", movies: ["Good Will Hunting", "Gone Baby Gone", "The Town"], theme: "Boston Trilogy", category: "Location", likes: 4 },
  { id: 3, user: "oversol", movies: ["Planet of the Apes", "Omega Man", "Soylent Green"], theme: "Heston Dystopia", category: "Actor", likes: 3 },
  { id: 20, user: "jdhovland", movies: ["Charly", "Secret of NIMH", "Ratatouille"], theme: "Intelligent Animals", category: "Theme", likes: 3 },
  { id: 54, user: "f_leist", movies: ["Wind River", "Sicario", "Hell or High Water"], theme: "Taylor Sheridan", category: "Director", likes: 2 },
  { id: 49, user: "xipyro_maniacix", movies: ["Frankenweenie", "Corpse Bride", "Nightmare Before Christmas"], theme: "Tim Burton Stop-Motion", category: "Director", likes: 0 },
  { id: 22, user: "nicolaj_springborg", movies: ["Eraserhead", "Blue Velvet", "Mulholland Drive"], theme: "David Lynch", category: "Director", likes: 0 },
  { id: 45, user: "perera.dylan", movies: ["127 Hours", "All is Lost", "Into the Wild"], theme: "Isolation/Survival", category: "Theme", likes: 0 },
  { id: 47, user: "perera.dylan", movies: ["Almost Famous", "Dazed and Confused", "Boogie Nights"], theme: "70s/80s Nostalgia", category: "Era", likes: 0 },
  { id: 36, user: "chetmcgruber", movies: ["The Score", "Heat", "Den of Thieves"], theme: "Heist", category: "Genre", likes: 0 },
  { id: 15, user: "mooncrime74", movies: ["Pocahontas", "Dances with Wolves", "Avatar"], theme: "White Savior", category: "Theme", likes: 0 },
  { id: 56, user: "amor_et_vinum", movies: ["Menace II Society", "Blood In Blood Out", "Training Day"], theme: "LA Gang Films", category: "Location", likes: 0 },
  { id: 12, user: "mooncrime74", movies: ["Rambo", "Missing In Action", "Uncommon Valor"], theme: "80s Vietnam Rescue", category: "War", likes: 0 },
  { id: 52, user: "mdwass99", movies: ["Born on the Fourth of July", "The Deer Hunter", "Rambo: First Blood"], theme: "Vietnam Veterans", category: "War", likes: 0 },
  { id: 30, user: "elchicles", movies: ["The Exorcist", "Session 9", "Event Horizon"], theme: "Supernatural Horror", category: "Horror", likes: 1 },
  { id: 28, user: "theaccusedj", movies: ["Lone Survivor", "Deepwater Horizon", "Patriots Day"], theme: "TrueBerg", category: "Director", likes: 0 },
];

const categoryColors = {
  'Director': { bg: 'from-purple-500 to-purple-700', text: 'text-purple-200', border: 'border-purple-400' },
  'Sci-Fi': { bg: 'from-blue-500 to-cyan-600', text: 'text-blue-200', border: 'border-blue-400' },
  'Actor': { bg: 'from-amber-500 to-orange-600', text: 'text-amber-200', border: 'border-amber-400' },
  'War': { bg: 'from-red-600 to-red-800', text: 'text-red-200', border: 'border-red-400' },
  'Location': { bg: 'from-green-500 to-emerald-600', text: 'text-green-200', border: 'border-green-400' },
  'Horror': { bg: 'from-gray-700 to-gray-900', text: 'text-gray-200', border: 'border-gray-400' },
  'Theme': { bg: 'from-pink-500 to-rose-600', text: 'text-pink-200', border: 'border-pink-400' },
  'Genre': { bg: 'from-indigo-500 to-indigo-700', text: 'text-indigo-200', border: 'border-indigo-400' },
  'Era': { bg: 'from-yellow-500 to-yellow-700', text: 'text-yellow-200', border: 'border-yellow-400' },
};

// Group by category
const groupedData = trilogiesData.reduce((acc, t) => {
  if (!acc[t.category]) {
    acc[t.category] = [];
  }
  acc[t.category].push(t);
  return acc;
}, {});

// Sort each category by likes
Object.keys(groupedData).forEach(cat => {
  groupedData[cat].sort((a, b) => b.likes - a.likes);
});

const TrilogyCard = ({ trilogy, isExpanded, onToggle }) => {
  const colors = categoryColors[trilogy.category] || categoryColors['Theme'];

  return (
    <div
      onClick={onToggle}
      className={`bg-gradient-to-br ${colors.bg} rounded-xl p-4 cursor-pointer
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                  ${isExpanded ? 'col-span-2 row-span-2' : ''}`}
      style={{
        minHeight: isExpanded ? '200px' : '120px'
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-bold ${colors.text} ${isExpanded ? 'text-xl' : 'text-sm'}`}>
          {trilogy.theme}
        </h3>
        {trilogy.likes > 0 && (
          <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs text-white">
            ❤️ {trilogy.likes}
          </span>
        )}
      </div>

      <p className="text-white/60 text-xs mb-2">@{trilogy.user}</p>

      {isExpanded ? (
        <div className="mt-4">
          <p className="text-white/80 text-sm mb-3">The Movies:</p>
          <div className="space-y-2">
            {trilogy.movies.map((movie, i) => (
              <div
                key={i}
                className="bg-black/20 rounded-lg px-3 py-2 text-white flex items-center"
              >
                <span className="text-2xl mr-3">{i + 1}</span>
                <span className="font-medium">{movie}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-white/70 text-xs">
          {trilogy.movies.map((m, i) => (
            <span key={i}>
              {m.length > 20 ? m.slice(0, 18) + '...' : m}
              {i < 2 ? ' → ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ThemeClusters() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const categories = Object.keys(groupedData).sort((a, b) =>
    groupedData[b].reduce((sum, t) => sum + t.likes, 0) -
    groupedData[a].reduce((sum, t) => sum + t.likes, 0)
  );

  const displayedTrilogies = selectedCategory
    ? groupedData[selectedCategory]
    : trilogiesData.sort((a, b) => b.likes - a.likes).slice(0, 12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          🎬 Trilogy Theme Clusters
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Trilogies grouped by connection type. Click a category to filter, click a card to expand.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                       ${!selectedCategory
                         ? 'bg-white text-slate-900'
                         : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
          >
            All ({trilogiesData.length})
          </button>
          {categories.map(cat => {
            const colors = categoryColors[cat] || categoryColors['Theme'];
            const count = groupedData[cat].length;
            const totalLikes = groupedData[cat].reduce((sum, t) => sum + t.likes, 0);

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                           border ${colors.border}
                           ${selectedCategory === cat
                             ? `bg-gradient-to-r ${colors.bg} text-white`
                             : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
              >
                {cat} ({count}) {totalLikes > 0 && `• ${totalLikes}❤️`}
              </button>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Trilogies', value: trilogiesData.length, icon: '🎬' },
            { label: 'Unique Movies', value: [...new Set(trilogiesData.flatMap(t => t.movies))].length, icon: '🎥' },
            { label: 'Contributors', value: [...new Set(trilogiesData.map(t => t.user))].length, icon: '👥' },
            { label: 'Total Likes', value: trilogiesData.reduce((sum, t) => sum + t.likes, 0), icon: '❤️' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trilogy Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedTrilogies.map(trilogy => (
            <TrilogyCard
              key={trilogy.id}
              trilogy={trilogy}
              isExpanded={expandedId === trilogy.id}
              onToggle={() => setExpandedId(expandedId === trilogy.id ? null : trilogy.id)}
            />
          ))}
        </div>

        {/* Category Legend */}
        <div className="mt-8 bg-slate-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">Connection Types</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(categoryColors).map(([cat, colors]) => (
              <div key={cat} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded bg-gradient-to-r ${colors.bg}`}></div>
                <span className="text-gray-400 text-sm">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-sm">
          Data from @busse's viral Thread • Click cards to see full trilogies
        </div>
      </div>
    </div>
  );
}
