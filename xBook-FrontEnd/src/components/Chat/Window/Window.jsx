import React, { useState, useEffect, useRef } from 'react';
import WindowMessage from "../WindowMessage/WindowMessage";
import axios from 'axios';

const currentYear = 2024;

export default function Window({ data, token, trigger, redactButton }) {
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

    const deleteMessage = (id) =>{
        try {
            const response =  axios.delete(`http://localhost:8080/api/messages/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error deleting message:', error);
        }
        trigger();
    }

    return (
        <div className="chat__window_container">
            <div ref={chatWindowRef} className="chat__window-chat">
                {groupedMessages.map((group, index) => (
                    <div key={index} className={`chat__message-block ${group.type}`}>
                        {group.messages.map((message, idx) => {
                            const formattedDate = formatDate(message.createdDate);
                            
                            const shouldDisplayDate = formatDate(message.createdDate) !== prevDate;
                            prevDate = formatDate(message.createdDate);

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
                ))}
            </div>
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
        //console.log(message.id)
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
        //console.log(currentGroup);
        //console.log(groups);
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


