import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Note from "./pages/Note"
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/note/:id' element={<Note />}/>
      </Routes>
    </>
  )
}

export default App
