import "./Styles/ChatPageStyle.scss";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Users from "../../components/Chat/Users/Users";
import Window from "../../components/Chat/Window/Window";
import { useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import { Box, Grid, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close"; // Імпорт іконки хрестика
import API_BASE_URL from "../../helpers/apiConfig";

export default function ChatPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isRedact, setIsRedact] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const [id, setID] = useState(() => {
    const savedChatID = localStorage.getItem("lastActiveChatID");
    return savedChatID !== null ? parseInt(savedChatID) : 2;
  });
  const [userEmail, setUserEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [chatClear, setChatClear] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );
  const [someState, setSomeState] = useState("");
  const [page, setPage] = useState(0);
  let urlID = useParams().id;
  urlID = parseInt(urlID);

  const stompClientRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (users.length > 0 && id !== -1) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/v1/chats/messages/${urlID}?page=${page}&size=100`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMessages((prevMessages) => [...prevMessages, ...response.data.content]);
          setLoading(false);
          setChatClear(false);
        } catch (error) {
          console.error("Error fetching messages:", error);
          setChatClear(true);
        }
      } else {
        setChatClear(true);
      }
    };

    fetchMessages();
  }, [token, id, trigger, deleteTrigger, users, someState, page]);

  const handleIdChange = (index) => {
    setID(index);
    localStorage.setItem("lastActiveChatID", index);

    if (stompClientRef.current && userEmail) {
      const subscriptionPath = `/user/${userEmail}/queue/message-status`;
      stompClientRef.current.subscribe(subscriptionPath, (message) => {
        console.log("Subscription received:", message.body);
      });

      stompClientRef.current.publish({
        destination: `/app/update-message-status/${0}`,
        body: JSON.stringify("READ"),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  useEffect(() => {
    const connectWebSocket = () => {
      const stompClient = new Client({
        brokerURL: `ws://localhost:8080/websocket`,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      stompClient.activate();

      stompClient.onConnect = (frame) => {
        console.log("Connected to WebSocket server:", frame);
        setUserEmail(localStorage.getItem("chosenUserEmail"));
        console.log(localStorage.getItem("chosenUserEmail"));
        if (userEmail) {
          const subscriptionPath = `/user/${userEmail}/queue/messages`;
          console.log("Subscribing to:", subscriptionPath);
          stompClient.subscribe(subscriptionPath, (message) => {
            console.log("Subscription received:", message.body);
            let newMessage = JSON.parse(message.body);
            newMessage.chat.chatParticipant.name = newMessage.sender.name;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
        } else {
          console.warn("User email is not set, cannot subscribe.");
        }
      };

      stompClient.onStompError = (frame) => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
      };

      stompClient.onWebSocketClose = (frame) => {
        console.log("WebSocket connection closed:", frame);
      };

      stompClient.onWebSocketError = (error) => {
        console.error("WebSocket error:", error);
      };

      stompClientRef.current = stompClient;
    };

    connectWebSocket();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [token, userEmail, urlID]);

  useEffect(() => {
    const userEmailTaker = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserEmail(response.data.email);
    };

    if (id !== -1 && localStorage.getItem("chosenUserEmail") == null) {
      userEmailTaker();
      console.log(localStorage.getItem("chosenUserEmail"));
    }
  }, [id, token]);

  const handleMessageSend = async () => {
    if (isRedact) {
      if (inputText !== "") {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/api/v1/messages/update/${messageId}`,
            {
              content: inputText,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          deleteTriggerChange();
          setInputText("");
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
      setIsRedact(false);
    } else {
      if (inputText !== "") {
        try {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          stompClientRef.current.publish({
            destination: `/app/chat`,
            body: JSON.stringify({
              chatId: id,
              contentType: "text",
              content: inputText,
            }),
            headers: headers,
          });
          setInputText("");
          triggerChange();
          deleteTriggerChange();
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    }
  };

  const changeMessage = (id, text) => {
    setInputText(text);
    setIsRedact(true);
    setMessageId(id);
  };

  const unChangeMessage = () => {
    setIsRedact(false);
    setInputText('');
  };

  const triggerChange = () => {
    setTrigger((prevTrigger) => !prevTrigger);
  };

  const deleteTriggerChange = () => {
    setDeleteTrigger((prevTrigger) => !prevTrigger);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box className="chat__container_message-input" style={{ height: "50px" }}>
      <Grid container className="chat__list">
        <Grid item xs={12} md={3} className="chat__users">
          <Users
            onClicked={handleIdChange}
            messages={messages}
            currentId={id}
            trigger={trigger}
            secondTrigger={deleteTrigger}
            triggerChange={deleteTriggerChange}
            changeUserArray={setUsers}
            token={token}
            urlID={urlID}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          {messages && (
            <Box className="chat__window" onScroll={handleScroll}>
              <Window
                data={messages}
                token={token}
                trigger={deleteTriggerChange}
                redactButton={changeMessage}
                chatClear={chatClear}
              />
              <Box className="chat__container_message-input">
                <TextField
                  type="text"
                  className="chat__message_input"
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <IconButton
                  onClick={handleMessageSend}
                  className="chat__message_button-send"
                  sx={{
                    width: "50px",
                    height: "50px",
                    padding: 0,
                    borderRadius: "4px",
                  }}
                >
                  <SendIcon className="chat__message_icon" />
                </IconButton>
                {isRedact && (
                  <IconButton
                    onClick={unChangeMessage}
                    className="chat__message_button-cancel"
                    sx={{
                      width: "50px",
                      height: "50px",
                      padding: 0,
                      borderRadius: "4px",
                      marginLeft: "8px"
                    }}
                  >
                    <CloseIcon className="chat__message_icon" />
                  </IconButton>
                )}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
