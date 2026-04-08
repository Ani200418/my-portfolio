# 🚀 Aniket Singh — Developer Portfolio

A premium, modern personal portfolio built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**. Designed for SDE placement with a dark glassmorphism aesthetic, particle background, and GitHub API integration.

---

## ✨ Features

- ⚡ **Next.js 14** App Router + TypeScript
- 🎨 **Dark glassmorphism UI** with gradient mesh backgrounds
- 🌀 **Framer Motion** animations — scroll reveals, staggered entries, hover effects
- 🌌 **Canvas particle background** with animated connecting lines
- 🖱️ **Custom animated cursor** with spring physics
- ⌨️ **Typing animation** in hero (react-type-animation)
- 🌗 **Dark / Light mode** toggle
- 🔄 **GitHub API** — live repo fetch with filter & sort
- 💌 **Contact form** — opens mailto with pre-filled fields
- 📱 Fully **responsive** (mobile-first)
- 🔍 **SEO optimized** — meta tags, OpenGraph, Twitter cards
- 🏃 **Loading screen** animation

---

## 📁 Folder Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout + metadata (SEO)
│   │   ├── page.tsx          # Main page — orchestrates all sections
│   │   └── globals.css       # Global styles, custom cursor, animations
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx    # Animated sticky navbar + mobile drawer
│   │   │   └── Footer.tsx    # Footer with socials + back-to-top
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # Hero with typing animation + parallax
│   │   │   ├── AboutSection.tsx    # About + stats + floating cards
│   │   │   ├── SkillsSection.tsx   # Skills with animated progress bars
│   │   │   ├── ProjectsSection.tsx # GitHub API repos + filter/sort
│   │   │   └── ContactSection.tsx  # Contact info + message form
│   │   └── ui/
│   │       ├── LoadingScreen.tsx   # Initial loading animation
│   │       ├── CustomCursor.tsx    # Spring-physics custom cursor
│   │       ├── ParticleBackground.tsx  # Canvas particles + connections
│   │       └── SectionHeading.tsx  # Reusable section title component
│   ├── hooks/
│   │   ├── useScrollReveal.ts  # IntersectionObserver hook
│   │   └── useTheme.ts         # Theme persistence hook
│   └── lib/
│       └── constants.ts        # Personal info constants
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js **18+**
- npm or yarn

### Steps

```bash
# 1. Clone or extract the project
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:3000
```

### Build for production

```bash
npm run build
npm start
```

---

## 🎨 Customization

### Update personal info
Edit `src/lib/constants.ts` to change your name, emails, GitHub username, etc.

### Change color scheme
Edit `tailwind.config.js` and `src/app/globals.css` — look for `--color-cyan`, `--color-violet`, `--color-rose`.

### Add/remove sections
Each section is a self-contained component in `src/components/sections/`. Import/remove them in `src/app/page.tsx`.

### Add your real resume
Replace the `href="#"` on the "Download CV" and "Resume" buttons in:
- `src/components/sections/HeroSection.tsx`
- `src/components/layout/Navbar.tsx`

With your actual PDF URL, e.g.:
```tsx
href="/resume.pdf"  // Place resume.pdf in /public folder
```

---

## 🌐 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the .next folder or connect via Git
```

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| React Type Animation | Hero typing effect |
| React Icons | Icon library |
| Canvas API | Particle background |
| GitHub REST API | Live project fetch |

---

## 📄 License

MIT — feel free to use, modify, and distribute.

---

Made with 💙 by **Aniket Singh**
