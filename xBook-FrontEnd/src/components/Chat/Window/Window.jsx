import React, { useState, useEffect, useRef } from 'react';
import WindowMessage from "../WindowMessage/WindowMessage";
import axios from 'axios';

const currentYear = 2024;

export default function Window({ jsonData }) {
    const [messages, setMessages] = useState([]);

    const chatWindowRef = useRef(null); //реф для прокрутки

    useEffect(() => {
        if (jsonData) {
            setMessages(jsonData.messages);
        }
    }, [jsonData]);

    const groupedMessages = groupMessagesByTypeAndDate(messages); //группировка сообщений по типу

    let prevDate = null;

    useEffect(() => { //скрол вниз при прогрузке чата
        chatWindowRef.current?.scrollTo({ top: chatWindowRef.current.scrollHeight });
    }, [messages]); 

    return (
        <div className="chat__window_container">
            <div ref={chatWindowRef} className="chat__window-chat">
                {groupedMessages.map((group, index) => (
                    <div key={index} className={`chat__message-block ${group.type}`}>
                        {group.messages.map((message, idx) => {
                            const formattedDate = formatDate(group.date);
                            const shouldDisplayDate = message.date !== prevDate;
                            prevDate = message.date;

                            return (
                                <React.Fragment key={idx}>
                                    {shouldDisplayDate && <p className='chat__message-date'>{formattedDate}</p>}
                                    <WindowMessage text={message.text} state={message.type} time={formatTime(message.time)} />
                                </React.Fragment>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

function groupMessagesByTypeAndDate(messages) { //функция группировки сообщений по типу
    const groups = [];
    let currentGroup = null;

    messages.forEach(message => {
        if (!currentGroup || currentGroup.type !== message.type || currentGroup.date !== message.date) {
            currentGroup = {
                type: message.type,
                date: message.date,
                messages: [message]
            };
            groups.push(currentGroup);
        } else {
            currentGroup.messages.push(message);
        }
    });

    return groups;
}

function formatTime(fullTime) { //возвращения из полного времени в только часы:минуты
    const [hours, minutes] = fullTime.split(':').slice(0, 2);
    return `${hours}:${minutes}`;
}

function formatDate(date) { //преоразования даты
    const [day, month, year] = date.split('.');
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const formattedMonth = months[parseInt(month, 10) - 1];

    if (parseInt(year, 10) === currentYear) {
        return `${day} ${formattedMonth}`;
    } else {
        return `${day} ${formattedMonth} ${year}`;
    }
}
