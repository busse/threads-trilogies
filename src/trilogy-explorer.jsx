import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, Grid3x3, List, Network, X } from 'lucide-react';

const TrilogyExplorer = () => {
  // Embedded dataset
  const trilogies = [
    {"id": 1, "user": "busse", "movies": ["Full Metal Jacket", "Apocalypse Now", "Fear and Loathing in Las Vegas"], "theme": "Vietnam War Madness", "likes": 183, "isOP": true},
    {"id": 2, "user": "ltracks", "movies": ["Seven Samurai", "Magnificent Seven", "A Bug's Life"], "theme": "Remake Evolution", "likes": 0},
    {"id": 3, "user": "oversol", "movies": ["Planet of the Apes", "Omega Man", "Soylent Green"], "theme": "Charlton Heston Dystopia", "likes": 3},
    {"id": 4, "user": "oversol", "movies": ["Repo Man", "Valley Girl", "Night of the Comet"], "theme": "80s LA Cult", "likes": 3},
    {"id": 5, "user": "oversol", "movies": ["Anderson Tapes", "Pelham 123", "The Hot Rock"], "theme": "NYC Heist", "likes": 3},
    {"id": 6, "user": "marsarieswar", "movies": ["RoboCop", "Total Recall", "Starship Troopers"], "theme": "Verhoeven Satire", "likes": 84},
    {"id": 7, "user": "michaeldegs", "movies": ["Chinatown", "LA Confidential", "The Big Lebowski"], "theme": "LA Noir", "likes": 14},
    {"id": 8, "user": "dangerous.moos", "movies": ["Saving Private Ryan", "Interstellar", "The Martian"], "theme": "Saving Matt Damon", "likes": 71},
    {"id": 9, "user": "detmachstudios", "movies": ["Time Bandits", "Brazil", "Baron Munchausen"], "theme": "Gilliam Dreams Trilogy", "likes": 39},
    {"id": 10, "user": "disruptive_tactical", "movies": ["Solaris", "Event Horizon", "Pandorum"], "theme": "Space Horror", "likes": 5},
    {"id": 11, "user": "emceeartist", "movies": ["Romancing the Stone", "Jewel of the Nile", "War of the Roses"], "theme": "Douglas Turner Romance", "likes": 1},
    {"id": 12, "user": "mooncrime74", "movies": ["Rambo", "Missing In Action", "Uncommon Valor"], "theme": "80s Vietnam Rescue", "likes": 0},
    {"id": 13, "user": "mooncrime74", "movies": ["Wall Street", "Men At Work", "The War At Home"], "theme": "Charlie Sheen", "likes": 0},
    {"id": 14, "user": "mooncrime74", "movies": ["Biloxi Blues", "Stripes", "Good Morning Vietnam"], "theme": "Military Comedy", "likes": 0},
    {"id": 15, "user": "mooncrime74", "movies": ["Pocahontas", "Dances with Wolves", "Avatar"], "theme": "White Savior", "likes": 0},
    {"id": 16, "user": "mooncrime74", "movies": ["Clerks", "Chasing Amy", "Jay and Silent Bob Strike Back"], "theme": "Kevin Smith Universe", "likes": 0},
    {"id": 17, "user": "mooncrime74", "movies": ["Police Academy", "Idiocracy", "Escape from New York"], "theme": "Dystopian Comedy", "likes": 0},
    {"id": 18, "user": "mooncrime74", "movies": ["Goodfellas", "Analyze This", "Meet the Fockers"], "theme": "De Niro Comedy Arc", "likes": 0},
    {"id": 19, "user": "boring7111", "movies": ["Three Days of the Condor", "The Parallax View", "The Executioner"], "theme": "70s Paranoid Thriller", "likes": 1},
    {"id": 20, "user": "jdhovland", "movies": ["Charly", "The Secret of NIMH", "Ratatouille"], "theme": "Intelligent Animals", "likes": 3},
    {"id": 21, "user": "english_way_j_j", "movies": ["Schindler's List", "The Zone of Interest", "Downfall"], "theme": "WWII Holocaust", "likes": 7},
    {"id": 22, "user": "nicolaj_springborg", "movies": ["Eraserhead", "Blue Velvet", "Mulholland Drive"], "theme": "David Lynch Universe", "likes": 0},
    {"id": 23, "user": "thejohnljackson", "movies": ["Stand by Me", "The Sandlot", "Hook"], "theme": "Childhood Coming of Age", "likes": 0},
    {"id": 24, "user": "bradsturkie", "movies": ["Color Out of Space", "Annihilation", "Under the Skin"], "theme": "Alien Intrusion", "likes": 0},
    {"id": 25, "user": "ajt76", "movies": ["Munich", "You Don't Mess with the Zohan", "Inglourious Basterds"], "theme": "Jewish Revenge", "likes": 1},
    {"id": 26, "user": "detroitvintagecity", "movies": ["Good Will Hunting", "Gone Baby Gone", "The Town"], "theme": "Boston Trilogy", "likes": 4},
    {"id": 27, "user": "thelfoley", "movies": ["Fistful of Dollars", "For A Few Dollars More", "The Good The Bad and the Ugly"], "theme": "Dollars Spaghetti Western", "likes": 0},
    {"id": 28, "user": "theaccusedj", "movies": ["Lone Survivor", "Deepwater Horizon", "Patriots Day"], "theme": "TrueBerg", "likes": 0},
    {"id": 29, "user": "aj_milner", "movies": ["Easy Rider", "Lost in America", "About Schmidt"], "theme": "American Road Trip", "likes": 0},
    {"id": 30, "user": "elchicles", "movies": ["The Exorcist", "Session 9", "Event Horizon"], "theme": "Supernatural Horror", "likes": 1},
    {"id": 31, "user": "peterbuddy", "movies": ["Arrival", "Sixth Sense", "Usual Suspects"], "theme": "Twist Endings", "likes": 0},
    {"id": 32, "user": "metaldakka", "movies": ["Twin Peaks", "Agents of SHIELD", "How I Met Your Mother"], "theme": "Kyle MacLachlan TV", "likes": 0},
    {"id": 33, "user": "den_the_hip", "movies": ["Shaun of the Dead", "Hot Fuzz", "The World's End"], "theme": "Cornetto Trilogy", "likes": 51},
    {"id": 34, "user": "enriguti", "movies": ["Commando", "Die Hard 2", "Predator"], "theme": "Val Verde", "likes": 1},
    {"id": 35, "user": "the_sober_traveler", "movies": ["Posse", "Rosewood", "The Harder They Fall"], "theme": "Black Western History", "likes": 0},
    {"id": 36, "user": "chetmcgruber", "movies": ["The Score", "Heat", "Den of Thieves"], "theme": "Heist Trilogy", "likes": 0},
    {"id": 37, "user": "blakebyles", "movies": ["Fear and Loathing in Las Vegas", "Rango", "Dead Man"], "theme": "Johnny Depp Desert Journey", "likes": 5},
    {"id": 38, "user": "joelawlers", "movies": ["Fear and Loathing in Las Vegas", "Rango", "The Rum Diary"], "theme": "Hunter S Thompson", "likes": 1},
    {"id": 39, "user": "canjewattitude", "movies": ["There Will Be Blood", "Fern Gully", "Interstellar"], "theme": "Oil Environment", "likes": 0},
    {"id": 40, "user": "sparty7799", "movies": ["The Post", "All the President's Men", "Frost Nixon"], "theme": "Nixon Watergate Era", "likes": 0},
    {"id": 41, "user": "hanover.fists.9", "movies": ["Nice Dreams", "Pee Wee's Big Adventure", "Blow"], "theme": "Drug Comedy to Drama", "likes": 0},
    {"id": 42, "user": "absolutely.willie", "movies": ["Saving Grace", "Half Baked", "Dogma"], "theme": "Stoner Films", "likes": 2},
    {"id": 43, "user": "marcohuertas", "movies": ["One Battle After Another", "Civil War", "Children of Men"], "theme": "War Dystopia", "likes": 0},
    {"id": 44, "user": "ibeeric", "movies": ["Dark City", "Truman Show", "Pleasantville"], "theme": "Simulated Reality", "likes": 24},
    {"id": 45, "user": "perera.dylan", "movies": ["127 Hours", "All is Lost", "Into the Wild"], "theme": "Isolation Survival", "likes": 0},
    {"id": 46, "user": "perera.dylan", "movies": ["JFK", "Blow Out", "The Conversation"], "theme": "Paranoia Conspiracy", "likes": 0},
    {"id": 47, "user": "perera.dylan", "movies": ["Almost Famous", "Dazed and Confused", "Boogie Nights"], "theme": "70s 80s Nostalgia", "likes": 0},
    {"id": 48, "user": "electricpicturehall.chepstow", "movies": ["Ferris Bueller's Day Off", "Election", "Legally Blonde"], "theme": "Ambitious Protagonists", "likes": 0},
    {"id": 49, "user": "xipyro_maniacix", "movies": ["Frankenweenie", "Corpse Bride", "Nightmare Before Christmas"], "theme": "Tim Burton Stop Motion", "likes": 0},
    {"id": 50, "user": "alexanderdcass", "movies": ["Apollo 13", "Gravity", "The Martian"], "theme": "Space Crisis Survival", "likes": 31},
    {"id": 51, "user": "mackademic", "movies": ["Power Rangers 2017", "Pacific Rim", "Edge of Tomorrow"], "theme": "Giant Mech", "likes": 3},
    {"id": 52, "user": "mdwass99", "movies": ["Born on the Fourth of July", "The Deer Hunter", "Rambo First Blood"], "theme": "Vietnam Veterans", "likes": 0},
    {"id": 53, "user": "ludwigandtheangryinch", "movies": ["Who Can Kill a Child", "Antichrist", "Men"], "theme": "Everyone is Evil", "likes": 0},
    {"id": 54, "user": "f_leist", "movies": ["Wind River", "Sicario", "Hell or High Water"], "theme": "Taylor Sheridan Modern Western", "likes": 2},
    {"id": 55, "user": "reilly_skywalker93", "movies": ["Independence Day", "Pacific Rim", "Edge of Tomorrow"], "theme": "Alien Invasion", "likes": 18},
    {"id": 56, "user": "amor_et_vinum", "movies": ["Menace II Society", "Blood In Blood Out", "Training Day"], "theme": "LA Gang Films", "likes": 0},
    {"id": 57, "user": "michaeldegs", "movies": ["Poor Things", "Frankenstein", "Edward Scissorhands"], "theme": "Created Beings", "likes": 2},
    {"id": 58, "user": "condard", "movies": ["Wizard of Oz", "Children of Men", "Zardoz"], "theme": "Oz Connection", "likes": 6},
    {"id": 59, "user": "continentalll_drippp", "movies": ["The Road to El Dorado", "Atlantis The Lost Empire", "Titan AE"], "theme": "2000s Animated Adventure", "likes": 1},
    {"id": 60, "user": "parlaquin73", "movies": ["1917", "Journey's End", "All Quiet on the Western Front"], "theme": "WWI Trench Warfare", "likes": 0},
    {"id": 61, "user": "naypauer", "movies": ["Rudy", "Rocky", "The Karate Kid"], "theme": "Underdog Sports", "likes": 0},
    {"id": 62, "user": "omegaburn", "movies": ["American Graffiti", "Dazed and Confused", "Fast Times at Ridgemont High"], "theme": "Teen Coming of Age", "likes": 0},
    {"id": 63, "user": "frankjreynolds", "movies": ["Becket", "The Lion in Winter", "The Adventures of Robin Hood"], "theme": "Medieval England", "likes": 0},
    {"id": 64, "user": "ryan.loftus", "movies": ["Repo Man", "Under The Silver Lake", "Southland Tales"], "theme": "LA Weird", "likes": 1},
    {"id": 65, "user": "jeffbeersthekickassguy", "movies": ["Dazed and Confused", "Detroit Rock City", "The Stoned Age"], "theme": "70s Rock Party", "likes": 0},
    {"id": 66, "user": "dinunziojoe", "movies": ["Gone Baby Gone", "A Walk Among the Tombstones", "The Drop"], "theme": "Gritty Crime Drama", "likes": 0},
    {"id": 67, "user": "english_way_j_j", "movies": ["The Imitation Game", "Hidden Figures", "Pirates of Silicon Valley"], "theme": "Tech Pioneers", "likes": 1},
    {"id": 68, "user": "grimbybeck", "movies": ["One Flew Over the Cuckoo's Nest", "The Shawshank Redemption", "Dead Poets Society"], "theme": "Institutional Conformity", "likes": 0},
    {"id": 69, "user": "aaronsalus", "movies": ["The Anderson Tapes", "The Conversation", "Sliver"], "theme": "Surveillance", "likes": 0},
    {"id": 70, "user": "funky_tut", "movies": ["Close Encounters of the Third Kind", "Jaws", "All that Jazz"], "theme": "Spielberg Scheider", "likes": 0},
    {"id": 71, "user": "clownbaby404", "movies": ["Mothra", "Mothra vs Godzilla", "Ghidorah The Three Headed Monster"], "theme": "Kaiju", "likes": 0},
    {"id": 72, "user": "janet_barnett_photography", "movies": ["Heathers", "Clueless", "Mean Girls"], "theme": "Teen Girl Comedy", "likes": 21},
    {"id": 73, "user": "non_descript_person_82", "movies": ["Bring It On", "Stomp The Yard", "Drumline"], "theme": "Competition Performance", "likes": 1},
    {"id": 74, "user": "officialartaylor", "movies": ["The Thing", "Prince of Darkness", "In the Mouth of Madness"], "theme": "Carpenter Apocalypse Trilogy", "likes": 14},
    {"id": 75, "user": "jrcjohnny99", "movies": ["The Taking of Pelham 123", "Death Wish", "Report to the Commissioner"], "theme": "1974 NYC Gritty", "likes": 2},
    {"id": 76, "user": "pigma_lyon", "movies": ["All the President's Men", "Three Days of the Condor", "The Parallax View"], "theme": "70s Political Thriller", "likes": 0},
    {"id": 77, "user": "seencapone", "movies": ["Dark City", "The Matrix", "The Thirteenth Floor"], "theme": "1999 Simulated Reality", "likes": 2},
    {"id": 78, "user": "groverstimulated", "movies": ["The Sword of Doom", "Le Samourai", "Ghost Dog"], "theme": "Lone Assassin", "likes": 1},
    {"id": 79, "user": "fnulps", "movies": ["Charlie and the Chocolate Factory", "Snowpiercer", "The Colony"], "theme": "Class Hierarchy Train", "likes": 1},
    {"id": 80, "user": "danielmartin7094", "movies": ["Death Wish", "The Warriors", "Escape from New York"], "theme": "70s NYC Chaos", "likes": 4},
    {"id": 81, "user": "mattman_the_waydude", "movies": ["Vision Quest", "Full Metal Jacket", "Pacific Heights"], "theme": "Matthew Modine", "likes": 3},
    {"id": 82, "user": "paulday1", "movies": ["The Mummy", "Van Helsing", "Deep Rising"], "theme": "Monster Adventure", "likes": 0},
    {"id": 83, "user": "knudson1353", "movies": ["The Out-Of-Towners", "Save The Tiger", "Glengarry Glen Ross"], "theme": "Jack Lemmon Stress", "likes": 1},
    {"id": 84, "user": "devon_island", "movies": ["Willy Wonka and the Chocolate Factory", "Snowpiercer", "Nanook of the North"], "theme": "Survival Journey", "likes": 2},
    {"id": 85, "user": "apoundofobscure", "movies": ["Shane", "High Plains Drifter", "Pale Rider"], "theme": "Mysterious Western Stranger", "likes": 1},
    {"id": 86, "user": "enbiousbitch", "movies": ["Blade Runner", "Alien", "Planet of the Apes"], "theme": "Dystopian Sci-Fi Classic", "likes": 2},
    {"id": 87, "user": "mikeynerd", "movies": ["Hero", "Crouching Tiger Hidden Dragon", "Kung Fu Hustle"], "theme": "Wuxia Martial Arts", "likes": 6},
    {"id": 88, "user": "knudson1353", "movies": ["The Searchers", "Taxi Driver", "The Assassination of Richard Nixon"], "theme": "Obsessive Loner", "likes": 0},
    {"id": 89, "user": "sudonim2020", "movies": ["Collateral", "Layer Cake", "Prisoners"], "theme": "Crime Thriller", "likes": 0},
    {"id": 90, "user": "vellectrum", "movies": ["The Apprentice", "Melania", "Weekend at Bernie's"], "theme": "Political Satire", "likes": 2},
    {"id": 91, "user": "the_sulaco", "movies": ["ET", "Close Encounters", "War of the Worlds"], "theme": "Spielberg Aliens", "likes": 1},
    {"id": 92, "user": "hotsexcoldwine", "movies": ["Friday", "Half Baked", "Pineapple Express"], "theme": "Stoner Comedy", "likes": 0},
    {"id": 93, "user": "caractacusjack", "movies": ["Jerry Maguire", "Moneyball", "Air"], "theme": "Sports Business", "likes": 0},
    {"id": 94, "user": "dougom1", "movies": ["The Godfather", "Goodfellas", "Ghost Dog"], "theme": "Gangster G Movies", "likes": 1},
    {"id": 95, "user": "_tonywestside", "movies": ["The Big Short", "Margin Call", "Too Big To Fail"], "theme": "Financial Crisis", "likes": 0},
    {"id": 96, "user": "themoomabides", "movies": ["O Brother Where Art Thou", "Hail Caesar", "Jay Kelly"], "theme": "Clooney Entertainment Career", "likes": 1},
    {"id": 97, "user": "brooklyn_ellis66", "movies": ["The French Connection", "The Seven Ups", "To Live and Die in LA"], "theme": "Gritty Cop Thriller", "likes": 7},
    {"id": 98, "user": "yeeeeooowwww", "movies": ["Speed", "Johnny Mnemonic", "The Matrix"], "theme": "Keanu Action", "likes": 0},
    {"id": 99, "user": "knudson1353", "movies": ["The Boys In The Band", "The Big Chill", "The Breakfast Club"], "theme": "Ensemble Reunion", "likes": 0},
    {"id": 100, "user": "skeetersauci", "movies": ["Porco Rosso", "The Wind Rises", "The Boy and the Heron"], "theme": "Miyazaki Flight Legacy", "likes": 1},
    {"id": 101, "user": "pdenigris", "movies": ["Heat", "Drive", "To Live and Die in LA"], "theme": "LA Crime Style", "likes": 2},
    {"id": 102, "user": "benallanwatkins", "movies": ["The Wrestler", "Black Swan", "The Whale"], "theme": "Aronofsky Extreme Performers", "likes": 1},
    {"id": 103, "user": "bigsexysasquatch", "movies": ["Full Metal Jacket", "Apocalypse Now", "Jacob's Ladder"], "theme": "Vietnam Psychological", "likes": 3},
    {"id": 104, "user": "ulyssesbloomsday", "movies": ["Network", "Close Encounters", "Magnolia"], "theme": "Ensemble Epic", "likes": 0},
    {"id": 105, "user": "stefano.studio", "movies": ["The Imitation Game", "A Beautiful Mind", "The Theory of Everything"], "theme": "Genius Biopic", "likes": 1},
    {"id": 106, "user": "english_way_j_j", "movies": ["Platoon", "Apocalypse Now", "Born on the Fourth of July"], "theme": "Oliver Stone Vietnam", "likes": 1},
    {"id": 107, "user": "dragon_prince_ryu_445", "movies": ["She's All That", "Trojan War", "Sex Drive"], "theme": "Teen Road Trip Romance", "likes": 1},
    {"id": 108, "user": "nispeer89", "movies": ["Dazed and Confused", "Empire Records", "Superbad"], "theme": "Teen Hangout Comedy", "likes": 1},
    {"id": 109, "user": "marcinmichno", "movies": ["Finding Nemo", "Jaws", "The Meg"], "theme": "Ocean Predator", "likes": 0},
    {"id": 110, "user": "beer_and_loathing_in_knoxvegas", "movies": ["Tron", "The Last Starfighter", "Ready Player One"], "theme": "Video Game Reality", "likes": 0},
    {"id": 111, "user": "dudeitsshoe", "movies": ["Bill and Ted's Excellent Adventure", "Dude Where's My Car", "Harold and Kumar Go to White Castle"], "theme": "Dude Comedy", "likes": 1},
    {"id": 112, "user": "marsarieswar", "movies": ["Colors", "Training Day", "End of Watch"], "theme": "LAPD Street Level", "likes": 2},
    {"id": 113, "user": "vinnie_talks_sht", "movies": ["Terminator", "Aliens", "Avatar"], "theme": "James Cameron Sci-Fi", "likes": 0},
    {"id": 114, "user": "english_way_j_j", "movies": ["War Games", "2001 A Space Odyssey", "Terminator 2"], "theme": "AI Awakening", "likes": 0}
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('likes');
  const [viewMode, setViewMode] = useState('list');
  const [selectedTrilogyId, setSelectedTrilogyId] = useState(null);

  // Calculate statistics
  const stats = useMemo(() => {
    const allMovies = trilogies.flatMap(t => t.movies);
    const movieCounts = {};

    allMovies.forEach(movie => {
      movieCounts[movie] = (movieCounts[movie] || 0) + 1;
    });

    const uniqueMovies = Object.keys(movieCounts).length;
    const moviesInMultiple = Object.values(movieCounts).filter(count => count > 1).length;
    const totalLikes = trilogies.reduce((sum, t) => sum + t.likes, 0);

    const userCounts = {};
    trilogies.forEach(t => {
      userCounts[t.user] = (userCounts[t.user] || 0) + 1;
    });

    const topContributor = Object.entries(userCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      totalTrilogies: trilogies.length,
      uniqueMovies,
      moviesInMultiple,
      totalLikes,
      topContributor: topContributor ? `${topContributor[0]} (${topContributor[1]})` : 'N/A',
      movieCounts
    };
  }, []);

  // Filter and sort logic
  const filteredTrilogies = useMemo(() => {
    let filtered = trilogies.filter(trilogy => {
      const query = searchQuery.toLowerCase();
      return (
        trilogy.theme.toLowerCase().includes(query) ||
        trilogy.user.toLowerCase().includes(query) ||
        trilogy.movies.some(movie => movie.toLowerCase().includes(query))
      );
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'likes') {
        return b.likes - a.likes;
      } else if (sortBy === 'theme') {
        return a.theme.localeCompare(b.theme);
      } else if (sortBy === 'user') {
        return a.user.localeCompare(b.user);
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, sortBy]);

  // Get trilogies with shared movies
  const movieConnections = useMemo(() => {
    const connections = {};

    Object.entries(stats.movieCounts).forEach(([movie, count]) => {
      if (count > 1) {
        connections[movie] = trilogies.filter(t => t.movies.includes(movie));
      }
    });

    return connections;
  }, [stats.movieCounts]);

  // Get selected trilogy details
  const selectedTrilogy = selectedTrilogyId
    ? trilogies.find(t => t.id === selectedTrilogyId)
    : null;

  // Render stats dashboard
  const StatsCard = ({ label, value, accent = false }) => (
    <div className={`p-4 rounded-lg border ${accent ? 'bg-purple-900/30 border-purple-500/50' : 'bg-slate-800/50 border-slate-700/50'} hover:border-purple-500/80 transition-colors`}>
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent ? 'text-purple-300' : 'text-slate-100'}`}>{value}</p>
    </div>
  );

  // Render list view
  const ListView = () => (
    <div className="space-y-2">
      {filteredTrilogies.map((trilogy, index) => (
        <button
          key={trilogy.id}
          onClick={() => setSelectedTrilogyId(trilogy.id)}
          className={`w-full p-4 rounded-lg border transition-all text-left ${
            selectedTrilogyId === trilogy.id
              ? 'bg-purple-900/40 border-purple-500 shadow-lg shadow-purple-500/20'
              : 'bg-slate-800/40 border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-400 font-bold text-lg min-w-8">{index + 1}</span>
                <h3 className="text-slate-100 font-semibold truncate">{trilogy.theme}</h3>
              </div>
              <p className="text-sm text-slate-400 mb-2">@{trilogy.user}</p>
              <p className="text-sm text-slate-300">
                {trilogy.movies.join(' → ')}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-purple-300 font-bold text-lg">{trilogy.likes}</p>
              <p className="text-xs text-slate-500">likes</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  // Render grid view
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTrilogies.map((trilogy) => (
        <button
          key={trilogy.id}
          onClick={() => setSelectedTrilogyId(trilogy.id)}
          className={`p-5 rounded-lg border transition-all text-left ${
            selectedTrilogyId === trilogy.id
              ? 'bg-purple-900/40 border-purple-500 shadow-lg shadow-purple-500/20'
              : 'bg-slate-800/40 border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800/60'
          }`}
        >
          <h3 className="text-slate-100 font-bold mb-3 text-sm leading-tight">{trilogy.theme}</h3>
          <p className="text-xs text-slate-400 mb-3">@{trilogy.user}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {trilogy.movies.map((movie, idx) => (
              <span key={idx} className="px-2 py-1 bg-purple-900/50 text-purple-200 text-xs rounded border border-purple-700/50">
                {movie}
              </span>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-700/50">
            <p className="text-purple-300 font-bold">{trilogy.likes} likes</p>
          </div>
        </button>
      ))}
    </div>
  );

  // Render connections view
  const ConnectionsView = () => (
    <div className="space-y-4">
      {Object.entries(movieConnections).map(([movie, connectedTrilogies]) => (
        <div key={movie} className="p-5 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:border-purple-500/50 transition-colors">
          <h3 className="text-purple-300 font-bold mb-4 text-lg">{movie}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {connectedTrilogies.map((trilogy) => (
              <button
                key={trilogy.id}
                onClick={() => setSelectedTrilogyId(trilogy.id)}
                className={`p-3 rounded border text-left transition-all ${
                  selectedTrilogyId === trilogy.id
                    ? 'bg-purple-900/40 border-purple-500'
                    : 'bg-slate-800/60 border-slate-700/50 hover:border-purple-500/50'
                }`}
              >
                <p className="font-semibold text-slate-100 text-sm">{trilogy.theme}</p>
                <p className="text-xs text-slate-400">@{trilogy.user}</p>
                <p className="text-xs text-purple-300 mt-1">{trilogy.likes} likes</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent mb-2">
          Logical Trilogies Explorer
        </h1>
        <p className="text-slate-400">Discover thematic movie connections from the Threads community</p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <StatsCard label="Total Trilogies" value="114" accent />
        <StatsCard label="Unique Movies" value={stats.uniqueMovies} />
        <StatsCard label="Shared Movies" value={stats.moviesInMultiple} accent />
        <StatsCard label="Total Likes" value={stats.totalLikes} />
        <StatsCard label="Top Contributor" value={stats.topContributor.split('(')[0].trim()} />
        <StatsCard label="Contrib Count" value={stats.topContributor.split('(')[1]?.replace(')', '') || '0'} accent />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and Controls */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by movie, theme, or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-800/80 transition-all"
              />
            </div>

            {/* Controls Row */}
            <div className="flex flex-wrap gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:border-purple-500/50 transition-all cursor-pointer hover:border-purple-500/50"
                >
                  <option value="likes">Sort by Likes</option>
                  <option value="theme">Sort by Theme</option>
                  <option value="user">Sort by User</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>

              {/* View Mode Buttons */}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg border transition-all ${
                    viewMode === 'list'
                      ? 'bg-purple-900/40 border-purple-500 text-purple-300'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-purple-500/50'
                  }`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg border transition-all ${
                    viewMode === 'grid'
                      ? 'bg-purple-900/40 border-purple-500 text-purple-300'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-purple-500/50'
                  }`}
                  title="Grid View"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('connections')}
                  className={`p-2 rounded-lg border transition-all ${
                    viewMode === 'connections'
                      ? 'bg-purple-900/40 border-purple-500 text-purple-300'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-purple-500/50'
                  }`}
                  title="Connections View"
                >
                  <Network className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-slate-400">
              Showing {filteredTrilogies.length} of {trilogies.length} trilogies
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-slate-900/30 rounded-lg border border-slate-700/50 p-6">
            {filteredTrilogies.length > 0 ? (
              viewMode === 'list' ? (
                <ListView />
              ) : viewMode === 'grid' ? (
                <GridView />
              ) : (
                <ConnectionsView />
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400">No trilogies found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {selectedTrilogy ? (
            <div className="sticky top-6 p-5 rounded-lg bg-gradient-to-br from-purple-900/40 to-slate-800/40 border border-purple-500/50 shadow-lg shadow-purple-500/10">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-100 flex-1">Details</h2>
                <button
                  onClick={() => setSelectedTrilogyId(null)}
                  className="p-1 hover:bg-slate-700/50 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Theme */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Theme</p>
                  <p className="text-lg font-bold text-purple-300">{selectedTrilogy.theme}</p>
                </div>

                {/* User */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Contributor</p>
                  <p className="text-slate-100">@{selectedTrilogy.user}</p>
                </div>

                {/* Movies */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Movies</p>
                  <div className="space-y-2">
                    {selectedTrilogy.movies.map((movie, idx) => {
                      const isShared = stats.movieCounts[movie] > 1;
                      return (
                        <div key={idx} className={`p-3 rounded border ${isShared ? 'bg-yellow-900/20 border-yellow-700/50' : 'bg-slate-800/50 border-slate-700/50'}`}>
                          <p className="font-medium text-slate-100">{idx + 1}. {movie}</p>
                          {isShared && (
                            <p className="text-xs text-yellow-300 mt-1">
                              Appears in {stats.movieCounts[movie]} trilogies
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Likes */}
                <div className="pt-4 border-t border-slate-700/50">
                  <p className="text-sm text-slate-400 mb-1">Community Likes</p>
                  <p className="text-3xl font-bold text-purple-300">{selectedTrilogy.likes}</p>
                </div>

                {/* OP Badge */}
                {selectedTrilogy.isOP && (
                  <div className="p-3 rounded bg-purple-900/30 border border-purple-500/50">
                    <p className="text-xs text-purple-300 font-semibold">Original Poster (OP)</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="sticky top-6 p-5 rounded-lg bg-slate-800/30 border border-slate-700/50 text-center">
              <p className="text-slate-400 text-sm">Select a trilogy to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrilogyExplorer;
