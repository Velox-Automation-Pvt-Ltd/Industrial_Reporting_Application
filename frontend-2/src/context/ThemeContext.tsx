// import React, { createContext, useContext, useEffect, useState } from 'react';

// type Theme = 'light' | 'dark';

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
//   isDarkMode: boolean;
//   setDarkMode: () => void;
//   setLightMode: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return (
//       (savedTheme as Theme) ||
//       (window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light')
//     );
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove('light', 'dark');
//     root.classList.add(theme);
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   const setDarkMode = () => setTheme('dark');
//   const setLightMode = () => setTheme('light');

//   const isDarkMode = theme === 'dark';

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode, setDarkMode, setLightMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = (): ThemeContextType => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// ==========================
// new theme context

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
  setDarkMode: () => void;
  setLightMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light'); // Always light

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
  }, []);

  const toggleTheme = () => {
    // Disabled toggle — always light
  };

  const setDarkMode = () => {
    // Disabled — do nothing or force light
  };

  const setLightMode = () => {
    // Already light — optional
  };

  const isDarkMode = false;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode, setDarkMode, setLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
