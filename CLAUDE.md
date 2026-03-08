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
│   │   └── images/                # Small non-grow-log images only (about photo, etc.)
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

### Image Hosting

**Grow-log images are hosted on S3 + CloudFront, NOT in git.**

- **S3 bucket:** `s3://tylerhext-site-images`
- **CloudFront CDN:** `https://dwg0n3yggf5p6.cloudfront.net`
- **Path structure:** `grow-logs/{filename}` (e.g. `grow-logs/p-granatum-9-photo-1.jpg`)
- `src/assets/images/grow-logs/` is in `.gitignore` — never commit images there

Only small non-grow-log images (about photo, bike light photos, etc.) live in `src/assets/images/` and are committed to git.

### Build System

This site uses **11ty (Eleventy)**, a simple static site generator. Key features:

- **Input:** `src/` directory
- **Output:** `docs/` directory (for GitHub Pages)
- **Templates:** Nunjucks (`.njk`) for layouts
- **Content:** Markdown (`.md`) for posts and pages
- **Collections:** Posts are auto-sorted by `updated` date (most recent first)
- **Date Filters:**
  - `readableDate` - "Month Day, Year" format
  - `shortDate` - "YYYY-MM-DD" format
  - `vhsDate` - "YYYY.MM.DD" VHS-style format (used throughout site)

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
- `f-sellowiana` = Feijoa sellowiana (pineapple guava)
- `u-parvifolia` = Ulmus parvifolia (Chinese elm)
- `c-ovata` = Crassula ovata (jade plant)

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

1. **Upload photos to S3 first:**
   ```bash
   aws s3 cp photo.jpg s3://tylerhext-site-images/grow-logs/p-granatum-9-photo-1.jpg
   # Repeat for each photo
   ```

2. Create `src/posts/{species-code}-{number}.md`

3. Add frontmatter — thumbnail uses the CloudFront URL:
   ```yaml
   ---
   layout: post.njk
   title: Punica granatum (Pomegranate) #9
   created: 2025-01-20
   updated: 2025-01-20
   thumbnail: https://dwg0n3yggf5p6.cloudfront.net/grow-logs/p-granatum-9-photo-1.jpg
   tags: [plants]
   ---
   ```

4. Add content with images using CloudFront URLs:
   ```markdown
   Brief description of the plant.

   ---

   ## 2025 January

   ![Photo description](https://dwg0n3yggf5p6.cloudfront.net/grow-logs/p-granatum-9-photo-1.jpg)
   ```

5. Run `npm run build`

**Never place grow-log images in `src/assets/images/grow-logs/` — that path is gitignored. Always upload to S3 first.**

### Updating an Existing Post

1. **Upload any new photos to S3 first:**
   ```bash
   aws s3 cp new-photo.jpg s3://tylerhext-site-images/grow-logs/p-granatum-8-photo-8.jpg
   ```
2. Open the post file in `src/posts/`
3. Add new content (typically a new date section with CloudFront image URLs)
4. Update the `updated` field in frontmatter
5. Run `npm run build`

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
- **DO NOT commit:** `node_modules/`, helper scripts like `update-frontmatter.py`, grow-log images
- The `docs/` directory contains generated files but **must be committed** for GitHub Pages
- **Grow-log images live on S3/CloudFront** — always use `https://dwg0n3yggf5p6.cloudfront.net/grow-logs/...` URLs in markdown
- Small non-grow-log images (about photo, etc.) can still go in `src/assets/images/` and be committed
- Custom pages (home, about, contact) are in the root `src/` directory
- The posts index is at `src/posts/index.njk`

## Customization

### Styling
Edit `src/assets/css/styles.css` for visual changes. Current aesthetic:
- **Brutalist dark design** - minimalist, content-focused
- **Color scheme**: Slate background (#2b2d31) with light gray text (#e8e8e8)
- **Accent color**: Soft pink (#f792ad) for link underlines and nav divider
- **Typography**: Courier New monospace font
- **Hover effects**: Chromatic aberration (RGB split) on links
- **VHS-style timestamps**: Dates formatted as "CREATED YYYY.MM.DD" and "UPDATED YYYY.MM.DD"
- Responsive layout with no borders on images

**Design Philosophy**: Professional brutalist aesthetic with subtle Y2K/nostalgic touches. Maintains credibility for LinkedIn visitors while expressing personality through minimal retro details.

### Navigation
Edit `src/_includes/base.njk` to modify site-wide navigation.

### Layout
- `src/_includes/base.njk` - Base HTML structure
- `src/_includes/post.njk` - Individual post layout
- `src/posts/index.njk` - Posts listing page
