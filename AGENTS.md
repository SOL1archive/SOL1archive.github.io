# AGENTS.md

## Project Overview
This project is a personal research blog for [User Name], migrated from Jekyll to Next.js.
It is designed with a minimal, "Apple-like" aesthetic, featuring glassmorphism and smooth animations.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: CSS Modules (Vanilla CSS) with CSS Variables for theming.
- **Markdown**: `remark` ecosystem for parsing, `rehype` for HTML compilation.
- **Math**: `remark-math` and `rehype-katex`.
- **Deployment**: GitHub Actions (Static Export).

## Key Directories
- `_notes`: Source of truth for blog posts (Markdown/LaTeX).
- `src/app`: Next.js App Router pages.
- `src/components`: Reusable UI components.
- `src/lib`: Logic for markdown processing and data extraction.

## Development Guidelines
1. **Design**: Maintain the minimal, high-end feel. Use the defined CSS variables in `globals.css`.
2. **Markdown**: Do NOT modify the `_notes` contents unless explicitly asked. The parser must adapt to the existing content format (Kramdown-ish).
3. **Icons**: Use SVGs or a lightweight icon library like `lucide-react`.

## Maintenance
To add new features, create a comprehensive plan in `implementation_plan.md` first.
