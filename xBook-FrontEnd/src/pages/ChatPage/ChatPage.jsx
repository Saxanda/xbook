import './Styles/ChatPageStyle.scss';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Users from "../../components/Chat/Users/Users";
import Window from '../../components/Chat/Window/Window';

import testImage from '../../../public/image/send_image_black.png';

export default function ChatPage() {
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState('');
    const [isRedact, setIsRedact] = useState(false);
    const [messageId, setMessageId] = useState(0);
    const [id, setID] = useState(() => {
        const savedChatID = localStorage.getItem('lastActiveChatID');
        return savedChatID !== null ? parseInt(savedChatID) : 2;
    });
    const [messages, setMessages] = useState([]);
    const [trigger, setTrigger] = useState(false);

    const [deleteTrigger, setDeleteTrigger] = useState(false);

    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE0MTI2NjE0LCJleHAiOjE3MTQ3MzE0MTR9.JwarHBhMYVirjg-khlOKMe_5CLG8iy8n0a4He3MJOjQ');
    useEffect(() => {
            if(id!==Int16Array)
        {
            const fetchChats = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/api/chats', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setID(response.data[0].id)
                } catch (error) {
                    console.error('Error fetching chats:', error);
                }
            };
            fetchChats();
        }
    }, [])
    useEffect(() => {
        const fetchMessages = async () => {
            
            try {
                const response = await axios.get(`http://localhost:8080/api/chats/messages/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data);
                setLoading(false);
                //console.log("messages reload")
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [token, id, trigger, deleteTrigger]);

    const handleIdChange = (index) => {
        setID(index);
        localStorage.setItem('lastActiveChatID', index); 
    };

    const handleMessageSend = async () => {
        if(isRedact)
        {
            if (inputText !== "") {
                try {
                    const response = await axios.post(
                        `http://localhost:8080/api/messages/update/${messageId}`,
                        {
                            content: inputText,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    //console.log('Message edit sent:', response.data);
                    
                    deleteTriggerChange();
                    setInputText('');
                    //localStorage.setItem('lastActiveUser', 0);
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            }
            setIsRedact(false)
        }
        else
        {
            if (inputText !== "") {
            try {
                const response = await axios.post(
                    'http://localhost:8080/api/messages/send',
                    {
                        chatId: id,
                        contentType: 'text',
                        content: inputText,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                //console.log('Message sent:', response.data);
                triggerChange();
                setInputText('');
                localStorage.setItem('lastActiveUser', 0);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
        }
    };

    const changeMessage = (id, text) => {
        setInputText(text);
        setIsRedact(true);
        setMessageId(id);
    }

    const triggerChange = () => {
        setTrigger(prevTrigger => !prevTrigger);
    };

    const deleteTriggerChange = () => {
        //console.log(trigger)
        setDeleteTrigger(prevTrigger => !prevTrigger);
        //console.log("changed")
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleMessageSend();
        }
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div className="chat__container">
            <ul className='chat__list'>
                <li className="chat__users">
                    <Users
                        onClicked={handleIdChange}
                        messages={messages}
                        currentId={id}
                        trigger={trigger}
                        triggerChange={deleteTriggerChange}
                    />
                </li>

                {messages && (
                    <li className="chat__window">
                        <Window 
                        data={messages} 
                        token={token} 
                        trigger={deleteTriggerChange}
                        redactButton={changeMessage} 
                        />
                        <div className="chat__container_message-input">
                            <input
                                type="text"
                                name=""
                                id=""
                                className='chat__message_input'
                                value={inputText}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={handleMessageSend} className='chat__message_button'>
                                <img src={testImage} alt="" className='chat__message_icon' />
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}
