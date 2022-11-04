import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Chats } from './pages/Chats'
import { Home } from './pages/Home'

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/chats' element={<Chats />} />
  </Routes>
)

export default App
