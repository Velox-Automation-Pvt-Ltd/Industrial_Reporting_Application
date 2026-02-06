/**
 * Example Component using Siemens IX Components with Theme Support
 * 
 * This file demonstrates how to use Siemens IX components in the AerialView application
 * Reference: https://ix.siemens.io/docs/components/overview
 */

import { useState } from 'react';
import { useThemeStore } from '../store/themeStore';

// Example: Using Siemens IX with inline styles and CSS variables
export function SiemensIxExample() {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div 
      className="p-6 rounded-lg shadow-lg"
      style={{
        backgroundColor: 'var(--theme-color-component-1)',
        color: 'var(--theme-color-std-text)',
        border: '1px solid var(--theme-color-soft-bdr)',
      }}
    >
      {/* Header */}
      <h2 
        className="text-2xl font-bold mb-4"
        style={{ color: 'var(--theme-color-primary)' }}
      >
        Siemens IX Theme Example
      </h2>

      {/* Content */}
      <p 
        className="mb-4"
        style={{ color: 'var(--theme-color-soft-text)' }}
      >
        This is an example component demonstrating the Siemens IX design system.
        Current theme: <strong>{theme}</strong>
      </p>

      {/* Counter Demo */}
      <div 
        className="p-4 mb-4 rounded"
        style={{ 
          backgroundColor: 'var(--theme-color-component-2)',
          border: '1px solid var(--theme-color-weak-bdr)',
        }}
      >
        <p className="mb-2">Counter: {count}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 rounded focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--theme-color-primary)',
              color: 'var(--theme-color-inv-contrast-text)',
            }}
          >
            Increment
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-4 py-2 rounded focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--theme-color-component-1)',
              color: 'var(--theme-color-std-text)',
              border: '1px solid var(--theme-color-std-bdr)',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Status Pills */}
      <div className="flex gap-2 mb-4">
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: 'var(--theme-color-success)',
            color: 'var(--theme-color-inv-contrast-text)',
          }}
        >
          Success
        </span>
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: 'var(--theme-color-warning)',
            color: 'var(--theme-color-inv-contrast-text)',
          }}
        >
          Warning
        </span>
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: 'var(--theme-color-alarm)',
            color: 'var(--theme-color-inv-contrast-text)',
          }}
        >
          Error
        </span>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'var(--theme-color-primary)',
          color: 'var(--theme-color-inv-contrast-text)',
        }}
      >
        Toggle Theme (Current: {theme})
      </button>

      {/* Info Box */}
      <div 
        className="mt-4 p-3 rounded"
        style={{
          backgroundColor: 'var(--theme-color-info)',
          color: 'var(--theme-color-inv-contrast-text)',
          border: '1px solid var(--theme-color-info-bdr)',
        }}
      >
        ℹ️ This component uses Siemens IX CSS variables for theming
      </div>
    </div>
  );
}

/**
 * Example: Using Native Siemens IX Web Components
 * Uncomment the following to use actual IX components:
 * 
 * import { IxButton, IxCard, IxPill, IxToast } from '@siemens/ix-react';
 * 
 * export function NativeSiemensIxExample() {
 *   return (
 *     <IxCard>
 *       <h3>Native Siemens IX Components</h3>
 *       <p>Using actual IX web components</p>
 *       <IxButton variant="primary">Primary Button</IxButton>
 *       <IxButton variant="secondary">Secondary Button</IxButton>
 *       <IxPill color="success">Active</IxPill>
 *       <IxPill color="alarm">Error</IxPill>
 *     </IxCard>
 *   );
 * }
 */

export default SiemensIxExample;
