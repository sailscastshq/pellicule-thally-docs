# Pellicule documentation

Pellicule turns Vue components into MP4 videos. This focused Thally site explains the tool, gets a new user to a simple first video with a coding agent, and offers a separate 30-second showcase with original sound and a six-second timing/audio guide.

Live: https://pellicule.thally.app/

## Read locally

```bash
npm ci
npm run dev
```

Open http://localhost:3040. Content is under `src/content/`, navigation is in `docs.json`, portable branding is in `src/data/site.ts`, and the double-bar artwork is under `public/brand/`. Framework internals retain the official starter runtime pin; see `AGENTS.md`.

## Reproduce the film

Extract `public/examples/pellicule-first-video.zip` into another directory and follow its README. It contains the complete `Video.vue`, original score generator, locked Pellicule 0.4.0/Vue 3.5.43 dependencies, artwork, license and credits. It uses system Arial/Helvetica; no font files or third-party music are redistributed.

The reference render is H.264, 1280×720, 30 fps, 900 video frames, 30 seconds, with AAC stereo audio at 48 kHz. The practical guide trims/fades audio before rendering a six-second frame range, because tested Pellicule 0.4.0 retained the longer audio when passed the full score with a short range.

## Validate

```bash
npm ci --ignore-scripts --prefix .github/thally-tooling
.github/thally-tooling/node_modules/.bin/thally check --ci .
npm test -- --maxWorkers=2
npm run build
```

Reduced test concurrency avoids timeouts observed on the shared verification machine; it does not change assertions or timeouts. Publication is verified separately against the exact repository and branch connected in Thally Cloud.

## Sources

- https://github.com/sailscastshq/pellicule
- https://docs.sailscasts.com/pellicule
- https://docs.thally.io/quickstart

The walkthrough article lives at `/articles/build-pellicule-docs-with-thally`, in a separate navigation tab, and uses Thally’s documented centered page layout. The timing/audio guide leads with actionable agent prompts; exact CLI details remain available below.
