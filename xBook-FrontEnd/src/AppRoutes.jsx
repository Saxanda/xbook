import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./helpers/PrivateRoutes";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import BookmarksPage from "./Pages/BookmarksPage";
import UpdatePasswordPage from './Pages/UpdatePasswordPage';
import ForgotPage from './Pages/ForgotPage';
import Chats from './Pages/ChatPage/ChatPage';
import { useState, useEffect } from 'react';
import PostPage from './components/Post/PostPage';

export default function AppRoutes() {

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
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-page" element={<ForgotPage />} />
          <Route path="/forgot-password/" element={<UpdatePasswordPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route 
          path="/post/:postId" 
          element={<PostPage postData={postData} />} 
        />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/chats" element={<Chats />} />
        </Route>       
      </Routes>
    </Router>
  );
}
