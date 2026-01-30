# Trilogies Obsidian Vault

A force-directed graph visualization of thematic movie trilogies and their connections, sourced from a Threads discussion about "Logical Trilogies That Aren't Actually Trilogies."

## Overview

This vault contains a curated collection of 124 thematic movie trilogies contributed by various users. The vault uses Obsidian's graph view to visualize connections between movies and trilogies, with shared movies creating interesting network clusters.

## Statistics

- **Total Trilogies:** 124
- **Unique Movies:** 333
- **Shared Movies:** 41 (movies appearing in multiple trilogies)
- **Single-Appearance Movies:** 292
- **Total Likes (All Trilogies):** 670

## Most Connected Movies

These movies create the strongest graph connections by appearing in multiple trilogies:

- **Full Metal Jacket** - appears in 4 trilogies
- **Apocalypse Now** - appears in 4 trilogies
- **Dazed and Confused** - appears in 4 trilogies
- **Fear and Loathing in Las Vegas** - appears in 3 trilogies
- **Jaws** - appears in 3 trilogies
- **Dark City** - appears in 3 trilogies
- **Time Bandits** - appears in 2 trilogies
- **Brazil** - appears in 2 trilogies
- **Frankenhooker** - appears in 2 trilogies
- **Poor Things** - appears in 2 trilogies


## Folder Structure

```
obsidian-vault/
├── README.md (this file)
├── Trilogies/
│   └── [Trilogy files by theme name]
└── Movies/
    └── [Movie files for shared movies only]
```

## How to Use

1. **Open in Obsidian:**
   - In Obsidian, click "Open vault folder as vault"
   - Navigate to the `obsidian-vault` directory

2. **View the Graph:**
   - Open the Graph View (Ctrl/Cmd + G)
   - Use the graph controls to zoom, pan, and interact
   - Click on nodes to highlight connections
   - Use filters to show/hide specific tags

3. **Explore Tags:**
   - `#trilogy` - marks all trilogy files
   - `#actor-connection` - thematic connections
   - `#movie` - marks movie files
   - `#shared-movie` - highlights movies appearing in multiple trilogies

4. **Recommended Graph Settings:**
   - Force: 1.5 to 2.0 (spreads nodes apart)
   - Center Force: 0.3
   - Repel Force: -50 to -100
   - Link Force: 1.0

## Top Trilogies by Likes

### Highest Rated

1. **Vietnam War Madness** by @busse - 183 likes
2. **Verhoeven Satire** by @marsarieswar - 84 likes
3. **Saving Matt Damon** by @dangerous.moos - 71 likes
4. **Cornetto Trilogy** by @den_the_hip - 51 likes
5. **Space Crisis Survival** by @alexanderdcass - 31 likes

## Data Source

- **Source:** https://www.threads.com/@busse/post/DUGELJelUo6
- **Title:** Logical Trilogies That Aren't Actually Trilogies
- **Original Author:** @busse
- **Scraped Date:** 2026-01-30
- **Original Stats:**
  - Views: 28,800
  - Likes: 183
  - Replies: 282

## Graph Connection Types

The force-directed graph shows two types of connections:

1. **Trilogy → Movie:** Each trilogy file links to its constituent movies
2. **Movie → Trilogies:** Shared movies link back to all trilogies they appear in

Movies that appear in only one trilogy don't have their own files (to keep the graph focused on interesting connections), but they still appear as targets in the trilogy files.

## Tips for Exploration

- **Zoom In on Clusters:** Movies that appear together in multiple trilogies create dense clusters
- **Filter by Tags:** Use `#shared-movie` to highlight the most connected nodes
- **Look for Surprising Connections:** Some movies bridge completely different thematic categories
- **Count Degrees:** Hover over nodes to see connection counts

## Example Trilogies

Here are some of the most creative themes:

- **"Saving Matt Damon"** - Saving Private Ryan, Interstellar, The Martian
- **"Cornetto Trilogy"** - Shaun of the Dead, Hot Fuzz, The World's End
- **"Gilliam Dreams Trilogy"** - Time Bandits, Brazil, Baron Munchausen
- **"White Savior"** - Pocahontas, Dances with Wolves, Avatar
- **"Verhoeven Satire"** - RoboCop, Total Recall, Starship Troopers

Enjoy exploring the vault!
