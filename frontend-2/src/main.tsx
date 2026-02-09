import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './css/globals.css';
// import 'antd/dist/reset.css';
import App from './App.tsx';
import Spinner from './views/spinner/Spinner.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
);
