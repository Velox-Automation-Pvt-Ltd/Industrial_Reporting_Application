# Siemens IX Integration - Implementation Guide

## What's Been Updated

Based on the official Siemens IX documentation at https://ix.siemens.io/, the AerialView Modern frontend has been updated to use the **official Siemens IX theming approach**.

## Key Changes

### 1. Theme Implementation (Data Attributes)

**Before (Deprecated):**
```html
<html class="theme-classic-dark">
```

**After (Official Approach):**
```html
<html data-ix-theme="classic" data-ix-color-schema="dark">
```

According to the [official Siemens IX theming documentation](https://ix.siemens.io/docs/home/theming/usage-developers), the data attribute approach is the recommended method. The CSS class approach will be removed in Siemens IX 4.0.

### 2. Updated Files

#### `Frontend/src/store/themeStore.ts`
- Now uses `setAttribute()` for data attributes
- Sets `data-ix-theme="classic"` and `data-ix-color-schema` on HTML element

#### `Frontend/src/main.tsx`
- Initializes theme using data attributes
- Properly initializes Siemens IX web components with `applyPolyfills()` and `defineCustomElements()`

#### `Frontend/src/index.css`
- Updated theme selectors to use `html[data-ix-color-schema="dark"]` instead of classes
- Imports official Siemens IX CSS: `@import '@siemens/ix/dist/siemens-ix/siemens-ix.css'`

#### `Frontend/package.json`
- Added Siemens IX packages:
  - `@siemens/ix` - Core components
  - `@siemens/ix-react` - React wrapper components
  - `@siemens/ix-icons` - Industrial icon library

### 3. New Features

#### Theme Toggle Component
Located at: `Frontend/src/components/ThemeToggle.tsx`
- Uses moon/sun icon to switch themes
- Integrated into the navigation bar
- Saves preference to localStorage

#### Example Component
Located at: `Frontend/src/components/SiemensIxExample.tsx`
- Demonstrates proper use of Siemens IX CSS variables
- Shows status colors, buttons, and theme-aware styling
- Includes commented examples for native IX components

#### Comprehensive Documentation
Located at: `Frontend/THEME.md`
- Complete guide to Siemens IX theming
- All available CSS variables documented
- Component library reference
- Icon system documentation
- Best practices and troubleshooting

## Siemens IX Features Available

### 1. CSS Variables (Theme Colors)

All Siemens IX color tokens are available:

```css
/* Background Colors */
--theme-color-std-bkg          /* Standard background */
--theme-color-component-1      /* Card/panel background */
--theme-color-component-2      /* Secondary component background */

/* Text Colors */
--theme-color-std-text         /* Standard text */
--theme-color-soft-text        /* Muted text */
--theme-color-inv-contrast-text /* Inverted text (for buttons) */

/* Status Colors */
--theme-color-primary          /* Primary action color */
--theme-color-success          /* Success state */
--theme-color-warning          /* Warning state */
--theme-color-alarm            /* Error/alarm state */

/* Border Colors */
--theme-color-soft-bdr         /* Soft border */
--theme-color-std-bdr          /* Standard border */
--theme-color-weak-bdr         /* Weak border */
```

### 2. Component Library

Siemens IX provides 50+ industrial-grade components:

**Navigation & Layout:**
- IxApplicationHeader, IxMenu, IxMenuItem, IxPane

**Forms & Inputs:**
- IxButton, IxInput, IxSelect, IxDatepicker, IxCheckbox, IxToggle

**Data Display:**
- IxCard, IxTable, IxPill, IxBadge, IxChip

**Feedback:**
- IxToast, IxModal, IxMessageBar, IxSpinner

See: https://ix.siemens.io/docs/components/overview

### 3. Icon Library

500+ industrial icons available via `@siemens/ix-icons`

```tsx
import { home, settings, user } from '@siemens/ix-icons/icons';
import { IxIcon } from '@siemens/ix-react';

<IxIcon name={home} size="24" />
```

See: https://ix.siemens.io/docs/icons/overview

## Usage Examples

### Basic Theme-Aware Component

```tsx
export function MyComponent() {
  return (
    <div 
      className="p-4 rounded"
      style={{ 
        backgroundColor: 'var(--theme-color-component-1)',
        color: 'var(--theme-color-std-text)',
        border: '1px solid var(--theme-color-soft-bdr)'
      }}
    >
      <h2 style={{ color: 'var(--theme-color-primary)' }}>
        Title
      </h2>
      <p style={{ color: 'var(--theme-color-soft-text)' }}>
        Description text
      </p>
    </div>
  );
}
```

### Using Native Siemens IX Components

```tsx
import { IxButton, IxCard } from '@siemens/ix-react';

export function MyComponent() {
  return (
    <IxCard>
      <h3>Card Title</h3>
      <IxButton variant="primary">Primary Action</IxButton>
      <IxButton variant="secondary">Secondary Action</IxButton>
    </IxCard>
  );
}
```

### Accessing Theme State

```tsx
import { useThemeStore } from '../store/themeStore';

export function MyComponent() {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
    </div>
  );
}
```

## Testing the Theme

1. **Start the development server:**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

2. **Test theme switching:**
   - Click the moon/sun icon in the navigation bar
   - Theme should switch smoothly between light and dark
   - Preference should persist after page reload

3. **Verify in DevTools:**
   - Inspect the `<html>` element
   - Should see: `data-ix-theme="classic"` and `data-ix-color-schema="light"` or `"dark"`
   - CSS variables should update when theme changes

## Browser Compatibility

Siemens IX supports:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

CSS custom properties and data attributes are widely supported.

## Benefits of This Implementation

✅ **Official Approach** - Follows Siemens IX documentation exactly  
✅ **Future-Proof** - Uses modern data attributes (CSS classes deprecated)  
✅ **Industrial Design** - Professional look for industrial applications  
✅ **Comprehensive** - 500+ icons, 50+ components available  
✅ **Accessible** - Built-in accessibility features  
✅ **Themeable** - Easy to customize colors and styles  
✅ **Performant** - CSS variables provide instant theme switching  

## Next Steps

1. **Explore Components**: Browse https://ix.siemens.io/docs/components/overview
2. **Try Examples**: Run the application and test the theme toggle
3. **Customize**: Modify CSS variables in `index.css` to match your brand
4. **Add Components**: Import and use Siemens IX components in your pages
5. **Read Docs**: See `Frontend/THEME.md` for complete documentation

## Support

- **Official Docs**: https://ix.siemens.io/
- **GitHub**: https://github.com/siemens/ix
- **Community**: https://community.siemens.com/c/ix
- **Theme Guide**: See `Frontend/THEME.md` in the project

---

**Implementation Date**: February 2026  
**Siemens IX Version**: 2.5.0+  
**Approach**: Official data-attribute based theming
