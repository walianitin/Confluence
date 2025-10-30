# Font Customization Guide

## Quick Font Switching

To change fonts for different elements, edit `src/app/globals.css` at the top:

```css
:root {
  /* Change these font names to switch fonts */
  --font-navbar: "Gothvetica"; /* Navigation menu */
  --font-heading: "Roboto-Regular"; /* H1, H2, H3, etc. */
  --font-body: "AnekLatin-Regular"; /* Paragraphs, text */
  --font-button: "Gothvetica"; /* Buttons */
}
```

## Available Fonts

All fonts are loaded from `/public/fonts/`:

- **Gothvetica** - Modern geometric sans-serif
- **InterTight** - Condensed sans-serif
- **GoodTimes** - Bold display font
- **Roboto-Regular** - Clean, readable sans-serif
- **AnekLatin-Regular** - Friendly sans-serif
- **Inter-Regular** - Professional sans-serif
- **Dune-Rise** - Stylized display font

## How to Add New Fonts

1. Place your `.ttf` or `.otf` file in `/public/fonts/`
2. Add a `@font-face` declaration in `globals.css`:

```css
@font-face {
  font-family: "YourFontName";
  src: url("/fonts/YourFontFile.ttf") format("truetype");
  font-display: swap;
}
```

3. Update the font variable in `:root`:

```css
:root {
  --font-navbar: "YourFontName";
}
```

## Glassmorphism Scrollbar Customization

Customize the scrollbar appearance in `globals.css`:

```css
:root {
  /* Scrollbar width */
  --scrollbar-width: 12px;

  /* Track (background) colors - rgba format */
  --scrollbar-track-bg: rgba(255, 255, 255, 0.05);
  --scrollbar-track-border: rgba(255, 255, 255, 0.1);

  /* Thumb (draggable part) colors */
  --scrollbar-thumb-bg: rgba(255, 255, 255, 0.2);
  --scrollbar-thumb-hover-bg: rgba(255, 255, 255, 0.3);
  --scrollbar-thumb-border: rgba(255, 255, 255, 0.3);

  /* Blur effect intensity */
  --scrollbar-blur: 10px;
}
```

### Scrollbar Color Examples

**Subtle Light Glass:**

```css
--scrollbar-thumb-bg: rgba(255, 255, 255, 0.15);
--scrollbar-thumb-hover-bg: rgba(255, 255, 255, 0.25);
```

**Bold Colored Glass:**

```css
--scrollbar-thumb-bg: rgba(138, 0, 255, 0.3); /* Purple */
--scrollbar-thumb-hover-bg: rgba(138, 0, 255, 0.5);
```

**Dark Glass:**

```css
--scrollbar-thumb-bg: rgba(0, 0, 0, 0.3);
--scrollbar-thumb-hover-bg: rgba(0, 0, 0, 0.5);
```
