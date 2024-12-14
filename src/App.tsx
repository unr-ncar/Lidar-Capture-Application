import { Outlet } from 'react-router'
import PrimaryNavigation from './components/PrimaryNavigation'
import useBootstraper from './hooks/configuration/useBootstraper'

function App() {

  const isBootstrapped = useBootstraper()

  return (
    <>
      <div className='flex flex-col-reverse min-h-dvh h-dvh max-h-screen lg:flex-row'>
        <PrimaryNavigation />
        {isBootstrapped && (
          <div className='grow bg-neutral-100'>
            <Outlet />
          </div>
        )}
      </div>
    </>
  )
}

export default App