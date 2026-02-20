import React from 'react';
import ReactDOM from 'react-dom/client';
import './tokens.scss';
import './global.css';
import { PageShell } from './pages/pageShell/PageShell';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <PageShell />
    </React.StrictMode>,
  );
}
