import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Create from "./pages/Create"
import EditNote from "./pages/EditNote"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit' element={<EditNote />}/>
      </Routes>
    </>
  )
}

export default App
