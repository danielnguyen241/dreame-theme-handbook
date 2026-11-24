const g3HandbookSections = [
  { sel: "#g3-01", id: 'G3-01', name: "M01 · Buy Box", req: true, meta: "Buy box", specs: [] },
  { sel: "#g3-02", id: 'G3-02', name: "M02 · Product Gallery", req: true, meta: "Gallery", inlineTag: true,
    specs: [
      { sel: '[data-g3-media="gallery_1"]', slot: "Z30 packshot", pc: "5000 × 5000", mb: "5000 × 5000", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" },
      { sel: '[data-g3-media="gallery_2"]', slot: "Feature overview", pc: "800 × 800", mb: "800 × 800", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" },
      { sel: '[data-g3-media="gallery_3"]', slot: "310 AW suction", pc: "800 × 800", mb: "800 × 800", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" },
      { sel: '[data-g3-media="gallery_4"]', slot: "Whole-machine HEPA", pc: "800 × 800", mb: "800 × 800", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" },
      { sel: '[data-g3-media="gallery_5"]', slot: "Smart dirt detection", pc: "800 × 800", mb: "800 × 800", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" },
      { sel: '[data-g3-media="gallery_6"]', slot: "CelesTect light", pc: "800 × 800", mb: "800 × 800", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" },
      { sel: '[data-g3-media="gallery_7"]', slot: "Pet deshedding tool", pc: "800 × 800", mb: "800 × 800", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" },
      { sel: '[data-g3-media="gallery_8"]', slot: "Whole-house cleaning", pc: "800 × 800", mb: "800 × 800", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" },
      { sel: '[data-g3-media="gallery_9"]', slot: "Package overview", pc: "800 × 800", mb: "800 × 800", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" }
    ]
  },
  { sel: "[data-hb-sticky-nav]", id: 'G3-03', name: "M03 · Sticky Nav", req: true, meta: "Navigation", specs: [] },
  { sel: "#g3-04", id: 'G3-04', name: "M04 · Hero Banner", req: true, meta: "Banner",
    specs: [
      { sel: '[data-g3-media="hero"]', slot: "Hero key visual", pc: "1920 × 1080", mb: "768 × 1272", pcRatio: "16:9", mbRatio: "≈1:1.66", fmt: "Image" }
    ]
  },
  { sel: "#g3-05", id: 'G3-05', name: "M06 · Highlight Grid", req: true, meta: "Image grid",
    specs: [
      { sel: '[data-g3-media="highlight_1"]', slot: "310 AW suction", pc: "445 × 581", mb: "727 × 400", pcRatio: "≈1:1.31", mbRatio: "≈1.82:1", fmt: "Image" },
      { sel: '[data-g3-media="highlight_2"]', slot: "HEPA filtration", pc: "587 × 279", mb: "361 × 396", pcRatio: "≈2.10:1", mbRatio: "≈1:1.10", fmt: "Image" },
      { sel: '[data-g3-media="highlight_3"]', slot: "CelesTect dust light", pc: "315 × 279", mb: "356 × 396", pcRatio: "≈1.13:1", mbRatio: "≈1:1.11", fmt: "Image" },
      { sel: '[data-g3-media="highlight_4"]', slot: "Smart dirt detection", pc: "587 × 279", mb: "728 × 400", pcRatio: "≈2.10:1", mbRatio: "≈1.82:1", fmt: "Image" },
      { sel: '[data-g3-media="highlight_5"]', slot: "Pet deshedding tool", pc: "315 × 279", mb: "357 × 400", pcRatio: "≈1.13:1", mbRatio: "≈1:1.12", fmt: "Image" },
      { sel: '[data-g3-media="highlight_6"]', slot: "Up to 90 minutes", pc: "445 × 279", mb: "356 × 400", pcRatio: "≈1.59:1", mbRatio: "≈1:1.12", fmt: "Image" },
      { sel: '[data-g3-media="highlight_7"]', slot: "Clean-to-Edge brush", pc: "445 × 279", mb: "427 × 400", pcRatio: "≈1.59:1", mbRatio: "≈1.07:1", fmt: "Image", sm: true },
      { sel: '[data-g3-media="highlight_8"]', slot: "Multi-surface cleaning", pc: "445 × 279", mb: "287 × 400", pcRatio: "≈1.59:1", mbRatio: "≈1:1.39", fmt: "Image", sm: true }
    ]
  },
  { sel: "#g3-06", id: 'G3-06', name: "M08 · Media Quotes", req: false, meta: "Carousel",
    specs: [
      { sel: '[data-g3-media="press_1"]', slot: "Media logo 01", pc: "700 × 700", mb: "700 × 700", pcRatio: "1:1", mbRatio: "1:1", fmt: "Logo", sm: true },
      { sel: '[data-g3-media="press_2"]', slot: "Media logo 02", pc: "700 × 700", mb: "700 × 700", pcRatio: "1:1", mbRatio: "1:1", fmt: "Logo", sm: true }
    ]
  },
  { sel: "#g3-07", id: 'G3-07', name: "M17 · Video + Stat", req: true, meta: "Video + icon",
    specs: [
      { sel: '[data-g3-media="motor_icon"]', slot: "TurboMotor icon", pc: "77 × 77", mb: "77 × 77", pcRatio: "1:1", mbRatio: "1:1", fmt: "Icon", sm: true },
      { sel: '[data-g3-media="motor_video"]', slot: "TurboMotor demonstration", pc: "1920 × 900", mb: "664 × 634", pcRatio: "≈2.13:1", mbRatio: "≈1.05:1", fmt: "MP4" }
    ]
  },
  { sel: "#g3-08", id: 'G3-08', name: "M19 · Banner + Stats", req: true, meta: "Banner + icon",
    specs: [
      { sel: '[data-g3-media="hepa"]', slot: "HEPA filtration background", pc: "1920 × 1376", mb: "768 × 1200", pcRatio: "≈1.40:1", mbRatio: "≈1:1.56", fmt: "Image" },
      { sel: '[data-g3-media="hepa_badge"]', slot: "HEPA 14 badge", pc: "132 × 113", mb: "132 × 113", pcRatio: "≈1.17:1", mbRatio: "≈1.17:1", fmt: "Icon", sm: true }
    ]
  },
  { sel: "#g3-09", id: 'G3-09', name: "M17 · Feature Grid", req: true, meta: "Image grid",
    specs: [
      { sel: '[data-g3-media="dirt_3"]', slot: "Light dirt gauge", pc: "120 × 62", mb: "120 × 62", pcRatio: "≈1.94:1", mbRatio: "≈1.94:1", fmt: "Icon", sm: true },
      { sel: '[data-g3-media="dirt_1"]', slot: "Medium dirt gauge", pc: "120 × 60", mb: "120 × 60", pcRatio: "2:1", mbRatio: "2:1", fmt: "Icon", sm: true },
      { sel: '[data-g3-media="dirt_2"]', slot: "Heavy dirt gauge", pc: "120 × 60", mb: "120 × 60", pcRatio: "2:1", mbRatio: "2:1", fmt: "Icon", sm: true },
      { sel: '[data-g3-media="smart"]', slot: "Smart detection overview", pc: "924 × 775", mb: "728 × 524", pcRatio: "≈1.19:1", mbRatio: "≈1.39:1", fmt: "Image" },
      { sel: '[data-g3-media="detect"]', slot: "Detection card", pc: "458 × 245", mb: "237 × 228", pcRatio: "≈1.87:1", mbRatio: "≈1.04:1", fmt: "Image", sm: true },
      { sel: '[data-g3-media="react"]', slot: "Reaction card", pc: "458 × 245", mb: "236 × 228", pcRatio: "≈1.87:1", mbRatio: "≈1.04:1", fmt: "Image", sm: true },
      { sel: '[data-g3-media="present"]', slot: "Presentation card", pc: "458 × 245", mb: "237 × 229", pcRatio: "≈1.87:1", mbRatio: "≈1.03:1", fmt: "Image", sm: true }
    ]
  },
  { sel: "#g3-10", id: 'G3-10', name: "M17 · Image + Stats", req: true, meta: "Image + icons",
    specs: [
      { sel: '[data-g3-media="time_icon"]', slot: "Runtime icon", pc: "59 × 59", mb: "59 × 59", pcRatio: "1:1", mbRatio: "1:1", fmt: "Icon", sm: true },
      { sel: '[data-g3-media="area_icon"]', slot: "Coverage icon", pc: "63 × 58", mb: "63 × 58", pcRatio: "≈1.09:1", mbRatio: "≈1.09:1", fmt: "Icon", sm: true },
      { sel: '[data-g3-media="runtime"]', slot: "Whole-house cleaning", pc: "1397 × 775", mb: "669 × 676", pcRatio: "≈1.80:1", mbRatio: "≈1:1.01", fmt: "Image" }
    ]
  },
  { sel: "#g3-11", id: 'G3-11', name: "M17 · Image Switcher", req: true, meta: "Image switcher",
    specs: [
      { sel: '[data-g3-media="light_1"]', slot: "CelesTect · state 01", pc: "1920 × 992", mb: "768 × 776", pcRatio: "≈1.94:1", mbRatio: "≈1:1.01", fmt: "Image" },
      { sel: '[data-g3-media="light_2"]', slot: "CelesTect · state 02", pc: "1920 × 992", mb: "768 × 776", pcRatio: "≈1.94:1", mbRatio: "≈1:1.01", fmt: "Image" }
    ]
  },
  { sel: "#g3-12", id: 'G3-12', name: "M14 · Feature Cards", req: true, meta: "Image grid",
    specs: [
      { sel: '[data-g3-media="surface_card"]', slot: "Multi-surface capabilities", pc: "689 × 664", mb: "326 × 367", pcRatio: "≈1.04:1", mbRatio: "≈1:1.13", fmt: "Image" },
      { sel: '[data-g3-media="ridges_card"]', slot: "Anti-tangle ridges", pc: "689 × 664", mb: "326 × 367", pcRatio: "≈1.04:1", mbRatio: "≈1:1.13", fmt: "Image" }
    ]
  },
  { sel: "#g3-13", id: 'G3-13', name: "M17 · Text + Image", req: false, meta: "Single image",
    specs: [
      { sel: '[data-g3-media="edge"]', slot: "Clean-to-Edge soft roller", pc: "1397 × 775", mb: "768 × 743", pcRatio: "≈1.80:1", mbRatio: "≈1.03:1", fmt: "Image" }
    ]
  },
  { sel: "#g3-14", id: 'G3-14', name: "M15 · Video + Carousel", req: true, meta: "Video + carousel",
    specs: [
      { sel: '[data-g3-media="pet_video"]', slot: "Pet deshedding demonstration", pc: "1400 × 656", mb: "680 × 700", pcRatio: "≈2.13:1", mbRatio: "≈1:1.03", fmt: "MP4" },
      { sel: '[data-g3-media="tool_1"]', slot: "Motorized mini-brush", pc: "690 × 664", mb: "680 × 700", pcRatio: "≈1.04:1", mbRatio: "≈1:1.03", fmt: "Image" },
      { sel: '[data-g3-media="tool_2"]', slot: "Rotating soft dusting brush", pc: "690 × 664", mb: "680 × 700", pcRatio: "≈1.04:1", mbRatio: "≈1:1.03", fmt: "Image" },
      { sel: '[data-g3-media="tool_3"]', slot: "Combination tool", pc: "690 × 664", mb: "680 × 700", pcRatio: "≈1.04:1", mbRatio: "≈1:1.03", fmt: "Image" },
      { sel: '[data-g3-media="tool_4"]', slot: "Soft dusting brush", pc: "690 × 664", mb: "680 × 700", pcRatio: "≈1.04:1", mbRatio: "≈1:1.03", fmt: "Image" },
      { sel: '[data-g3-media="tool_5"]', slot: "Flexible adapter", pc: "690 × 664", mb: "680 × 700", pcRatio: "≈1.04:1", mbRatio: "≈1:1.03", fmt: "Image" }
    ]
  },
  { sel: "#g3-15", id: 'G3-15', name: "M21 · Image + Text Rows", req: true, meta: "Image + text rows",
    specs: [
      { sel: '[data-g3-media="empty"]', slot: "One-press dirt release", pc: "689 × 528", mb: "383 × 317", pcRatio: "≈1.30:1", mbRatio: "≈1.21:1", fmt: "Image" },
      { sel: '[data-g3-media="empty_icon"]', slot: "Dirt release indicator", pc: "378 × 378", mb: "378 × 378", pcRatio: "1:1", mbRatio: "1:1", fmt: "Icon", sm: true },
      { sel: '[data-g3-media="dust_cup"]', slot: "Removable dust cup", pc: "689 × 528", mb: "384 × 317", pcRatio: "≈1.30:1", mbRatio: "≈1.21:1", fmt: "Image" },
      { sel: '[data-g3-media="wash"]', slot: "Washable components", pc: "689 × 528", mb: "383 × 317", pcRatio: "≈1.30:1", mbRatio: "≈1.21:1", fmt: "Image" }
    ]
  },
  { sel: "#g3-16", id: 'G3-16', name: "M17 · Full-Width Image", req: false, meta: "Banner",
    specs: [
      { sel: '[data-g3-media="storage"]', slot: "Ground base storage", pc: "1920 × 1214", mb: "768 × 848", pcRatio: "≈1.58:1", mbRatio: "≈1:1.10", fmt: "Image" }
    ]
  },
  { sel: "#g3-17", id: 'G3-17', name: "M24 · Package List", req: true, meta: "Image grid",
    specs: [
      { sel: '[data-g3-media="packshot"]', slot: "Package packshot", pc: "810 × 810", mb: "810 × 810", pcRatio: "1:1", mbRatio: "1:1", fmt: "Image" },
      { sel: '[data-g3-media="kit_body"]', slot: "Main body", pc: "214 × 224", mb: "260 × 355", pcRatio: "≈1:1.05", mbRatio: "≈1:1.37", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_mini"]', slot: "Motorized mini-brush", pc: "213 × 223", mb: "170 × 151", pcRatio: "≈1:1.05", mbRatio: "≈1.13:1", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_pet"]', slot: "Pet deshedding tool", pc: "213 × 223", mb: "132 × 151", pcRatio: "≈1:1.05", mbRatio: "≈1:1.14", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_adapter"]', slot: "Flexible adapter", pc: "213 × 223", mb: "170 × 92", pcRatio: "≈1:1.05", mbRatio: "≈1.85:1", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_surface"]', slot: "Illumination multi-surface brush", pc: "213 × 223", mb: "261 × 174", pcRatio: "≈1:1.05", mbRatio: "3:2", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_combo"]', slot: "Combination tool", pc: "213 × 223", mb: "170 × 213", pcRatio: "≈1:1.05", mbRatio: "≈1:1.25", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_dust"]', slot: "Soft dusting brush", pc: "212 × 223", mb: "170 × 151", pcRatio: "≈1:1.05", mbRatio: "≈1.13:1", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_hose"]', slot: "Extension hose", pc: "213 × 223", mb: "170 × 151", pcRatio: "≈1:1.05", mbRatio: "≈1.13:1", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_roller"]', slot: "Illumination soft roller brush", pc: "213 × 223", mb: "261 × 173", pcRatio: "≈1:1.05", mbRatio: "≈1.51:1", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_rotate"]', slot: "Rotating soft dusting brush", pc: "213 × 223", mb: "170 × 151", pcRatio: "≈1:1.05", mbRatio: "≈1.13:1", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_rod"]', slot: "Extension rod", pc: "213 × 224", mb: "132 × 353", pcRatio: "≈1:1.05", mbRatio: "≈1:2.67", fmt: "Image", sm: true },
      { sel: '[data-g3-media="kit_base"]', slot: "Ground base", pc: "213 × 223", mb: "132 × 151", pcRatio: "≈1:1.05", mbRatio: "≈1:1.14", fmt: "Image", sm: true }
    ]
  },
  { sel: "#g3-18", id: 'G3-18', name: "M25 · Specifications", req: true, meta: "Text table", specs: [] },
  { sel: "#g3-19", id: 'G3-19', name: "M27 · FAQ", req: true, meta: "Accordion", specs: [] },
  { sel: "#g3-20", id: 'G3-20', name: "M28 · Disclaimers", req: true, meta: "Text", specs: [] },
  { sel: "#g3-21", id: 'G3-21', name: "M29 · Customer Reviews", req: true, meta: "App block", specs: [] }
];

const g3FieldSections = g3HandbookSections.map(section => {
  const preview = document.querySelector(section.sel);
  return {
    ...section,
    markup: preview.outerHTML,
    fieldIds: new Set(Array.from(preview.querySelectorAll('[data-g3-field]'), node => node.dataset.g3Field)),
  };
});

initHandbook(g3HandbookSections);
initG3ShopifyFields(g3FieldSections);
