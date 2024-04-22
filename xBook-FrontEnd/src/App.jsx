import React, { useState } from 'react';
import './App.scss';
import BookmarkList from './components/BookmarksList/BookmarkList';
import Sidebar from './components/Sidebar/Sidebar';
import Modal from './components/Modal/Modal'

function App() {
  const initialBookmarks = [
    { id: 1, title: "Первая статья", description: "Описание первой статьи", type: "article", imageUrl: "https://placekitten.com/200/200" },
    { id: 2, title: "Вторая статья", description: "Описание второй статьи", type: "article", imageUrl: "https://placekitten.com/200/200" },
    { id: 3, title: "Первое изображение", description: "Описание первого изображения", type: "image", imageUrl: "https://placekitten.com/200/200" },
    { id: 4, title: "Второе изображение", description: "Описание второго изображения", type: "image", imageUrl: "https://placekitten.com/200/200" }
  ];

  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collections, setCollections] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setBookmarks(initialBookmarks); 
    } else {
      const filteredBookmarks = initialBookmarks.filter(bookmark => bookmark.type === category);
      setBookmarks(filteredBookmarks); 
    }
  };

  const handleCreateCollection = (collectionName) => {
    const newCollection = { id: Date.now(), title: collectionName };
    setCollections([...collections, newCollection]); 
    setIsModalOpen(false); 
  };

  const handleDeleteCollection = (id) => {
    const updatedCollections = collections.filter(collection => collection.id !== id);
    setCollections(updatedCollections);
  };

  return (
    <div className="App">
      <Sidebar
        onCategoryClick={handleCategoryClick}
        onCreateCollection={() => setIsModalOpen(true)}
        collections={collections}
        onDeleteCollection={handleDeleteCollection}
      />
      <BookmarkList bookmarks={bookmarks} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCollection}
      />
    </div>
  );
}

export default App;
