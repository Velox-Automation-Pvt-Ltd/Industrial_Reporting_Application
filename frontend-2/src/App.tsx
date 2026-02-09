import { ThemeModeScript, ThemeProvider } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';
import AppRouter from './routes/Routes';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as HotToaster } from 'react-hot-toast';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeModeScript />
      <ThemeProvider theme={customTheme}>
        <Provider store={store}>
          <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
            <CustomThemeProvider>
              <QueryClientProvider client={queryClient}>
                <AppRouter />
                <ReactQueryDevtools initialIsOpen={false} />
                <HotToaster />
              </QueryClientProvider>
            </CustomThemeProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
