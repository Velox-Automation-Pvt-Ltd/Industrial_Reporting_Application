// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { applyPolyfills, defineCustomElements } from '@siemens/ix/loader'
// import App from './App.tsx'
// import './index.css'

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 1,
//     },
//   },
// })

// // Initialize Siemens IX web components
// applyPolyfills().then(() => {
//   defineCustomElements();
// });

// // Initialize Siemens IX theme using data attributes (official approach)
// const savedTheme = localStorage.getItem('theme-storage');
// const theme = savedTheme ? JSON.parse(savedTheme).state.theme : 'light';

// // Set Siemens IX theme attributes on HTML element
// document.documentElement.setAttribute('data-ix-theme', 'classic');
// document.documentElement.setAttribute('data-ix-color-schema', theme);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </React.StrictMode>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { defineCustomElements } from '@siemens/ix/loader'
import App from './App'
import './index.css'


// React Query config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Siemens IX theme handling
const savedTheme = localStorage.getItem('theme-storage')
const theme = savedTheme
  ? JSON.parse(savedTheme).state.theme
  : 'light'

// Apply Siemens IX theme attributes
document.documentElement.setAttribute('data-ix-theme', 'classic')
document.documentElement.setAttribute('data-ix-color-schema', theme)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
