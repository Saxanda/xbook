import './Styles/ChatPageStyle.scss';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Users from "../../components/Chat/Users/Users";
import Window from '../../components/Chat/Window/Window';

import testImage from '../../../public/image/send_image_black.png';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink, Outlet, useParams, useLocation} from 'react-router-dom';

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
    const [firstUserId, setFirstUserId] = useState((0));
    const [messages, setMessages] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [chatClear, setChatClear] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token") || sessionStorage.getItem("token"));

    const dispatch = useDispatch();
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/websocket',
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });
    
        stompClient.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe("/user/alice.smith@example.com/queue/messages", (message) => {
                console.log("Subscribe is WORKING!!!");
                console.log(message);
                console.log(message.body);
            });
        };
    
        stompClient.activate();
    }, [])

    

    function sendName() {
        console.log("sendName function is working!");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        stompClient.publish({
            destination: "/app/chat",
            body: JSON.stringify({
                'chatId': 1,
                'contentType': 'text',
                'content': $("#name").val()
            }),
            headers: headers
        });
    }

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
    }, [token, id, trigger, deleteTrigger, users]);

    const handleIdChange = (index) => {
        setID(index);
        localStorage.setItem('lastActiveChatID', index); 
    };

    const changeUserArray = (users) => {
        setUsers(users);
    };

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
                    const response = await axios.post(
                        'http://localhost:8080/api/v1/messages/send',
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
                    triggerChange();
                    setInputText('');
                    localStorage.setItem('lastActiveUser', 0);
                    localStorage.setItem('lastActiveUserId', 0);
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
                        changeUserArray={changeUserArray}
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
