# Portfolio

React + Vite + TypeScript + Tailwind CSS + Framer Motion personal portfolio, with EN/AR language switching (auto RTL/LTR) and dark/light mode.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Before you deploy

- Replace `yourusername` / `yourdomain.com` placeholders in `Hero.tsx`, `Projects.tsx`, `Contact.tsx`, and `Footer.tsx`.
- Swap in your real project data in `src/components/Projects.tsx`.
- Wire `handleSubmit` in `src/components/Contact.tsx` to a real backend or service (Formspree, EmailJS, Resend, etc.) — it currently only simulates success.
- Add a real `resume.pdf` to `public/` if you want the "Download CV" button to work (create a `public/` folder and drop the file there).
- Edit copy/translations in `src/i18n/translations.ts`.

## Project structure

```
src/
  components/   Navbar, Hero, About, Projects, Contact, Footer
  context/      ThemeContext (dark/light), LanguageContext (en/ar + RTL)
  i18n/         translations.ts
  types/        shared TypeScript interfaces
```
