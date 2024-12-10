import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ExplorerRoot from './explorer/ExplorerRoot.tsx'
import SensorsRoot from './sensors/SensorsRoot.tsx'
import MapView from './sensors/MapView.tsx'
import SettingsView from './settings/SettingsView.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route element={<App />}>
            <Route path='explorer' element={<ExplorerRoot />}>
            </Route>
            <Route element={<SensorsRoot />}>
              <Route index element={<MapView />} />
            </Route>
            <Route path='settings' element={<SettingsView />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
