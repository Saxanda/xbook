import React, { useState, useEffect, useRef } from 'react';
import WindowMessage from "../WindowMessage/WindowMessage";
import axios from 'axios';


export default function Window({ data, token, trigger, redactButton, chatClear }) {
    const [messages, setMessages] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const chatWindowRef = useRef(null);
    

    useEffect(() => {
        if (data) {
            setMessages(data); 
            setInitialized(true);
        }
    }, [data]);
    const groupedMessages = initialized ? groupMessagesByTypeAndDate(messages) : [];
    let prevDate = null;

    useEffect(() => {
            chatWindowRef.current?.scrollTo({ top: chatWindowRef.current.scrollHeight });
    }, [messages]); 

    const deleteMessage = async (id) =>{
        try {
            const response = await axios.delete(`http://localhost:8080/api/messages/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            trigger();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }

    return (
        <div className="chat__window_container">
            {chatClear ? (
                <div className="chat__window-chat">
                    <p>No chat chosen</p>
                </div>
            ) : (
                <div ref={chatWindowRef} className="chat__window-chat">
                    {messages.length === 0 ? (
                        <p>No messages yet</p>
                    ) : (
                        groupedMessages.map((group, index) => (
                            <div key={index} className={`chat__message-block ${group.type}`}>
                                {group.messages.map((message, idx) => {
                                    const formattedDate = formatDate(message.createdDate);
                                    const shouldDisplayDate = formattedDate !== prevDate;
                                    prevDate = formattedDate;
    
                                    return (
                                        <React.Fragment key={idx}>
                                            {shouldDisplayDate && <p className='chat__message-date'>{formattedDate}</p>}
                                            <WindowMessage 
                                                text={message.content} 
                                                state={typeChecker(message)} 
                                                time={formatTime(message.createdDate)}
                                                id={message.id}
                                                deleteButton={deleteMessage} 
                                                redactButton={redactButton}
                                            />
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
    
}

function typeChecker(message) {
    let type = 'none';
    if(message.chat.chatParticipant.name !== message.sender.name) type = "input";
    else type = "output";
    return type;
}

function groupMessagesByTypeAndDate(messages) {
    const groups = [];
    let currentGroup = null;

    messages.forEach(message => {
        const messageType = typeChecker(message);
        if (!currentGroup || currentGroup.type !== messageType || formatDate(currentGroup.date) !== formatDate(message.createdDate)) {
            currentGroup = {
                type: messageType,
                date: message.createdDate,
                messages: [message]
            };
            if(currentGroup.type !== messageType) console.log(currentGroup.type + messageType)
            if(currentGroup.date !== message.createdDate) console.log(currentGroup.date + message.createdDate)
            if(!currentGroup) console.log("wow")
            groups.push(currentGroup);
        } else {
            currentGroup.messages.push(message);
        }
    });

    return groups;
}



function formatTime(fullTime) {
    const date = new Date(fullTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function formatDate(date) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
}


