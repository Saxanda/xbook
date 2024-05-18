import NotificationsPage from "../components/Notifications/NotificationsPage";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Notifications() {
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/notifications/{recipientId}", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE2MDM4MjY4LCJleHAiOjE3MTY2NDMwNjh9.kS46jsWr6kNqoFRTqJmFb3zkpp7j4-T6Oj7u5u0PiB0`,
        },
      })
      .then((response) => {
        setNotificationData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  return (
    <NotificationsPage notificationData={notificationData}></NotificationsPage>
  );
}
