# RECARUH – Homepage (Next.js App Router + TS + Tailwind)
## Run
`npm install && npm run dev` → http://localhost:3000 · production: `npm run build && npm start`
## Edit content
All copy, services, links and contact info live in `lib/data.ts`.
## Replace hero video / poster
Put files in `public/hero/`: `poster.webp` (1600×900, <80 KB), `stairs.mp4`, `stairs.webm` (5–8 s loop).
Hero steps follow video time (video length ÷ 6), so cut the clip with one stair flight per service.
## Optimize
- ffmpeg MP4: `ffmpeg -i in.mov -an -vf scale=1280:-2 -c:v libx264 -crf 29 -preset slow -movflags +faststart stairs.mp4`
- ffmpeg WebM: `ffmpeg -i in.mov -an -vf scale=1280:-2 -c:v libvpx-vp9 -crf 38 -b:v 0 stairs.webm`
- Poster: `ffmpeg -i stairs.mp4 -frames:v 1 poster.png` then convert to WebP/AVIF.
- Target under 1.5 MB. The video loads only after idle on screens ≥768px, and is skipped for reduced-motion, Save-Data and 2G connections (poster/gradient shows instead).
## Logo
The navbar uses a text wordmark; swap in your existing logo in `components/Navbar.tsx` and `Footer.tsx`.
