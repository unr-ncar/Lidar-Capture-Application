import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import CaptureRoot from "./views/capture/CaptureRoot.tsx";
import SiteStatusView from "./views/capture/SiteStatusView.tsx";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SensorStatusView from "./views/capture/SensorStatusView.tsx";
import StartCaptureView from "./views/capture/StartCaptureView.tsx";
import StopCaptureView from "./views/capture/StopCaptureView.tsx";
import ExplorerRoot from "./views/explorer/ExplorerRoot.tsx";
import MetadataRoot from "./views/metadata/MetadataRoot.tsx";
import FileMetadataView from "./views/metadata/FileMetadataView.tsx";
import SensorMetadataView from "./views/metadata/SensorMetadataView.tsx";
import SiteMetadataView from "./views/metadata/SiteMetadataView.tsx";
import SettingsView from "./views/SettingsView.tsx";

const queryClient = new QueryClient()
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "explorer",
                element: <ExplorerRoot />
            },
            {
                path: "capture",
                element: <CaptureRoot/>,
                children: [
                    {
                        index: true,
                        element: <SiteStatusView/>
                    },
                    {
                        path: "sensor_status",
                        element: <SensorStatusView />
                    },
                    {
                        path: "start_capture",
                        element: <StartCaptureView />
                    },
                    {
                        path: "stop_capture",
                        element: <StopCaptureView />
                    }
                ],
            },
            {
                path: "settings",
                element: <SettingsView />
            },
            {
                path: "metadata",
                element: <MetadataRoot />,
                children: [
                    {
                        element: <FileMetadataView />,
                        path: "file/:lidarId/:fileName"
                    },
                    {
                        element: <SensorMetadataView />,
                        path: "sensor/:site_id/:lidar_id"
                    },
                    {
                        element: <SiteMetadataView />,
                        path: "site/:site_id"
                    }
                ]
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
