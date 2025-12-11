
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  
  return (
     <div className='min-h-screen min-w-full '>
      <div className='w-full h-full flex flex-col
     '>
       <Navbar/>
        <main>
          <Outlet />
        </main>
        
      </div>
    </div>
  )
}

export default App
