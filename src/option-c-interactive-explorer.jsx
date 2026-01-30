import React, { useState, useMemo } from 'react';

const trilogiesData = [
  { id: 1, user: "busse", movies: ["Full Metal Jacket", "Apocalypse Now", "Fear and Loathing in Las Vegas"], theme: "Vietnam/War/Madness", likes: 183, isOP: true },
  { id: 6, user: "marsarieswar", movies: ["RoboCop", "Total Recall", "Starship Troopers"], theme: "Verhoeven Satire", likes: 84 },
  { id: 8, user: "dangerous.moos", movies: ["Saving Private Ryan", "Interstellar", "The Martian"], theme: "Saving Matt Damon", likes: 71 },
  { id: 33, user: "den_the_hip", movies: ["Shaun of the Dead", "Hot Fuzz", "The World's End"], theme: "Cornetto Trilogy", likes: 51 },
  { id: 9, user: "detmachstudios", movies: ["Time Bandits", "Brazil", "Baron Munchausen"], theme: "Gilliam Dreams", likes: 39 },
  { id: 50, user: "alexanderdcass", movies: ["Apollo 13", "Gravity", "The Martian"], theme: "Space Crisis", likes: 31 },
  { id: 44, user: "ibeeric", movies: ["Dark City", "Truman Show", "Pleasantville"], theme: "Simulated Reality", likes: 24 },
  { id: 55, user: "reilly_skywalker93", movies: ["Independence Day", "Pacific Rim", "Edge of Tomorrow"], theme: "Alien Invasion", likes: 18 },
  { id: 7, user: "michaeldegs", movies: ["Chinatown", "LA Confidential", "The Big Lebowski"], theme: "LA Noir", likes: 14 },
  { id: 21, user: "english_way_j_j", movies: ["Schindler's List", "Zone of Interest", "Downfall"], theme: "WWII/Holocaust", likes: 7 },
  { id: 37, user: "blakebyles", movies: ["Fear and Loathing in Las Vegas", "Rango", "Dead Man"], theme: "Johnny Depp Desert", likes: 5 },
  { id: 10, user: "disruptive_tactical", movies: ["Solaris", "Event Horizon", "Pandorum"], theme: "Space Horror", likes: 5 },
  { id: 26, user: "detroitvintagecity", movies: ["Good Will Hunting", "Gone Baby Gone", "The Town"], theme: "Boston Trilogy", likes: 4 },
  { id: 3, user: "oversol", movies: ["Planet of the Apes", "Omega Man", "Soylent Green"], theme: "Heston Dystopia", likes: 3 },
  { id: 51, user: "mackademic", movies: ["Power Rangers (2017)", "Pacific Rim", "Edge of Tomorrow"], theme: "Giant Mech", likes: 3 },
  { id: 20, user: "jdhovland", movies: ["Charly", "Secret of NIMH", "Ratatouille"], theme: "Intelligent Animals", likes: 3 },
  { id: 54, user: "f_leist", movies: ["Wind River", "Sicario", "Hell or High Water"], theme: "Taylor Sheridan", likes: 2 },
  { id: 57, user: "michaeldegs", movies: ["Poor Things", "Frankenstein", "Edward Scissorhands"], theme: "Created Beings", likes: 2 },
  { id: 42, user: "absolutely.willie", movies: ["Saving Grace", "Half Baked", "Dogma"], theme: "Stoner Films", likes: 2 },
  { id: 49, user: "xipyro_maniacix", movies: ["Frankenweenie", "Corpse Bride", "Nightmare Before Christmas"], theme: "Tim Burton Stop-Motion", likes: 0 },
  { id: 22, user: "nicolaj_springborg", movies: ["Eraserhead", "Blue Velvet", "Mulholland Drive"], theme: "David Lynch", likes: 0 },
  { id: 45, user: "perera.dylan", movies: ["127 Hours", "All is Lost", "Into the Wild"], theme: "Isolation/Survival", likes: 0 },
  { id: 47, user: "perera.dylan", movies: ["Almost Famous", "Dazed and Confused", "Boogie Nights"], theme: "70s/80s Nostalgia", likes: 0 },
  { id: 46, user: "perera.dylan", movies: ["JFK", "Blow Out", "The Conversation"], theme: "Paranoia/Conspiracy", likes: 0 },
  { id: 36, user: "chetmcgruber", movies: ["The Score", "Heat", "Den of Thieves"], theme: "Heist", likes: 0 },
  { id: 15, user: "mooncrime74", movies: ["Pocahontas", "Dances with Wolves", "Avatar"], theme: "White Savior", likes: 0 },
  { id: 14, user: "mooncrime74", movies: ["Biloxi Blues", "Stripes", "Good Morning Vietnam"], theme: "Military Comedy", likes: 0 },
  { id: 18, user: "mooncrime74", movies: ["Goodfellas", "Analyze This", "Meet the Fockers"], theme: "De Niro Comedy Arc", likes: 0 },
  { id: 56, user: "amor_et_vinum", movies: ["Menace II Society", "Blood In Blood Out", "Training Day"], theme: "LA Gang Films", likes: 0 },
  { id: 12, user: "mooncrime74", movies: ["Rambo", "Missing In Action", "Uncommon Valor"], theme: "80s Vietnam Rescue", likes: 0 },
  { id: 40, user: "sparty7799", movies: ["The Post", "All the President's Men", "Frost/Nixon"], theme: "Nixon/Watergate Era", likes: 0 },
  { id: 31, user: "peterbuddy", movies: ["Arrival", "Sixth Sense", "Usual Suspects"], theme: "Twist Endings", likes: 0 },
  { id: 30, user: "elchicles", movies: ["The Exorcist", "Session 9", "Event Horizon"], theme: "Supernatural Horror", likes: 1 },
];

// Build movie frequency map
const movieFrequency = {};
trilogiesData.forEach(t => {
  t.movies.forEach(m => {
    movieFrequency[m] = (movieFrequency[m] || 0) + 1;
  });
});

const MoviePill = ({ movie }) => {
  const freq = movieFrequency[movie] || 1;
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2
                     ${freq > 1 ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50' : 'bg-slate-700 text-gray-300'}`}>
      {movie} {freq > 1 && <span className="text-xs">×{freq}</span>}
    </span>
  );
};

const TrilogyRow = ({ trilogy, rank, onSelect, isSelected }) => (
  <div
    onClick={() => onSelect(trilogy)}
    className={`p-4 rounded-xl cursor-pointer transition-all duration-200
               ${isSelected ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 border border-purple-400' : 'bg-slate-800 hover:bg-slate-700'}`}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <span className={`text-2xl font-bold ${rank <= 3 ? 'text-yellow-400' : 'text-slate-500'}`}>
          #{rank}
        </span>
        <div>
          <h3 className="text-white font-semibold">{trilogy.theme}</h3>
          <p className="text-slate-400 text-sm">@{trilogy.user} {trilogy.isOP && <span className="text-purple-400">(OP)</span>}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-pink-400 font-bold">{trilogy.likes > 0 ? `❤️ ${trilogy.likes}` : ''}</span>
      </div>
    </div>
    <div className="mt-3 flex items-center text-slate-300 text-sm">
      {trilogy.movies.map((m, i) => (
        <span key={i} className="flex items-center">
          <span className={movieFrequency[m] > 1 ? 'text-yellow-300' : ''}>{m}</span>
          {i < 2 && <span className="mx-2 text-slate-500">→</span>}
        </span>
      ))}
    </div>
  </div>
);

export default function InteractiveExplorer() {
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('likes');
  const [selected, setSelected] = useState(null);

  const filteredData = useMemo(() => {
    let data = [...trilogiesData];

    if (search) {
      const s = search.toLowerCase();
      data = data.filter(t =>
        t.theme.toLowerCase().includes(s) ||
        t.user.toLowerCase().includes(s) ||
        t.movies.some(m => m.toLowerCase().includes(s))
      );
    }

    if (sortBy === 'likes') {
      data.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'theme') {
      data.sort((a, b) => a.theme.localeCompare(b.theme));
    } else if (sortBy === 'user') {
      data.sort((a, b) => a.user.localeCompare(b.user));
    }

    return data;
  }, [search, sortBy]);

  const stats = useMemo(() => {
    const allMovies = trilogiesData.flatMap(t => t.movies);
    const uniqueMovies = [...new Set(allMovies)];
    const sharedMovies = Object.entries(movieFrequency).filter(([_, count]) => count > 1);

    return {
      totalTrilogies: trilogiesData.length,
      uniqueMovies: uniqueMovies.length,
      sharedMovies: sharedMovies.length,
      totalLikes: trilogiesData.reduce((sum, t) => sum + t.likes, 0),
      topContributor: Object.entries(
        trilogiesData.reduce((acc, t) => {
          acc[t.user] = (acc[t.user] || 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])[0]
    };
  }, []);

  const sharedMoviesList = Object.entries(movieFrequency)
    .filter(([_, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-white mb-1">
            🎬 Logical Trilogies Explorer
          </h1>
          <p className="text-slate-400">
            Interactive visualization of @busse's viral Threads post
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Trilogies', value: stats.totalTrilogies, icon: '🎯' },
            { label: 'Unique Movies', value: stats.uniqueMovies, icon: '🎬' },
            { label: 'Shared Movies', value: stats.sharedMovies, icon: '🔗', highlight: true },
            { label: 'Total Likes', value: stats.totalLikes, icon: '❤️' },
            { label: 'Top Contributor', value: `@${stats.topContributor[0]}`, subvalue: `${stats.topContributor[1]} trilogies`, icon: '👑' },
          ].map((stat, i) => (
            <div key={i} className={`rounded-xl p-4 ${stat.highlight ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-slate-800'}`}>
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-slate-400 text-xs">{stat.label}</div>
              {stat.subvalue && <div className="text-slate-500 text-xs">{stat.subvalue}</div>}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search movies, themes, or users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-64 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2
                      text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="likes">Sort by Likes</option>
            <option value="theme">Sort by Theme</option>
            <option value="user">Sort by User</option>
          </select>
          <div className="flex rounded-lg overflow-hidden border border-slate-700">
            {['list', 'grid', 'connections'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 text-sm capitalize
                           ${view === v ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {view === 'list' && (
              <div className="space-y-3">
                {filteredData.map((t, i) => (
                  <TrilogyRow
                    key={t.id}
                    trilogy={t}
                    rank={i + 1}
                    onSelect={setSelected}
                    isSelected={selected?.id === t.id}
                  />
                ))}
              </div>
            )}

            {view === 'grid' && (
              <div className="grid grid-cols-2 gap-4">
                {filteredData.map((t, i) => (
                  <div
                    key={t.id}
                    onClick={() => setSelected(t)}
                    className={`p-4 rounded-xl cursor-pointer transition-all
                               ${selected?.id === t.id ? 'bg-purple-600/30 border border-purple-400' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-slate-500">#{i + 1}</span>
                      {t.likes > 0 && <span className="text-pink-400 text-sm">❤️ {t.likes}</span>}
                    </div>
                    <h3 className="text-white font-semibold mb-1">{t.theme}</h3>
                    <p className="text-slate-500 text-xs mb-2">@{t.user}</p>
                    <div className="flex flex-wrap">
                      {t.movies.map((m, j) => (
                        <MoviePill key={j} movie={m} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {view === 'connections' && (
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">🔗 Movies in Multiple Trilogies</h3>
                <p className="text-slate-400 text-sm mb-4">
                  These movies appear in more than one "logical trilogy" - they're connection points in the data!
                </p>
                {sharedMoviesList.length > 0 ? (
                  <div className="space-y-4">
                    {sharedMoviesList.map(([movie, count]) => {
                      const trilogiesWithMovie = trilogiesData.filter(t => t.movies.includes(movie));
                      return (
                        <div key={movie} className="bg-slate-900 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-yellow-300 font-semibold text-lg">{movie}</span>
                            <span className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full text-sm">
                              {count} trilogies
                            </span>
                          </div>
                          <div className="space-y-1">
                            {trilogiesWithMovie.map(t => (
                              <div key={t.id} className="text-slate-400 text-sm">
                                → <span className="text-slate-300">{t.theme}</span>
                                <span className="text-slate-500"> by @{t.user}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500">No movies appear in multiple trilogies in the current filter.</p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {selected ? (
              <div className="bg-slate-800 rounded-xl p-6 sticky top-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{selected.theme}</h3>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-slate-500 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-slate-400 mb-4">
                  by @{selected.user} {selected.isOP && <span className="text-purple-400">(Original Poster)</span>}
                </p>
                {selected.likes > 0 && (
                  <p className="text-pink-400 mb-4">❤️ {selected.likes} likes</p>
                )}
                <h4 className="text-white font-semibold mb-3">The Trilogy:</h4>
                <div className="space-y-3">
                  {selected.movies.map((m, i) => (
                    <div key={i} className="bg-slate-900 rounded-lg p-3 flex items-center">
                      <span className="text-3xl font-bold text-slate-600 mr-4">{i + 1}</span>
                      <div>
                        <span className="text-white font-medium">{m}</span>
                        {movieFrequency[m] > 1 && (
                          <span className="block text-yellow-400 text-xs mt-1">
                            🔗 Also in {movieFrequency[m] - 1} other trilogy
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">📊 Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-400">
                    <span className="text-white">{filteredData.length}</span> trilogies showing
                  </p>
                  <p className="text-slate-400">
                    <span className="text-white">{sharedMoviesList.length}</span> shared movies
                  </p>
                </div>
                <hr className="border-slate-700 my-4" />
                <h4 className="text-white font-semibold mb-2">🏆 Top Trilogies</h4>
                <div className="space-y-2">
                  {trilogiesData.slice(0, 5).map((t, i) => (
                    <div
                      key={t.id}
                      onClick={() => setSelected(t)}
                      className="text-sm cursor-pointer hover:text-purple-400 text-slate-400"
                    >
                      {i + 1}. {t.theme} <span className="text-pink-400">({t.likes}❤️)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-slate-600 text-sm">
          Data scraped from @busse's Thread • 28.8K views • 282 replies
        </div>
      </div>
    </div>
  );
}
