import {SecondaryNavigation, SecondaryNavigationLink} from "../../components/SecondaryNavigation.tsx";
import {ViewShell} from "../../components/ViewShell.tsx";
import {PaneGroup} from "../../components/PaneGroup.tsx";
import {ServerIcon, SignalIcon, VideoCameraIcon, VideoCameraSlashIcon} from "@heroicons/react/20/solid";
import {Outlet} from "react-router-dom";

export default function CaptureRoot() {

    function CaptureSecondaryNavigation() {
        return (
            <SecondaryNavigation>
                <SecondaryNavigationLink icon={<ServerIcon/>} label="Site Status" to="/capture"/>
                <SecondaryNavigationLink icon={<SignalIcon/>} label="Sensor Status" to="sensor_status"/>
                <SecondaryNavigationLink icon={<VideoCameraIcon/>} label="Start Capture" to="start_capture"/>
                <SecondaryNavigationLink icon={<VideoCameraSlashIcon/>} label="Stop Capture" to="stop_capture"/>
            </SecondaryNavigation>
        )
    }

    return (
        <ViewShell className='' secondaryNavigation={<CaptureSecondaryNavigation/>}>
            <PaneGroup>
                <Outlet />
            </PaneGroup>
        </ViewShell>
    )
}