import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import ProfilePagePosts from './components/ProfilePagePosts/ProfilePagePosts';
import ProfilePageFriends from './components/ProfilePageFriends/ProfilePageFriends';

function App() {


    // const [userData, setUser] = useState({});

    // const sendRequest = async (url) => {
    //     const response = await fetch(url);
    //     const products = await response.json();
    //     return products;
    // };

    // useEffect(() => {
    //     sendRequest("userData.json").then((user) => {
    //         console.log(user);
    //         setUser(user);
    //     });
    // }, []);

  const userData = {
    id: 1234567890,
    username: 'regnum_conficio',
    avatar: 'https://expertphotography.b-cdn.net/wp-content/uploads/2019/02/Avoid-These-Stock-Images-5.jpg',
    name: 'Pole',
    surname: 'Aksdal',
    header_photo: 'https://e0.pxfuel.com/wallpapers/526/947/desktop-wallpaper-landscape-microsoft-microsoft-windows-10.jpg',
    date_of_birth: "15.11.1987",

    friends: [
      {
        username: 'saevus',
        avatar: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        name: 'Sam',
        surname: 'Alderson',
      },
      {
        username: 'praemium_15',
        avatar: 'https://media.istockphoto.com/id/1132758418/photo/close-up-portrait-of-her-she-nice-attractive-puzzled-ignorant-wavy-haired-girl-showing.jpg?s=612x612&w=0&k=20&c=3G3eEg2RHg6AmVDbZCIzVo3n-1kFnE-61sgH3qDdyIo=',
        name: 'Natasha',
        surname: 'Georg',
      },
      {
        username: '12vulnero12',
        avatar: 'https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg',
        name: 'Roberto',
        surname: 'Iadanza',
      },
    ]
  }

  return (
    <Router>
      <Header></Header>
      <Routes>
        {/* <Route path='/' element={<ProfilePage userData={userData}/>}/> */}
        <Route exact path='/*' element={<ProfilePage userData={userData}/>}>
            <Route path='' element={<ProfilePagePosts userData={userData}/>} />
            <Route path='friends' element={<ProfilePageFriends />} />
        </Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </Router>
  )
}

export default App
