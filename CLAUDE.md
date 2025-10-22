# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static personal website (tylerhext.github.io) built with **11ty (Eleventy)**. The site features a chronological blog with plant grow logs and other personal content, along with custom pages for home, about, and contact.

## Architecture

### Directory Structure

```
/
├── src/                           # Source files (11ty input)
│   ├── posts/                     # Blog posts (chronological)
│   │   ├── p-granatum-1.md        # Living document per plant
│   │   ├── p-afra-1.md
│   │   └── ...                    # Future posts (tech, trips, etc.)
│   ├── _includes/                 # 11ty layouts
│   │   ├── base.njk               # Base HTML template
│   │   └── post.njk               # Individual post template
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css         # Site styles
│   │   ├── images/                # All images
│   │   └── fonts/                 # CodeNewRoman Nerd Font
│   ├── index.md                   # Home page
│   ├── about.md                   # About page
│   ├── contact.md                 # Contact page
│   └── CNAME                      # GitHub Pages custom domain
│
├── docs/                          # Generated output (GitHub Pages serves from here)
├── .eleventy.js                   # 11ty configuration
├── package.json                   # Node dependencies
└── node_modules/                  # npm packages
```

### Build System

This site uses **11ty (Eleventy)**, a simple static site generator. Key features:

- **Input:** `src/` directory
- **Output:** `docs/` directory (for GitHub Pages)
- **Templates:** Nunjucks (`.njk`) for layouts
- **Content:** Markdown (`.md`) for posts and pages
- **Collections:** Posts are auto-sorted by `updated` date (most recent first)

### Post Structure

Each post is a markdown file in `src/posts/` with YAML frontmatter:

```yaml
---
layout: post.njk
title: Punica granatum (Pomegranate) #1
created: 2024-01-15
updated: 2025-01-15
thumbnail: /assets/images/grow-logs/p-granatum-1-photo-1.png
tags: [plants]
---
```

**Living Document Model:**
- One markdown file per plant/topic
- The file is updated over time (add new photos, content)
- The `updated` field changes to reflect the latest modification
- Posts are sorted by `updated` date on the posts index page

### Naming Conventions

Plant posts use scientific name abbreviations:
- `p-granatum` = Punica granatum (pomegranate)
- `p-afra` = Portulacaria afra (elephant bush)
- `p-nana` = Punica granatum 'Nana' (dwarf pomegranate)
- `f-carica` = Ficus carica (fig)
- `u-parvifolia` = Ulmus parvifolia (Chinese elm)

Individual plants are numbered: `p-granatum-1.md`, `p-granatum-2.md`, etc.

## Development Commands

```bash
# Install dependencies
npm install

# Build site (generates docs/ directory)
npm run build

# Serve locally with live reload
npm run serve

# Clean build directory
npm run clean
```

## Workflow

### Adding a New Plant Post

1. Create `src/posts/{species-code}-{number}.md`
2. Add frontmatter:
   ```yaml
   ---
   layout: post.njk
   title: Punica granatum (Pomegranate) #5
   created: 2025-01-20
   updated: 2025-01-20
   thumbnail: /assets/images/grow-logs/p-granatum-5-photo-1.jpg
   tags: [plants]
   ---
   ```
3. Add content with images:
   ```markdown
   Brief description of the plant.

   ---

   ## 2025 January

   ![Photo description](/assets/images/grow-logs/p-granatum-5-photo-1.jpg)
   ```
4. Place images in `src/assets/images/grow-logs/`
5. Run `npm run build`

### Updating an Existing Post

1. Open the post file in `src/posts/`
2. Add new content (typically a new date section with photos)
3. Update the `updated` field in frontmatter
4. Run `npm run build`

### Adding Non-Plant Content

1. Create a new markdown file in `src/posts/` (e.g., `catalina-trip.md`)
2. Use appropriate tags (e.g., `tags: [travel, hiking]`)
3. Follow the same frontmatter structure
4. Run `npm run build`

## Deployment

The site is deployed via **GitHub Pages** from the `docs/` directory on the `master` branch.

```bash
# After building
git add docs/ src/ .eleventy.js package.json
git commit -m "Update site"
git push origin master
```

GitHub Pages automatically serves the updated site at `tylerhext.com`.

## Important Notes

- **DO commit:** `docs/`, `src/`, `.eleventy.js`, `package.json`, `package-lock.json`, `CLAUDE.md`
- **DO NOT commit:** `node_modules/`, helper scripts like `update-frontmatter.py`
- The `docs/` directory contains generated files but **must be committed** for GitHub Pages
- Images should be placed in `src/assets/images/` and referenced as `/assets/images/{filename}`
- Custom pages (home, about, contact) are in the root `src/` directory
- The posts index is at `src/posts/index.njk`

## Customization

### Styling
Edit `src/assets/css/styles.css` for visual changes. Current aesthetic:
- Minimalist, content-focused design
- CodeNewRoman Nerd Font (monospace)
- Color palette: teal/pink accents on warm neutral background
- Responsive layout

### Navigation
Edit `src/_includes/base.njk` to modify site-wide navigation.

### Layout
- `src/_includes/base.njk` - Base HTML structure
- `src/_includes/post.njk` - Individual post layout
- `src/posts/index.njk` - Posts listing page
