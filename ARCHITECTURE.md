# Modular Architecture Documentation

## Overview

The codebase has been refactored into a modular, maintainable structure while preserving all functionality. The single-page application architecture is now organized with clear separation of concerns.

## Directory Structure

```
src/app/
├── page.tsx                          # Main page (clean orchestration)
├── config/
│   └── sections.ts                   # Section configuration
├── hooks/
│   └── useScrollSectionDetection.ts  # Scroll detection logic
├── components/
│   ├── FixedBackground.tsx           # Background component
│   ├── ScrollableSections.tsx        # Sections renderer
│   ├── ActiveSectionContext.tsx      # State management
│   └── navbar.tsx                    # Navigation
└── pages/
    └── LandingPage.tsx               # Landing page with intro
```

## Components

### 1. **page.tsx** (Main Orchestrator)

- **Purpose**: Clean entry point that composes all sections
- **Lines of code**: ~30 (down from ~120)
- **Responsibilities**:
  - Setup scroll detection
  - Render layout structure
  - Compose child components

### 2. **config/sections.ts** (Configuration)

- **Purpose**: Single source of truth for all page sections
- **Exports**:
  - `SECTION_COMPONENTS`: Array of section configs
  - `SECTION_IDS`: List of section IDs
  - `SectionId`: TypeScript type
- **Benefits**: Easy to add/remove/reorder sections

### 3. **useScrollSectionDetection** (Custom Hook)

- **Purpose**: Encapsulates scroll detection logic
- **Location**: `src/app/hooks/useScrollSectionDetection.ts`
- **Parameters**:
  - `sectionIds`: Array of section IDs to track
  - `setActiveSection`: Callback to update active section
  - `homeThreshold`: Viewport % for home detection (default: 0.8)
  - `scrollDebounce`: Debounce delay in ms (default: 150)
- **Returns**: `sectionRefs` object for ref assignment
- **Features**:
  - Automatic home page detection
  - Debounced scroll handling
  - Efficient viewport calculations

### 4. **FixedBackground** (UI Component)

- **Purpose**: Reusable fixed background component
- **Location**: `src/app/components/FixedBackground.tsx`
- **Props**:
  - `imageUrl`: Path to background image
  - `alt`: Accessibility description
- **Features**: Proper semantic HTML with ARIA labels

### 5. **ScrollableSections** (Renderer Component)

- **Purpose**: Renders list of page sections with refs
- **Location**: `src/app/components/ScrollableSections.tsx`
- **Props**:
  - `sections`: Array of section configurations
  - `sectionRefs`: Ref object for scroll tracking
  - `scrollMarginTop`: CSS scroll margin (default: "120px")
- **Features**:
  - Automatic ref assignment
  - Proper key management
  - Configurable scroll margins

## Benefits of Modular Structure

### ✅ **Maintainability**

- Each component has a single, well-defined responsibility
- Easy to locate and modify specific functionality
- Clear separation between logic, configuration, and UI

### ✅ **Reusability**

- `useScrollSectionDetection` can be used in other scroll-based features
- `FixedBackground` can be reused for different pages
- `ScrollableSections` works with any section configuration

### ✅ **Testability**

- Isolated components are easier to unit test
- Hook can be tested independently
- Configuration can be mocked for testing

### ✅ **Scalability**

- Adding new sections: Just update `config/sections.ts`
- Changing scroll behavior: Modify the hook parameters
- Adjusting layout: Edit individual components

### ✅ **Type Safety**

- Proper TypeScript types throughout
- Type inference from configuration
- Compile-time safety for section IDs

## Usage Examples

### Adding a New Section

```typescript
// config/sections.ts
import NewSectionPage from "../NewSection/page";

export const SECTION_COMPONENTS = [
  // ... existing sections
  { id: "newsection", Component: NewSectionPage },
] as const;
```

### Customizing Scroll Detection

```typescript
// page.tsx
const sectionRefs = useScrollSectionDetection({
  sectionIds: SECTION_IDS,
  setActiveSection,
  homeThreshold: 0.5, // Detect home at 50% viewport
  scrollDebounce: 200, // Longer debounce for slower detection
});
```

### Using Different Background

```typescript
<FixedBackground
  imageUrl="/custom-background.jpg"
  alt="Custom event background"
/>
```

## Migration Notes

### What Changed

- Scroll detection logic moved from `page.tsx` to custom hook
- Background div extracted to `FixedBackground` component
- Section rendering logic moved to `ScrollableSections`
- Section configuration centralized in `config/sections.ts`

### What Stayed the Same

- All functionality is preserved
- Scroll behavior identical
- Active section detection works the same
- Navigation integration unchanged
- No changes to individual page components

## Future Enhancements

### Potential Improvements

1. **Lazy Loading**: Sections could be lazy-loaded for better performance
2. **Animation Variants**: Add enter/exit animations to sections
3. **Section Transitions**: Custom transition effects between sections
4. **Scroll Progress**: Add scroll progress indicator
5. **Deep Linking**: Support for hash-based routing (#section)

### Easy to Implement

- All modular pieces are in place
- Configuration-driven approach simplifies changes
- Clear extension points in each component
