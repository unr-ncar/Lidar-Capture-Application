import { Outlet } from "react-router";
import ViewLayout from "../components/ViewLayout";

export default function SensorsRoot() {
    return (
        <ViewLayout>
            <Outlet />
        </ViewLayout>
    )
}