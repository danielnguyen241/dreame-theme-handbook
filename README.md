# Dreame PDP media handbooks

| Layout | US reference | Handbook | Download |
| --- | --- | --- | --- |
| G2 | L60 Pro Ultra | [G2 handbook](https://dreame-theme-handbook-demo.vercel.app/) | [G2 media CSV](SPEC_SUMMARY.csv) |
| G3 | Z30 | [G3 handbook](https://dreame-theme-handbook-demo.vercel.app/g3/) | [G3 media CSV](public/g3/media.csv) |

## G3 · Dreame Z30

G3 covers the 21 sections in the Z30 layout and 63 image and video slots. Use **Jump to section**, **Mobile · 390 px**, and **Show sizes** to review dimensions and placement. The Media specs table includes the original Desktop image URL and a Desktop thumbnail. Versions counts one shared file or two device-specific files.

The size badges use source dimensions. The preview may load a smaller CDN variant. [Dreame US Z30](https://www.dreametech.com/products/z30-cordless-stick-vacuum)

## G2 · Dreame L60 Pro Ultra

> **Live Interactive Handbook:** [dreame-theme-handbook-demo.vercel.app](https://dreame-theme-handbook-demo.vercel.app/)  
> **Applies to:** G2 PDP Template (`L Series · D Series · H Series`)

The handbook uses the [Dreame US L60 Pro Ultra PDP](https://www.dreametech.com/products/l60-pro-ultra-robot-vacuum) as the media reference. Sizes are width × height in pixels from the US source images and selected MP4 streams. The preview may use smaller CDN variants of those files. Aspect ratios are width to height. The ≈ symbol marks ratios rounded to two decimal places.

- Use **Jump to section** and **Desktop / Mobile** to preview the layout.
- Use **Show All Sizes** to view each source size and ratio. Click a badge to copy both.
- See [SPEC_SUMMARY.csv](SPEC_SUMMARY.csv) for the complete list of source sizes and aspect ratios, including slots with distinct sizes in the same section.

| Section | Desktop source | Mobile source |
| --- | --- | --- |
| G2-04 Hero | 5120 × 1680 (≈3.05:1) | 1170 × 1740 (≈1:1.49) |
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
│   ├── handbook.js     # G2 carousels, tabs, viewport switcher and copyable sizes
│   └── g3/            # Z30 section preview, responsive styles and media CSV
├── SPEC_SUMMARY.csv    # Spreadsheet-ready export of all G2 media dimensions
└── vercel.json         # Static hosting config (noindex, nofollow)
```

## Run Locally

```bash
npx serve public
```
