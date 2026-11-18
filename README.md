# Dreame G2 PDP — Visual Media & Section Handbook

> **Live Interactive Handbook:** [https://dreame-theme-handbook.vercel.app](https://dreame-theme-handbook.vercel.app)  
> **Applies to:** G2 PDP Template (`L Series · D Series · H Series`)

Interactive visual spec reference for Design & Content teams:
- **Section Strip (`G2-02` → `G2-29`)**: Exact module code & `Keep / Optional` status above each live section.
- **Hover Spec Badge**: Hover any image/video slot to inspect `Desktop` & `Mobile` pixel dimensions (`Click` badge to copy).
- **Toolbar Controls**: `Jump to section`, `Desktop / Mobile (390px)` live viewport switcher, and `Show All Sizes` pin toggle.

---

## Quick Media Spec Reference (`G2-02` → `G2-29`)

| Section ID | Module | Status | Media Slot | Desktop (px) | Mobile (px) | Ratio / Format |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **G2-02** | `M02` Product Gallery | Keep | Gallery `G1–G13` (×13) | `1600 × 1600` | `1600 × 1600` | `1:1` · PNG/JPG/WebP |
| **G2-03** | `M03` Sticky Nav | Keep | Text Only | — | — | — |
| **G2-04** | `M04` Hero Banner | Keep | Hero KV | `1920 × 630` | `1080 × 1350` | JPG/WebP |
| **G2-05** | `M05` Intro Video Pill | Keep | Pill Cover + Modal Video | `1920 × 1080` *(Pill `790 × 320`)* | `1920 × 1080` | MP4 `< 8MB` |
| **G2-06** | `M06` Highlight Album Grid | Keep | Tile 1 (Wide) | `1216 × 626` | `960 × 960` | `1.94:1` PC · `1:1` MB |
| **G2-06** | `M06` Highlight Album Grid | Keep | Tile 2 | `718 × 640` | `960 × 960` | `1.12:1` PC · `1:1` MB |
| **G2-06** | `M06` Highlight Album Grid | Keep | Tile 3–4 | `968 × 698` | `960 × 960` | `1.39:1` PC · `1:1` MB |
| **G2-06** | `M06` Highlight Album Grid | Keep | Tile 5–8 | `940 × 1040` *(2x of `470×520`)* | `960 × 960` | `0.9:1` PC · `1:1` MB |
| **G2-07** | `M10` Scroll Statement | Optional | Text Only | — | — | — |
| **G2-08** | `M19` Full-Width + Stat | Keep | Feature Banner | `1920 × 810` | `1170 × 1971` | `2.37:1` |
| **G2-09** | `M19` BG + 2 Sub-Cards | Optional | Main BG | `2400 × 1174` | `1170 × 2958` | `2:1` |
| **G2-09** | `M19` BG + 2 Sub-Cards | Optional | Sub-Card (×2) | `1400 × 803` | `1026 × 588` | `1.74:1` |
| **G2-10** | `M17` Title + Image + Stat | Keep | Feature Image | `1960 × 980` | `1023 × 945` | `2:1` |
| **G2-11** | `M22` Feature Slider | Optional | Slide 1 Full BG (+2 Icons `64×64`) | `1920 × 1080` | `776 × 2168` | `16:9` |
| **G2-11** | `M22` Feature Slider | Optional | Slide 2–3 Card | `1920 × 960` | `1028 × 514` | `2:1` |
| **G2-12** | `M18` Full-Width Video | Optional | Full-Width Video | `2560 × 1080` | `720 × 720` | MP4 `< 10MB` |
| **G2-13** | `M20` Two-Column Grid | Keep | Left Main Card | `1600 × 1187` | `1049 × 840` | `1.35:1` |
| **G2-13** | `M20` Two-Column Grid | Keep | Right Stacked Card (×2) | `1156 × 881` | `510 × 534` | `1.31:1` |
| **G2-14** | `M21` Stats + Wide Image | Keep | Wide Image | `1920 × 965` | `900 × 720` | `2:1` |
| **G2-15** | `M21` Image Left + Icon List | Optional | Left Image (+3 Icons `64×64`) | `1920 × 1600` | `900 × 720` | `1.2:1` |
| **G2-16** | `M18` Chapter Divider | Optional | Chapter Banner | `1920 × 810` | `1170 × 1170` | `2.37:1` |
| **G2-17** | `M17` Feature Video Showcase | Keep | Feature Video | `2034 × 1080` | `596 × 480` | MP4 `< 10MB` |
| **G2-18** | `M14` Feature Cards Carousel | Keep | Carousel Card (×5) | `2295 × 1353` | `1026 × 840` | `1.7:1` |
| **G2-19** | `M18` Lifestyle Divider | Optional | Lifestyle Banner | `1920 × 810` | `1170 × 1170` | `2.37:1` |
| **G2-20** | `M16` Slide Carousel | Optional | Carousel Slide (×4) | `2400 × 1440` | `960 × 840` | `5:3` |
| **G2-21** | `M11` Tabbed Media | Optional | Tab Image (×4) | `3600 × 1800` | `960 × 840` | `2:1` |
| **G2-22** | `M17` Wide Feature Banner | Optional | Wide Banner | `2400 × 1200` | `1026 × 1032` | `2:1` |
| **G2-23** | `M14` 3-Column Feature Cards | Optional | Feature Card (×3) | `800 × 760` | `1026 × 1140` | `~1:1` |
| **G2-24** | `M23` Badge Banner | Optional | Banner (+ Badge `200×200`) | `2400 × 818` | `1026 × 840` | `2.93:1` |
| **G2-25** | `M24` What's in the Box | Keep | Hero `1000 × 1000` · Item `600 × 600` | `1000×1000` / `600×600` | `1000×1000` / `600×600` | `1:1` PNG/JPG |
| **G2-26** | `M25` Specifications | Keep | Dimension Drawing (`mm`) | `2712 × 1348` | `607 × 898` | `2:1` PNG |
| **G2-27** | `M27` FAQ Accordion | Keep | Text Only | — | — | — |
| **G2-28** | `M29` Customer Reviews | Keep | Auto App (`Judge.me`) | — | — | — |
| **G2-29** | `M28` Disclaimers | Keep | Text Only | — | — | — |

---

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
