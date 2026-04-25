# Project Overview: SOL1 Archive Renewal

This project is a personal research blog for Subin Park (SOL1), migrated from Jekyll to **Next.js (App Router)**. It features a minimal, "Apple-like" glassmorphic design, supports complex Markdown/LaTeX rendering, and is deployed via GitHub Actions.

## 1. Technology Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Export)
- **Styling**: Global CSS with Vanilla CSS Variables (Glassmorphism, Theming)
- **Language**: TypeScript
- **Icons**: `lucide-react`
- **Markdown Engine**: 
  - `remark` (parse)
  - `remark-math` (math syntax)
  - `rehype-katex` (math rendering)
  - `rehype-highlight` (code highlighting)
  - `rehype-slug` (auto-generating IDs)
- **Date Handling**: `date-fns`

## 2. Key Directories & Files
- `src/app`: App Router pages.
  - `page.tsx`: Home page (intro, featured story, recent rows).
  - `posts/page.tsx`: List of all posts.
  - `[...slug]/page.tsx`: Dynamic blog post rendering.
  - `layout.tsx`: Root layout (includes TopBar, Analytics, Katex CSS).
  - `globals.css`: Global variables, resets, and dark mode overrides.
- `src/components`:
  - `TopBar.tsx`: Sticky navigation, social links, dark mode toggle.
  - `Footer.tsx`: Shared footer columns.
  - `PostCard.tsx`, `PostRow.tsx`, `FeaturedHero.tsx`: Post listing surfaces.
  - `PostsFilter.tsx`: Client-side category filter for `/posts`.
  - `TOC.tsx`: Table of Contents sidebar.
- `src/lib/markdown.ts`: Core logic for reading `_notes`, parsing Frontmatter, Kramdown cleanup, and strict date sorting.
- `_notes`: Source of truth for blog content (Markdown files).
- `public/cv`: Host for `Subin_Park_CV.pdf`.
- `.github/workflows/nextjs.yml`: CI/CD pipeline.

## 3. Key Implementations

### Design System (Glassmorphism & Dark Mode)
- **Variables**: Defined in `globals.css` (`--glass-bg`, `--accent`, `--ink`, category tints, etc.).
- **Dark Mode**: 
  - Uses system preference on first load.
  - Manual override supported via `data-theme='dark'|'light'` attribute on `<html>`, toggled in `TopBar.tsx`.
- **Layout**: 
  - **Home**: Intro section, featured post, recent numbered rows.
  - **Posts**: Filterable card grid, sorted by date (`dd-mm-yyyy`).

### Markdown Processing
- **Math**: Supports `$$...$$` blocks and `$..$` inline via Katex. CSS is loaded in `RootLayout`.
- **Legacy Cleanup**: `getPostData` in `markdown.ts` actively removes Kramdown-specific tags (`{:toc}`, `{:#id}`) to prevent rendering errors.
- **Hidden Posts**: Posts with `feed: hide` in frontmatter are filtered out in `getSortedPostsData`.

### Deployment
- **Static Export**: `output: 'export'` in `next.config.js`.
- **GitHub Actions**: Builds the project and uploads the `out/` directory to GitHub Pages.

## 4. Development Workflow

### Run Locally
```bash
npm run dev
# Open http://localhost:3000
```

### Preview Production Build
Since we use static export:
```bash
npm run build
npx serve out
# Open http://localhost:3000 (or port shown)
```

### Caching Note
Next.js caches strictly. If you change a Markdown file and it doesn't appear in `dev`, try restarting the server. For production, the build process always generates fresh static HTML.

## 5. Future Maintenance
- **Adding Posts**: Just add `.md` files to `_notes`.
- **Updating CV**: Replace `cv/Subin_Park_CV.pdf`; local scripts copy it to `public/cv/Subin_Park_CV.pdf`.
- **Navigation**: Update `src/components/TopBar.tsx`.

## 6. Coding Agent Context
- The current redesign follows the design handoff at `/Users/bagsubin/Downloads/design_handoff_blog_redesign`: Apple Newsroom-style typography, fixed glass top bar, text-only post cards, category filters, article TOC, and responsive About/404 pages.
- Do not migrate or rewrite `_notes` unless explicitly asked. The Next.js reader in `src/lib/markdown.ts` keeps legacy Markdown paths and derives missing display metadata such as excerpts, reading time, fallback categories, and tags.
- Post permalinks currently remain `/<_notes-relative-slug>` for backward compatibility with the migrated Jekyll archive; `/posts` is the archive index, not the post-detail prefix.
