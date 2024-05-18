import NotificationsPage from "../components/Notifications/NotificationsPage";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Notifications() {
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/notifications/{recipientId}", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE2MDI5NTkwLCJleHAiOjE3MTY2MzQzOTB9.f7nmJ4ViNi9ZLoMwqFnPwKYzXJht6cI8bo2f5Qpdb_E`,
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

  return <NotificationsPage></NotificationsPage>;
}
