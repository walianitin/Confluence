# Using local (offline) fonts with this project

This project already uses `next/font` for some Google fonts (see
`src/app/theme/fonts.ts`). If you want to test or use local/offline fonts
(e.g., `.woff2` files), this guide shows a convenient workflow.

1. Place font files

- Put your font files in `public/fonts/`.
- Prefer `woff2` for web performance. Example file names:
  - `LocalSans1-Regular.woff2`
  - `LocalSans1-Bold.woff2`

2. Add `@font-face` entries

Open `src/app/globals.css` and find the commented "Local font example" block.
Uncomment it and update names/paths to match your files. Example:

```css
@font-face {
  font-family: "LocalSans1";
  src: url("/fonts/LocalSans1-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "LocalSans1";
  src: url("/fonts/LocalSans1-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: bold;
  font-display: swap;
}

:root {
  --font-local-sans-1:
    "LocalSans1", system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans";
}
```

3. Apply the local font

There are two ways to apply the local font site-wide:

- Quick manual way: In the same `:root` block set `--font-sans` to the
  variable you defined or to the family directly:

```css
:root {
  --font-sans: var(--font-local-sans-1);
}
```

or

```css
:root {
  --font-sans: "LocalSans1", system-ui, -apple-system, "Segoe UI", Roboto;
}
```

- Interactive preview (recommended while testing): import and render the
  `FontPreviewer` component anywhere (for example in `src/app/page.tsx`) to
  temporarily apply a local font at runtime. The previewer stores your
  choice in `localStorage` and updates `--font-sans` immediately.

4. (Optional) Add more local fonts to the project config

If you like, you can add entries to `src/app/theme/localFonts.ts` to keep a
record of fonts and their file names; `FontPreviewer` reads that file to show
buttons for available local fonts.

5. Format/weight pairing

If you want weight switching to work, make sure you register multiple
`@font-face` blocks with the same `font-family` but different `font-weight`.
The browser will pick the appropriate face for `font-weight: 700` etc.

6. Best practices

- Use `font-display: swap` for better perceived performance.
- Prefer `woff2` for modern browsers. Provide `woff` or `ttf` only if you need
  broader legacy support.
- Keep font file sizes small; subset fonts if possible.

7. Reverting

To undo a local font override, remove the `@font-face`/`:root` changes and
clear local storage (`localStorage.removeItem('confluence:local-font')`) or
use the Reset button in `FontPreviewer`.

If you'd like, I can also:

- Add an admin-only font switch UI into the site header that toggles Google vs
  local fonts and persists the choice across sessions.
- Wire `FontProvider` to support local fonts in the same selection UI so the
  rest of your app sees a single source of truth.

Tell me which of these you'd like next and I will implement it.
