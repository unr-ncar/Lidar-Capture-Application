import { Outlet } from 'react-router'
import PrimaryNavigation from './components/PrimaryNavigation'
import useBootstraper from './hooks/configuration/useBootstraper'

function App() {

  useBootstraper()

  return (
    <>
      <div className='flex flex-col-reverse min-h-dvh h-dvh max-h-screen lg:flex-row'>
        <PrimaryNavigation />
        <div className='grow bg-neutral-100'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App