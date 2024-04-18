
import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

import LoginPage from './Pages/LoginPage';

function App() {

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route></Route>
        <Route></Route>
      </Routes>
    </Router>
  )
}

export default App
