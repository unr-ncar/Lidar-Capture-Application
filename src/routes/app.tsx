import {Link, Outlet} from "react-router-dom";

function App() {
  return (
      <div>
          <nav className='flex gap-2'>
              <Link to='/explorer'>
                  Explorer
              </Link>
              <Link to='/capture'>
                  Capture
              </Link>
              <Link to='/settings'>
                  Settings
              </Link>
          </nav>
          <hr />
          <Outlet />
      </div>
  )
}

export default App
