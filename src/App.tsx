import './App.css'
import {PrimaryNavigation, PrimaryNavigationLink} from "./components/PrimaryNavigation.tsx";
import {CogIcon, VideoCameraIcon, FolderArrowDownIcon} from "@heroicons/react/24/solid";
import { Outlet } from 'react-router-dom'

function App() {

  return (
      <div className='h-svh w-svw flex flex-col-reverse md:flex-row'>
          <PrimaryNavigation>
              <PrimaryNavigationLink label="Explorer" icon={<FolderArrowDownIcon />} to="/explorer" />
              <PrimaryNavigationLink label="Capture" icon={<VideoCameraIcon />} to="/capture" />
              <PrimaryNavigationLink className='md:mt-auto' label="Settings" icon={<CogIcon />} to={"/settings"} />
          </PrimaryNavigation>
          <div className='grow flex overflow-auto'>
              <Outlet />
          </div>
      </div>
  )
}

export default App
