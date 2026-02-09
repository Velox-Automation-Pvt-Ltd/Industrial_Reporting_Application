# VA (Velox Automation) Color Theme

## Overview

This application uses the Velox Automation brand color palette throughout the UI for consistency and brand recognition.

## Color Palette Reference

### Primary Colors

| Purpose             | Color         | HEX       | Tailwind Class                       | Usage                                         |
| ------------------- | ------------- | --------- | ------------------------------------ | --------------------------------------------- |
| **Primary Brand**   | VA Red        | `#e63312` | `bg-primary`, `text-primary`         | Key actions, highlights, CTAs, brand presence |
| **Accent/Support**  | VA Blue       | `#133F6D` | `bg-secondary`, `text-secondary`     | Navigation bars, headers, data components     |
| **Background/Text** | VA Black      | `#1d1d1b` | `bg-neutral-900`, `text-neutral-900` | Typography, dark surfaces                     |
|                     | VA Gray       | `#6D6F71` | `bg-neutral-600`, `text-neutral-600` | Secondary text, muted elements                |
|                     | VA Light Gray | `#D1D3D4` | `bg-neutral-300`, `text-neutral-300` | Borders, disabled states                      |
| **Neutral/Base**    | VA White      | `#ffffff` | `bg-white`, `text-white`             | Backgrounds, whitespace                       |

### Semantic Colors

| Purpose         | Color     | HEX       | Tailwind Class               | Usage                                    |
| --------------- | --------- | --------- | ---------------------------- | ---------------------------------------- |
| **Success**     | VA Green  | `#95c11f` | `bg-success`, `text-success` | Success states, confirmations, completed |
| **Warning**     | VA Yellow | `#fbba00` | `bg-warning`, `text-warning` | Alerts, pending states, caution          |
| **Info/Accent** | VA Teal   | `#03979d` | `bg-info`, `bg-accent`       | Secondary actions, subtle highlights     |
| **Error/Alert** | VA Orange | `#f07f3c` | `bg-error`, `bg-destructive` | Warnings, urgent notices, errors         |

## Usage Examples

### Tailwind CSS Classes

```tsx
// Primary brand color (VA Red)
<button className="bg-primary text-primary-foreground">Click Me</button>

// Secondary color (VA Blue)
<header className="bg-secondary text-secondary-foreground">Header</header>

// Success state (VA Green)
<div className="bg-success text-success-foreground">Success!</div>

// Warning state (VA Yellow)
<div className="bg-warning text-warning-foreground">Warning</div>

// Error state (VA Orange)
<div className="bg-error text-error-foreground">Error</div>

// Info/Accent (VA Teal)
<div className="bg-accent text-accent-foreground">Info</div>

// Direct VA color access
<div className="bg-va-red text-va-white">Direct VA Red</div>
```

### CSS Variables

```css
/* Light mode */
:root {
  --primary: 10 86% 49%; /* VA Red */
  --secondary: 206 68% 25%; /* VA Blue */
  --success: 74 68% 44%; /* VA Green */
  --warning: 45 100% 49%; /* VA Yellow */
  --destructive: 21 86% 59%; /* VA Orange */
  --accent: 182 97% 31%; /* VA Teal */
}

/* Dark mode */
.dark {
  --primary: 10 86% 49%; /* VA Red stays bright */
  --secondary: 206 68% 35%; /* VA Blue adjusted */
  /* ... */
}
```

### Direct Color Access

```tsx
// Using va.* colors directly
<div style={{ backgroundColor: 'var(--color-primary)' }}>VA Red</div>
<div className="border-va-blue">VA Blue Border</div>
```

## Color Shades

Each primary color has 50-900 shade variants:

```tsx
// VA Red shades
<div className="bg-primary-50">Lightest Red</div>
<div className="bg-primary-500">Base Red</div>
<div className="bg-primary-900">Darkest Red</div>

// VA Blue shades
<div className="bg-secondary-50">Lightest Blue</div>
<div className="bg-secondary-500">Base Blue</div>
<div className="bg-secondary-900">Darkest Blue</div>
```

## Design Guidelines

### Do's ✅

- Use VA Red for primary CTAs, important buttons, and brand elements
- Use VA Blue for navigation, headers, and data-heavy sections
- Use VA Green for success states and confirmations
- Use VA Yellow for warnings and pending states
- Use VA Teal for secondary actions and info highlights
- Use VA Orange for errors and urgent alerts
- Use neutral grays (VA Black/Gray/Light Gray) for text and backgrounds

### Don'ts ❌

- Don't mix non-VA colors for primary UI elements
- Don't use VA Red for errors (use VA Orange instead)
- Don't use too many bright colors together
- Maintain sufficient contrast for accessibility

## Accessibility

- **VA Red on White**: High contrast ✅
- **VA Blue on White**: High contrast ✅
- **VA Yellow**: Use dark text (VA Black) for readability ✅
- **VA Green/Teal/Orange**: Use white text for readability ✅
- **VA Black/Gray**: High contrast on white backgrounds ✅

## Component Examples

### Buttons

```tsx
// Primary button (VA Red)
<Button className="bg-primary hover:bg-primary-600">Primary</Button>

// Secondary button (VA Blue)
<Button className="bg-secondary hover:bg-secondary-600">Secondary</Button>

// Success button (VA Green)
<Button className="bg-success hover:bg-success-600">Confirm</Button>
```

### Badges/Status

```tsx
// Status badges
<Badge className="bg-success">Completed</Badge>
<Badge className="bg-warning text-warning-foreground">Pending</Badge>
<Badge className="bg-error">Failed</Badge>
<Badge className="bg-info">Info</Badge>
```

### Cards

```tsx
<Card className="border-va-lightgray">
  <CardHeader className="bg-secondary text-secondary-foreground">Header</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Updated Files

The following files have been updated with the VA color theme:

1. **tailwind.config.js** - Primary Tailwind theme configuration
2. **src/css/globals.css** - CSS variables and root colors
3. **src/css/layouts/container.css** - Body background
4. **src/views/spinner/spinner.css** - Loading spinner colors

## Migration Notes

- All components using generic `primary`, `secondary`, `success`, `warning`, `error` will automatically use VA colors
- Components using direct hex colors should be migrated to use Tailwind classes
- Check contrast ratios when applying colors to ensure accessibility standards

## Resources

- Brand Guidelines: [Internal VA Brand Guidelines]
- Accessibility: WCAG 2.1 AA compliance required
- Color Contrast Checker: https://webaim.org/resources/contrastchecker/

---

**Last Updated:** October 2025  
**Maintained By:** Engineering Team  
**Version:** 1.0
