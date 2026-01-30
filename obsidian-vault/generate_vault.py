#!/usr/bin/env python3
"""
Generate Obsidian vault structure from trilogies JSON data
"""
import json
from pathlib import Path
from collections import defaultdict

# Load the data
with open('/sessions/relaxed-determined-faraday/mnt/THREADS-VIZ/data/trilogies-complete.json', 'r') as f:
    data = json.load(f)

vault_path = Path('/sessions/relaxed-determined-faraday/mnt/THREADS-VIZ/obsidian-vault')
trilogies_dir = vault_path / 'Trilogies'
movies_dir = vault_path / 'Movies'

# Track movie appearances
movie_to_trilogies = defaultdict(list)
movie_count = 0
single_movie_count = 0

# Create trilogy files
print("Creating trilogy files...")
for trilogy in data['trilogies']:
    theme = trilogy['theme']
    user = trilogy['user']
    likes = trilogy['likes']
    movies = trilogy['movies']

    # Create filename from theme
    filename = f"{theme}.md"
    filepath = trilogies_dir / filename

    # Track which trilogies each movie appears in
    for movie in movies:
        movie_to_trilogies[movie].append(theme)

    # Create content with wiki links
    movie_links = '\n'.join([f"1. [[{movie}]]" for movie in movies])

    content = f"""# {theme}

**Theme:** {theme}
**By:** @{user}
**Likes:** {likes}

## Movies
{movie_links}

#trilogy #actor-connection
"""

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"  Created: {filename}")

print(f"\nTotal trilogies created: {len(data['trilogies'])}")

# Create movie files for movies that appear in multiple trilogies
print("\nCreating movie files for shared movies...")
for movie, trilogies in sorted(movie_to_trilogies.items()):
    if len(trilogies) > 1:
        # This movie appears in multiple trilogies - create a file for it
        filename = f"{movie}.md"
        filepath = movies_dir / filename

        trilogy_links = '\n'.join([f"- [[{trilogy}]]" for trilogy in sorted(trilogies)])

        content = f"""# {movie}

## Appears in Trilogies
{trilogy_links}

#movie #shared-movie
"""

        with open(filepath, 'w') as f:
            f.write(content)
        print(f"  Created: {filename} (appears in {len(trilogies)} trilogies)")
        movie_count += 1
    else:
        single_movie_count += 1

print(f"\nMovie files created: {movie_count}")
print(f"Movies appearing once (skipped): {single_movie_count}")
print(f"Total unique movies: {len(movie_to_trilogies)}")

# Create README with statistics
print("\nCreating README.md...")
readme_path = vault_path / 'README.md'

# Count shared movies
shared_movies = {movie: trilogies for movie, trilogies in movie_to_trilogies.items() if len(trilogies) > 1}

readme_content = f"""# Trilogies Obsidian Vault

A force-directed graph visualization of thematic movie trilogies and their connections, sourced from a Threads discussion about "Logical Trilogies That Aren't Actually Trilogies."

## Overview

This vault contains a curated collection of {len(data['trilogies'])} thematic movie trilogies contributed by various users. The vault uses Obsidian's graph view to visualize connections between movies and trilogies, with shared movies creating interesting network clusters.

## Statistics

- **Total Trilogies:** {len(data['trilogies'])}
- **Unique Movies:** {len(movie_to_trilogies)}
- **Shared Movies:** {len(shared_movies)} (movies appearing in multiple trilogies)
- **Single-Appearance Movies:** {single_movie_count}
- **Total Likes (All Trilogies):** {sum(t['likes'] for t in data['trilogies'])}

## Most Connected Movies

These movies create the strongest graph connections by appearing in multiple trilogies:

"""

# Sort movies by number of appearances
sorted_shared = sorted(shared_movies.items(), key=lambda x: len(x[1]), reverse=True)[:10]

for movie, trilogies in sorted_shared:
    readme_content += f"- **{movie}** - appears in {len(trilogies)} trilogies\n"

readme_content += f"""

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

1. **Vietnam War Madness** by @busse - {next((t['likes'] for t in data['trilogies'] if t['theme'] == 'Vietnam War Madness'), 0)} likes
2. **Verhoeven Satire** by @marsarieswar - {next((t['likes'] for t in data['trilogies'] if t['theme'] == 'Verhoeven Satire'), 0)} likes
3. **Saving Matt Damon** by @dangerous.moos - {next((t['likes'] for t in data['trilogies'] if t['theme'] == 'Saving Matt Damon'), 0)} likes
4. **Cornetto Trilogy** by @den_the_hip - {next((t['likes'] for t in data['trilogies'] if t['theme'] == 'Cornetto Trilogy'), 0)} likes
5. **Space Crisis Survival** by @alexanderdcass - {next((t['likes'] for t in data['trilogies'] if t['theme'] == 'Space Crisis Survival'), 0)} likes

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
"""

with open(readme_path, 'w') as f:
    f.write(readme_content)

print(f"  Created: README.md")
print("\nVault generation complete!")
