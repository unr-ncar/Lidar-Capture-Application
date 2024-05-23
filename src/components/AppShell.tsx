import {PrimaryNavigation} from "./Navigation.tsx";
import {Outlet} from "react-router-dom";

export default function AppShell() {

    return (
        <div className='h-svh flex flex-col md:flex-col-reverse bg-neutral-100'>
            <div className='grow overflow-auto'>
                <Outlet />
            </div>
            <PrimaryNavigation className='' />
        </div>
    )
}