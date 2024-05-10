import React, { useState, useEffect } from 'react';

export default function UsersItem({ image, name, lastMessage, id, handleUserClick, index, deleteChat }) {
  const [resolvedLastMessage, setResolvedLastMessage] = useState('');

  // const checker = () => {
  //   console.log(id);
  // }
  useEffect(() => {
    if (lastMessage.length > 10) {
      setResolvedLastMessage(`${lastMessage.slice(0, 10)}...`);
    } else {
      setResolvedLastMessage(lastMessage);
    }
  }, [lastMessage]);

  return (
    <div className="chat__users_details_container">
      <div className="chat__users_item-container">
                       
        <ul className="chat__users_item-list">
        <button
        className="chat__users_button-user"
        onClick={() => handleUserClick(index, id)}
        >    
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
                {resolvedLastMessage || 'No messages yet'}
                </p>
              </li>
            </ul>
          </li>
          </button>
          <button
          onClick={() => deleteChat(id)}
          >DELETE</button>
          
        </ul>
      </div>
    </div>
  );
}
