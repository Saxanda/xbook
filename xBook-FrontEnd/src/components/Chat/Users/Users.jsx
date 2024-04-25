import React, { useState, useEffect } from 'react';
import UsersItem from "../UserItem/UserItem";
import exampleImage from "../../../../public/image/exampleImage.jpg";
import exampleImage2 from "../../../../public/image/exampleImage2.jpg";
import jsonData from "../../../../public/users.json";

export default function Users({ onClicked }) {
    const [users, setUsers] = useState([]);
    const [lastActiveUser, setLastActiveUser] = useState(0);

    useEffect(() => {
        setUsers(jsonData.users);
    }, []);

    const handleUserClick = (index, jsonUrl) => { //переключение чата
        setLastActiveUser(index);
        onClicked(jsonUrl);
    };

    const GetLastMessage = (jsonUrl) => { //функция выдающая последнее сообщение пользователя
        const jsonData = fetch(jsonUrl)
          .then((response) => response.json())
          .catch((error) => console.error("Ошибка загрузки JSON:", error));
      
        return jsonData.then((data) => {
          const messages = data.messages;
      
          if (messages.length > 0) {
            return messages[messages.length - 1].text;
          } else {
            return "В JSON-файле нет сообщений.";
          }
        });
      };

    return (
        <div className="chat__users_container">
            <div className="chat__users_list_container">
                <ul className="chat__users-list">
                    {users.map((user, index) => (
                        <li className={`chat__users-list_item item-${index + 1} ${lastActiveUser === index ? 'active' : ''}`} key={index}>
                            <button 
                                className="buttonUser"
                                onClick={() => handleUserClick(index, user.jsonUrl)}
                            >
                                <UsersItem 
                                    image={index === 0 ? exampleImage : exampleImage2} 
                                    name={user.name} 
                                    lastMessage={GetLastMessage(user.jsonUrl)}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
