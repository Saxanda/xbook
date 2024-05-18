import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";

export default function Notification({ notification }) {
  if (!notification) {
    return null;
  }

  return (
    <div className="notification">
      <Avatar src={notification.avatar} alt={notification.fullName} />
      <div className="notification_text">
        <a href="#">{notification.fullName}</a>
        <p className="notification_text_message">{notification.message}</p>
        <p className="notification_text_time">{notification.time}</p>
      </div>
      <span className={notification.readStatus === "false"}></span>
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
      }).isRequired,
      sender: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      readStatus: PropTypes.bool.isRequired,
    })
  ),
};
