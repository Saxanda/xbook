import NotificationsPage from "../components/Notifications/NotificationsPage";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Notifications() {
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/notifications/{recipientId}", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE2MDM1MzY2LCJleHAiOjE3MTY2NDAxNjZ9.dHfIcgS2v4icR1CqfdrVpoFtNwdPubJ48JxfalgnHP8`,
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
