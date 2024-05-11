import './Styles/ChatPageStyle.scss';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Users from "../../components/Chat/Users/Users";
import Window from '../../components/Chat/Window/Window';

import testImage from '../../../public/image/send_image_black.png';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/token.slice/token.slice';

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
    //const token = useSelector((state) => state.token.tokenValue);
    
    // useEffect(() => {
    //     dispatch(setToken('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE1MjY2NTg2LCJleHAiOjE3MTU4NzEzODZ9.FCwSdYEU_MSqeBs16A8kh6UL4FPjHR81n7UPj83-HGY'))
    // }, [])
    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE1MjY2NTg2LCJleHAiOjE3MTU4NzEzODZ9.FCwSdYEU_MSqeBs16A8kh6UL4FPjHR81n7UPj83-HGY');
    // useEffect(() => { //Выбор первого элемента из списка чатов
    //         if(id!==Int16Array)
    //     {
    //         const fetchChats = async () => {
    //             try {
    //                 const response = await axios.get('http://localhost:8080/api/chats', {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 });
    //                 const firstChatId = response.data.length > 0 ? response.data[0].id : 0;
    //                 if (firstChatId !== 0) {
    //                     //setID(firstChatId);
    //                     setFirstUserId(firstChatId);
    //                 }
    //             } catch (error) {
    //                 console.error('Error fetching chats:', error);
    //             }
    //         };
    //         fetchChats();
    //     }
    // }, [])
    useEffect(() => { // Загрузка чата
        const fetchMessages = async () => {
            //console.log("success" + id)
            if(users.length > 0 && id!=-1)
                {
                    try {
                const response = await axios.get(`http://localhost:8080/api/chats/messages/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data);
                console.log(response.data)
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

    const handleIdChange = (index) => { //сохранение выбранного пользователем чата
        setID(index);
        localStorage.setItem('lastActiveChatID', index); 
    };
    const changeUserArray = (users) => {
        setUsers(users);
    }
    const handleMessageSend = async () => { // отправка и редактировавание сообщения
        if(isRedact) //редактирование
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
        else // отправка
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

    const changeMessage = (id, text) => { // включение функции редактировавания
        setInputText(text);
        setIsRedact(true);
        setMessageId(id);
    }

    const triggerChange = () => { // триггер
        setTrigger(prevTrigger => !prevTrigger);
    };

    const deleteTriggerChange = () => { // второй триггер
        setDeleteTrigger(prevTrigger => !prevTrigger);
    };

    const handleKeyDown = (event) => { // отправка/редактирование сообщения при нажатии enter
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
