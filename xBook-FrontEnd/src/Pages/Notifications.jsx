import NotificationsPage from "../components/Notifications/NotificationsPage";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Notifications() {
  const [notificationData, setNotificationData] = useState([]);
  const token = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );
  const recipientId = useState(localStorage.getItem("recipientId"));

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/notifications/${recipientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNotificationData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, [token, recipientId]);

  return (
    <NotificationsPage notificationData={notificationData}></NotificationsPage>
  );
}
