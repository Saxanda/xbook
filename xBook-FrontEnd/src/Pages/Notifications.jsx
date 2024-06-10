import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import Post from '../components/Post/Post';
import { getOnePost } from '../components/Post/postApi';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from '../helpers/apiConfig';

import { Client } from '@stomp/stompjs';

export default function Notifications() {
    const navigate = useNavigate()

    const [userEmail, setUserEmail] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [trigger, setTrigger] = useState("true")
    const [ posts, setPosts ] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token") || sessionStorage.getItem("token"));
    const getToken = () => {
        let token = sessionStorage.getItem('token');
        if (!token) {
            token = localStorage.getItem('token');
        }
        return token;
    };

    
    let userId = parseInt(jwtDecode(sessionStorage.getItem("token") || localStorage.getItem("token")).sub)
    
    useEffect(() => {
      const userEmailTaker = async () => {
          const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          setUserEmail(response.data.email);
      };
          userEmailTaker();
  }, [token]);

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

      return stompClient;
  };

  const stompClient = connectWebSocket();

    const handleReadButton = async (id) => {
        console.log(getToken())
        try {
            const AUTH_TOKEN = getToken();
            const response = await axios.put(
                `${API_BASE_URL}/api/v1/notifications/${id}/read`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${AUTH_TOKEN}`,
                        'accept': '*/*'
                    }
                }
            );
            triggerChange();
            console.log("readed message");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleToPage = (id) => {
        navigate(`/post/${id}`)
    }

    const triggerChange = () => {
        setTrigger(prevTrigger => !prevTrigger);
    }

    const getNotifications = async () => {
        try {
            const AUTH_TOKEN = getToken();
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/notifications/${userId}?page=0&size=5`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${AUTH_TOKEN}`,
                        'accept': '*/*'
                    }
                }
            );
            console.log(response.data.content);
            setNotifications(response.data.content); // Update the state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getPosts = async () => {
        try {
            const AUTH_TOKEN = getToken();
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/posts?page=0&size=20`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${AUTH_TOKEN}`,
                        'accept': '*/*'
                    }
                }
            );
            //console.log(response.data.content[1])
            setPosts(response.data.content)
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        getPosts();
        getNotifications();
    }, [trigger]);

    return (
        <Box sx={{ padding: 2 }}>
          {notifications == null || notifications == undefined || notifications.length === 0 ? (
            <Typography variant="body1" align="center">
              no notifications
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {notifications.map((notification) => (
                <Grid item xs={12} key={notification.id}>
                  <Card elevation={3} sx={{ padding: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {notification.message}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Sender: {notification.sender.name + " " + notification.sender.surname}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Date: {formatDate(notification.timestamp) + ", " + formatTime(notification.timestamp)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: {notification.readStatus == false ? "unread" : "read"};
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 1 }}
                        onClick={() => handleReadButton(notification.id)}
                      >
                        Mark as Read
                      </Button>
                      <Button
                        style={{ marginLeft: "20px"}}
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 1 }}
                        onClick={() => {
                            handleReadButton(notification.id)
                            handleToPage(notification.postId)
                        }}
                      >
                        Go to post
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      );
}

function formatTime(fullTime) {
    const date = new Date(fullTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function formatDate(date) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
}
