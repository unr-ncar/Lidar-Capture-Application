import { Outlet } from "react-router";

export default function SensorsRoot() {
    return (
        <div className="block w-full h-full">
            <Outlet />
        </div>
    )
}