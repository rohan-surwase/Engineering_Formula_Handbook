/**
 * FORMULA MANIFEST
 * -----------------
 * This is the single "auto-discovery" list the handbook reads on startup.
 * index.html never lists category files itself — it loads this manifest,
 * then dynamically injects a <script> tag for every id listed below.
 *
 * TO ADD A NEW CATEGORY:
 *   1. Create formulas/your-category.js (copy an existing file as a template).
 *   2. Add "your-category" to the array below (must match the CATEGORY_ID
 *      used inside that file, and the filename without ".js").
 *   3. Save. Refresh the page. Done — no other file needs to change.
 *
 * TO ADD FORMULAS TO AN EXISTING CATEGORY:
 *   Just edit that category's file and push a new object into its
 *   `formulas` array. Nothing here needs to change.
 *
 * Order in this array = order categories appear in the sidebar.
 */
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
  "control-systems"
];
