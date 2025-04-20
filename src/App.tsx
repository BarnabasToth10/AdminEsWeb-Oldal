import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WorkoutAdminPage from './components/WorkoutAdminPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bg-gray-50 min-h-screen">
      <WorkoutAdminPage />
    </div>
    </>
  )
}

export default App
