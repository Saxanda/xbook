
import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </Router>
  )
}

export default App
