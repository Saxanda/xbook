import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./helpers/PrivateRoutes";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import BookmarksPage from "./Pages/BookmarksPage";
import UpdatePasswordPage from "./Pages/UpdatePasswordPage";
import ForgotPage from "./Pages/ForgotPage";
import Chats from "./Pages/ChatPage/ChatPage";
import PostPage from "./components/Post/PostPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import ProfilePagePosts from "./components/ProfilePagePosts/ProfilePagePosts";
import ProfilePageFriends from "./components/ProfilePageFriends/ProfilePageFriends";
import ProfileFriendRequests from "./components/ProfileFriendRequests/ProfileFriendRequests";
import Notifications from "./Pages/Notifications/Notifications";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-page" element={<ForgotPage />} />
        <Route path="/forgot-password" element={<UpdatePasswordPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/chats" element={<Navigate to="/chats/-1" />} />
          <Route path="/chats/:id/*" element={<Chats />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile/:id/*" element={<ProfilePage />}>
            <Route path="" element={<ProfilePagePosts />} />
            <Route path="friends" element={<ProfilePageFriends />} />
            <Route path="requests" element={<ProfileFriendRequests />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
