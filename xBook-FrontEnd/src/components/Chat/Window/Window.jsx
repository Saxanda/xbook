import React, { useState, useEffect, useRef } from "react";
import WindowMessage from "../WindowMessage/WindowMessage";
import axios from 'axios';
import API_BASE_URL from '../../../helpers/apiConfig';
import { Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";


export default function Window({
  data,
  token,
  trigger,
  redactButton,
  chatClear,
}) {
  const [messages, setMessages] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const chatWindowRef = useRef(null);
  
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     loadComments(0);
// }, [postId]);


//   const loadComments = useCallback(async (page) => {
//     if (loading) return;
//     setLoading(true);
//     try {
//         const commentsData = await getPostComments(postId, page);
//         if (commentsData.content.length === 0) {
//             setHasMore(false);
//         } else {
//             setComments(prevComments => page === 0 ? commentsData.content : [...prevComments, ...commentsData.content]);
//             setPage(page);
//         }
//     } catch (error) {
//         console.error('Error fetching comments:', error);
//     } finally {
//         setLoading(false);
//     }
// }, [loading, postId]);

// const handleScroll = useCallback((event) => {
//   const { scrollTop, scrollHeight, clientHeight } = event.target;
//   if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore && !loading) {
//       loadComments(page + 1);
//   }
// }, [loadComments, hasMore, loading, page]);
  let userId = parseInt(jwtDecode(token).sub)
  const fetchUserEmail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(response.data);
      return response.data.name;
    } catch (error) {
      console.error("Error fetching user email:", error);
      return null;
    }
  };
  const userName = fetchUserEmail();

  useEffect(() => {
    if (data) {
      setMessages(data);
      setInitialized(true);
    }
  }, [data]);
  const groupedMessages = initialized
    ? groupMessagesByTypeAndDate(messages)
    : [];
  let prevDate = null;

  useEffect(() => {
    chatWindowRef.current?.scrollTo({
      top: chatWindowRef.current.scrollHeight,
    });
  }, [messages]);

  const deleteMessage = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/v1/messages/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      trigger();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  return (
    <Box className="chat__window_container">
      {chatClear ? (
        <Box className="chat__window-chat">
          <p>No chat chosen</p>
        </Box>
      ) : (
        <Box ref={chatWindowRef} className="chat__window-chat">
          {messages.length === 0 ? (
            <p>No messages yet</p>
          ) : (
            groupedMessages.map((group, index) => (
              <Box key={index} className={`chat__message-block ${group.type}`}>
                {group.messages.map((message, idx) => {
                  const formattedDate = formatDate(message.createdDate);
                  const shouldDisplayDate = formattedDate !== prevDate;
                  prevDate = formattedDate;

                  return (
                    <React.Fragment key={idx}>
                      {shouldDisplayDate && (
                        <p className="chat__message-date">{formattedDate}</p>
                      )}
                      <WindowMessage
                        text={message.content}
                        state={typeChecker(message)}
                        time={formatTime(message.createdDate)}
                        id={message.id}
                        deleteButton={deleteMessage}
                        redactButton={redactButton}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
}

function typeChecker(message) {
  let type = "none";
  console.log(message.sender.name)
  if (message.chat.chatParticipant.name !== message.sender.name) type = "input";
  else type = "output";
  return type;
}

function groupMessagesByTypeAndDate(messages) {
  const groups = [];
  let currentGroup = null;

  messages.forEach((message) => {
    const messageType = typeChecker(message);
    if (
      !currentGroup ||
      currentGroup.type !== messageType ||
      formatDate(currentGroup.date) !== formatDate(message.createdDate)
    ) {
      currentGroup = {
        type: messageType,
        date: message.createdDate,
        messages: [message],
      };
      if (currentGroup.type !== messageType)
        console.log(currentGroup.type + messageType);
      if (currentGroup.date !== message.createdDate)
        console.log(currentGroup.date + message.createdDate);
      if (!currentGroup) console.log("wow");
      groups.push(currentGroup);
    } else {
      currentGroup.messages.push(message);
    }
  });

  return groups;
}

function formatTime(fullTime) {
  const date = new Date(fullTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
}
