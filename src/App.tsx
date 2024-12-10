import { Outlet } from 'react-router'
import PrimaryNavigation from './components/PrimaryNavigation'

function App() {

  return (
    <>
      <div className='flex flex-col-reverse h-svh max-h-svh'>
        <PrimaryNavigation />
        <div className='grow bg-neutral-100'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
