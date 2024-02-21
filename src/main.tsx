import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Capture from "./routes/capture/Capture.tsx";
import CaptureStatus from "./routes/capture/status/CaptureStatus.tsx";
import CaptureStart from "./routes/capture/start/CaptureStart.tsx";
import CaptureStop from "./routes/capture/stop/CaptureStop.tsx";
import Dashboard from "./routes/dashboard/Dashboard.tsx";
import Explorer from "./routes/explorer/Explorer.tsx";
import Settings from "./routes/settings/settings.tsx";
import SettingsGeneral from "./routes/settings/general/settings.general.tsx";
import SettingsDashboard from "./routes/settings/dashboard/settings.dashboard.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Metadata from "./routes/metadata/Metadata.tsx";
import MetadataSite from "./routes/metadata/site/MetadataSite.tsx";
import MetadataLidar from "./routes/metadata/lidar/MetadataLidar.tsx";

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "capture",
                element: <Capture />,
                children: [
                    {
                        index: true,
                        element: <CaptureStatus />
                    },
                    {
                        path: "start",
                        element: <CaptureStart />
                    },
                    {
                        path: "stop",
                        element: <CaptureStop />
                    }
                ]
            },
            {
                path: "explorer",
                element: <Explorer />
            },
            {
                path: "settings",
                element: <Settings />,
                children: [
                    {
                        index: true,
                        element: <SettingsGeneral />
                    },
                    {
                        path: "dashboard",
                        element: <SettingsDashboard />
                    }
                ]
            },
            {
                element: <Metadata />,
                children: [
                    {
                        path: "site/:site_id",
                        element: <MetadataSite />
                    },
                    {
                        path: "lidar/:lidar_id",
                        element: <MetadataLidar />
                    }
                ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  </React.StrictMode>,
)
