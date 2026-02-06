import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // Use Siemens IX data attributes for theming
          document.documentElement.setAttribute('data-ix-theme', 'classic');
          document.documentElement.setAttribute('data-ix-color-schema', newTheme);
          return { theme: newTheme };
        }),
      setTheme: (theme) =>
        set(() => {
          // Use Siemens IX data attributes for theming
          document.documentElement.setAttribute('data-ix-theme', 'classic');
          document.documentElement.setAttribute('data-ix-color-schema', theme);
          return { theme };
        }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
