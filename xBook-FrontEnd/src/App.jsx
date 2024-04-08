
import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ForgotPage from './Pages/ForgotPage';

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element={<ForgotPage/>}/>
        <Route></Route>
        <Route></Route>
      </Routes>
    </Router>
  )
}

export default App
