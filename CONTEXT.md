# vojtech-adam.cz — Project Context

## Project overview
Personal portfolio website for Vojtěch Adam (programmer, photographer, web designer from Prague).
- **Stack:** React 19 + Vite + TypeScript (verbatimModuleSyntax), CSS Modules, react-router-dom v7, react-i18next, @emailjs/browser
- **Worktree path:** `/Users/vojtechadam/Developing/HTML/vojtech-adam.cz/.claude/worktrees/ecstatic-bell-e3383c/`
- **Dev server:** `npm run dev` (Vite, port 5173 by default)
- **Build check:** `npx tsc --noEmit` (must be clean before committing)
- **Bilingual:** Czech (default) + English — toggle in Navbar, stored in i18n context
- **Themes:** Dark (default) + Light — toggle in Navbar, stored in ThemeContext

## Key conventions
- **Email:** always `kontakt@vojtech-adam.cz` (never vojtech@)
- **CSS:** CSS Modules for component-scoped styles, `src/styles/globals.css` for global tokens/utilities
- **No `main { animation: pageIn }` anywhere** — was causing double-animate with View Transitions
- **TypeScript strict** — `verbatimModuleSyntax` means use `import type` for types

---

## File structure

```
src/
├── App.tsx                          # Root — BrowserRouter + all global components
├── styles/globals.css               # Design tokens, reset, all keyframes, utility classes
├── i18n/
│   ├── cs.json                      # Czech strings
│   └── en.json                      # English strings
├── data/
│   ├── projects.ts                  # All projects (public + personal)
│   ├── photos.ts                    # teaserPhotos[] for Home photo grid
│   ├── webdesign.ts                 # webReferences[] for WebDesign page
│   └── skills.ts                    # Skills data for About page
├── components/
│   ├── CursorGlow.tsx               # Ambient cursor glow (one large radial-gradient, no dot)
│   ├── Interactions.tsx             # 3D tilt on .card, gentle magnetic on .btn-primary
│   ├── ScrollProgress.tsx           # 2px progress bar at top of page
│   ├── ScrollReveal.tsx             # IntersectionObserver — adds .visible to .reveal elements
│   ├── ScrollToTop/                 # Scrolls to top on route change
│   ├── ViewTransitions.tsx          # View Transitions API (capture phase + overflow lock)
│   ├── StickyFeatures/              # Apple-style sticky scroll section (Home page)
│   ├── Navbar/                      # Nav with active underline animation
│   ├── Footer/
│   ├── Icons.tsx                    # All SVG icons as React components
│   ├── CookieBanner/
│   └── ProjectModal/
├── pages/
│   ├── Home/                        # Hero + Projects teaser + StickyFeatures + Photography
│   ├── About/                       # Bio, skills, timeline, media mentions
│   ├── Projects/                    # Project list (public only shown)
│   ├── ProjectDetail/               # Detail page per project slug
│   ├── Photography/                 # Photo grid + equipment + stats
│   ├── WebDesign/                   # Featured ref (Šlapni k nám) + ref grid + CTA
│   ├── Contact/                     # EmailJS form + socials
│   └── NotFound.tsx
└── context/
    ├── ThemeContext.tsx
    └── LangContext.tsx
```

---

## Design tokens (globals.css)

```css
/* Light */
--bg: #ffffff;  --bg-secondary: #f5f5f5;  --bg-card: #ffffff;
--border: #e5e5e5;  --text: #111111;  --text-muted: #666666;  --text-subtle: #999999;
--accent: #2563eb;  --accent-hover: #1d4ed8;  --accent-subtle: #eff6ff;
--radius: 12px;  --radius-sm: 8px;  --transition: 200ms ease;

/* Dark */
--bg: #0a0a0a;  --bg-secondary: #111111;  --bg-card: #161616;
--border: #262626;  --text: #f5f5f5;  --text-muted: #a3a3a3;  --text-subtle: #737373;
--accent: #3b82f6;  --accent-hover: #60a5fa;  --accent-subtle: #172554;
```

**Fonts:**
- `--font: 'Inter', system-ui, sans-serif` — body text
- `--font-display: 'JetBrains Mono', monospace` — h1–h4 headings

---

## Animation system

### Keyframes defined in globals.css
| Name | Purpose |
|------|---------|
| `pageIn` | `opacity 0→1 + translateY(10px)→0`, used for hero stagger |
| `vtOut` | `opacity 1→0` — View Transition old page |
| `vtIn` | `opacity 0→1` — View Transition new page |
| `btnOrbit` | Rotating box-shadow glow on `.btn-primary` |
| `shimmerSweep` | Shine sweep on `.btn-primary:hover::after` |
| `float` | `translateY 0 ↔ -10px` — hero logo |
| `glowBreath` | `scale 1 ↔ 1.28 + opacity` — hero glow |
| `ambientDrift` | 14s drift of background gradient blobs |
| `ambientPulse` | opacity pulsing of page bg gradients |
| `orbFloat` | Floating orbs in hero |
| `dotPulse` | Timeline dot ring pulse |
| `gradientShift` | Hero name gradient position shift |
| `circleDraw` | SVG circle stroke draw (Contact success) |
| `drawCheck` | SVG checkmark stroke draw (Contact success) |
| `successPop` | Spring scale-in for Contact success ring |

### Scroll reveal
```tsx
// Add these classes/styles to any element:
className="reveal"
style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
```
ScrollReveal.tsx uses IntersectionObserver to add `.visible` class → triggers CSS transition.

### Ambient backgrounds
Pages use `::before` pseudo-element or absolute `.heroBg` div with:
- `inset: -80px` (buffer so drift animation isn't clipped)
- `will-change: transform` (GPU compositing)
- `animation: ambientDrift 14s ease-in-out infinite` (or ambientPulse)

---

## Component details

### ViewTransitions.tsx
- Intercepts link clicks in **capture phase** (`{ capture: true }`) before React Router
- Calls `e.preventDefault()` → React Router sees `defaultPrevented`, skips navigation
- Locks `document.documentElement.style.overflow = 'hidden'` during transition (prevents jump)
- Inside `flushSync`: `window.scrollTo(0,0)` then `navigate(to)`
- Restores overflow in `vt.finished.finally()`
- Skips `_blank` and cross-origin links

### Interactions.tsx
- **3D tilt** on `.card` elements: `perspective(900px) rotateY/X(9deg) scale(1.025)` on mousemove
- **Magnetic** on `.btn-primary`: max ±6px / ±4px, pull strength 0.14
- Both spring back on mouseout with cubic-bezier easing
- Uses event delegation on `document` — zero JSX changes needed anywhere

### CursorGlow.tsx
- Single outer glow div: 600×600px, radial-gradient, `lerp 0.055`
- **No inner dot** (was removed at user request)
- `willChange: 'transform'`, `zIndex: 9997`

### StickyFeatures (Home page webdesign section)
- Left panel: `position: sticky; top: calc(50vh - 160px)` — 280×280 card
- Right: scrollable list of 4 items, each `min-height: 45vh`
- Active detection: scroll event → finds item whose center is closest to `window.innerHeight * 0.5`
- Active item: `opacity: 1`, `border-left-color: var(--accent)`, number turns accent color
- Inactive items: `opacity: 0.45`
- Hidden on mobile (< 900px), items shown normally

### ScrollProgress.tsx
- 2px fixed bar at very top (`zIndex: 10000`)
- Uses `scaleX(0→1)` transform from left
- Resets on route change (listens to `useLocation`)

---

## Pages & routes

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | Home | Hero + projects + StickyFeatures + photography |
| `/o-mne` | About | Bio, skills, timeline |
| `/projekty` | Projects | Public projects only |
| `/projekty/:slug` | ProjectDetail | All projects accessible by slug |
| `/fotografie` | Photography | Photo grid, equipment, stats |
| `/weby` | WebDesign | Featured ref + ref grid + CTA |
| `/kontakt` | Contact | EmailJS form + animated success |
| `*` | NotFound | |

### Hero layout (Home)
- `heroInner`: grid `1.35fr 0.65fr`, gap `3rem`
- Hero name has gradient shimmer: `gradientShift 7s` + `pageIn` stagger
- Three floating orbs (`.orb0/.orb1/.orb2`) in hero background

---

## Data & content

### Projects (`src/data/projects.ts`)
- **Public projects** (shown on /projekty and home teaser): fotografie, weby-na-zakazku, slapniknam
- **Personal projects** (accessible by slug only): justintime, fastcoupons, raspberry-pi-dashboard, rolety, bettermusic, customocto, reelpanel, survival-games-leaderboard, webfactory

### Photos (`src/data/photos.ts`)
- `teaserPhotos[]` — set to `[]` currently (placeholder grid shows on Home)
- Each photo: `{ src: string, alt: string, category: 'photo' | 'drone' }`

### EmailJS (Contact form)
- Service ID: `service_p2ix7m9`
- Template ID: `template_7hdb09y`
- Public key: `3TC-fso1nM3ycohwd`
- Form field names: `user_name`, `user_email`, `subject`, `message`

---

## Known issues / pending

1. **Form spam protection** — planned but not implemented: honeypot field, rate limiting, input sanitization
2. **Deploy** — hosting not yet set up
3. **i18n text review** — some en.json strings may need polish
4. **Photo grid on Home** — `teaserPhotos` is empty, placeholder shows. Fill in when photos ready.
5. **StickyFeatures on mobile** — sticky panel hides, items show linearly (works fine)

---

## User preferences / decisions made
- **JetBrains Mono** for headings (h1–h4), Inter for body — this is final, don't change
- **No scale** in page transitions (user said "divný zoom") — vtOut/vtIn are opacity-only
- **Cursor inner dot removed** — only ambient outer glow kept
- **Magnetic button** — max ±6px pull, strength 0.14 (was too strong at 0.32)
- **No `main { animation }` global** — breaks View Transitions
- **Contact email:** `kontakt@vojtech-adam.cz` everywhere (not vojtech@)
- **Photography stat card hover** — no transform or box-shadow (caused GPU blink near animated bg)
- **heroBg elements** must use `inset: -80px` to prevent overflow clip cutting off drift animation

---

## Typical workflow for changes

```bash
# Start dev server (run from worktree root)
cd /Users/vojtechadam/Developing/HTML/vojtech-adam.cz/.claude/worktrees/ecstatic-bell-e3383c
npm run dev

# Type check
npx tsc --noEmit

# Build
npm run build
```

When making animation changes, always restart dev server after changing constants (Vite caches).
