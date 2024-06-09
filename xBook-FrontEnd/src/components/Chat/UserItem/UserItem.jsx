import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthorAvatar from "../../Post/sideComponents/AuthorAvatar";

export default function UsersItem({
  name,
  lastMessage,
  id,
  handleUserClick,
  index,
  deleteChat,
}) {
  const [resolvedLastMessage, setResolvedLastMessage] = useState("");

  useEffect(() => {
    // if last message has more than 10 letters, hide other letters
    if (lastMessage.length > 10) {
      setResolvedLastMessage(`${lastMessage.slice(0, 10)}...`);
    } else {
      setResolvedLastMessage(lastMessage);
    }
  }, [lastMessage]);

  return (
    <Box className="chat__users_details_container">
      <Box className="chat__users_item-list">
        <Button
          className="chat__users_button-user"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => handleUserClick(index, id)}
        >
          <Box className="chat__users_item-image">
            <AuthorAvatar />
          </Box>
          <Box className="chat__users_item_text-container">
            <Box className="chat__item-name">{name}</Box>
            <Box className="chat__item-last-message">
              {resolvedLastMessage || "No messages yet"}
            </Box>
          </Box>
          <IconButton
            className="UserItem_button-delete"
            onClick={() => deleteChat(id)}
            color="primary"
          >
            <DeleteIcon />
          </IconButton>
        </Button>
      </Box>
    </Box>
  );
}
