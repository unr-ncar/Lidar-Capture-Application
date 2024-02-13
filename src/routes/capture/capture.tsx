import {Link, Outlet} from "react-router-dom";

export default function Capture() {
    return (
        <div>
            <nav className='flex flex-row gap-1.5'>
                <Link to='/capture'>
                    Status
                </Link>
                <Link to='/capture/start'>
                    Start
                </Link>
                <Link to='/capture/stop'>
                    Stop
                </Link>
            </nav>
            <Outlet />
        </div>
    )
}