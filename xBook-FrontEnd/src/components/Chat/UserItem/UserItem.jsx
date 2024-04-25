import React, { useState, useEffect } from 'react';

export default function UsersItem({ image, name, lastMessage }) {
  const [resolvedLastMessage, setResolvedLastMessage] = useState('');

  useEffect(() => { //установка последнего сообщения
    lastMessage.then((message) => setResolvedLastMessage(message))
              .catch((error) => console.error("Error fetching last message:", error));
  }, [lastMessage]);

  return (
    <div className="chat__users_details_container">
      <div className="chat__users_item-container">
        <ul className="chat__users_item-list">
          <li className="chat__users_item-image">
            <img src={image} alt="icon.png" />
          </li>
          <li>
            <ul>
              <li>
                <p className="chat__item-name">
                  <b>{name}</b>
                </p>
              </li>
              <li>
                <p className="chat__item-last-message">
                  {resolvedLastMessage.length > 0 ? resolvedLastMessage : 'No messages yet'}
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
