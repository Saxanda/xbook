import './Styles/ChatPageStyle.scss';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Users from "../../components/Chat/Users/Users";
import Window from '../../components/Chat/Window/Window';

import testImage from '../../../public/image/send_image_black.png';
import { useDispatch, useSelector } from 'react-redux';


import { NavLink, Outlet, useParams, useLocation} from 'react-router-dom';

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
    const dispatch = useDispatch();

    let urlID = useParams().id;
    urlID = parseInt(urlID);

    

    const [token, setToken] = useState(localStorage.getItem("token") || sessionStorage.getItem("token"));
    
    useEffect(() => { // Загрузка чата
        const fetchMessages = async () => {
            //console.log("success" + id)
            if(users.length > 0 && id!=-1)
                {
                    try {
                const response = await axios.get(`http://localhost:8080/api/chats/messages/${urlID}?page=0&size=20`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data.content);
                console.log(response.data.content)
                setLoading(false);
                setChatClear(false);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setChatClear(true);
            }
                }
                else{
                    setChatClear(true);
                }
            
        };

        fetchMessages();
    }, [token, id, trigger, deleteTrigger, users]);

    const handleIdChange = (index) => { //saving the chat selected by the user
        setID(index);
        localStorage.setItem('lastActiveChatID', index); 
    };
    const changeUserArray = (users) => {
        setUsers(users);
    }
    const handleMessageSend = async () => { // Sending and editing a message
        if(isRedact) //editin
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
                    
                    deleteTriggerChange();
                    setInputText('');
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            }
            setIsRedact(false)
        }
        else // sending
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

    const changeMessage = (id, text) => { // Enable editing
        setInputText(text);
        setIsRedact(true);
        setMessageId(id);
    }

    const triggerChange = () => { // trigger
        setTrigger(prevTrigger => !prevTrigger);
    };

    const deleteTriggerChange = () => { // second trigger
        setDeleteTrigger(prevTrigger => !prevTrigger);
    };

    const handleKeyDown = (event) => { // Sending/editing a message when pressing Enter
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
