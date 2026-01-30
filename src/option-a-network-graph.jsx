import React, { useState, useEffect, useRef } from 'react';

const trilogiesData = [
  { id: 1, user: "busse", movies: ["Full Metal Jacket", "Apocalypse Now", "Fear and Loathing in Las Vegas"], theme: "Vietnam/War/Madness", likes: 183 },
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
  { id: 20, user: "jdhovland", movies: ["Charly", "Secret of NIMH", "Ratatouille"], theme: "Intelligent Animals", likes: 3 },
  { id: 54, user: "f_leist", movies: ["Wind River", "Sicario", "Hell or High Water"], theme: "Taylor Sheridan", likes: 2 },
  { id: 49, user: "xipyro_maniacix", movies: ["Frankenweenie", "Corpse Bride", "Nightmare Before Christmas"], theme: "Tim Burton Stop-Motion", likes: 0 },
  { id: 22, user: "nicolaj_springborg", movies: ["Eraserhead", "Blue Velvet", "Mulholland Drive"], theme: "David Lynch", likes: 0 },
  { id: 45, user: "perera.dylan", movies: ["127 Hours", "All is Lost", "Into the Wild"], theme: "Isolation/Survival", likes: 0 },
  { id: 47, user: "perera.dylan", movies: ["Almost Famous", "Dazed and Confused", "Boogie Nights"], theme: "70s/80s Nostalgia", likes: 0 },
  { id: 36, user: "chetmcgruber", movies: ["The Score", "Heat", "Den of Thieves"], theme: "Heist", likes: 0 },
  { id: 15, user: "mooncrime74", movies: ["Pocahontas", "Dances with Wolves", "Avatar"], theme: "White Savior", likes: 0 },
  { id: 56, user: "amor_et_vinum", movies: ["Menace II Society", "Blood In Blood Out", "Training Day"], theme: "LA Gang Films", likes: 0 },
];

// Build network data
const buildNetworkData = (trilogies) => {
  const nodes = [];
  const links = [];
  const movieMap = new Map();

  // Add trilogy nodes (center) and movie nodes
  trilogies.forEach((t, idx) => {
    const trilogyId = `trilogy-${t.id}`;
    nodes.push({
      id: trilogyId,
      label: t.theme,
      type: 'trilogy',
      likes: t.likes,
      user: t.user,
      radius: Math.max(15, Math.min(40, 15 + t.likes * 0.3))
    });

    t.movies.forEach(movie => {
      if (!movieMap.has(movie)) {
        movieMap.set(movie, []);
        nodes.push({
          id: `movie-${movie}`,
          label: movie,
          type: 'movie',
          radius: 8
        });
      }
      movieMap.get(movie).push(trilogyId);

      links.push({
        source: trilogyId,
        target: `movie-${movie}`,
        strength: 1
      });
    });
  });

  // Find movies that appear in multiple trilogies (connections!)
  const sharedMovies = [];
  movieMap.forEach((trilogies, movie) => {
    if (trilogies.length > 1) {
      sharedMovies.push({ movie, trilogies });
    }
  });

  return { nodes, links, sharedMovies };
};

export default function NetworkGraph() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const svgRef = useRef(null);
  const [positions, setPositions] = useState([]);

  const { nodes, links, sharedMovies } = buildNetworkData(trilogiesData);

  // Simple force-directed layout simulation
  useEffect(() => {
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    // Initialize positions
    const pos = nodes.map((node, i) => {
      if (node.type === 'trilogy') {
        const angle = (i / nodes.filter(n => n.type === 'trilogy').length) * 2 * Math.PI;
        const radius = 200;
        return {
          ...node,
          x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 50,
          y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 50,
          vx: 0,
          vy: 0
        };
      } else {
        return {
          ...node,
          x: centerX + (Math.random() - 0.5) * 400,
          y: centerY + (Math.random() - 0.5) * 400,
          vx: 0,
          vy: 0
        };
      }
    });

    // Simple force simulation
    for (let iter = 0; iter < 100; iter++) {
      // Repulsion between all nodes
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const dx = pos[j].x - pos[i].x;
          const dy = pos[j].y - pos[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 500 / (dist * dist);
          pos[i].vx -= (dx / dist) * force;
          pos[i].vy -= (dy / dist) * force;
          pos[j].vx += (dx / dist) * force;
          pos[j].vy += (dy / dist) * force;
        }
      }

      // Attraction along links
      links.forEach(link => {
        const source = pos.find(p => p.id === link.source);
        const target = pos.find(p => p.id === link.target);
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (dist - 60) * 0.01;
          source.vx += (dx / dist) * force;
          source.vy += (dy / dist) * force;
          target.vx -= (dx / dist) * force;
          target.vy -= (dy / dist) * force;
        }
      });

      // Center gravity
      pos.forEach(p => {
        p.vx += (centerX - p.x) * 0.001;
        p.vy += (centerY - p.y) * 0.001;
      });

      // Apply velocity with damping
      pos.forEach(p => {
        p.x += p.vx * 0.3;
        p.y += p.vy * 0.3;
        p.vx *= 0.9;
        p.vy *= 0.9;
        // Keep in bounds
        p.x = Math.max(50, Math.min(width - 50, p.x));
        p.y = Math.max(50, Math.min(height - 50, p.y));
      });
    }

    setPositions(pos);
  }, []);

  const getNodeColor = (node) => {
    if (node.type === 'trilogy') {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
      ];
      return colors[node.likes % colors.length];
    }
    return '#2C3E50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          🎬 Trilogy Network Graph
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Movies as nodes, connected to their "logical trilogies". Larger nodes = more likes.
        </p>

        <div className="bg-gray-800 rounded-xl p-4 shadow-2xl">
          <svg
            ref={svgRef}
            width="100%"
            height="600"
            viewBox="0 0 800 600"
            className="bg-gray-900 rounded-lg"
          >
            {/* Links */}
            {positions.length > 0 && links.map((link, i) => {
              const source = positions.find(p => p.id === link.source);
              const target = positions.find(p => p.id === link.target);
              if (!source || !target) return null;

              const isHighlighted = hoveredNode &&
                (hoveredNode.id === link.source || hoveredNode.id === link.target);

              return (
                <line
                  key={i}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isHighlighted ? '#4ECDC4' : '#374151'}
                  strokeWidth={isHighlighted ? 2 : 1}
                  opacity={isHighlighted ? 1 : 0.3}
                />
              );
            })}

            {/* Nodes */}
            {positions.map((node, i) => (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node)}
              >
                <circle
                  r={node.radius || 8}
                  fill={getNodeColor(node)}
                  stroke={hoveredNode?.id === node.id ? '#fff' : 'transparent'}
                  strokeWidth={2}
                  opacity={node.type === 'movie' ? 0.7 : 1}
                />
                {node.type === 'trilogy' && (
                  <text
                    y={node.radius + 12}
                    textAnchor="middle"
                    fill="#9CA3AF"
                    fontSize="9"
                    fontWeight="500"
                  >
                    {node.label.length > 15 ? node.label.slice(0, 15) + '...' : node.label}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Info Panel */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              {hoveredNode ? (hoveredNode.type === 'trilogy' ? '🎯 Trilogy' : '🎬 Movie') : '👆 Hover over a node'}
            </h3>
            {hoveredNode && (
              <div className="text-gray-300">
                <p className="font-medium text-xl text-white">{hoveredNode.label}</p>
                {hoveredNode.type === 'trilogy' && (
                  <>
                    <p className="mt-2">By: @{hoveredNode.user}</p>
                    <p>Likes: {hoveredNode.likes}</p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-3">🔗 Shared Movies</h3>
            <p className="text-gray-400 text-sm">
              Movies that appear in multiple trilogies:
            </p>
            <ul className="mt-2 text-gray-300 text-sm">
              {sharedMovies.slice(0, 5).map((s, i) => (
                <li key={i} className="py-1">
                  <span className="text-yellow-400">{s.movie}</span> ({s.trilogies.length} trilogies)
                </li>
              ))}
              {sharedMovies.length === 0 && (
                <li className="text-gray-500">No shared movies in sample</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-sm">
          Data from @busse's Thread • {trilogiesData.length} trilogies visualized
        </div>
      </div>
    </div>
  );
}
