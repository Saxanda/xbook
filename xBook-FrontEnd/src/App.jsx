
import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

import LoginPage from './Pages/LoginPage';
import Home from './Pages/Home';

function App() {

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<Home/>}/>
    
        <Route></Route>
      </Routes>
    </Router>
  )
}

export default App
