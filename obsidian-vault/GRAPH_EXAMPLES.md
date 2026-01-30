# Graph View Examples

This document shows examples of how the force-directed graph will display connections.

## Example 1: The Martian - A Cross-Domain Bridge

**The Martian** appears in 2 trilogies:
- [[Saving Matt Damon]]
- [[Space Crisis Survival]]

This creates an interesting bridge between two seemingly different themes:
- One focuses on Matt Damon as an actor appearing in crisis situations
- One focuses on space/survival scenarios

In the graph, The Martian node will sit between these two trilogy clusters.

---

## Example 2: Dazed and Confused - Maximum Connectivity

**Dazed and Confused** appears in 4 trilogies:
- [[70s 80s Nostalgia]]
- [[70s Rock Party]]
- [[Teen Coming of Age]]
- [[Teen Hangout Comedy]]

This is the most connected movie in the dataset. In the graph view, it will have the highest degree (most connections). This node becomes a central hub connecting:
- Nostalgia-focused trilogies
- Music/party themed trilogies
- Coming-of-age themes
- Teen comedy themes

---

## Example 3: Apocalypse Now - Vietnam War Nexus

**Apocalypse Now** appears in 3 trilogies:
- [[Vietnam War Madness]]
- [[Vietnam Psychological]]
- [[Oliver Stone Vietnam]]

This creates a tight cluster of Vietnam War-themed trilogies. The three trilogy nodes form a triangle, with Apocalypse Now at the center. The shared movie creates a very dense local connection pattern.

---

## Example 4: Single-Appearance Connections

Movies like **Saving Private Ryan** appear in only one trilogy:
- [[Saving Matt Damon]]

In the graph view, these become leaf nodes - they only have one connection to a trilogy node. They don't create interesting bridges but they're still part of the network visualization.

---

## How to Explore These Connections

### In Obsidian Graph View:

1. **Find High-Degree Nodes:**
   - Filter by tag: `#shared-movie`
   - Look for nodes with many lines radiating outward
   - Dazed and Confused will have the most connections (4)

2. **Explore Thematic Clusters:**
   - Click on "Vietnam War Madness"
   - See all movies (including Apocalypse Now)
   - Notice how many are shared with other trilogies
   - Follow those links to see related trilogies

3. **Trace Cross-Domain Bridges:**
   - Click "The Martian"
   - See it connects to both actor and space themes
   - Observe how it bridges two different categorization systems

4. **Find Surprising Connections:**
   - Many movies create unexpected links
   - Example: Fear and Loathing in Las Vegas connects Vietnam War Madness, Johnny Depp themes, and Hunter S. Thompson references
   - The graph reveals these hidden connections visually

---

## Network Characteristics

### Network Density
- 114 trilogy nodes
- 34 shared movie nodes (that have their own files)
- 269 single-appearance movies (represented as targets only)
- Total connection attempts: ~450+ edges

### Clustering Coefficient
High clustering around:
- Vietnam War films (multiple overlapping trilogies)
- 70s-themed films (multiple nostalgic/party/coming-of-age trilogies)
- Sci-fi space films (crisis/survival themes)
- Crime/noir films (various LA and heist themes)

### Hub Nodes
The most important nodes for graph structure:
1. Dazed and Confused (degree 4)
2. Full Metal Jacket (degree 3)
3. Apocalypse Now (degree 3)
4. Fear and Loathing in Las Vegas (degree 3)

---

## Visual Appearance Tips

### When viewing the graph with recommended settings:

**Force: 1.8, Center Force: 0.3, Repel Force: -75**

You should see:
- Tight clusters of Vietnam War trilogies
- A loose cluster of 70s film trilogies
- Sci-fi films somewhat separated
- Crime/noir films in their own region
- Shared movies appearing at cluster boundaries (bridges)
- Dazed and Confused as a major hub in the center-left area

---

## Connection Semantics

The graph represents two types of semantic relationships:

### Type 1: Composition
**Trilogy → Movie**: "This trilogy contains this movie"
- One direction: trilogy links to movie
- All trilogy files have exactly 3 outgoing movie links

### Type 2: Aggregation
**Movie → Trilogy**: "This movie appears in this trilogy"
- Inverse relationship (backlinks in Obsidian)
- Only movies appearing 2+ times have their own files

This creates a bipartite-ish structure with:
- Movie nodes in one layer
- Trilogy nodes in another layer
- Connections running between them

---

## How to Filter the Graph

In Obsidian's Graph View sidebar:

1. **Show only trilogies:**
   - Filter tags: `include: #trilogy`
   - All 114 trilogy nodes visible
   - No movie nodes shown
   - Reveals structure of user contributions

2. **Show only shared movies:**
   - Filter tags: `include: #shared-movie`
   - Only 34 movie files shown
   - All trilogies hidden
   - Reveals the connection backbone

3. **Show everything:**
   - No filters
   - 149 visible nodes
   - All connections displayed
   - See the complete network

4. **Focus on a theme:**
   - Click on a trilogy
   - Highlight-only mode shows that trilogy + its movies
   - Useful for detailed exploration

---

Enjoy exploring the force-directed network of movie trilogies!
