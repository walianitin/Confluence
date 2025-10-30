# Spacing Analysis - Hardcoded Padding & Margin Audit

## Component Rendering Workflow

```
page.tsx
  → ScrollableSections.tsx (wraps in <section>)
    → Each Page Component (Gallery, Events, Teams, Developers, Sponsors)
      → Card Components
```

---

## 🔴 MAIN ISSUES FOUND

### 1. **Double Padding from Two Sources**

**Problem:** Your CSS global styles AND inline component classes are BOTH adding padding:

- **globals.css** adds: `section { padding-top/bottom }`
- **Component classes** ALSO add: `py-16 sm:py-20 lg:py-24`

**Result:** You're getting 2x the intended padding!

---

## 📍 Detailed Breakdown by File

### **ScrollableSections.tsx** (Line 30-37)

```tsx
<section
  id={id}
  ref={(node) => { sectionRefs.current[id] = node; }}
  className="relative"
  style={{ scrollMarginTop }}
>
```

✅ **GOOD:** No hardcoded spacing here

- Your CSS variables will apply automatically via `section` tag

---

### **Gallery/page.tsx** (Line 108)

```tsx
className =
  "flex min-h-screen w-full max-w-[100vw] items-center justify-center overflow-x-hidden py-16 sm:py-20 lg:py-24";
```

🔴 **ISSUE 1:** `py-16 sm:py-20 lg:py-24` (padding-y: 4rem, 5rem, 6rem)

- This is ON TOP OF the CSS `section { padding-top/bottom }` rules

**Line 113:**

```tsx
className =
  "mb-8 text-center text-3xl font-bold tracking-tight text-white sm:mb-12 sm:text-5xl lg:text-6xl";
```

🔴 **ISSUE 2:** `mb-8 sm:mb-12` (margin-bottom: 2rem, 3rem)

- This heading margin is separate from your CSS variable `--section-heading-to-content`

**Line 134:**

```tsx
className = "mt-8";
```

🔴 **ISSUE 3:** Fixed top margin for pagination

---

### **Events/page.tsx** (Line 260)

```tsx
className =
  "relative min-h-screen max-w-[100vw] overflow-hidden py-16 text-white sm:py-20 lg:py-24";
```

🔴 **ISSUE 4:** `py-16 sm:py-20 lg:py-24` - Same double padding issue

**Line 264:**

```tsx
className =
  "mb-8 text-center text-3xl font-bold tracking-tight text-white sm:mb-12 sm:text-5xl lg:text-6xl";
```

🔴 **ISSUE 5:** `mb-8 sm:mb-12` - Heading spacing hardcoded

**Line 170 (EventCard component):**

```tsx
className =
  "absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center border-t border-white/30 bg-black/20 px-5 text-center text-white backdrop-blur-lg";
```

🔴 **ISSUE 6:** `px-5` - Card internal padding

**Lines 177-178:**

```tsx
paddingTop: isExpanded ? "2rem" : "0.75rem",
paddingBottom: isExpanded ? "2rem" : "0.75rem",
```

🔴 **ISSUE 7:** Dynamic inline padding in EventCard overlay

---

### **Teams/page.tsx** (Line 112)

```tsx
className =
  "relative w-full max-w-[100vw] overflow-x-hidden py-12 sm:py-16 lg:py-20";
```

🔴 **ISSUE 8:** `py-12 sm:py-16 lg:py-20` - Different values than other sections!

**Line 117:**

```tsx
className =
  "mb-8 text-center text-3xl font-bold tracking-tight text-white sm:mb-12 sm:text-5xl lg:text-6xl";
```

🔴 **ISSUE 9:** `mb-8 sm:mb-12` - Heading spacing

**Line 152:**

```tsx
className = "mt-8";
```

🔴 **ISSUE 10:** Pagination margin

---

### **Developers/page.tsx** → **Teamcard.tsx** (Line 45)

```tsx
className =
  "relative max-w-[100vw] overflow-x-hidden py-16 text-gray-200 sm:py-20 lg:py-24";
```

🔴 **ISSUE 11:** `py-16 sm:py-20 lg:py-24`

**Line 50:**

```tsx
className =
  "mb-8 text-3xl font-bold tracking-tight sm:mb-12 sm:text-5xl lg:text-6xl";
```

🔴 **ISSUE 12:** `mb-8 sm:mb-12`

**Line 59:**

```tsx
className={`w-full max-w-xs mx-auto ${cardOuterRadiusClass} ${cardSurfaceClasses} ${cardGlassBackground} p-4 transition hover:border-sky-400/50 hover:bg-white/10 sm:p-6`}
```

🔴 **ISSUE 13:** `p-4 sm:p-6` - Card internal padding

---

### **Sponsors/page.tsx** (Line 60)

```tsx
main: "relative isolate max-w-[100vw] overflow-hidden py-16 text-white sm:py-20 lg:py-24";
```

🔴 **ISSUE 14:** `py-16 sm:py-20 lg:py-24`

**Lines 65-66:**

```tsx
"mt-3 text-3xl font-semibold leading-tight sm:mt-4 sm:text-4xl lg:text-5xl",
headerCopy: "mt-3 text-sm text-slate-300 sm:mt-4 sm:text-base",
```

🔴 **ISSUE 15:** `mt-3 sm:mt-4` - Multiple hardcoded margins

**Line 110:**

```tsx
<div className="px-4 py-4">
```

🔴 **ISSUE 16:** Card internal padding `px-4 py-4`

---

## 🎯 RECOMMENDATIONS

### **Option 1: Use ONLY CSS Variables (Recommended)**

**Remove ALL inline padding classes from these files:**

1. **Gallery/page.tsx** - Line 108: Remove `py-16 sm:py-20 lg:py-24`
2. **Events/page.tsx** - Line 260: Remove `py-16 sm:py-20 lg:py-24`
3. **Teams/page.tsx** - Line 112: Remove `py-12 sm:py-16 lg:py-20`
4. **Teamcard.tsx** - Line 45: Remove `py-16 sm:py-20 lg:py-24`
5. **Sponsors/page.tsx** - Line 60: Remove `py-16 sm:py-20 lg:py-24`

**Replace heading margins with CSS variable:**

Change all instances of:

```tsx
className = "mb-8 ... sm:mb-12 ...";
```

To:

```tsx
className = "section-heading ...";
```

This uses your CSS variable `--section-heading-to-content`.

---

### **Option 2: Use ONLY Tailwind Classes (Not Recommended)**

If you prefer inline styles over CSS variables:

1. **Remove** the auto-apply rules from `globals.css`:

   ```css
   /* DELETE THESE: */
   section {
     padding-top: var(--section-padding-y-mobile);
     padding-bottom: var(--section-padding-y-mobile);
     margin-bottom: var(--section-gap-mobile);
   }

   section > h1,
   section > h2 {
     margin-bottom: var(--section-heading-to-content-mobile);
   }
   ```

2. Keep the Tailwind classes in components
3. You'll lose centralized control over spacing

---

## 🛠️ QUICK FIXES

### **Make All Sections Consistent**

Currently, **Teams section** uses different values:

- Teams: `py-12 sm:py-16 lg:py-20`
- Others: `py-16 sm:py-20 lg:py-24`

**Decision:** Pick ONE approach:

- Keep CSS variables (remove all inline py-\*)
- OR standardize all inline classes to same values

---

### **Card Internal Padding**

These are component-specific and probably fine to keep:

```tsx
// EventCard overlay - Line 170
px-5

// Teamcard - Line 59
p-4 sm:p-6

// Sponsors card - Line 110
px-4 py-4
```

⚠️ **But consider:** Creating CSS variables for card padding too:

```css
--card-padding-mobile: 1rem;
--card-padding-desktop: 1.5rem;
```

---

## ✅ WHAT'S WORKING CORRECTLY

1. **ScrollableSections.tsx** - Clean wrapper, no spacing conflicts
2. **Card glassmorphism styles** - Properly abstracted in `cardTokens`
3. **Content container widths** - Using `contentContainerClass` token

---

## 📊 SUMMARY OF CONFLICTS

| Component  | Section Padding   | Heading Margin   | Pagination Margin    |
| ---------- | ----------------- | ---------------- | -------------------- |
| Gallery    | ✅ CSS + 🔴 py-16 | ✅ CSS + 🔴 mb-8 | 🔴 mt-8              |
| Events     | ✅ CSS + 🔴 py-16 | ✅ CSS + 🔴 mb-8 | Handled in component |
| Teams      | ✅ CSS + 🔴 py-12 | ✅ CSS + 🔴 mb-8 | 🔴 mt-8              |
| Developers | ✅ CSS + 🔴 py-16 | ✅ CSS + 🔴 mb-8 | N/A                  |
| Sponsors   | ✅ CSS + 🔴 py-16 | 🔴 mt-3/mt-4     | N/A                  |

**✅ = CSS Variable Applied**  
**🔴 = Hardcoded Tailwind Class (Creates Doubling)**

---

## 🎬 ACTION PLAN

**Choose Your Path:**

### Path A: CSS Variables Only (Best for consistency)

1. Remove all `py-*` classes from section containers
2. Replace all heading `mb-*` with `section-heading` class
3. Keep existing CSS variables in `globals.css`
4. Result: Single source of truth, easy to adjust globally

### Path B: Tailwind Only (More flexible per-component)

1. Delete auto-apply `section` rules from `globals.css`
2. Keep utility classes, but standardize values
3. Result: More verbose, harder to maintain consistency

**I recommend Path A** - you already set up the CSS variables, just need to remove the duplicate inline styles!
