import { useState } from 'react'
import './App.css'
import Sidebar from './Sidebar'
import NoteView from './NoteView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">

        <Sidebar />
        <NoteView />

      </div>

    </>
  )
}

export default App
