# Siemens IX Dark/Light Theme Integration

This document explains the Siemens IX design system integration with dark/light theme support in AerialView Modern.

## Overview

The frontend uses the **Siemens IX** design system, providing a professional industrial look with full dark/light theme support. The theme can be toggled using the moon/sun icon in the navigation bar.

**Reference**: [Official Siemens IX Documentation](https://ix.siemens.io/)

## Features

✅ **Dark & Light Modes** - Seamless switching between themes  
✅ **Persistent Theme** - Your theme preference is saved to localStorage  
✅ **Smooth Transitions** - Elegant color transitions when switching themes  
✅ **Siemens IX Components** - Industrial-grade UI components  
✅ **CSS Variables** - Dynamic theming using Siemens IX CSS variables  
✅ **Responsive Design** - Works perfectly on all screen sizes  
✅ **Official Implementation** - Uses Siemens IX data attributes (recommended approach)

## Theme Architecture

### Siemens IX Theming Approach

According to the [official Siemens IX documentation](https://ix.siemens.io/docs/home/theming/usage-developers), theming is controlled by setting data attributes on the `<html>` element:

```html
<html data-ix-theme="classic" data-ix-color-schema="dark">
```

- `data-ix-theme`: The theme variant (e.g., "classic")
- `data-ix-color-schema`: The color mode ("light" or "dark")

### Theme Store (Zustand)

Located at: `src/store/themeStore.ts`

The theme state is managed using Zustand with persistence:

```typescript
export type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
```

The store automatically sets the correct data attributes when the theme changes:

```typescript
document.documentElement.setAttribute('data-ix-theme', 'classic');
document.documentElement.setAttribute('data-ix-color-schema', theme);
```

### Theme Initialization

In `src/main.tsx`, the theme is initialized on app load:

```typescript
// Initialize Siemens IX web components
applyPolyfills().then(() => {
  defineCustomElements();
});

// Initialize Siemens IX theme using data attributes
const savedTheme = localStorage.getItem('theme-storage');
const theme = savedTheme ? JSON.parse(savedTheme).state.theme : 'light';

document.documentElement.setAttribute('data-ix-theme', 'classic');
document.documentElement.setAttribute('data-ix-color-schema', theme);
```

## Using Siemens IX Theme Colors

### Available CSS Variables

Siemens IX provides a comprehensive set of CSS variables for consistent theming:

#### Background Colors
- `var(--theme-color-std-bkg)` - Standard background
- `var(--theme-color-component-1)` - Component background (cards, panels)
- `var(--theme-color-component-2)` - Secondary component background
- `var(--theme-color-input-bkg)` - Input field background

#### Text Colors
- `var(--theme-color-std-text)` - Standard text color
- `var(--theme-color-soft-text)` - Muted/secondary text
- `var(--theme-color-inv-contrast-text)` - Inverted contrast text (for colored backgrounds)

#### Border Colors
- `var(--theme-color-soft-bdr)` - Soft border
- `var(--theme-color-weak-bdr)` - Weak border
- `var(--theme-color-alarm-bdr)` - Alarm/error border

#### Status Colors
- `var(--theme-color-primary)` - Primary action color
- `var(--theme-color-success)` - Success state
- `var(--theme-color-warning)` - Warning state
- `var(--theme-color-alarm)` - Error/alarm state

### Usage Example

```tsx
<div 
  className="p-4 rounded-lg shadow"
  style={{ 
    backgroundColor: 'var(--theme-color-component-1)',
    color: 'var(--theme-color-std-text)',
    border: '1px solid var(--theme-color-soft-bdr)'
  }}
>
  <h3 style={{ color: 'var(--theme-color-primary)' }}>
    Card Title
  </h3>
  <p style={{ color: 'var(--theme-color-soft-text)' }}>
    Card content with muted text
  </p>
</div>
```

## Theme Toggle Component

Located at: `src/components/ThemeToggle.tsx`

```tsx
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme} title="Toggle theme">
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}
```

## Creating Theme-Aware Components

### Basic Component

```tsx
export default function MyComponent() {
  return (
    <div 
      className="p-4 rounded"
      style={{ 
        backgroundColor: 'var(--theme-color-component-1)',
        color: 'var(--theme-color-std-text)'
      }}
    >
      Theme-aware content
    </div>
  );
}
```

### Component with Hover Effects

```tsx
<div 
  className="p-4 rounded transition-colors"
  style={{ backgroundColor: 'transparent' }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'var(--theme-color-component-2)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  }}
>
  Hover over me
</div>
```

### Button with Theme Colors

```tsx
<button
  className="px-4 py-2 rounded-md focus:outline-none focus:ring-2"
  style={{
    backgroundColor: 'var(--theme-color-primary)',
    color: 'var(--theme-color-inv-contrast-text)',
  }}
>
  Primary Button
</button>
```

## Customizing the Theme

### Modifying Theme Colors

Edit `src/index.css` to customize theme colors:

```css
:root {
  --theme-color-primary: #1976d2;
  --theme-color-primary-hover: #1565c0;
}
```

### Adding Custom Theme Variables

You can add your own theme variables:

```css
:root {
  --my-custom-color: #ff5722;
}

html[data-ix-color-schema="dark"] {
  --my-custom-color: #ff7043;
}
```

### Creating Theme Variants

To create additional theme variants:

1. Add theme class to `src/store/themeStore.ts`
2. Define CSS variables in `src/index.css`
3. Update theme toggle logic

## Best Practices

1. **Always use CSS variables** for colors instead of hardcoded values
2. **Test both themes** when developing new components
3. **Use semantic color names** (e.g., `--theme-color-success` instead of `--color-green`)
4. **Avoid using Tailwind color classes** for theme-dependent colors
5. **Add smooth transitions** for better user experience

## Siemens IX Components

The project includes Siemens IX web components. Here are the key components available:

### Navigation & Layout
- `IxApplicationHeader` - Application header with navigation
- `IxMenu` - Side navigation menu
- `IxMenuCategory` - Menu category grouping
- `IxMenuItem` - Individual menu items
- `IxContentHeader` - Content area header
- `IxPane` - Side panel/drawer component

### Forms & Inputs
- `IxButton` - Primary, secondary, and other button variants
- `IxInput` - Text input fields
- `IxTextarea` - Multi-line text input
- `IxSelect` - Dropdown select component
- `IxDatepicker` - Date selection
- `IxTimepicker` - Time selection
- `IxCheckbox` - Checkbox input
- `IxRadio` - Radio button
- `IxToggle` - Toggle switch
- `IxSlider` - Range slider

### Data Display
- `IxCard` - Card container for content
- `IxTable` - Data tables with sorting/filtering
- `IxPill` - Status/label pills
- `IxBadge` - Notification badges
- `IxChip` - Removable tags/chips
- `IxDivider` - Visual separator

### Feedback
- `IxToast` - Toast notifications
- `IxModal` - Modal dialogs
- `IxMessageBar` - Inline messages
- `IxSpinner` - Loading spinner
- `IxEmptyState` - Empty state placeholder

### Navigation
- `IxTabs` - Tab navigation
- `IxBreadcrumb` - Breadcrumb navigation
- `IxPagination` - Page navigation

### Usage Example

```tsx
import { IxButton, IxCard, IxModal } from '@siemens/ix-react';

export default function MyComponent() {
  return (
    <IxCard>
      <h3>Card Title</h3>
      <p>Card content goes here</p>
      <IxButton variant="primary">Click me</IxButton>
    </IxCard>
  );
}
```

See the [Siemens IX Components Documentation](https://ix.siemens.io/docs/components/overview) for the complete component reference.

## Siemens IX Icons

Siemens IX includes a comprehensive industrial icon system with 500+ icons.

### Using Icons

```tsx
// Import from @siemens/ix-icons
import { home, settings, user } from '@siemens/ix-icons/icons';

// Use with IxIcon component
import { IxIcon } from '@siemens/ix-react';

export default function MyComponent() {
  return (
    <div>
      <IxIcon name={home} size="24" />
      <IxIcon name={settings} size="24" color="var(--theme-color-primary)" />
    </div>
  );
}
```

### Available Icon Categories

- **Action Icons**: add, edit, delete, save, close, etc.
- **Navigation**: arrow icons, chevrons, menu icons
- **Files & Documents**: document, folder, download, upload
- **Communication**: mail, chat, notification, phone
- **Status**: success, warning, error, info
- **Industrial**: machinery, sensors, monitoring, automation
- **System**: settings, user, security, home

See the [Siemens IX Icons Library](https://ix.siemens.io/docs/icons/overview) for the complete icon collection.

## Themes

### Available Themes

Siemens IX supports multiple themes:

#### Classic Theme (Default)
- **Classic Light** (`data-ix-color-schema="light"`)
- **Classic Dark** (`data-ix-color-schema="dark"`)

#### Siemens Brand Theme (Siemens AG Only)
Exclusive theme for official Siemens AG products. Available at [code.siemens.com](https://code.siemens.com/siemens-ix/ix-brand-theme)

### Switching Themes Programmatically

```typescript
import { useThemeStore } from './store/themeStore';

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useThemeStore();
  
  // Toggle between light and dark
  const handleToggle = () => {
    toggleTheme();
  };
  
  // Set specific theme
  const handleSetDark = () => {
    setTheme('dark');
  };
  
  return (
    <button onClick={handleToggle}>
      Current: {theme}
    </button>
  );
}
```

## Troubleshooting

## Troubleshooting

### Theme not persisting
- Check browser localStorage is enabled
- Verify `theme-storage` key exists in localStorage
- Clear localStorage and reload if issues persist

### Colors not changing
- Ensure CSS variables are used: `var(--theme-color-*)` instead of static colors
- Check that `data-ix-theme` and `data-ix-color-schema` attributes are set on `<html>` element
- Inspect element in DevTools to verify attributes are correctly applied

### Components not styled correctly
- Verify Siemens IX CSS is imported in `index.css`
- Check that web components are properly initialized in `main.tsx`
- Ensure `applyPolyfills()` and `defineCustomElements()` are called

### TypeScript errors
- Check that `@siemens/ix` types are installed
- Verify `vite-env.d.ts` includes proper type definitions
- Run `npm install` to ensure all dependencies are installed

### Deprecated Warnings
If you see warnings about class-based theming:
- This implementation uses the modern data attribute approach
- The old `theme-classic-dark` CSS classes are deprecated in Siemens IX 4.0+
- All theme switching uses `data-ix-theme` and `data-ix-color-schema` attributes

## Migration Guide

### From Old Theme to Siemens IX

1. Replace Tailwind color classes:
   ```tsx
   // Before
   <div className="bg-white text-gray-900">
   
   // After
   <div style={{ backgroundColor: 'var(--theme-color-component-1)', color: 'var(--theme-color-std-text)' }}>
   ```

2. Replace hardcoded colors:
   ```tsx
   // Before
   <button style={{ backgroundColor: '#1976d2' }}>
   
   // After
   <button style={{ backgroundColor: 'var(--theme-color-primary)' }}>
   ```

3. Use ThemeToggle component:
   ```tsx
   import ThemeToggle from './components/ThemeToggle';
   
   // Add to your layout
   <ThemeToggle />
   ```

## Resources

- [Siemens IX Official Documentation](https://ix.siemens.io/)
- [Siemens IX GitHub Repository](https://github.com/siemens/ix)
- [Siemens IX Design Tokens](https://ix.siemens.io/docs/design-tokens)
- [Color System Guide](https://ix.siemens.io/docs/colors)

## Support

For questions about Siemens IX integration:
- Check the official Siemens IX documentation
- Review this theme documentation
- Contact the development team

---

**Version**: 2.0.0 with Siemens IX  
**Last Updated**: 2024-02-05
