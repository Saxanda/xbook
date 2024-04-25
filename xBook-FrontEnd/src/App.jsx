
import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

import ChatPage from './pages/ChatPage/ChatPage';
function App() {

  return (
    <Router>
      {/* <Header></Header> */}
      <Routes>
        <Route path='/' element={<ChatPage/>}/>
        <Route></Route>
        <Route></Route>
      </Routes>
    </Router>
  )
}

export default App
