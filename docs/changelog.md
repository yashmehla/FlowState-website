# Changelog

All notable changes to **flowstate-website** will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] - 2026-09-16

### Added
- **Midnight Visual Formula:** Completely reimagined the visual identity to align with the "flow" philosophy. Shifted to a cinematic, calm "Midnight" aesthetic featuring `Void` (`#05070B`) backgrounds, `Starlight` (White) hierarchy, and `Moonlight` (`#9AAFD3`) / `Night-Violet` (`#8D8AB6`) atmospheric lighting. Added subtle cursor-reactive glow (`requestAnimationFrame` + `mix-blend-mode`), and smoother eased CSS transitions.
- **Philosophy Section:** Added a new manifesto section communicating the local-first, zero-cloud architecture with a visual data flow diagram.
- **Accessibility & Motion System:** Added robust `prefers-reduced-motion` handling to selectively disable atmospheric cursor effects and scroll-reveals for sensitive users.
- **SEO & Structured Data:** Overhauled `index.html` with full Open Graph tags, Twitter cards, canonical link, and JSON-LD `SoftwareApplication` structured data. Added `robots.txt` and `sitemap.xml`.

### Changed
- **Showcase Continuity:** Showcase tabs now morph and transition smoothly without hard cuts via absolute positioning and scale/opacity transforms.
- **Hero Redesign:** Cleaned up typography rhythm (sans vs serif). Hero mockup now features a subtle 3D parallax effect mapped to mouse position.
- **Features Hierarchy:** Shifted from an equal 6-card grid to a dominant Dashboard feature card spanning two columns, with refined accent colors (violet, cyan, primary green).
- **Download Conversion:** Replaced scattered download layout with a trust-oriented `FLOWSTATE.EXE` product card. Platform selector now uses disabled states for upcoming platforms.
- **Typography:** Removed excessive italic usage in favor of a cleaner typographic rhythm (Sans for descriptions, Mono for technical labels, Serif strictly for emotional moments).
- **Favicon:** Added custom "fs" monogram logo as the site favicon (`/favicon.png`).
- **KanbanMockup Component:** Pixel-faithful CSS replica of the FlowState Kanban board including window chrome bar, 3-column layout, priority badges, and task cards.
- **Stats Bar:** Horizontal 4-item trust row (Offline, Zero Latency, Private by Design, No Subscriptions) with Lucide icons, column dividers, and hover highlight. Responsive 2-column on mobile.
- **Features Grid:** Asymmetric 3-column bento grid showcasing all 6 app modules. Dashboard card spans 2 columns. Per-accent radial hover glow, IntersectionObserver scroll-reveal with staggered delays.
- **DashboardMockup Component:** CSS-drawn Dashboard screen with sidebar nav, 30-day heatmap grid (4 intensity levels), urgent tasks with OVR badges, and a habit checklist launchpad.
- **NotesMockup Component:** CSS-drawn Notes screen with sidebar note list (pin badge, active state), rich-text editor panel with heading/paragraph/bullet styles, and a blinking green cursor.
- **PomodoroMockup Component:** SVG circular progress ring at 72% with green drop-shadow glow, mode tab strip (Focus / Short Break / Long Break), pause and reset controls, daily stats row (sessions, focused time, streak).
- **Showcase Section:** Tab switcher (Dashboard / Tasks / Notes / Pomodoro) connected to a glassmorphism app frame with window chrome. Active tab connects visually to the frame border. Each screen swaps in with a 250ms fade-in animation. Horizontally scrollable on mobile.
- **Download Section:** Centred layout with a green radial background glow, oversized download button with glow shadow, live download counter (gracefully hidden when API is offline), platform pills (Windows active, macOS/Linux/iOS/Android tagged v2), and a reassurance strip (Local Data · No Account · Free Forever · Open Source).
- **useDownloadCount Hook:** Async hook fetching `/api/stats` from flowstate-api for the total download count. Silently fails so the UI degrades gracefully when the API is offline.
### Fixed
- **Download icon naming conflict:** Renamed Lucide `Download` import to `DownloadIcon` in `Download.jsx` to prevent collision with the component's own name, which caused a parse error during build.
- **Missing icon exports:** Replaced `Github` and `Twitter` (removed from lucide-react v1) with `ExternalLink` and `XIcon`. Updated Footer social links accordingly.
- **Build script:** Removed `tsc &&` from `package.json` build script — project is pure JavaScript, no TypeScript compiler needed.



---

## Phase 1 — Foundation & Design System

### Added
- **Project Scaffold:** Initialized Vite + React 19 project in `flowstate-website/`.
- **Design Token System:** Defined full CSS custom property palette in `src/index.css`, mirroring the FlowState desktop app's dark premium theme (`#030303` → `#111111`, Playfair Display / JetBrains Mono / Inter).
- **Global Styles:** Grain overlay, scroll-reveal animation system (`.reveal` / `.reveal.visible` via `IntersectionObserver`), button variants (`.btn-primary`, `.btn-ghost`), section label + heading utilities.
- **`src/lib/api.js`:** Centralized API endpoint config reading `VITE_API_URL` from environment variables. Placeholder: `localhost:5000`.
- **Navbar:** Sticky top navigation with scroll-aware glassmorphism (`backdrop-filter: blur`), desktop nav links, Download CTA button, and mobile hamburger drawer.
- **Footer:** 3-column grid layout with brand column (logo + tagline + social icons), Product and Developer link groups, and bottom copyright bar.
- **`src/App.jsx`:** Root component assembling all sections. Mounts global `useScrollReveal` `IntersectionObserver` hook.
- **Documentation:** `README.md`, `docs/architecture.md`, `docs/changelog.md` written and committed.

### Tech
- React 19, Vite 8, Lucide React, Pure CSS
- Target deployment: `flowstate.xevesk.com` via Vercel
