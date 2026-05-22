# 🌌 Aryan's Black Hole Explainer & Cosmos Visualizer

A premium, highly interactive web application designed and built by **Aryan** to explore the physics, mathematics, and mysteries of black holes and gravitational singularities. 

This project integrates modern frontend animation libraries, high-performance visual layers, and a responsive glassmorphic dashboard mockup simulating space-time notes and an interactive connection graph. All visual links and interactive call-to-actions are mapped to the live [Aryan's Neural Graph](https://me-aryan.vercel.app/neural-graph).

**🔗 Live Website:** [https://blackhole-by-aryan.netlify.app](https://blackhole-by-aryan.netlify.app)

---

## 📸 Screenshots

Here are visual previews of the interactive website experience, showing the deep space dark aesthetic, glassmorphic HUD overlays, and the connection graph interface:

### 1. Hero & Dark Space Aesthetic
![Cosmos Hero Section](./for%20github%20readme/image.png)

### 2. Interactive Space-Time HUD & Mockup
![Space-Time Notes Dashboard](./for%20github%20readme/image%20copy.png)

### 3. Cosmic Physics Exploration & Singularity Mapping
![Cosmic Physics Features](./for%20github%20readme/image%20copy%202.png)

---

## 🚀 Key Features

- **Rebranded Experience**: Customized copy and design emphasizing black hole thermodynamics, gravity, and quantum mechanics, built specifically by Aryan.
- **GSAP Scroll Parallax**: Responsive scroll-scrub animations that scale and rotate the background black hole video based on the scroll position, fading it gently into the darkness as the user scrolls down.
- **Lenis Smooth Scrolling**: Smooth, fluid, kinetic scrolling across all devices and platforms, ensuring animations remain clean and jitter-free.
- **Interactive Connection Graph**: A visual nodes-and-edges connection diagram representing terms like *Hawking Radiation*, *General Relativity*, and the *Information Paradox*. Hovering over nodes seamlessly triggers info cards, while clicking navigates directly to the live neural graph.
- **Responsive Layout**: Designed for mobile, tablet, and desktop screens with glassmorphic backdrop filters (`backdrop-blur-md`), tailored grids, and glowing neon accents.
- **Optimized for Web Vitals & Noise Filtering**: Features an organic film grain noise overlay and a radial vignetting gradient mask to prevent color banding and compression artifacts in the background video.

---

## 🛠️ Technology Stack

The project leverages a modern, high-performance web development stack:

1. **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) & React for fast routing, structure, and pre-rendering.
2. **Language**: [TypeScript](https://www.typescriptlang.org/) for static typing, robust refactoring, and code organization.
3. **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for writing responsive utilities, custom CSS grid layouts, and advanced glassmorphism styling.
4. **Animation Engine**: [GSAP (GreenSock Animation Platform)](https://gsap.com/) & **GSAP ScrollTrigger** for animating the background video parallax properties (scale, rotate, opacity) and the entrance of text headings/badges.
5. **Scrolling Engine**: [Lenis (@studio-freight/lenis)](https://lenis.darkroom.engineering/) for decoupling scroll inputs and providing custom inertia scrolling.
6. **Icons**: [Lucide React](https://lucide.dev/) for crisp, SVG-based stroke icons.

---

## 💻 How It Was Made (Implementation Details)

- **Next.js & Static Output**: Configured via `next.config.ts` using `output: 'export'` and `images: { unoptimized: true }` to bundle all JavaScript, CSS, HTML, and media assets into a self-contained static directory (`out/`) that can be hosted anywhere (GitHub Pages, Netlify, Vercel, etc.).
- **GSAP and React Integration**: GreenSock's `gsap.context()` is used inside React `useEffect` hooks to safely register, instantiate, and clean up event listeners and ScrollTrigger loops during component mount and unmount cycles, avoiding memory leaks.
- **Background Video Layer**: Uses an HTML5 video component with `playsInline`, `muted`, `loop`, and `autoPlay` configurations. To avoid visual banding in dark regions, an SVG fractal noise filter is layered over a radial gradient vignette.

---

## 📦 Getting Started & Installation

To run this website locally, ensure you have **Node.js** installed, then execute the following:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive page.

### 3. Generate Static Production Export
To compile the site and write the static HTML files to the `/out` directory:
```bash
npm run build
```
The compiled output will be generated inside the `./out/` folder, containing:
- `index.html` (main landing page)
- `_next/` (compiled chunk files, Tailwind styles, and scripts)
- `blackhole.mp4` (looping video background)
- `for github readme/` (retained screenshot folders)
