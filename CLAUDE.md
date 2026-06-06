# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static personal website (tylerhext.github.io) built with **11ty (Eleventy)**. The site features a chronological blog with plant grow logs, a film photography page, and custom pages for home, about, and contact.

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
│   ├── _data/
│   │   └── photos.json            # Film photo metadata (order = display order)
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css         # Site styles
│   │   └── images/                # Favicon and legacy images only — no new images here
│   ├── index.md                   # Home page
│   ├── about.md                   # About page
│   ├── contact.md                 # Contact page
│   ├── photos.njk                 # Film photography page (/photos/)
│   └── CNAME                      # GitHub Pages custom domain
│
├── docs/                          # Generated output (GitHub Pages serves from here)
├── scripts/
│   └── add-photo.sh               # Process + upload film photos to S3
├── .eleventy.js                   # 11ty configuration
└── package.json                   # Node dependencies
```

### Image Hosting

**All site images are hosted on S3 + CloudFront, NOT in git.**

- **S3 bucket:** `s3://tylerhext-site-images`
- **CloudFront CDN:** `https://dwg0n3yggf5p6.cloudfront.net`

S3 path structure by content type:

| Content | S3 path | Example |
|---|---|---|
| Grow log photos | `grow-logs/` | `grow-logs/p-granatum-9-photo-1.jpg` |
| Film photos | `film/` | `film/20260606-001-web.jpg` |
| About page photo | `about/` | `about/about-photo-2-web.jpg` |
| Home page photo | `home/` | `home/home-photo-2-web.jpg` |

Each image is uploaded in two versions:
- **`-web.jpg`** — 1400px wide, 85% quality (served on the page, lazy loaded)
- **`-orig.jpg`** — full quality (linked for click-through to full size)

**Lazy loading pattern** used across the site:
```html
<a href="https://dwg0n3yggf5p6.cloudfront.net/.../photo-orig.jpg" target="_blank" rel="noopener">
  <img src="https://dwg0n3yggf5p6.cloudfront.net/.../photo-web.jpg" alt="..." loading="lazy">
</a>
```

`src/assets/images/` contains only the favicon and unreferenced legacy images. Do not add new images there.

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
thumbnail: https://dwg0n3yggf5p6.cloudfront.net/grow-logs/p-granatum-1-photo-1.jpg
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

Film photos use `YYYYMMDD-NNN` slugs (e.g. `20260606-001`), matching their entry in `src/_data/photos.json`.

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

### Adding Film Photos (/photos page)

The `/photos` page is driven by `src/_data/photos.json`. Array order = display order (put newest at the top).

1. **Process and upload with the script:**
   ```bash
   bash scripts/add-photo.sh ~/path/to/scan.jpg 20260606-001 "Yashica A" "Kodak Gold 400"
   ```
   This resizes to web + orig versions and uploads both to S3 under `film/`.

2. **Add the printed JSON entry to the top of `src/_data/photos.json`:**
   ```json
   {
     "filename": "20260606-001",
     "date": "2026-06-06",
     "camera": "Yashica A",
     "film": "Kodak Gold 400",
     "alt": ""
   }
   ```

3. **Reorder photos** by moving entries up/down in the JSON array.

4. Run `npm run build`.

### Adding a New Plant Post

1. **Process and upload photos to S3:**
   ```bash
   TMPDIR=$(mktemp -d)
   sips -Z 1400 -s format jpeg -s formatOptions 85 photo.jpg --out "$TMPDIR/p-granatum-9-photo-1-web.jpg"
   sips -s format jpeg -s formatOptions best photo.jpg --out "$TMPDIR/p-granatum-9-photo-1-orig.jpg"
   aws s3 cp "$TMPDIR/p-granatum-9-photo-1-web.jpg" s3://tylerhext-site-images/grow-logs/p-granatum-9-photo-1-web.jpg
   aws s3 cp "$TMPDIR/p-granatum-9-photo-1-orig.jpg" s3://tylerhext-site-images/grow-logs/p-granatum-9-photo-1-orig.jpg
   ```

2. Create `src/posts/{species-code}-{number}.md` with frontmatter:
   ```yaml
   ---
   layout: post.njk
   title: Punica granatum (Pomegranate) #9
   created: 2025-01-20
   updated: 2025-01-20
   thumbnail: https://dwg0n3yggf5p6.cloudfront.net/grow-logs/p-granatum-9-photo-1-web.jpg
   tags: [plants]
   ---
   ```

3. Add content using the lazy load pattern for images.

4. Run `npm run build`.

### Updating an Existing Post

1. Upload new photos to S3 (see above).
2. Open the post in `src/posts/`, add a new date section with CloudFront image URLs.
3. Update the `updated` field in frontmatter.
4. Run `npm run build`.

### Updating Home or About Photos

1. Process and upload to S3:
   ```bash
   TMPDIR=$(mktemp -d)
   sips -Z 1400 -s format jpeg -s formatOptions 85 photo.jpg --out "$TMPDIR/photo-web.jpg"
   sips -s format jpeg -s formatOptions best photo.jpg --out "$TMPDIR/photo-orig.jpg"
   aws s3 cp "$TMPDIR/photo-web.jpg" s3://tylerhext-site-images/home/home-photo-3-web.jpg
   aws s3 cp "$TMPDIR/photo-orig.jpg" s3://tylerhext-site-images/home/home-photo-3-orig.jpg
   ```
2. Update `src/index.md` or `src/about.md` with the new CloudFront URLs using the lazy load pattern.

## Deployment

The site is deployed via **GitHub Pages** from the `docs/` directory on the `master` branch.

```bash
git add docs/ src/ .eleventy.js package.json
git commit -m "Update site"
git push origin master
```

GitHub Pages automatically serves the updated site at `tylerhext.com`.

## Important Notes

- **DO commit:** `docs/`, `src/`, `.eleventy.js`, `package.json`, `package-lock.json`, `CLAUDE.md`
- **DO NOT commit:** `node_modules/`, helper scripts, any images
- The `docs/` directory contains generated files but **must be committed** for GitHub Pages
- **All images live on S3/CloudFront** — never commit images to git
- Always use the lazy load pattern (`loading="lazy"`, web version displayed, orig linked) for all new images

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
- `src/photos.njk` - Film photography page
