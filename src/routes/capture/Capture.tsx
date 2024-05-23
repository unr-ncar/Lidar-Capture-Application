import ViewShell from "../../components/ViewShell.tsx";
import {SecondaryNavigation, SecondaryNavigationLink} from "../../components/Navigation.tsx";
import {ServerIcon, VideoCameraIcon, VideoCameraSlashIcon} from "@heroicons/react/16/solid";
import {Outlet} from "react-router-dom";

export default function Capture() {

    const captureNavigation = (
        <SecondaryNavigation>
            <SecondaryNavigationLink label="Status" icon={<ServerIcon />} to="/capture" />
            <SecondaryNavigationLink label="Start" icon={<VideoCameraIcon />} to="/capture/start" />
            <SecondaryNavigationLink label="Stop" icon={<VideoCameraSlashIcon />} to="/capture/stop" />
        </SecondaryNavigation>
    )

    return (
        <ViewShell navigation={captureNavigation}>
            <Outlet />
        </ViewShell>
    )
}