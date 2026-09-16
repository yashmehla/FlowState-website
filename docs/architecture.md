# FlowState Website — Architecture

## Overview

`flowstate-website` is the **React 19 + Vite** marketing site for the FlowState desktop productivity app. It is the frontend (R) layer of the broader MERN stack, split across two repositories:

| Repo | Role | Stack |
|---|---|---|
| `flowstate-website` | Marketing site (this repo) | React 19 + Vite → `flowstate.xevesk.com` |
| `flowstate-api` | Anonymous telemetry + download tracking | Express + Node + MongoDB Atlas |

---

## Entry Point

```
index.html → src/main.jsx → src/App.jsx
```

`App.jsx` does two things:
1. Renders the full page by composing all section components in order.
2. Runs a single global `useScrollReveal()` hook that attaches one `IntersectionObserver` to every `.reveal` element on the page, adding `.visible` when they enter the viewport (threshold `0.12`) and then `unobserve`s them. This drives all scroll-entrance animations site-wide.

> **Note on icons:** This project uses `lucide-react v1`. Some icons available in older versions (`Github`, `Twitter`) have been removed. Use `ExternalLink` and `XIcon` for social links. Always verify icon availability with `node -e "const l = require('./node_modules/lucide-react/dist/cjs/lucide-react.js'); console.log(Object.keys(l).filter(k => k === 'YourIconName'))"` before adding new icons.

---

## Component Tree

```
App.jsx
├── <div class="grain-overlay" />        Fixed noise texture (opacity 0.025, pointer-events: none)
├── Navbar                               Sticky scroll-aware glassmorphism top bar
├── main
│   ├── Hero                             Above-the-fold with floating KanbanMockup
│   ├── Stats                            4-item horizontal trust bar
│   ├── Features                         Asymmetric 3-column bento grid
│   ├── Showcase                         Tab switcher + app screen mockup viewer
│   └── Download                         Conversion CTA + OS platform pills
└── Footer                               Brand column, link groups, social icons
```

---

## CSS Mockup Components

Pure-CSS replicas of the FlowState app screens. Used in the Hero and Showcase sections. Swappable for real screenshots by replacing the component with an `<img>` tag.

| Component | Renders | Key Details |
|---|---|---|
| `KanbanMockup` | 3-column Kanban board | Window chrome, task cards, priority/OVR badges |
| `DashboardMockup` | Dashboard overview | Sidebar nav, 30-day heatmap (4 levels), urgent tasks, habit checklist |
| `NotesMockup` | Split-pane notes | Sidebar list with pin badge, rich-text editor, blinking green cursor |
| `PomodoroMockup` | Pomodoro timer | SVG circular progress ring, mode tabs, controls, daily stats row |

---

## Design System

All design tokens are CSS custom properties in `src/index.css`, mirroring the FlowState desktop app palette for brand cohesion.

### Colour Palette
```css
/* Backgrounds */
--bg-void:    #030303;
--bg-darker:  #050505;
--bg-dark:    #0a0a0a;
--bg-panel:   #111111;
--bg-raised:  #161616;

/* Borders */
--border-dim:    #1a1a1a;
--border-color:  #222222;
--border-bright: #333333;

/* Text */
--text-primary:   #ebebeb;
--text-secondary: #888888;
--text-muted:     #444444;

/* Accents */
--accent-green:  #5c8a63;
--accent-red:    #b84b4b;
--accent-orange: #c27d38;
--accent-blue:   #4a6fa5;
```

### Typography
```css
--font-serif: 'Playfair Display', Georgia, serif;   /* Section headings, hero, logo */
--font-sans:  'Inter', sans-serif;                   /* Body text, buttons */
--font-mono:  'JetBrains Mono', monospace;           /* Labels, badges, code, stats */
```

### Scroll-Reveal System
- Elements tagged `.reveal` start hidden: `opacity: 0; transform: translateY(24px)`.
- Global `IntersectionObserver` in `App.jsx` toggles `.visible` when elements enter viewport.
- Stagger via `.reveal-delay-1` → `.reveal-delay-5` (100ms increments via `transition-delay`).
- Each element is `unobserve`d after becoming visible — no repeated triggering.

### Grain Overlay
Fixed `div.grain-overlay` using an inline SVG `feTurbulence` noise filter at `opacity: 0.025`. Covers the full viewport, `pointer-events: none`, `z-index: 9999`. Adds subtle film-grain depth without affecting any interaction.

### Button Variants
- `.btn-primary` — green fill, glow `box-shadow` on hover, `translateY(-1px)` lift
- `.btn-ghost` — transparent, `border-color` brightens on hover

---

## State Management

- No global state library. All state is local `useState` / `useEffect` per component.
- `Showcase.jsx` manages the active tab with a single `useState('dashboard')`.
- `useDownloadCount` is the only hook making a network request.

---

## API Communication

`src/lib/api.js` centralises all endpoint URLs:

```js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const endpoints = {
  downloadWindows: `${API_BASE}/api/downloads/windows`,
  downloadMac:     `${API_BASE}/api/downloads/mac`,
  downloadLinux:   `${API_BASE}/api/downloads/linux`,
  stats:           `${API_BASE}/api/stats`,
};
```

### useDownloadCount Hook
Fetches `GET /api/stats` on mount. Returns `{ count, loading, error }`.  
Silently fails — if the API is offline, `count` stays `null` and the counter widget hides itself rather than showing an error.

---

## Full Folder Structure

```
flowstate-website/
├── index.html                        SEO + OG meta + font preconnects
├── vite.config.js                    Vite + @vitejs/plugin-react
├── package.json
├── .gitignore
├── .env.example
├── README.md
├── docs/
│   ├── architecture.md               This file
│   └── changelog.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   └── api.js
    ├── hooks/
    │   └── useDownloadCount.js
    ├── components/
    │   ├── Navbar.jsx / .css
    │   ├── Footer.jsx / .css
    │   ├── KanbanMockup.jsx / .css
    │   ├── DashboardMockup.jsx / .css
    │   ├── NotesMockup.jsx / .css
    │   └── PomodoroMockup.jsx / .css
    └── sections/
        ├── Hero.jsx / .css
        ├── Stats.jsx / .css
        ├── Features.jsx / .css
        ├── Showcase.jsx / .css
        └── Download.jsx / .css
```

---

## Styling Conventions

- **Midnight Visual Formula:** The site uses a specific color hierarchy: Void/Midnight (`#05070B` to `#0C111A`) for environments, Starlight (White) for text/hierarchy, Moonlight (`#9AAFD3`) for primary atmospheric glows, and Night-Violet (`#8D8AB6`) for secondary depth.
- **Component Isolation:** Each component owns its own `.css` file imported directly into its `.jsx` — no cross-component style imports.
- **Motion:** Hover transforms use `translateY(-1px)` or `translateY(-2px)` maximum — never jarring.
- **Opacity Layers:** Accents are applied at `0.07—0.12` opacity for ambient glows (e.g., `moonlight-glow`), `0.3` for borders, full strength for icons.
- **Border-radius:** `6px` for cards/buttons, `8—12px` for panels, `12px` for mockup frames.
- **Responsive Breakpoints:** `960px` (tablet) and `600px` / `480px` (mobile).

---

## Deployment

| Setting | Value |
|---|---|
| Platform | Vercel |
| Domain | `flowstate.xevesk.com` |
| DNS | `CNAME flowstate → cname.vercel-dns.com` |
| Build command | `vite build` (via `npm run build`) |
| Output directory | `dist/` |
| Env var | `VITE_API_URL` → deployed `flowstate-api` URL |

*Rule: Never commit `.env`. Always use `.env.example` as the committed template.*
