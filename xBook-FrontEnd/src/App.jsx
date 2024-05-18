import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header/Header";
import PostPage from "./components/Post/PostPage";
import { useState, useEffect } from "react";

import LoginPage from "./Pages/LoginPage";
// import Home from "./Pages/Home";
import NotificationsPage from "./components/Notifications/NotificationsPage";
// import testNotificationData from "./assets/notif.json";
import axios from "axios";

function App() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetch("../testPostData.json")
      .then((response) => response.json())
      .then((data) => {
        setPostData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/notifications/{recipientId}", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE2MDI5NTkwLCJleHAiOjE3MTY2MzQzOTB9.f7nmJ4ViNi9ZLoMwqFnPwKYzXJht6cI8bo2f5Qpdb_E`,
        },
      })
      .then((response) => {
        setNotificationData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Header></Header>
        <Routes>
          <Route />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={<NotificationsPage notificationData={notificationData} />}
          />

          <Route></Route>
          <Route
            path="/post/:postId"
            element={<PostPage postData={postData} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
