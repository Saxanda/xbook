
import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import PostPage from './components/Post/PostPage';
import { useState, useEffect } from 'react';

import LoginPage from './Pages/LoginPage';
import Home from './Pages/Home';

function App() {

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetch('../testPostData.json')
      .then(response => response.json())
      .then(data => {
        setPostData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<Home/>}/>
    
        <Route></Route>
        <Route 
          path="/post/:postId" 
          element={<PostPage postData={postData} />} 
        />
      </Routes>
    </Router>
  )
}

export default App
