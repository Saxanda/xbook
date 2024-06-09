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

import { Client } from '@stomp/stompjs';

export default function Notifications() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || sessionStorage.getItem("token"));

  // Получение токена
  const getToken = () => {
    let token = sessionStorage.getItem("token");
    if (!token) {
      token = localStorage.getItem("token");
    }
    return token;
  };

  // Получение userID из токена
  let userId = parseInt(
    jwtDecode(sessionStorage.getItem("token") || localStorage.getItem("token"))
      .sub
  );

  useEffect(() => {
    const fetchUserEmail = async () => {
      const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserEmail(response.data.email);
    };

    fetchUserEmail();
  }, [token]);

  useEffect(() => {
    if (userEmail) {
      const stompClient = connectWebSocket();
      
    }
  }, [userEmail, token]);

  const connectWebSocket = () => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/websocket',
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    const socketPublisher = () => {
      const headers = {
        //    Token of user 'john.doe@example.com'
                Authorization: `Bearer ${token}`
            };
      stompClient.publish({
        destination: "/app/chat",
//        destination: "/app/update-message-status/3",
//        destination: "/app/update-message-status/3",
        body: JSON.stringify({
            'chatId': 1,
            'contentType': 'text',
            'content': '',
        }),
//        body: JSON.stringify('READ'),
        headers: headers
    });
    };

    stompClient.onConnect = (frame) => {
      console.log('Connected to WebSocket server:', frame);
      if (userEmail) {
        const subscriptionPath = `/user/${userEmail}/queue/messages`;
        console.log('Subscribing to:', subscriptionPath);
        stompClient.subscribe(subscriptionPath, (message) => {
          console.log("Subscription received:", message.body);
        });
      } else {
        console.warn('User email is not set, cannot subscribe.');
      }
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
    };

    stompClient.onWebSocketClose = (frame) => {
      console.log('WebSocket connection closed:', frame);
    };

    stompClient.onWebSocketError = (error) => {
      console.error('WebSocket error:', error);
    };

    stompClient.activate();
    //socketPublisher();

    return stompClient;
  };

  // Функция для обработки кнопки "Mark as Read"
  const handleReadButton = async (id) => {
    console.log(getToken());
    try {
      const AUTH_TOKEN = getToken();
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

  // Пометка всех уведомлений как прочитанных
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

  // Функция навигации к посту
  const handleToPage = (id) => {
    navigate(`/post/${id}`);
  };

  // Триггер для обновления состояния
  const triggerChange = () => {
    setTrigger((prevTrigger) => !prevTrigger);
  };

  // Функция для получения уведомлений
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
      setNotifications(response.data.content); // Обновление состояния с полученными данными
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Функция для получения постов
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
      setPosts(response.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  // Для кнопки действий с уведомлением
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
