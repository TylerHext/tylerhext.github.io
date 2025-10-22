# tylerhext.com

Personal website built with [11ty (Eleventy)](https://www.11ty.dev/).

## Quick Start

```bash
# Install dependencies
npm install

# Build site
npm run build

# Serve locally with live reload
npm run serve

# Clean build directory
npm run clean
```

## Adding Content

### Update an existing plant post

1. Edit the post in `src/posts/`
2. Add new content (photos, text)
3. Update the `updated` date in frontmatter
4. Build and deploy

### Add a new post

1. Create `src/posts/your-post-name.md`
2. Add frontmatter and content
3. Place images in `src/assets/images/`
4. Build and deploy

See [CLAUDE.md](./CLAUDE.md) for detailed documentation.

## Deployment

The site deploys automatically via GitHub Pages from the `docs/` directory on the `master` branch.

```bash
npm run build
git add .
git commit -m "Update site"
git push origin master
```

## Structure

```
src/              # Source files
├── posts/        # Blog posts (chronological)
├── _includes/    # Layouts
├── assets/       # CSS, images, fonts
└── *.md          # Custom pages (home, about, contact)

docs/             # Generated output (GitHub Pages)
```