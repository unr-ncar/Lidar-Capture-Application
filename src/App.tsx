import { Outlet } from 'react-router'
import PrimaryNavigation from './components/PrimaryNavigation'

function App() {

  return (
    <>
      <div className='flex flex-col-reverse h-dvh max-h-dvh lg:flex-row'>
        <PrimaryNavigation />
        <div className='grow bg-neutral-100'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
