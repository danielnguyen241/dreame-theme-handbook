# Dreame PDP media handbooks

| Layout | US reference | Handbook | Download |
| --- | --- | --- | --- |
| G2 | L60 Pro Ultra | [G2 handbook](https://dreame-theme-handbook-demo.vercel.app/) | [G2 media CSV](SPEC_SUMMARY.csv) |
| G3 | Z30 | [G3 handbook](https://dreame-theme-handbook-demo.vercel.app/g3/) | [G3 media CSV](public/g3/media.csv) |

Choose **VI** or **EN** in either handbook. The language follows the layout links and the 390 px Mobile preview. Append `?lang=vi` to a handbook link to share the Vietnamese view. Add &sizes=1 to open a shared link with source-size badges visible. The G3 **Download CSV** button uses the selected language.

## G3 layout

G3 has 21 reusable sections named by layout or interaction. Dreame Z30 supplies the 63 reference media slots. Both handbooks use the same toolbar, hover badges, and 390 px Mobile preview. Use **Show Media Sizes** to pin the badges and click a badge to copy its source sizes and aspect ratios. Select **Media specs** under **Jump to section** for Desktop thumbnails, original image URLs, and the CSV.

The size badges use source dimensions. The preview may load a smaller CDN variant. [Dreame US Z30](https://www.dreametech.com/products/z30-cordless-stick-vacuum)

## G2 · Dreame L60 Pro Ultra

> **Live Interactive Handbook:** [dreame-theme-handbook-demo.vercel.app](https://dreame-theme-handbook-demo.vercel.app/)  
> **Applies to:** G2 PDP Template (`L Series · D Series · H Series`)

The handbook uses the [Dreame US L60 Pro Ultra PDP](https://www.dreametech.com/products/l60-pro-ultra-robot-vacuum) as the media reference. Sizes are width × height in pixels from the US source images and selected MP4 streams. The preview may use smaller CDN variants of those files. Aspect ratios are width to height. The ≈ symbol marks ratios rounded to two decimal places.

- Use **Jump to section** and **Desktop / Mobile** to preview the layout.
- Use **Show Media Sizes** to view each source size and ratio. Click a badge to copy both.
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
│   ├── styles.css       # G2 product preview styles
│   ├── handbook.js      # G2 section data and product preview interactions
│   ├── handbook-ui.css  # Shared toolbar, section labels and media badges
│   ├── handbook-ui.js   # Shared hover, copy, section jump and viewport controls
│   └── g3/             # G3 layout with Z30 reference media
├── SPEC_SUMMARY.csv    # Spreadsheet-ready export of all G2 media dimensions
└── vercel.json         # Static hosting config (noindex, nofollow)
```

## Run Locally

```bash
npx serve public
```
