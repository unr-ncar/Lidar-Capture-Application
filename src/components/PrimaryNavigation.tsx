import PrimaryNavigationButton from "./PrimaryNavigationButton";
import { FolderIcon, ServerIcon, CogIcon } from "@heroicons/react/20/solid";

export default function PrimaryNavigation() {
    return (
        <nav className="flex flex-row gap-1 bg-white justify-around py-2">
            <PrimaryNavigationButton icon={<ServerIcon />} to="/" label="Sensors" />
            <PrimaryNavigationButton icon={<FolderIcon />} to="/explorer" label="Explorer" />
            <PrimaryNavigationButton icon={<CogIcon />} to="/settings" label="Settings" />
        </nav>
    )
}