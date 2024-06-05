import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Popover,
  IconButton,
  // Portal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
// import Post from "../components/Post/Post";
// import { getOnePost } from "../components/Post/postApi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthorAvatar from "../../components/Post/sideComponents/AuthorAvatar";

import "./Notifications";
// import { Margin } from "@mui/icons-material";

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [trigger, setTrigger] = useState("true");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "http://localhost:8080";

  //отримання токену
  const getToken = () => {
    let token = sessionStorage.getItem("token");
    if (!token) {
      token = localStorage.getItem("token");
    }
    return token;
  };

  //отримання userID з токену
  let userId = parseInt(
    jwtDecode(sessionStorage.getItem("token") || localStorage.getItem("token"))
      .sub
  );

  // Функція для обробки кнопки "Mark as Read"
  const handleReadButton = async (id) => {
    console.log(getToken());
    try {
      const AUTH_TOKEN = getToken();
      // const response =
      await axios.put(
        `${API_BASE_URL}/api/v1/notifications/${id}/read`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
            accept: "*/*",
          },
        }
      );
      triggerChange();
      console.log("readed message");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Функція навігації до посту
  const handleToPage = (id) => {
    navigate(`/post/${id}`);
  };

  // Триггер для оновлення стану
  const triggerChange = () => {
    setTrigger((prevTrigger) => !prevTrigger);
  };

  // Функція для отримання сповіщень
  const getNotifications = async () => {
    try {
      const AUTH_TOKEN = getToken();
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/notifications/${userId}?page=0&size=5`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
            accept: "*/*",
          },
        }
      );
      console.log(response.data.content);
      setNotifications(response.data.content); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Функція для отримання постів
  const getPosts = async () => {
    try {
      const AUTH_TOKEN = getToken();
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/posts?page=0&size=20`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
            accept: "*/*",
          },
        }
      );
      //console.log(response.data.content[1])
      setPosts(response.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  // для кнопки дій з повідомленням
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleClick = (event, notification) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Функція для встановлення обраного IconButton
  // const handleIconButtonClick = (notification) => {
  //   // setSelectedIconButton(notification.id);
  //   handleClickOpen(notification);
  // };

  useEffect(() => {
    getPosts();
    getNotifications();
    setLoading(false);
  }, [trigger]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        padding: 2,
        width: "100%",
        maxWidth: "628px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        margin: "0 auto",
      }}
    >
      {notifications == null ||
      notifications == undefined ||
      notifications.length === 0 ? (
        <Typography variant="h5" className="notifications_empty" align="center">
          No Notifications
        </Typography>
      ) : (
        <Grid
          container
          className="notifications_container"
          spacing={2}
          justifyContent={"center"}
          marginTop={"3px"}
        >
          <Typography
            variant="h5"
            className="notifications_title"
            alignItems="center"
          >
            All Notifications
          </Typography>
          {notifications.map((notification) => (
            <Grid item xs={12} key={notification.id}>
              <Card
                elevation={3}
                sx={{ padding: 2 }}
                className="notifications_content_container"
              >
                <CardContent style={{ position: "relative" }}>
                  <AuthorAvatar className="notifications_avatar" />
                  <Typography variant="h6" gutterBottom>
                    {notification.message +
                      " " +
                      "by " +
                      notification.sender.name +
                      " " +
                      notification.sender.surname}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    {}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    Date:{" "}
                    {formatDate(notification.createdDate) +
                      ", " +
                      formatTime(notification.createdDate)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ position: "absolute", top: "-5px", right: "5%" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: notification.readStatus
                          ? "green"
                          : "red",
                      }}
                    ></span>
                  </Typography>
                  <IconButton
                    onClick={(event) => handleClick(event, notification)}
                    className="notification_button"
                    style={{ position: "absolute", top: "0", right: "0" }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            marginTop: "5px",
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "5px" }}
            onClick={() => {
              handleReadButton(selectedNotification.id);
              handleClose();
            }}
          >
            Mark as Read
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleToPage(selectedNotification.postId);
              handleReadButton(selectedNotification.id);
              handleClose();
            }}
          >
            Go to post
          </Button>
          {/* <Button onClick={handleClose} color="secondary">
            Cancel
          </Button> */}
        </Box>
      </Popover>
    </Box>
  );
}

function formatTime(fullTime) {
  const date = new Date(fullTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function formatDate(date) {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
}
