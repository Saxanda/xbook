import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProfilePagePosts from './components/ProfilePagePosts/ProfilePagePosts';
import ProfilePageFriends from './components/ProfilePageFriends/ProfilePageFriends';
import ProfileFriendRequests from './components/ProfileFriendRequests/ProfileFriendRequests';

function App() {

  return (
    <Router>
      <Header></Header>
      <Routes>
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
