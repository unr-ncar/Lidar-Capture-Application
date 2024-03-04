import {Link, Outlet} from "react-router-dom";

export default function Capture() {

    return (
        <div>
            <nav className='flex gap-2'>
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
            <hr />
            <Outlet />
        </div>
    )
}