# vojtech-adam.cz

Personal portfolio website for Vojtěch Adam — programmer, photographer, and web designer from Prague.

Live site: [vojtech-adam.cz](https://vojtech-adam.cz)

## Tech stack

- React 19
- Vite
- TypeScript
- React Router
- i18next
- CSS Modules

## What’s included

- Czech / English language switcher
- Dark / light theme toggle
- Home, About, Projects, Project detail, Photography, Web Design, and Contact pages
- Animated UI with scroll reveal, view transitions, and interaction effects
- Contact form with Cloudflare Turnstile protection
- Cookie banner, analytics tracking, and SEO metadata

## Routes

- `/` — Home
- `/o-mne` — About
- `/projekty` — Projects
- `/projekty/:slug` — Project detail
- `/fotografie` — Photography
- `/weby` — Web design
- `/kontakt` — Contact
- `/ig` — Instagram redirect

## Scripts

```bash
npm run dev      # start local dev server
npm run build    # type-check and build for production
npm run lint     # run ESLint
npm run preview  # preview the production build
npm run gen:og   # generate Open Graph assets
```

## Development

```bash
npm install
npm run dev
```

The app is built with strict TypeScript settings, so `npm run build` should stay clean before deploys.

