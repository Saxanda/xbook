import './App.scss'
import { Provider } from 'react-redux';
import store from './redux/store';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';
import PostPage from './components/Post/PostPage';
import { useState, useEffect } from 'react';

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
        <Route path="/" element={<Home />} />
        <Route></Route>
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