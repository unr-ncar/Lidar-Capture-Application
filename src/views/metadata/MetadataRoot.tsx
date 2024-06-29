import {ViewShell} from "../../components/ViewShell.tsx";
import {PaneGroup} from "../../components/PaneGroup.tsx";
import {Outlet} from "react-router-dom";

export default function MetadataRoot() {
    return (
        <ViewShell>
            <PaneGroup>
                <Outlet />
            </PaneGroup>
        </ViewShell>
    )
}