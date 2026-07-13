# Engineering Formula Handbook

A fast, searchable, offline-friendly reference of engineering formulas — built as a single static site with **zero build step**. Open `index.html` in a browser (or host it on GitHub Pages) and it works.

The entire visual design follows a **blueprint / engineering-drawing** theme: graph-paper background, drafting corner marks on every formula card, and a title-block strip (the little metadata bar under the header) that mimics the title block found on real engineering drawings.

![status](https://img.shields.io/badge/formulas-growing_daily-4FC3F7) ![type](https://img.shields.io/badge/stack-HTML%2FCSS%2FJS-0A1929)

---

## Table of contents

1. [How the project is structured](#how-the-project-is-structured)
2. [How auto-discovery works](#how-auto-discovery-works)
3. [Quick start](#quick-start)
4. [Adding a new formula (existing category)](#adding-a-new-formula-existing-category)
5. [Adding a brand-new category](#adding-a-brand-new-category)
6. [The formula object — every field explained](#the-formula-object--every-field-explained)
7. [Writing good equations, units, and keywords](#writing-good-equations-units-and-keywords)
8. [The FormulaManager class](#the-formulamanager-class)
9. [Favicon](#favicon)
10. [Deploying to GitHub Pages](#deploying-to-github-pages)
11. [30-day formula rollout plan](#30-day-formula-rollout-plan)
12. [Troubleshooting](#troubleshooting)
13. [Roadmap ideas](#roadmap-ideas)

---

## How the project is structured

```
engineering-formula-handbook/
│
├── index.html                     ← the entire app shell, styles, and engine (no build step)
├── site.webmanifest               ← lets the icon set act as a home-screen icon
├── favicon.ico                    ← multi-resolution favicon (16/32/48 px)
│
├── assets/
│   └── icons/
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── favicon-48x48.png
│       ├── apple-touch-icon.png       (180×180, iOS home screen)
│       ├── android-chrome-192x192.png
│       └── android-chrome-512x512.png
│
└── formulas/
    ├── manifest.js                ← THE list of categories to load (edit this to add a category)
    ├── electrical.js              ← 10 formulas, ships as the working example
    ├── electronics.js             ← create when ready (see below)
    ├── mechanical.js              ← create when ready
    ├── civil.js                   ← create when ready
    ├── mathematics.js             ← create when ready
    ├── physics.js                 ← create when ready
    ├── thermodynamics.js          ← create when ready
    ├── fluid-mechanics.js         ← create when ready
    ├── materials.js                ← create when ready
    └── control-systems.js         ← create when ready
```

**Nothing about formulas lives inside `index.html`.** It contains only the UI shell and the `FormulaManager` engine. Every formula lives in a small, self-contained JavaScript file inside `formulas/`. This is what makes the handbook scale to hundreds or thousands of formulas without `index.html` ever growing.

---

## How auto-discovery works

This is a static site with no server and no build step, so "auto-discovery" here means: **you never touch `index.html` again.** The only two things you ever edit day-to-day are:

1. A category's own file (e.g. `formulas/mechanical.js`) — to add/edit formulas.
2. `formulas/manifest.js` — a one-line-per-category list — only when you introduce a **new** category that doesn't exist yet.

Here's the mechanism, step by step:

1. On load, `index.html` runs `formulas/manifest.js`, which sets `window.FORMULA_MANIFEST = ["electrical", "electronics", ...]`.
2. `index.html`'s app script reads that array and injects a `<script src="formulas/{id}.js">` tag for every id — dynamically, at runtime.
3. Each category file (e.g. `electrical.js`) doesn't touch the page directly. It just registers itself onto a shared global object:
   ```js
   window.FormulaHandbook.categories["electrical"] = {
     id: "electrical",
     name: "Electrical Engineering",
     icon: "⚡",
     formulas: [ /* ... */ ]
   };
   ```
4. Once every listed category script has loaded (or failed — missing files are skipped silently, they never break the page), `FormulaManager` reads `window.FormulaHandbook.categories`, flattens every category's formulas into one searchable list, and renders the sidebar + cards.

Because step 2 happens dynamically from a list (not from hardcoded `<script>` tags), **adding a category is a one-line change in one file** — never in `index.html`.

> **Why not true filesystem auto-discovery (no manifest at all)?**
> Static hosting (GitHub Pages, or just double-clicking `index.html`) has no way to ask "what files exist in this folder" — that requires a server or a build step. The manifest is the lightest possible substitute: one array, one line per category, no build tools, no `npm install`, works the same whether you open the file locally or host it online.

---

## Quick start

**Option A — just open it.**
Double-click `index.html`. Everything runs client-side. (Some browsers restrict `fetch`/dynamic `<script>` loading from `file://` URLs — if formulas don't appear, use Option B.)

**Option B — local server (recommended for development).**
```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```
or, with Node installed:
```bash
npx serve .
```

**Option C — GitHub Pages.** See [Deploying to GitHub Pages](#deploying-to-github-pages).

---

## Adding a new formula (existing category)

This is your **daily** workflow — the one you'll use for the 30-day plan below.

1. Open the relevant file, e.g. `formulas/mechanical.js`.
2. Copy an existing formula object inside the `formulas` array as a template.
3. Fill in every field (see [field reference](#the-formula-object--every-field-explained) below).
4. Give it a unique `id` **within that file** (kebab-case, e.g. `"beam-bending-stress"`).
5. Save the file. Refresh the page — the new card appears immediately, fully searchable, no other file touched.

Minimal example — adding one formula to `formulas/mechanical.js`:

```js
{
  id: "beam-bending-stress",
  name: "Bending Stress in a Beam",
  equation: "σ = M × c / I",
  variables: [
    { symbol: "σ", meaning: "Bending stress", unit: "Pa (pascals)" },
    { symbol: "M", meaning: "Bending moment at the section", unit: "N·m" },
    { symbol: "c", meaning: "Distance from neutral axis to outer fiber", unit: "m" },
    { symbol: "I", meaning: "Second moment of area (moment of inertia)", unit: "m⁴" }
  ],
  units: "Pa (pascals)",
  description: "Gives the maximum normal stress in a beam cross-section due to bending, based on the flexure formula.",
  applications: ["Beam and joist design", "Structural failure analysis", "Crane boom sizing"],
  notes: "Assumes linear-elastic material behavior and small deflections (Euler-Bernoulli beam theory).",
  keywords: ["flexure formula", "beam stress", "bending moment", "structural"]
}
```

That's the entire change. `index.html`, `manifest.js`, and every other category file stay untouched.

---

## Adding a brand-new category

Use this when you want a category that doesn't exist yet at all (all ten placeholder names already exist in the manifest — this section is for if you want an eleventh, e.g. `"aerospace"`).

1. **Create the file** — `formulas/aerospace.js`. Easiest way: copy `formulas/electrical.js` and rename it.
2. **Edit the three constants at the top of the new file:**
   ```js
   const CATEGORY_ID = "aerospace";        // must match the filename (no .js) and the manifest entry
   const CATEGORY_NAME = "Aerospace Engineering";
   const CATEGORY_ICON = "🚀";             // any emoji or short glyph, shown in the sidebar
   ```
3. **Replace the sample `formulas` array** with your own formula objects.
4. **Add one line to `formulas/manifest.js`:**
   ```js
   window.FORMULA_MANIFEST = [
     "electrical",
     "electronics",
     "mechanical",
     "civil",
     "mathematics",
     "physics",
     "thermodynamics",
     "fluid-mechanics",
     "materials",
     "control-systems",
     "aerospace"          // ← new line
   ];
   ```
5. Save both files, refresh — the new category shows up in the sidebar with its own icon, formula count, and search coverage. `index.html` was never opened.

---

## The formula object — every field explained

| Field          | Type              | Required | Notes |
|----------------|-------------------|----------|-------|
| `id`           | string            | ✅ | Unique **within its file**. Kebab-case. Used to build the global id `category::id`. |
| `name`         | string            | ✅ | Display name shown as the card title. |
| `equation`     | string            | ✅ | Plain text, not LaTeX. Use `×`, `÷`, `√`, `π`, superscript-style `²`/`³`, or spelled-out `^2` — whatever reads clearly in a monospace font. |
| `variables`    | array of `{symbol, meaning, unit}` | ✅ | One row per symbol used in the equation. `unit` can be `""` for dimensionless quantities. |
| `units`        | string            | ✅ | The unit of the **result** of the equation (shown in the card's "Result units" line). |
| `description`  | string            | ✅ | 1–3 plain-English sentences. This is searched too. |
| `applications` | array of strings  | Recommended | Real-world use cases, shown as chips on the card. |
| `notes`        | string            | Recommended | Caveats, assumptions, or "engineer's notes" — shown in the amber dashed callout. Leave `""` to omit the callout entirely. |
| `keywords`     | array of strings  | Recommended | Extra search terms not already covered by name/equation/variables (synonyms, alternate names, standards references, etc.). Not shown on the card, used only by search. |

The category wrapper each file registers also carries:

| Field  | Type   | Notes |
|--------|--------|-------|
| `id`   | string | Must exactly match the filename (without `.js`) and the manifest entry. |
| `name` | string | Full category name shown in the sidebar and card headers. |
| `icon` | string | A short emoji/glyph shown next to the category name. |

---

## Writing good equations, units, and keywords

- **Equations:** keep them copy-pasteable plain text. `V = I × R` is better than trying to fake fractions or square-root radicals with special layouts — the equation box uses a monospace font specifically so plain text reads clearly.
- **Units:** always include the unit *name*, not just the symbol — `"Pa (pascals)"` not just `"Pa"`. This makes the card understandable without external context and helps search (someone might search "pascals").
- **Keywords:** think about what someone would type who does **not** know the formula's formal name. For example `capacitor-energy` includes `"supercapacitor"` even though that word never appears in the name or description.
- **Notes:** this is the one field engineers actually remember cards by — use it for the assumption that trips people up (e.g. "only valid for laminar flow", "assumes ideal gas behavior").

---

## The `FormulaManager` class

Everything interactive is owned by one class, defined inline near the bottom of `index.html`. You should not need to touch it to add formulas, but here's what it does, in case you extend the UI later:

| Responsibility | Methods |
|---|---|
| Loading categories | `loadFormulas()` — reads `window.FormulaHandbook.categories`, flattens into `this.formulas` |
| Rendering cards | `render()`, `cardHTML()`, `emptyStateHTML()` |
| Search | `matchesSearch()` — checks name, equation, category, keywords, and every variable's symbol/meaning/unit |
| Filtering | `getFiltered()` — combines active category/view + search term |
| Bookmarks | `toggleFavorite()`, persisted to `localStorage` under `efh_favorites` |
| Recently viewed | `trackRecent()`, persisted under `efh_recent`, capped at 20 entries |
| Theme | `applyTheme()`, persisted under `efh_theme`, defaults to the OS `prefers-color-scheme` |
| Statistics | `renderStats()` — powers the title-block strip (sheet count, categories loaded, total formulas, date) |
| Copy / Print | `copyFormula()` (clipboard, with an execCommand fallback), `printFormula()` / `printCurrentView()` (print-only layout via `#print-area`) |

The category loading order (`this.categoryOrder`) is read directly from `window.FORMULA_MANIFEST`, so the manifest is the **single source of truth** for both *which* categories exist and *what order* they appear in the sidebar.

---

## Favicon

The favicon set lives in `assets/icons/` plus `favicon.ico` at the repo root, already wired into `index.html`'s `<head>` and `site.webmanifest`. It reuses the handbook's own palette (navy `#0A1929`, cyan `#4FC3F7`, amber `#F2A93B`) with a Σ mark and the same drafting corner-tick motif used on formula cards, so the browser tab matches the page.

If you want to redesign it later, regenerate all sizes from one master image so everything stays consistent — you need at minimum:

| File | Size | Used for |
|---|---|---|
| `favicon.ico` | 16/32/48 px (multi-res) | Legacy browser tab icon |
| `assets/icons/favicon-16x16.png` | 16×16 | Browser tab |
| `assets/icons/favicon-32x32.png` | 32×32 | Browser tab (retina) |
| `assets/icons/favicon-48x48.png` | 48×48 | Windows taskbar |
| `assets/icons/apple-touch-icon.png` | 180×180 | iOS "Add to Home Screen" |
| `assets/icons/android-chrome-192x192.png` | 192×192 | Android home screen |
| `assets/icons/android-chrome-512x512.png` | 512×512 | Android splash / PWA |

---

## Deploying to GitHub Pages

1. Push this folder as the root of a new GitHub repository (`index.html` must sit at the repo root, or in `/docs` if you configure Pages that way).
2. In the repo: **Settings → Pages → Source → Deploy from a branch**, pick `main` and `/ (root)`.
3. Save. GitHub gives you a URL like `https://<username>.github.io/<repo-name>/` within a minute or two.
4. Because everything is static files with relative paths (`formulas/...`, `assets/...`), it works identically locally and on Pages — no environment variables, no build step.

---

## 30-day formula rollout plan

See **`30-day-formula-plan.csv`** (included in this repo) for a ready-to-paste plan — open it directly in Excel/Google Sheets, or copy-paste the table below into a spreadsheet column by column.

The plan gives you **one category focus per day** with a target formula count, so the handbook grows steadily and every category gets attention across the month. Suggested daily habit: pick the day's category, add that many formulas to its file, commit, push.

| Day | Date (example, adjust to your start) | Category file | Category name | Target formulas to add | Cumulative formulas |
|---|---|---|---|---|---|
| 1 | Day 1 | electrical.js | Electrical Engineering | 0 (already shipped: 10) | 10 |
| 2 | Day 2 | electronics.js | Electronics | 5 | 15 |
| 3 | Day 3 | electronics.js | Electronics | 5 | 20 |
| 4 | Day 4 | mechanical.js | Mechanical Engineering | 5 | 25 |
| 5 | Day 5 | mechanical.js | Mechanical Engineering | 5 | 30 |
| 6 | Day 6 | civil.js | Civil Engineering | 5 | 35 |
| 7 | Day 7 | civil.js | Civil Engineering | 5 | 40 |
| 8 | Day 8 | mathematics.js | Mathematics | 5 | 45 |
| 9 | Day 9 | mathematics.js | Mathematics | 5 | 50 |
| 10 | Day 10 | physics.js | Physics | 5 | 55 |
| 11 | Day 11 | physics.js | Physics | 5 | 60 |
| 12 | Day 12 | thermodynamics.js | Thermodynamics | 5 | 65 |
| 13 | Day 13 | thermodynamics.js | Thermodynamics | 5 | 70 |
| 14 | Day 14 | fluid-mechanics.js | Fluid Mechanics | 5 | 75 |
| 15 | Day 15 | fluid-mechanics.js | Fluid Mechanics | 5 | 80 |
| 16 | Day 16 | materials.js | Materials Science | 5 | 85 |
| 17 | Day 17 | materials.js | Materials Science | 5 | 90 |
| 18 | Day 18 | control-systems.js | Control Systems | 5 | 95 |
| 19 | Day 19 | control-systems.js | Control Systems | 5 | 100 |
| 20 | Day 20 | electrical.js | Electrical Engineering | 5 | 105 |
| 21 | Day 21 | electronics.js | Electronics | 5 | 110 |
| 22 | Day 22 | mechanical.js | Mechanical Engineering | 5 | 115 |
| 23 | Day 23 | civil.js | Civil Engineering | 5 | 120 |
| 24 | Day 24 | mathematics.js | Mathematics | 5 | 125 |
| 25 | Day 25 | physics.js | Physics | 5 | 130 |
| 26 | Day 26 | thermodynamics.js | Thermodynamics | 5 | 135 |
| 27 | Day 27 | fluid-mechanics.js | Fluid Mechanics | 5 | 140 |
| 28 | Day 28 | materials.js | Materials Science | 5 | 145 |
| 29 | Day 29 | control-systems.js | Control Systems | 5 | 150 |
| 30 | Day 30 | *(your choice)* | Fill any category below your target | 5+ | 155+ |

Feel free to reorder by whichever category you personally need most — the important habit is "one file, five formulas, every day."

---

## Troubleshooting

- **A category doesn't show up in the sidebar.** Check that: the id in `formulas/manifest.js` exactly matches both the filename (no `.js`) and the `CATEGORY_ID` constant inside that file. Open the browser console — a failed load logs `Could not load "formulas/xyz.js"`.
- **Formulas don't appear when opening `index.html` directly (double-click).** Some browsers block dynamic script loading from `file://` paths. Run a local server instead (see [Quick start](#quick-start), Option B).
- **Search doesn't find a formula I know exists.** Search checks `name`, `equation`, `variables` (symbol/meaning/unit), `keywords`, and category name — it does not search `description` or `applications`. Add the missing term to `keywords`.
- **A new formula shows a blank "Result units" line.** The `units` field is required — make sure it's a non-empty string.
- **Favorites/recently-viewed disappeared.** They're stored in `localStorage` under `efh_favorites` / `efh_recent`, scoped to the exact origin/path you load the page from. Opening the file from a different path or in a different browser/profile starts fresh.

---

## Roadmap ideas

- Export the currently filtered set as a printable PDF booklet (extends the existing print system).
- A small Node script that validates every category file's schema before commit (pre-commit hook).
- Per-formula "worked example" field with sample numbers plugged in.
- LaTeX rendering toggle (e.g. via KaTeX) for equations, alongside the current plain-text mode.
