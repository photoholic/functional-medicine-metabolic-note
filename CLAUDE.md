# CLAUDE.md

## Project Overview

Astro-based static site documenting functional medicine and metabolic health research in Korean. Deployed to GitHub Pages at `https://photoholic.github.io/functional-medicine-metabolic-note`.

## Quick Reference

```bash
npm run dev       # Start dev server
npm run build     # Production build → /dist
npm run preview   # Preview production build
```

**Requires Node.js >= 22.12.0**

## Tech Stack

- **Framework:** Astro 6.x with MDX integration
- **Styling:** Tailwind CSS 4.x (via Vite plugin)
- **Diagrams:** Mermaid 11.x (client-side rendering)
- **Language:** TypeScript (strict mode, extends `astro/tsconfigs/strict`)
- **Deployment:** GitHub Actions → GitHub Pages (on push to `main`)

## Directory Structure

```
src/
├── components/          # Reusable Astro components
│   ├── EvidenceBadge.astro   # Source reliability badges (high/medium/low/note)
│   ├── MechanismBox.astro    # Highlighted mechanism explanation boxes
│   ├── Mermaid.astro         # Mermaid diagram wrapper
│   ├── Header.astro          # Sticky nav header
│   └── Footer.astro          # Site footer
├── content/
│   └── notes/           # MDX content collection (glob loader)
├── layouts/
│   └── Layout.astro     # Master layout (Korean fonts, meta, Header/Footer)
├── pages/
│   ├── index.astro      # Homepage with hero + feature cards
│   ├── archive.astro    # All notes grouped by category
│   ├── about.astro      # Philosophy & references
│   └── notes/
│       └── [...slug].astro  # Dynamic note detail pages
├── styles/
│   └── global.css       # Tailwind theme config + base styles
└── content.config.ts    # Content collection schema (Zod)
```

## Content Collection Schema

Notes live in `src/content/notes/*.mdx`. Required frontmatter:

```yaml
title: "string"
description: "string"
date: "YYYY-MM-DD"        # Parsed as Date
category: "대사 로직"      # One of: 대사 로직 | 영양소 함수 | 팩트 체크 | 식단 가이드
tags: ["optional", "array"]
```

Schema is defined in `src/content.config.ts` using Zod with `glob` loader.

## Key Conventions

### Routing & Links

All internal links **must** use `${import.meta.env.BASE_URL}` prefix for GitHub Pages subpath compatibility:

```astro
<a href={`${import.meta.env.BASE_URL}/archive`}>Archive</a>
```

Dynamic note routes use the content entry `id` (filename without `.mdx`) as the slug.

### Styling

- **Design tokens:** `--color-deep-navy: #1A2A6C` (headings, CTAs), `--color-forest-green: #2D5A27` (links, hovers)
- **Fonts:** Pretendard (body, sans), Noto Serif KR (headings, serif) — loaded via CDN in Layout.astro
- **Approach:** Tailwind utility classes throughout; custom tokens defined in `global.css`

### Components in MDX

Content files use three custom components inline:

```mdx
<MechanismBox title="제목">
  Markdown content explaining a biological mechanism.
</MechanismBox>

<EvidenceBadge source="임상 데이터" reliability="high" href="https://..." />

<Mermaid code={`graph TD
    A[원인] --> B[결과]
`} />
```

### Language

- All UI text is Korean with occasional English subtitles (e.g., "대사 로직 / Metabolic Logic")
- Content is written in Korean

### Naming

- Components: `PascalCase.astro`
- Content files: `kebab-case.mdx`
- Pages: `kebab-case.astro`

## CI/CD

`.github/workflows/deploy.yml` auto-deploys to GitHub Pages on push to `main`:
1. Checkout → Setup Node 22 → `npm install` → `npm run build`
2. Upload `/dist` artifact → Deploy to Pages

## No Testing or Linting

There is currently no test framework, linter, or formatter configured. Validate changes by running `npm run build` to ensure the site builds without errors.
