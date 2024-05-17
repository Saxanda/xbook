import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./helpers/PrivateRoutes";

import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import ForgotPage from './pages/ForgotPage';
import Chats from './pages/ChatPage/ChatPage';
import LoginPage from "./pages/LoginPage.jsx";

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
          <Route></Route>
        </Route>
      </Routes>
    </Router>
  );
}
