
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';
import PostPage from './components/Post/PostPage';
import LoginPage from "./Pages/LoginPage";
import BookmarksPage from "./Pages/BookmarksPage";
import UpdatePasswordPage from './Pages/UpdatePasswordPage';
import ForgotPage from './Pages/ForgotPage';
import PrivateRoutes from "./helpers/PrivateRoutes";
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import ProfilePagePosts from './components/ProfilePagePosts/ProfilePagePosts';
import ProfilePageFriends from './components/ProfilePageFriends/ProfilePageFriends';
import ProfileFriendRequests from './components/ProfileFriendRequests/ProfileFriendRequests';

function App() {

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-page" element={<ForgotPage />} />
          <Route path="/forgot-password/" element={<UpdatePasswordPage />} />
        <Route element={<PrivateRoutes />}>
          <Route 
          path="/post/:postId" 
          element={<PostPage  />} 
        />
          <Route path="/bookmarks" element={<BookmarksPage />} />
        </Route>
        <Route exact path='/profile/:id/*' element={<ProfilePage />}>
            <Route path='' element={<ProfilePagePosts />} />
            <Route path='friends' element={<ProfilePageFriends />} />
            <Route path='requests' element={<ProfileFriendRequests />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

