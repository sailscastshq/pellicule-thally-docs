# Pellicule first-video guide

A focused documentation site built with Thally for Vue developers rendering their first video with Pellicule.

## Read the guide locally

Prerequisites: Node.js with npm. The verification environment used Node.js 24.14.1.

```bash
npm ci
npm run dev
```

Open the local URL printed by Next.js (normally http://localhost:3040).

- `src/content/introduction.mdx`: audience and frame model.
- `src/content/quickstart.mdx`: prerequisites, complete Vue example, rendering and verification.
- `src/content/guides/timing-and-output.mdx`: extend the output and reason about timing.
- `public/examples/`: tested Vue source, rendered MP4 and still image.
- `docs.json`: navigation.
- `src/data/site.ts`: product identity and supported violet brand preset.

Framework files come from the official Thally starter and retain its MIT license and pinned runtime manifest. See `AGENTS.md` for ownership rules.

## Reproduce the video

Follow the quickstart using Pellicule 0.4.0 and Vue 3.5.43. Install FFmpeg and Playwright Chromium as documented there. The checked-in MP4 was rendered locally and verified with FFprobe: H.264, 1280 × 720, 30 fps, 90 frames, 3.000 seconds. The guide's six-second command was also rendered and verified at 180 frames and 6.000 seconds.

## Validate the site

```bash
npm ci --ignore-scripts --prefix .github/thally-tooling
.github/thally-tooling/node_modules/.bin/thally check --ci .
npm test
npm run build
```

Local verification on 18 October 2026:

- Thally content check: zero errors, zero warnings.
- Production build: passed.
- Homepage semantic test: passed after adding the supported `Hero` component.
- Final full starter suite: 1,660 passed, four skipped, one failed. The remaining `doc-route-static-params.test.ts` assertion expects a nonempty API-reference route list; this focused site has no API-reference tab. Framework tests were preserved rather than adding unrelated API documentation to satisfy that assumption.
- Local production browser verification: all three pages and the downloadable component, image, and MP4 returned HTTP 200; each page has one H1, desktop and mobile had no horizontal document overflow, and no page JavaScript errors were observed.

Publishing status is recorded separately during the assessment. A local build does not establish a managed deployment. No live Thally URL is claimed here.

## Sources

- [Pellicule source](https://github.com/sailscastshq/pellicule)
- [Official Pellicule docs](https://docs.sailscasts.com/pellicule)
- [Official Thally quickstart](https://docs.thally.io/quickstart)
