
import './App.scss'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';


import Post from './components/Post/Post';

function App() {

  const postData = {
    user: {
        username: "john_doe",
        avatar: "https://scontent.fiev13-1.fna.fbcdn.net/v/t39.30808-1/310701445_159122053397748_2298751636432106900_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0iZ5cbdq_B0Ab6Ps-uF&_nc_oc=AdgMj3wyou-nSRQ6-Jg-mu5OMSoIh6-phW5iQEDGQbOwckyE6ewcCLjNCMWTVbD4o3o&_nc_ht=scontent.fiev13-1.fna&oh=00_AfA2uCPDfd8bGSZCywfBiBVv-YWVyMcnuRnivG7CafdJ3A&oe=661840B1",
        fullName: "John Doe"
    },
    text: "Я дуже люблю Minecraft",
    media: [
      
      "https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_Trails-and-Tales_1280x768.jpg",
      "https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_Trails-and-Tales_1280x768.jpg",
      "https://www.minecraft.net/content/dam/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_Trails-and-Tales_1280x768.jpg",
    ]
    ,
    likes: 150,
    comments: [
        {
            user: {
                username: "jane_smith",
                avatar: "https://example.com/avatar_jane.jpg",
                fullName: "Jane Smith"
            },
            text: "Гарний пост!"
        },
        {
            user: {
                username: "mike_jones",
                avatar: "https://example.com/avatar_mike.jpg",
                fullName: "Mike Jones"
            },
            text: "Чудово зроблено!"
        }
    ],
    date: "2024-04-04"
};

  return (
    <Router>
      <Header></Header>
      <Post postData={postData} />
      <Routes>
        <Route></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </Router>
  )
}

export default App
