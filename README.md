# FlowState Website

The official marketing site for **FlowState** — an offline-first, local-first productivity suite for developers.

**Live:** [flowstate.xevesk.com](https://flowstate.xevesk.com)  
**Desktop App:** [github.com/xevesklabs/FlowState](https://github.com/xevesklabs/FlowState)

---

## What is FlowState?

FlowState is a zero-latency desktop productivity app. All your tasks, habits, notes, and Pomodoro sessions live entirely on your device using IndexedDB. No cloud. No subscriptions. No privacy trade-offs.

This repository is the **marketing website** — a React + Vite single-page app that showcases the product and hosts the download link.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Pure CSS (Custom Midnight Theme) |
| Icons | Lucide React |
| Fonts | Playfair Display · JetBrains Mono · Inter |
| Backend API | `flowstate-api` (separate repo) — Express + Node + MongoDB |
| Deployment | Vercel → `flowstate.xevesk.com` |

---

## Project Structure

```
flowstate-website/
├── index.html                        # Entry HTML with SEO + Open Graph meta
├── vite.config.js                    # Vite + @vitejs/plugin-react
├── package.json
├── .gitignore
├── .env.example                      # Environment variable template
├── README.md
├── docs/
│   ├── architecture.md               # Technical architecture reference
│   └── changelog.md                  # Full feature history
└── src/
    ├── main.jsx                      # React root
    ├── App.jsx                       # Layout, section assembly, scroll-reveal
    ├── index.css                     # Design tokens + global styles
    ├── lib/
    │   └── api.js                    # API base URL + endpoint map
    ├── hooks/
    │   └── useDownloadCount.js       # Live download count from flowstate-api
    ├── components/
    │   ├── Navbar.jsx / .css         # Sticky glassmorphism top navbar
    │   ├── Footer.jsx / .css         # 3-column footer with social links
    │   ├── KanbanMockup.jsx / .css   # CSS Kanban board replica
    │   ├── DashboardMockup.jsx / .css# CSS Dashboard screen replica
    │   ├── NotesMockup.jsx / .css    # CSS Notes screen replica
    │   └── PomodoroMockup.jsx / .css # CSS Pomodoro timer replica
    └── sections/
        ├── Hero.jsx / .css           # Above-the-fold hero
        ├── Stats.jsx / .css          # 4-item horizontal trust bar
        ├── Features.jsx / .css       # Asymmetric bento feature grid
        ├── Showcase.jsx / .css       # Tab switcher + app screen viewer
        └── Download.jsx / .css       # Download CTA + OS selector
```

---

## Local Development

**1. Install dependencies:**
```bash
npm install
```

**2. Set up environment variables:**
```bash
cp .env.example .env
```
Open `.env` and set `VITE_API_URL` to your deployed `flowstate-api` URL.  
Leave it as `http://localhost:5000` if running the API locally.

**3. Start the dev server:**
```bash
npm run dev
# → http://localhost:5173
```

**4. Production build:**
```bash
npm run build
# Output: dist/ — ~219kB JS (68kB gzipped), ~25kB CSS

npm run preview   # Preview the production build locally
```

> This is a pure JavaScript project. There is no TypeScript compiler step — `npm run build` runs `vite build` directly.

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL of the deployed `flowstate-api` | `http://localhost:5000` |

> ⚠️ Never commit `.env`. It is gitignored. Use `.env.example` as the template.

---

## Page Sections

| Section | Description |
|---|---|
| **Navbar** | Sticky top bar with scroll-aware glassmorphism and Download CTA |
| **Hero** | Full-bleed headline, dual CTA pair, floating Kanban mockup |
| **Stats** | 4-item trust bar: Offline · Zero Latency · Private · Free |
| **Features** | Asymmetric bento grid showcasing all 6 app modules |
| **Showcase** | Tab switcher (Dashboard / Tasks / Notes / Pomodoro) with app frame |
| **Download** | Conversion CTA, platform selector, live download count |
| **Footer** | Brand column, product + developer links, social icons |

---

## Deployment to flowstate.xevesk.com

1. Push this repo to GitHub (`github.com/xevesklabs/FlowState-website`)
2. Connect it to [Vercel](https://vercel.com)
3. Set `VITE_API_URL` as an environment variable in the Vercel dashboard
4. In your domain registrar (xevesk.com DNS), add:
   ```
   CNAME  flowstate  →  cname.vercel-dns.com
   ```
5. Add `flowstate.xevesk.com` as a custom domain in Vercel — HTTPS is auto-provisioned

---

## How it connects to flowstate-api

The Download button calls:
```
GET https://your-api.onrender.com/api/downloads/windows
```
The API increments the MongoDB download counter, then redirects the user to the `.exe` installer. If the API is missing a database connection locally, it will provide dummy data to prevent errors.

The live download count widget calls `GET /api/stats` to aggregate the total downloads. It silently hides itself gracefully if the API goes offline, ensuring the marketing site never looks broken.

User productivity data (tasks, habits, notes) **never** touches this website or API — it stays entirely on the user's device inside the desktop app.

---

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — component tree, design system, conventions
- [`docs/changelog.md`](docs/changelog.md) — full feature history
