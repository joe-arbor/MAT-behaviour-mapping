import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
import './tokens.scss';
import './global.css';
import { App } from './App';
import { PageShell } from './pages/pageShell/PageShell';
import { TemplatePage } from './pages/templates';
import { MatMisTemplate } from './pages/templates/MatMisTemplate';
import { MatMisOverview } from './pages/templates/MatMisOverview';
import { MatBehaviourLayout } from './pages/templates/MatBehaviourLayout';
import {
  MatBehaviourCategoryReporting,
  MatBehaviourCategoryMapping,
  MatBehaviourCategorySetup,
} from './pages/templates/matBehaviourCategory';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/templates/mat-mis" replace />} />
            <Route path="components" element={<PageShell />} />
            <Route path="templates" element={<Navigate to="/templates/mat-mis" replace />} />
            <Route path="templates/mat-mis" element={<MatMisTemplate />}>
              <Route index element={<MatMisOverview />} />
              <Route path="behaviour" element={<MatBehaviourLayout />}>
                <Route path="category-reporting" element={<MatBehaviourCategoryReporting />} />
                <Route path="category-mapping" element={<MatBehaviourCategoryMapping />} />
                <Route path="category-setup" element={<MatBehaviourCategorySetup />} />
              </Route>
            </Route>
            <Route path="templates/:pageId" element={<TemplatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
