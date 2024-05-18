import PropTypes from "prop-types";
import Notification from "./Notification";
import NotificationsHeader from "./NotificationsHeader";

export default function NotificationsPage({ notificationData }) {
  return (
    <div className="notificationsPage">
      <NotificationsHeader></NotificationsHeader>
      {notificationData ? (
        notificationData.map((notification, id) => (
          <Notification key={id} notificationData={notification} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

NotificationsPage.propTypes = {
  notificationData: PropTypes.arrayOf(
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
