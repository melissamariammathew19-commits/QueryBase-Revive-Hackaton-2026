import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Location from './pages/Location'
import Topic from './pages/Topic'
import Chat from './pages/Chat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Location />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App