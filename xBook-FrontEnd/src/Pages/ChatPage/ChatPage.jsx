import './Styles/ChatPageStyle.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Users from "../../components/Chat/Users/Users";
import Window from '../../components/Chat/Window/Window';
import testImage from '../../../public/image/send_image_black.png';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';

export default function ChatPage() {
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState('');
    const [isRedact, setIsRedact] = useState(false);
    const [messageId, setMessageId] = useState(0);
    const [id, setID] = useState(() => {
        const savedChatID = localStorage.getItem('lastActiveChatID');
        return savedChatID !== null ? parseInt(savedChatID) : 2;
    });
    const [userEmail, setUserEmail] = useState('');
    const [messages, setMessages] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [chatClear, setChatClear] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token") || sessionStorage.getItem("token"));
    const [someState, setSomeState] = useState('');
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    useEffect(() => {
        const fetchMessages = async () => {
            if(users.length > 0 && id !== -1) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/chats/messages/${urlID}?page=0&size=20`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setMessages(response.data.content);
                    setLoading(false);
                    setChatClear(false);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                    setChatClear(true);
                }
            } else {
                setChatClear(true);
            }
        };

        fetchMessages();
    }, [token, id, trigger, deleteTrigger, users, someState]);

    const handleIdChange = (index) => {
        setID(index);
        localStorage.setItem('lastActiveChatID', index); 
    };

    const connectWebSocket = () => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/websocket',
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });

        stompClient.onConnect = (frame) => {
            console.log('Connected to WebSocket server:', frame);
            if (userEmail) {
                const subscriptionPath = `/user/${userEmail}/queue/messages`;
                console.log('Subscribing to:', subscriptionPath);
                stompClient.subscribe(subscriptionPath, (message) => {
                    console.log("Subscription received:", message.body);
                    setSomeState(message);
                });
            } else {
                console.warn('User email is not set, cannot subscribe.');
            }
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error:', frame.headers['message']);
            console.error('Additional details:', frame.body);
        };

        stompClient.onWebSocketClose = (frame) => {
            console.log('WebSocket connection closed:', frame);
        };

        stompClient.onWebSocketError = (error) => {
            console.error('WebSocket error:', error);
        };

        stompClient.activate();

        return stompClient;
    };

    const stompClient = connectWebSocket();

    useEffect(() => {
        const userEmailTaker = async () => {
            const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserEmail(response.data.email);
        };

        if (id !== -1) {
            userEmailTaker();
        }
    }, [id, token]);

    const handleMessageSend = async () => {
        if(isRedact) {
            if (inputText !== "") {
                try {
                    const response = await axios.post(
                        `http://localhost:8080/api/v1/messages/update/${messageId}`,
                        {
                            content: inputText,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    deleteTriggerChange();
                    setInputText('');
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            }
            setIsRedact(false);
        } else {
        if (inputText !== "") {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`
                };
                stompClient.publish({
                    destination: "/app/chat",
                    body: JSON.stringify({
                        'chatId': id,
                        'contentType': 'text',
                        'content': inputText
                    }),
                    headers: headers
                });
                setInputText('');
                triggerChange();
                deleteTrigger();
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
    };

    const triggerChange = () => {
        setTrigger(prevTrigger => !prevTrigger);
    };

    const deleteTriggerChange = () => {
        setDeleteTrigger(prevTrigger => !prevTrigger);
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
                        secondTrigger={deleteTrigger}
                        triggerChange={deleteTriggerChange}
                        changeUserArray={setUsers}
                        token={token}
                        urlID={urlID}
                    />
                </li>
                {messages && (
                    <li className="chat__window">
                        <Window 
                            data={messages} 
                            token={token} 
                            trigger={deleteTriggerChange}
                            redactButton={changeMessage}
                            chatClear={chatClear} 
                        />
                        <div className="chat__container_message-input">
                            <input
                                type="text"
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
