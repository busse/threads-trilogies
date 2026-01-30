# Threads Trilogies

An interactive visualization of 137 thematic movie trilogies crowdsourced from a viral Threads post, with an Obsidian vault for graph-based exploration.

## Live Demo

**[View the Interactive Explorer](https://busse.github.io/threads-trilogies/)**

## About

This project visualizes responses to a viral [Threads post](https://www.threads.com/@busse/post/DUGELJelUo6) asking users to share "logical trilogies that aren't actually trilogies" -- groups of three thematically connected films that weren't intended as a series.

### What's a "Logical Trilogy"?

A logical trilogy is three movies that share thematic elements, narrative threads, or artistic connections -- even though they were never meant to be a series. Examples include:

- **Cornetto Trilogy**: Shaun of the Dead, Hot Fuzz, The World's End
- **Guillermo del Toro's Spanish Civil War**: The Devil's Backbone, Pan's Labyrinth, The Spirit of the Beehive
- **Before Trilogy**: Before Sunrise, Before Sunset, Before Midnight

## Data

- 137 unique trilogies
- 349 unique films referenced
- 51 films appearing in multiple trilogies
- 115 Threads users contributed

The complete structured dataset lives in [`data/trilogies-complete.json`](data/trilogies-complete.json) with all trilogies, movies, contributors, like counts, and theme metadata.

## Interactive Explorer

The [live site](https://busse.github.io/threads-trilogies/) is a single-page React app served via GitHub Pages from `index.html` at the repo root.

Features:
- Search and filter by movie title, theme, or contributor
- Multiple view modes: List, Grid, and Connections
- Sort by likes, theme, or contributor
- Stats dashboard with most connected films and top contributors
- Responsive design for desktop and mobile

## Obsidian Vault

The [`obsidian-vault/`](obsidian-vault/) directory is a standalone Obsidian vault with wiki-linked markdown files for every trilogy and every shared movie. Open it in [Obsidian](https://obsidian.md/) and use Graph View (Cmd+G) to explore a force-directed network of trilogies and their connections.

```
obsidian-vault/
  Trilogies/    -- 139 trilogy files, one per thematic group
  Movies/       -- 52 shared movie files (movies in 2+ trilogies)
  README.md     -- vault-specific usage guide and statistics
```

### Most Connected Movies

These films bridge the most trilogies in the network graph:

| Movie | Trilogies |
|-------|-----------|
| Dazed and Confused | 4 |
| Full Metal Jacket | 4 |
| Apocalypse Now | 4 |
| Fear and Loathing in Las Vegas | 3 |
| Jaws | 3 |
| Dark City | 3 |

See [`obsidian-vault/README.md`](obsidian-vault/README.md) for full vault documentation, graph settings, and exploration tips.

## Repository Structure

```
threads-trilogies/
  index.html                 -- deployed GitHub Pages site
  data/
    trilogies-complete.json  -- complete structured dataset
  obsidian-vault/
    README.md                -- vault documentation
    Trilogies/               -- 139 trilogy markdown files
    Movies/                  -- 52 shared movie markdown files
    generate_vault.py        -- script used to generate vault from JSON
  src/
    trilogy-explorer.jsx     -- main React component (compiled into index.html)
    option-a-network-graph.jsx
    option-b-theme-clusters.jsx
    option-c-interactive-explorer.jsx
```

## Technical Stack

- React (via CDN/Babel for single-file deployment)
- Tailwind CSS
- GitHub Pages for hosting
- Obsidian for graph-based knowledge exploration

## Credits

- Original concept and Threads post: [@busse](https://www.threads.com/@busse)
- Trilogies contributed by the Threads community
- Visualization built with assistance from Claude

## License

MIT License - Feel free to fork, modify, and share!
