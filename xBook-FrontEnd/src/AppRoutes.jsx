import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./helpers/PrivateRoutes";

import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Bookmarks from "./Pages/Bookmarks";
import UpdatePasswordPage from './Pages/UpdatePasswordPage';
import ForgotPage from './Pages/ForgotPage';
import Chats from './Pages/ChatPage/ChatPage';
import PostPage from "./components/Post/PostPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-page" element={<ForgotPage />} />
          <Route path="/forgot-password/" element={<UpdatePasswordPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/chats" element={<Chats />} />
          <Route 
          path="/post/:postId" 
          element={<PostPage/>} 
          />
          <Route></Route>
        </Route>
      </Routes>
    </Router>
  );
}
