import React, { useState, useEffect } from "react";
import UsersItem from "../UserItem/UserItem";
import axios from 'axios';
import API_BASE_URL from '../../../helpers/apiConfig';
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";

export default function Users({
  onClicked,
  trigger,
  triggerChange,
  changeUserArray,
  token,
}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastActiveUser, setLastActiveUser] = useState(-1);
  const [emailVer, setEmailVer] = useState(false);
  const [inputText, setInputText] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false); // New state to track data loading
  const navigate = useNavigate();
  const { id: urlID } = useParams();

  useEffect(() => {
    if (urlID === "-1") {
      setLastActiveUser(-1);
      localStorage.setItem("lastActiveUser", -1);
      localStorage.setItem("lastActiveChatID", -1);
    }
  }, [urlID]);

  useEffect(() => {
    const fetchUserEmail = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.email;
      } catch (error) {
        console.error("Error fetching user email:", error);
        return null;
      }
    };

    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.content;
      } catch (error) {
        console.error("Error fetching chats:", error);
        return [];
      }
    };

    const addUserToChat = async (email) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/chats/create/${email}`, {
          email: email,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error creating chat:", error);
        return null;
      }
    };

    const initializeChat = async () => {
      setLoading(true);
      try {
        const chats = await fetchChats();
        setUsers(chats);
        changeUserArray(chats);
        // Set dataLoaded to true when data is loaded
        setDataLoaded(true);

        const chatIndex = chats.findIndex(chat => chat.id === parseInt(urlID));
        if (chatIndex !== -1 && dataLoaded) {
          handleUserClick(chatIndex, chats[chatIndex].id);
        } else {
          if (urlID !== "-1") {
            const userEmail = await fetchUserEmail(urlID);
            console.log(userEmail);
            if (userEmail) {
              const existingChatIndex = chats.findIndex(chat => chat.chatParticipant.email === userEmail);
              if (existingChatIndex !== -1) {
                console.log("existing chat chosen, email founded:" + userEmail + "urlId: " + urlID + "existingChatIndex:" + existingChatIndex + "id: " + chats[existingChatIndex].id);
                handleUserClick(existingChatIndex, chats[existingChatIndex].id);
              } else {
                const newChat = await addUserToChat(userEmail);
                if (newChat) {
                  const updatedChats = [...chats, newChat];
                  setUsers(updatedChats);
                  changeUserArray(updatedChats);
                  handleUserClick(updatedChats.length - 1, newChat.id);
                }
              }
            } else {
              setLastActiveUser(-1);
              localStorage.setItem("lastActiveUser", -1);
              localStorage.setItem("lastActiveChatID", -1);
            }
          } else {
            setLastActiveUser(-1);
            localStorage.setItem("lastActiveUser", -1);
            localStorage.setItem("lastActiveChatID", -1);
          }
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
      setLoading(false);
    };

    if (urlID) {
      initializeChat();
    }
  }, [urlID, token, trigger]);

  useEffect(() => {
    const savedLastActiveUser = localStorage.getItem("lastActiveUser");
    if (savedLastActiveUser !== null && parseInt(savedLastActiveUser) !== -1) {
      setLastActiveUser(parseInt(savedLastActiveUser));
    }
  }, []);

  useEffect(() => {
    if (dataLoaded) {
    const fetchUserEmail = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.email;
      } catch (error) {
        console.error("Error fetching user email:", error);
        return null;
      }
    };

   
      const userEmail = fetchUserEmail(urlID);
      const existingChatIndex = users.findIndex(chat => chat.chatParticipant.email === userEmail);
              if (existingChatIndex !== -1) {
                handleUserClick(existingChatIndex, users[existingChatIndex].id);
              }
    }
  }, [dataLoaded, users, urlID]);

  const handleUserClick = (index, id, isDeleteAction = false) => {
    if (!isDeleteAction) {
      setLastActiveUser(index);
      onClicked(id);
      localStorage.setItem("chosenUserEmail",(users[index].chatParticipant.email));
      //const chosenUserEmail = users[index].chatParticipant.email;
      localStorage.setItem("lastActiveUser", index);
      localStorage.setItem("lastActiveUserId", id);
      //localStorage.setItem("chosenUserEmail", chosenUserEmail);
      navigate(`/chats/${id}`);
    } else {
      setLastActiveUser(-1);
      localStorage.setItem("lastActiveUser", -1);
      localStorage.setItem("lastActiveUserId", -1);
      navigate(`/chats/no-chat-chosen`);
    }
  };

  useEffect(() =>{
    //localStorage.setItem("chosenUserEmail", users[lastActiveUser].chatParticipant.email);
  }, [lastActiveUser])

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleChatAdd();
    }
  };

  const handleIdChange = () => {
    let lastIndex = parseInt(lastActiveUser);
    let tempId;
    if (users.length === 1) lastIndex = null;
    if (lastIndex !== null) {
      if (lastIndex < users.length - 1) {
        tempId = users[lastIndex + 1].id;
      } else {
        lastIndex--;
        tempId = users[lastIndex].id;
      }
    } else {
      lastIndex = 0;
      tempId = -1;
    }
    handleUserClick(lastIndex, tempId);
  };

  const deleteChat = async (id) => {
    if (users.length <= 1) setLastActiveUser(-1);
    try {
      await axios.delete(`http://localhost:8080/api/v1/chats/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (localStorage.getItem("lastActiveUserId") == id) {
        handleIdChange();
        triggerChange();
      } else {
        triggerChange();
      }
      handleUserClick(lastActiveUser, id, true);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleChatAdd = async () => {
    const chatExists = users.some(user => user.chatParticipant.email === inputText);
    if (chatExists) {
      setEmailVer(true);
      console.error("Chat with this email already exists");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/chats/create/${inputText}`, {
        email: inputText,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInputText("");
      triggerChange();
      setEmailVer(false);
      const newChat = response.data;
      const updatedChats = [...users, newChat];
      setUsers(updatedChats);
      changeUserArray(updatedChats);
      setLastActiveUser(updatedChats.length - 1);
      navigate(`/chats/${newChat.id}`);
    } catch (error) {
      setEmailVer(true);
      console.error("Error adding chat:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="chat__users_container">
      <Box className="chat__users_list_container">
        <Box className="chat__users-list">
          <Box className="chat__users-add-container">
            <Button
              onClick={handleChatAdd}
              className="chat__users-add"
              variant="contained"
              color="primary"
              fullWidth
            >
              ADD A NEW CHAT
            </Button>
            <TextField
              type="text"
              className="chat__users-add-inp"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              fullWidth
              placeholder="Enter email"
              error={emailVer}
              helperText={emailVer ? "Chat with this email already exists" : ""}
              margin="normal"
            />
          </Box>
          {users.map((user, index) => (
            <Box
              className={`chat__users-list_item item-${index + 1} ${lastActiveUser === index ? "activeUser" : ""}`}
              key={user.id}
            >
              <UsersItem
                image={user.chatParticipant.avatar}
                name={`${user.chatParticipant.name} ${user.chatParticipant.surname}`}
                lastMessage={user.lastMessage ? user.lastMessage.content : "No messages yet"}
                id={user.id}
                index={index}
                handleUserClick={handleUserClick}
                deleteChat={deleteChat}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
