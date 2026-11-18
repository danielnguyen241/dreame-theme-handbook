# Dreame G2 PDP — Visual Media & Section Handbook

> **Live Interactive Handbook:** [https://dreame-theme-handbook.vercel.app](https://dreame-theme-handbook.vercel.app)  
> **Applies to:** G2 PDP Template (`L Series · D Series · H Series`)

The handbook uses the [Dreame US L60 Pro Ultra PDP](https://www.dreametech.com/products/l60-pro-ultra-robot-vacuum) as the media reference. Sizes are width × height in pixels from the US source images and selected MP4 streams. The preview may use smaller CDN variants of those files.

- Use **Jump to section** and **Desktop / Mobile** to preview the layout.
- Use **Show All Sizes** or click a media badge to copy the source dimensions.
- See [SPEC_SUMMARY.csv](SPEC_SUMMARY.csv) for the complete media size list, including slots with distinct sizes in the same section.

| Section | Desktop source | Mobile source |
| --- | --- | --- |
| G2-04 Hero | 5120 × 1680 | 1170 × 1740 |
| G2-06 Tile 3 | 1184 × 640 | 960 × 960 |
| G2-06 Tile 4 | 1776 × 960 | 960 × 960 |
| G2-18 Card image | 2295 × 1353 | 1026 × 840 |
| G2-23 Card image | 1136 × 1080 | 1026 × 1140 |

The source dimensions provide a canvas reference. A smaller export can use the same aspect ratio when the design and delivery requirements allow it.

## Project Structure

```text
├── public/
│   ├── index.html      # Full standalone G2 PDP layout (G2-02 → G2-29)
│   ├── styles.css      # G2 design system + minimal hover spec UI
│   └── handbook.js     # Interactive carousels, tabs, Desktop/Mobile switcher & click-to-copy specs
├── SPEC_SUMMARY.csv    # Spreadsheet-ready export of all G2 media dimensions
└── vercel.json         # Static hosting config (noindex, nofollow)
```

## Run Locally

```bash
npx serve public
```
