import PrimaryNavigationButton from "./PrimaryNavigationButton";
import { FolderIcon, ServerIcon, CogIcon } from "@heroicons/react/20/solid";

export default function PrimaryNavigation() {
    return (
        <nav className="border-t-2 flex flex-row gap-1 bg-white justify-around py-2 lg:border-t-0 lg:border-r-2 lg:flex-col lg:justify-start lg:px-4 lg:pt-6 lg:gap-6 z-50">
            <PrimaryNavigationButton icon={<ServerIcon />} to="/" label="Sensors" />
            <PrimaryNavigationButton icon={<FolderIcon />} to="/explorer" label="Explorer" />
            <PrimaryNavigationButton icon={<CogIcon />} to="/settings" label="Settings" />
        </nav>
    )
}