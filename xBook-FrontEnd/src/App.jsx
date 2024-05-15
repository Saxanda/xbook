import './App.scss'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';
import PostPage from './components/Post/PostPage';
import { useState, useEffect } from 'react';

import LoginPage from "./Pages/LoginPage";
import Bookmarks from "./Pages/Bookmarks";
import UpdatePasswordPage from './Pages/UpdatePasswordPage';
import ForgotPage from './Pages/ForgotPage';
import PrivateRoutes from "./helpers/PrivateRoutes";

function App() {
  // const [postData, setPostData] = useState([]);

  // useEffect(() => {
  //   fetch('../testPostData.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       setPostData(data);
  //     })
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-page" element={<ForgotPage />} />
          <Route path="/forgot-password/" element={<UpdatePasswordPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route></Route>
        </Route>
        <Route 
          path="/post/:postId" 
          element={<PostPage postData={postData} />} 
        />
      </Routes>
    </Router>
  )
}

export default App