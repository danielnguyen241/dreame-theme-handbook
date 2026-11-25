const g1Sections = [
  {
    "id": "G1-01",
    "name": "Buy box + gallery",
    "module": "M01",
    "vnModules": [
      "M01"
    ],
    "optional": false,
    "weight": "Light",
    "note": "Gallery = M02 (infographics with text in image).",
    "reference": {
      "path": "reference/g1-01-us.webp",
      "width": 1098,
      "height": 427,
      "kind": "us"
    },
    "clean": null,
    "media": null,
    "fields": [
      {
        "name": "Product name (H1)",
        "kind": "TYPED",
        "location": "Top right",
        "limit": "Max 60"
      },
      {
        "name": "Key bullets (5 to 8)",
        "kind": "TYPED",
        "location": "Under price",
        "limit": "Max 60 each"
      },
      {
        "name": "Price, variants, bundles, gifts",
        "kind": "SYSTEM",
        "location": "Buy box",
        "limit": "-"
      }
    ],
    "moduleDetails": [
      {
        "name": "Buy box",
        "layout": "Product name, rating, price, key bullets, options, gifts, sticky add-to-cart bar",
        "fields": "H1 name (Ecom) | key bullets 5 to 8 (Ecom)",
        "imageText": "No",
        "size": "System data + product images"
      }
    ]
  },
  {
    "id": "G1-02",
    "name": "Gallery",
    "module": "M02",
    "vnModules": [
      "M02"
    ],
    "optional": false,
    "weight": "Medium",
    "note": "Same rule as group 2.",
    "reference": {
      "path": "reference/g1-02-us.webp",
      "width": 1270,
      "height": 714,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M02",
      "asset": "Gallery",
      "size": "1:1, 1600 x 1600",
      "imageText": "YES: infographics G3+ carry title, numbers, caption band",
      "clearSpace": "Caption band 15% (gallery)",
      "source": "KV / TVC cut",
      "note": "Same rule as group 2."
    },
    "fields": [
      {
        "name": "Infographic text (per image)",
        "kind": "IN IMAGE",
        "location": "Inside gallery images",
        "limit": "Title 35 + 3 to 6 labels"
      },
      {
        "name": "Alt text (per image)",
        "kind": "TYPED",
        "location": "Hidden",
        "limit": "Max 125"
      }
    ],
    "moduleDetails": [
      {
        "name": "Gallery",
        "layout": "Square images at the top: colour cutouts + infographics",
        "fields": "Alt text ()",
        "imageText": "YES: infographics G3+ carry title, numbers, caption band",
        "size": "1:1, 1600 x 1600"
      }
    ]
  },
  {
    "id": "G1-03",
    "name": "Section nav",
    "module": "M03",
    "vnModules": [
      "M03"
    ],
    "optional": false,
    "weight": "Light",
    "note": "Overview, Clear Reaches, Powerful Cleaning, PowerDock, Intelligence, Package List & Specs.",
    "reference": {
      "path": "reference/g1-03-module.webp",
      "width": 1568,
      "height": 94,
      "kind": "module"
    },
    "clean": null,
    "media": null,
    "fields": [
      {
        "name": "Short name + tab names",
        "kind": "TYPED",
        "location": "Sticky nav",
        "limit": "Max 20 each"
      }
    ],
    "moduleDetails": [
      {
        "name": "Section nav (sticky)",
        "layout": "Short product name + anchor tabs",
        "fields": "Short name, 4 to 6 tab names ()",
        "imageText": "No",
        "size": "-"
      }
    ]
  },
  {
    "id": "G1-04",
    "name": "Hero banner",
    "module": "M04",
    "vnModules": [
      "M04"
    ],
    "optional": false,
    "weight": "Light",
    "note": "Award logos row allowed in image.",
    "reference": {
      "path": "reference/g1-04-us.webp",
      "width": 1098,
      "height": 427,
      "kind": "us"
    },
    "clean": {
      "path": "reference/g1-04-layout.webp",
      "width": 549,
      "height": 220,
      "kind": "layout"
    },
    "media": {
      "module": "M04",
      "asset": "Hero banner",
      "size": "About 2.4:1, 1920 x 800 + mobile 1080 x 1350",
      "imageText": "Award logos only",
      "clearSpace": "Area for title + subtitle",
      "source": "KV / TVC cut",
      "note": "Award logos row allowed in image."
    },
    "fields": [
      {
        "name": "Title",
        "kind": "TYPED",
        "location": "Over image",
        "limit": "Max 30"
      },
      {
        "name": "Subtitle",
        "kind": "TYPED",
        "location": "Over image",
        "limit": "Max 50"
      },
      {
        "name": "Footnote (if *)",
        "kind": "TYPED",
        "location": "Over image, bottom",
        "limit": "Max 150"
      }
    ],
    "moduleDetails": [
      {
        "name": "Hero banner",
        "layout": "Full-width image, title + subtitle typed over it",
        "fields": "Title, subtitle, optional footnote",
        "imageText": "Award logos only",
        "size": "About 2.4:1, 1920 x 800 + mobile 1080 x 1350"
      }
    ]
  },
  {
    "id": "G1-05",
    "name": "Album grid",
    "module": "M06",
    "vnModules": [
      "M06"
    ],
    "optional": false,
    "weight": "Medium",
    "note": "9 tiles; titles typed; 20,000Pa graphic in image is OK.",
    "reference": {
      "path": "reference/g1-05-us.webp",
      "width": 1098,
      "height": 799,
      "kind": "us"
    },
    "clean": {
      "path": "reference/g1-05-layout.webp",
      "width": 549,
      "height": 220,
      "kind": "layout"
    },
    "media": {
      "module": "M06",
      "asset": "Album grid",
      "size": "Tile ratios per layout, export 2x",
      "imageText": "Technical callouts only (numbers, lines)",
      "clearSpace": "Top-left of each tile for the title",
      "source": "KV / TVC cut",
      "note": "9 tiles; titles typed; 20,000Pa graphic in image is OK."
    },
    "fields": [
      {
        "name": "Section title (optional)",
        "kind": "TYPED",
        "location": "Above grid",
        "limit": "Max 40"
      },
      {
        "name": "Tile titles (one per tile)",
        "kind": "TYPED",
        "location": "Over each tile, top",
        "limit": "Max 45 each"
      }
    ],
    "moduleDetails": [
      {
        "name": "Album grid",
        "layout": "Image tiles, each with a typed title over the image",
        "fields": "Section title (optional), tile title per tile",
        "imageText": "Technical callouts only (numbers, lines)",
        "size": "Tile ratios per layout, export 2x"
      }
    ]
  },
  {
    "id": "G1-06",
    "name": "Expert video reviews",
    "module": "M07",
    "vnModules": [
      "M07"
    ],
    "optional": true,
    "weight": "Light",
    "note": "Only with VN reviewer videos.",
    "reference": {
      "path": "reference/g1-06-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M07",
      "asset": "Expert video reviews",
      "size": "YouTube links (no production)",
      "imageText": "No",
      "clearSpace": "-",
      "source": "YouTube links",
      "note": "Only with VN reviewer videos."
    },
    "fields": [
      {
        "name": "Section title",
        "kind": "TYPED",
        "location": "Top",
        "limit": "Max 30"
      },
      {
        "name": "Per card: channel, subscribers, quote",
        "kind": "TYPED",
        "location": "Under video",
        "limit": "Quote max 250"
      }
    ],
    "moduleDetails": [
      {
        "name": "Expert video reviews",
        "layout": "YouTube review cards: video, channel, quote",
        "fields": "Channel name, subscribers, quote",
        "imageText": "No",
        "size": "YouTube links (no production)"
      }
    ]
  },
  {
    "id": "G1-07",
    "name": "Media quotes grid",
    "module": "M08",
    "vnModules": [
      "M08"
    ],
    "optional": true,
    "weight": "Light",
    "note": "Only with VN press quotes.",
    "reference": {
      "path": "reference/g1-07-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M08",
      "asset": "Media quotes grid",
      "size": "Logos PNG 200 x 200",
      "imageText": "Logos only",
      "clearSpace": "-",
      "source": "Logo files",
      "note": "Only with VN press quotes."
    },
    "fields": [
      {
        "name": "Section title",
        "kind": "TYPED",
        "location": "Top",
        "limit": "Max 30"
      },
      {
        "name": "Per card: quote + source",
        "kind": "TYPED",
        "location": "Card",
        "limit": "Max 160"
      }
    ],
    "moduleDetails": [
      {
        "name": "Media quotes grid",
        "layout": "Logo + short quote cards",
        "fields": "Section title, quotes + source",
        "imageText": "Logos only",
        "size": "Logos PNG 200 x 200"
      }
    ]
  },
  {
    "id": "G1-08",
    "name": "Scroll story: obstacle clearing",
    "module": "M09",
    "vnModules": [
      "M18"
    ],
    "optional": false,
    "weight": "Light",
    "note": "Heavy motion video. For VN use M18 (full-width video + title) unless the global scroll video is available.",
    "reference": {
      "path": "reference/g1-08-us.webp",
      "width": 941,
      "height": 710,
      "kind": "us"
    },
    "clean": {
      "path": "reference/g1-08-layout.webp",
      "width": 470,
      "height": 193,
      "kind": "layout"
    },
    "media": {
      "module": "M18",
      "asset": "Scroll story: obstacle clearing",
      "size": "2.37:1, 1920 x 810; video 21:9",
      "imageText": "No",
      "clearSpace": "Centre for the title",
      "source": "KV / TVC cut",
      "note": "Heavy motion video. For VN use M18 (full-width video + title) unless the global scroll video is available."
    },
    "fields": [
      {
        "name": "Title",
        "kind": "TYPED",
        "location": "Over media",
        "limit": "Max 35"
      }
    ],
    "moduleDetails": [
      {
        "name": "Full-width media + title",
        "layout": "Full-width image or video, short title typed over it",
        "fields": "Title (35 chars)",
        "imageText": "No",
        "size": "2.37:1, 1920 x 810; video 21:9"
      }
    ]
  },
  {
    "id": "G1-09",
    "name": "Tabbed video: conquer ledges",
    "module": "M11",
    "vnModules": [
      "M11"
    ],
    "optional": false,
    "weight": "Medium",
    "note": "2 tabs.",
    "reference": {
      "path": "reference/g1-09-us.webp",
      "width": 941,
      "height": 710,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M11",
      "asset": "Tabbed video: conquer ledges",
      "size": "16:9, 1920 x 1080 per tab",
      "imageText": "Technical callouts only",
      "clearSpace": "Bottom band for tab labels",
      "source": "KV / TVC cut",
      "note": "2 tabs."
    },
    "fields": [
      {
        "name": "Section title",
        "kind": "TYPED",
        "location": "Top",
        "limit": "Max 45"
      },
      {
        "name": "Tab labels",
        "kind": "TYPED",
        "location": "Under media",
        "limit": "Max 30 each"
      },
      {
        "name": "Text per tab",
        "kind": "TYPED",
        "location": "Under tabs",
        "limit": "Max 300"
      }
    ],
    "moduleDetails": [
      {
        "name": "Tabbed full-width media",
        "layout": "Section title, tab labels, one video or image per tab, optional text per tab",
        "fields": "Title, tab labels, text per tab",
        "imageText": "Technical callouts only",
        "size": "16:9, 1920 x 1080 per tab"
      }
    ]
  },
  {
    "id": "G1-10",
    "name": "Comparison: with Dreame vs others",
    "module": "M12",
    "vnModules": [
      "M12"
    ],
    "optional": false,
    "weight": "Medium",
    "note": null,
    "reference": {
      "path": "reference/g1-10-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M12",
      "asset": "Comparison: with Dreame vs others",
      "size": "About 1.2:1, 1200 x 1000 x 2",
      "imageText": "No",
      "clearSpace": "Top-left for the label",
      "source": "KV / TVC cut",
      "note": null
    },
    "fields": [
      {
        "name": "Card labels + captions",
        "kind": "TYPED",
        "location": "On / under each card",
        "limit": "Label 15, caption 120"
      }
    ],
    "moduleDetails": [
      {
        "name": "Comparison: 2 cards",
        "layout": "\"With Dreame\" vs \"With others\", media + caption each",
        "fields": "Card labels, captions",
        "imageText": "No",
        "size": "About 1.2:1, 1200 x 1000 x 2"
      }
    ]
  },
  {
    "id": "G1-11",
    "name": "Stat image + tabbed video: legs, 360 mapping",
    "module": "M11",
    "vnModules": [
      "M11"
    ],
    "optional": false,
    "weight": "Medium",
    "note": "Big number graphic (30,000) in image is OK.",
    "reference": {
      "path": "reference/g1-11-us.webp",
      "width": 941,
      "height": 1051,
      "kind": "us"
    },
    "clean": {
      "path": "reference/g1-11-layout.webp",
      "width": 470,
      "height": 193,
      "kind": "layout"
    },
    "media": {
      "module": "M11",
      "asset": "Stat image + tabbed video: legs, 360 mapping",
      "size": "16:9, 1920 x 1080 per tab",
      "imageText": "Technical callouts only",
      "clearSpace": "Bottom band for tab labels",
      "source": "KV / TVC cut",
      "note": "Big number graphic (30,000) in image is OK."
    },
    "fields": [
      {
        "name": "Section title",
        "kind": "TYPED",
        "location": "Top",
        "limit": "Max 45"
      },
      {
        "name": "Tab labels",
        "kind": "TYPED",
        "location": "Under media",
        "limit": "Max 30 each"
      },
      {
        "name": "Text per tab",
        "kind": "TYPED",
        "location": "Under tabs",
        "limit": "Max 300"
      }
    ],
    "moduleDetails": [
      {
        "name": "Tabbed full-width media",
        "layout": "Section title, tab labels, one video or image per tab, optional text per tab",
        "fields": "Title, tab labels, text per tab",
        "imageText": "Technical callouts only",
        "size": "16:9, 1920 x 1080 per tab"
      }
    ]
  },
  {
    "id": "G1-12",
    "name": "Scroll story: obstacle avoidance",
    "module": "M09",
    "vnModules": [
      "M17"
    ],
    "optional": false,
    "weight": "Light",
    "note": "Heavy. Use M17 (title + text + image) for VN.",
    "reference": {
      "path": "reference/g1-12-us.webp",
      "width": 941,
      "height": 710,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M17",
      "asset": "Scroll story: obstacle avoidance",
      "size": "Wide 2.2:1, 1920 x 870 or 16:9",
      "imageText": "No",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": "Heavy. Use M17 (title + text + image) for VN."
    },
    "fields": [
      {
        "name": "Title",
        "kind": "TYPED",
        "location": "Top centre",
        "limit": "Max 45"
      },
      {
        "name": "Body",
        "kind": "TYPED",
        "location": "Under title",
        "limit": "Max 250"
      },
      {
        "name": "Icon stat labels (0 to 3)",
        "kind": "TYPED",
        "location": "Under body",
        "limit": "Max 25 each"
      }
    ],
    "moduleDetails": [
      {
        "name": "Title + text + image",
        "layout": "Centred title and text, optional icon stats, image or video below",
        "fields": "Title, body, icon labels",
        "imageText": "No",
        "size": "Wide 2.2:1, 1920 x 870 or 16:9"
      }
    ]
  },
  {
    "id": "G1-13",
    "name": "Tabbed media: double brushes",
    "module": "M11",
    "vnModules": [
      "M11"
    ],
    "optional": false,
    "weight": "Medium",
    "note": null,
    "reference": {
      "path": "reference/g1-13-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M11",
      "asset": "Tabbed media: double brushes",
      "size": "16:9, 1920 x 1080 per tab",
      "imageText": "Technical callouts only",
      "clearSpace": "Bottom band for tab labels",
      "source": "KV / TVC cut",
      "note": null
    },
    "fields": [
      {
        "name": "Section title",
        "kind": "TYPED",
        "location": "Top",
        "limit": "Max 45"
      },
      {
        "name": "Tab labels",
        "kind": "TYPED",
        "location": "Under media",
        "limit": "Max 30 each"
      },
      {
        "name": "Text per tab",
        "kind": "TYPED",
        "location": "Under tabs",
        "limit": "Max 300"
      }
    ],
    "moduleDetails": [
      {
        "name": "Tabbed full-width media",
        "layout": "Section title, tab labels, one video or image per tab, optional text per tab",
        "fields": "Title, tab labels, text per tab",
        "imageText": "Technical callouts only",
        "size": "16:9, 1920 x 1080 per tab"
      }
    ]
  },
  {
    "id": "G1-14",
    "name": "Text + image + stats: SideReach",
    "module": "M13",
    "vnModules": [
      "M13"
    ],
    "optional": false,
    "weight": "Light",
    "note": null,
    "reference": {
      "path": "reference/g1-14-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": {
      "path": "reference/g1-14-layout.webp",
      "width": 470,
      "height": 193,
      "kind": "layout"
    },
    "media": {
      "module": "M13",
      "asset": "Text + image + stats: SideReach",
      "size": "About 1.3:1, 1400 x 1080",
      "imageText": "No",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": null
    },
    "fields": [
      {
        "name": "Title + body",
        "kind": "TYPED",
        "location": "Left",
        "limit": "Title 40, body 300"
      },
      {
        "name": "Stats: number + label",
        "kind": "TYPED",
        "location": "Right",
        "limit": "Number 6, label 35"
      }
    ],
    "moduleDetails": [
      {
        "name": "Text + image + stats",
        "layout": "Title and body left, image centre, 2 to 4 stats right",
        "fields": "Title, body, stats (number + label)",
        "imageText": "No",
        "size": "About 1.3:1, 1400 x 1080"
      }
    ]
  },
  {
    "id": "G1-15",
    "name": "Two cards: TripleUp",
    "module": "M14",
    "vnModules": [
      "M14"
    ],
    "optional": false,
    "weight": "Light",
    "note": null,
    "reference": {
      "path": "reference/g1-15-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M14",
      "asset": "Two cards: TripleUp",
      "size": "About 1.4:1, 1400 x 1000 per card",
      "imageText": "No",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": null
    },
    "fields": [
      {
        "name": "Card title + text (each)",
        "kind": "TYPED",
        "location": "Under card image",
        "limit": "Title 30, text 250"
      }
    ],
    "moduleDetails": [
      {
        "name": "Cards: image + title + text",
        "layout": "2 to 4 cards side by side",
        "fields": "Card title, card text",
        "imageText": "No",
        "size": "About 1.4:1, 1400 x 1000 per card"
      }
    ]
  },
  {
    "id": "G1-16",
    "name": "Scroll story: dock",
    "module": "M09",
    "vnModules": [
      "M18"
    ],
    "optional": false,
    "weight": "Light",
    "note": "Heavy.",
    "reference": {
      "path": "reference/g1-16-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M18",
      "asset": "Scroll story: dock",
      "size": "2.37:1, 1920 x 810; video 21:9",
      "imageText": "No",
      "clearSpace": "Centre for the title",
      "source": "KV / TVC cut",
      "note": "Heavy."
    },
    "fields": [
      {
        "name": "Title",
        "kind": "TYPED",
        "location": "Over media",
        "limit": "Max 35"
      }
    ],
    "moduleDetails": [
      {
        "name": "Full-width media + title",
        "layout": "Full-width image or video, short title typed over it",
        "fields": "Title (35 chars)",
        "imageText": "No",
        "size": "2.37:1, 1920 x 810; video 21:9"
      }
    ]
  },
  {
    "id": "G1-17",
    "name": "Accordion + image: dock features",
    "module": "M15",
    "vnModules": [
      "M15"
    ],
    "optional": false,
    "weight": "Medium",
    "note": "5 items.",
    "reference": {
      "path": "reference/g1-17-us.webp",
      "width": 941,
      "height": 710,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M15",
      "asset": "Accordion + image: dock features",
      "size": "About 1:1, 1200 x 1160 per item",
      "imageText": "No",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": "5 items."
    },
    "fields": [
      {
        "name": "Item title + text (each)",
        "kind": "TYPED",
        "location": "Left list",
        "limit": "Title 40, text 300"
      }
    ],
    "moduleDetails": [
      {
        "name": "Accordion list + image",
        "layout": "List of features on the left (click to open), image changes on the right",
        "fields": "Item title + text (3 to 6 items), optional chips",
        "imageText": "No",
        "size": "About 1:1, 1200 x 1160 per item"
      }
    ]
  },
  {
    "id": "G1-18",
    "name": "Accordion + image: rewashing",
    "module": "M15",
    "vnModules": [
      "M15"
    ],
    "optional": true,
    "weight": "Medium",
    "note": null,
    "reference": {
      "path": "reference/g1-18-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M15",
      "asset": "Accordion + image: rewashing",
      "size": "About 1:1, 1200 x 1160 per item",
      "imageText": "No",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": null
    },
    "fields": [
      {
        "name": "Item title + text (each)",
        "kind": "TYPED",
        "location": "Left list",
        "limit": "Title 40, text 300"
      }
    ],
    "moduleDetails": [
      {
        "name": "Accordion list + image",
        "layout": "List of features on the left (click to open), image changes on the right",
        "fields": "Item title + text (3 to 6 items), optional chips",
        "imageText": "No",
        "size": "About 1:1, 1200 x 1160 per item"
      }
    ]
  },
  {
    "id": "G1-19",
    "name": "Scroll story: carpet app",
    "module": "M09",
    "vnModules": [
      "M17"
    ],
    "optional": false,
    "weight": "Light",
    "note": "Heavy.",
    "reference": {
      "path": "reference/g1-19-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M17",
      "asset": "Scroll story: carpet app",
      "size": "Wide 2.2:1, 1920 x 870 or 16:9",
      "imageText": "No",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": "Heavy."
    },
    "fields": [
      {
        "name": "Title",
        "kind": "TYPED",
        "location": "Top centre",
        "limit": "Max 45"
      },
      {
        "name": "Body",
        "kind": "TYPED",
        "location": "Under title",
        "limit": "Max 250"
      },
      {
        "name": "Icon stat labels (0 to 3)",
        "kind": "TYPED",
        "location": "Under body",
        "limit": "Max 25 each"
      }
    ],
    "moduleDetails": [
      {
        "name": "Title + text + image",
        "layout": "Centred title and text, optional icon stats, image or video below",
        "fields": "Title, body, icon labels",
        "imageText": "No",
        "size": "Wide 2.2:1, 1920 x 870 or 16:9"
      }
    ]
  },
  {
    "id": "G1-20",
    "name": "Tabbed image: carpet modes",
    "module": "M11",
    "vnModules": [
      "M11"
    ],
    "optional": false,
    "weight": "Medium",
    "note": "4 tabs.",
    "reference": {
      "path": "reference/g1-20-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M11",
      "asset": "Tabbed image: carpet modes",
      "size": "16:9, 1920 x 1080 per tab",
      "imageText": "Technical callouts only",
      "clearSpace": "Bottom band for tab labels",
      "source": "KV / TVC cut",
      "note": "4 tabs."
    },
    "fields": [
      {
        "name": "Section title",
        "kind": "TYPED",
        "location": "Top",
        "limit": "Max 45"
      },
      {
        "name": "Tab labels",
        "kind": "TYPED",
        "location": "Under media",
        "limit": "Max 30 each"
      },
      {
        "name": "Text per tab",
        "kind": "TYPED",
        "location": "Under tabs",
        "limit": "Max 300"
      }
    ],
    "moduleDetails": [
      {
        "name": "Tabbed full-width media",
        "layout": "Section title, tab labels, one video or image per tab, optional text per tab",
        "fields": "Title, tab labels, text per tab",
        "imageText": "Technical callouts only",
        "size": "16:9, 1920 x 1080 per tab"
      }
    ]
  },
  {
    "id": "G1-21",
    "name": "Card carousel: pets",
    "module": "M16",
    "vnModules": [
      "M16"
    ],
    "optional": false,
    "weight": "Medium",
    "note": null,
    "reference": {
      "path": "reference/g1-21-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M16",
      "asset": "Card carousel: pets",
      "size": "About 1.67:1, 1600 x 960 per card",
      "imageText": "No",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": null
    },
    "fields": [
      {
        "name": "Title + sub",
        "kind": "TYPED",
        "location": "Top",
        "limit": "Title 45, sub 200"
      },
      {
        "name": "Card title + text (each)",
        "kind": "TYPED",
        "location": "Under card image",
        "limit": "Title 35, text 200"
      }
    ],
    "moduleDetails": [
      {
        "name": "Card carousel",
        "layout": "Title + sub, sliding cards with image, title, text",
        "fields": "Title, sub, card title + text",
        "imageText": "No",
        "size": "About 1.67:1, 1600 x 960 per card"
      }
    ]
  },
  {
    "id": "G1-22",
    "name": "Text + image: curtains",
    "module": "M17",
    "vnModules": [
      "M17"
    ],
    "optional": true,
    "weight": "Light",
    "note": null,
    "reference": {
      "path": "reference/g1-22-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M17",
      "asset": "Text + image: curtains",
      "size": "Wide 2.2:1, 1920 x 870 or 16:9",
      "imageText": "No",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": null
    },
    "fields": [
      {
        "name": "Title",
        "kind": "TYPED",
        "location": "Top centre",
        "limit": "Max 45"
      },
      {
        "name": "Body",
        "kind": "TYPED",
        "location": "Under title",
        "limit": "Max 250"
      },
      {
        "name": "Icon stat labels (0 to 3)",
        "kind": "TYPED",
        "location": "Under body",
        "limit": "Max 25 each"
      }
    ],
    "moduleDetails": [
      {
        "name": "Title + text + image",
        "layout": "Centred title and text, optional icon stats, image or video below",
        "fields": "Title, body, icon labels",
        "imageText": "No",
        "size": "Wide 2.2:1, 1920 x 870 or 16:9"
      }
    ]
  },
  {
    "id": "G1-23",
    "name": "Feature cards: connected clean",
    "module": "M21",
    "vnModules": [
      "M21"
    ],
    "optional": true,
    "weight": "Light",
    "note": "App, voice, watch.",
    "reference": {
      "path": "reference/g1-23-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M21",
      "asset": "Feature cards: connected clean",
      "size": "About 1.45:1, 1200 x 820 per row",
      "imageText": "Graphic number only",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": "App, voice, watch."
    },
    "fields": [
      {
        "name": "Row title + text (each)",
        "kind": "TYPED",
        "location": "Beside image",
        "limit": "Title 30, text 200"
      }
    ],
    "moduleDetails": [
      {
        "name": "Image + text rows",
        "layout": "Image and text side by side, rows alternate",
        "fields": "Title, body per row, optional stats",
        "imageText": "Graphic number only",
        "size": "About 1.45:1, 1200 x 820 per row"
      }
    ]
  },
  {
    "id": "G1-24",
    "name": "What is in the box",
    "module": "M24",
    "vnModules": [
      "M24"
    ],
    "optional": false,
    "weight": "Light",
    "note": null,
    "reference": {
      "path": "reference/g1-24-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M24",
      "asset": "What is in the box",
      "size": "1:1 hero 1000 + items 600 x 600",
      "imageText": "No",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": null
    },
    "fields": [
      {
        "name": "Section title",
        "kind": "TYPED",
        "location": "Top",
        "limit": "Max 25"
      },
      {
        "name": "Item name + quantity (each)",
        "kind": "TYPED",
        "location": "Under item",
        "limit": "Name 45"
      }
    ],
    "moduleDetails": [
      {
        "name": "What is in the box",
        "layout": "Hero image + grid of items with name and quantity",
        "fields": "Item name + quantity ()",
        "imageText": "No",
        "size": "1:1 hero 1000 + items 600 x 600"
      }
    ]
  },
  {
    "id": "G1-25",
    "name": "Specs + drawing + comparison table + remarks",
    "module": "M25",
    "vnModules": [
      "M25",
      "M26",
      "M28"
    ],
    "optional": false,
    "weight": "Light",
    "note": "Custom on US. Use common_spec, common disclaimers; comparison table needs a decision (tab 7).",
    "reference": {
      "path": "reference/g1-25-us.webp",
      "width": 941,
      "height": 710,
      "kind": "us"
    },
    "clean": null,
    "media": {
      "module": "M25",
      "asset": "Specs + drawing + comparison table + remarks",
      "size": "Drawing 2:1, 2712 x 1348",
      "imageText": "YES: dimension drawing in mm",
      "clearSpace": "-",
      "source": "KV / TVC cut",
      "note": "Custom on US. Use common_spec, common disclaimers; comparison table needs a decision (tab 7)."
    },
    "fields": [
      {
        "name": "Spec rows",
        "kind": "TYPED",
        "location": "Table",
        "limit": "Label 35, value 80"
      },
      {
        "name": "Dimension drawing labels (mm)",
        "kind": "IN IMAGE",
        "location": "Drawing",
        "limit": "mm only"
      }
    ],
    "moduleDetails": [
      {
        "name": "Specifications",
        "layout": "Spec table, optional dimension drawing",
        "fields": "Spec rows (, from spec sheet)",
        "imageText": "YES: dimension drawing in mm",
        "size": "Drawing 2:1, 2712 x 1348"
      },
      {
        "name": "Comparison table",
        "layout": "This model vs previous models, ticks and values",
        "fields": "Row labels, values",
        "imageText": null,
        "size": "Product cutouts 1:1"
      },
      {
        "name": "Disclaimers",
        "layout": "Footnote for every * claim on the page",
        "fields": "Footnotes ()",
        "imageText": "No",
        "size": "-"
      }
    ]
  },
  {
    "id": "G1-26",
    "name": "FAQ",
    "module": "M27",
    "vnModules": [
      "M27"
    ],
    "optional": false,
    "weight": "Light",
    "note": null,
    "reference": {
      "path": "reference/g1-26-us.webp",
      "width": 941,
      "height": 369,
      "kind": "us"
    },
    "clean": null,
    "media": null,
    "fields": [
      {
        "name": "Q and A (5 to 8)",
        "kind": "TYPED",
        "location": "Accordion",
        "limit": "Q 90, A 400"
      }
    ],
    "moduleDetails": [
      {
        "name": "FAQ",
        "layout": "Questions and answers (accordion)",
        "fields": "Q and A ()",
        "imageText": "No",
        "size": "-"
      }
    ]
  },
  {
    "id": "G1-27",
    "name": "Customer reviews",
    "module": "M29",
    "vnModules": [
      "M29"
    ],
    "optional": false,
    "weight": "Light",
    "note": null,
    "reference": null,
    "clean": null,
    "media": null,
    "fields": [
      {
        "name": "Reviews",
        "kind": "SYSTEM",
        "location": "Review app",
        "limit": "-"
      }
    ],
    "moduleDetails": [
      {
        "name": "Customer reviews",
        "layout": "Review app",
        "fields": "-",
        "imageText": "No",
        "size": "-"
      }
    ]
  }
];
