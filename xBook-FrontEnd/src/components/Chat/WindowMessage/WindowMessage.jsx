import { Box, IconButton, MenuItem, Menu } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useState } from "react";

export default function WindowMessage({
  state,
  text,
  time,
  id,
  redactButton,
  deleteButton,
}) {
  const classNameDiv = state
    ? `chat__message-container ${state}`
    : "chat__message-container";
  const classNameText = state
    ? `chat__message-text ${state}`
    : "chat__message-text";

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classNameDiv}>
      <Box className={classNameText}>
        <Box className="chat__message-text-inside">{text}</Box>
        <Box className="chat__message">
          {state === "input" && (
            <>
              <IconButton
                className="chat__message_button"
                onClick={handleClick}
              >
                <MoreVertIcon sx={{ color: "white", border: "none" }} />
              </IconButton>
            </>
          )}
          <Box className="chat__message-time">{time}</Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                redactButton(id, text);
                handleClose();
              }}
            >
              <EditIcon />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteButton(id);
                handleClose();
              }}
            >
              <DeleteIcon />
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
