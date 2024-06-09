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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthorAvatar from "../../components/Post/sideComponents/AuthorAvatar";
import API_BASE_URL from "../../helpers/apiConfig";

import "./Notifications.scss";

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [trigger, setTrigger] = useState("true");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // позначення всіх повідомленьяк прочитаних
  const handleMarkAllAsRead = async () => {
    try {
      const AUTH_TOKEN = getToken();
      const promises = notifications.map((notification) =>
        axios.put(
          `${API_BASE_URL}/api/v1/notifications/${notification.id}/read`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AUTH_TOKEN}`,
              accept: "*/*",
            },
          }
        )
      );
      await Promise.all(promises);
      triggerChange();
      console.log("All messages marked as read");
    } catch (error) {
      console.error("Error marking all messages as read:", error);
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
        // width: "100%",
        maxWidth: "628px",
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
        <Grid container spacing={2} justifyContent={"center"} marginTop={"3px"}>
          <div className="notification_header">
            <Typography variant="h5" className="notifications_title">
              All Notifications
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleMarkAllAsRead}
            >
              Mark All as Read
            </Button>
          </div>
          {notifications.map((notification) => (
            <Grid item xs={12} key={notification.id}>
              <Card
                elevation={3}
                sx={{ padding: 2 }}
                className="notifications_content_container"
              >
                <CardContent
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: "16px",
                  }}
                >
                  <AuthorAvatar className="notification_avatar" />
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="notification_message"
                  >
                    {notification.message +
                      " " +
                      "by " +
                      notification.sender.name +
                      " " +
                      notification.sender.surname}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="notification_date"
                  >
                    Date:{" "}
                    {formatDate(notification.createdDate) +
                      ", " +
                      formatTime(notification.createdDate)}
                  </Typography>
                  <Box
                    className="notification_span"
                    component="span"
                    m={1}
                    sx={{
                      backgroundColor: notification.readStatus
                        ? "green"
                        : "red",
                    }}
                  />
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
