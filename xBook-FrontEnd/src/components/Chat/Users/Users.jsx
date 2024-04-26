import React, { useState, useEffect } from 'react';
import UsersItem from "../UserItem/UserItem";
import axios from 'axios';

export default function Users({ onClicked, messages, currentId, trigger }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Состояние загрузки данных
    const [lastActiveUser, setLastActiveUser] = useState(0);

    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE0MTI2NjE0LCJleHAiOjE3MTQ3MzE0MTR9.JwarHBhMYVirjg-khlOKMe_5CLG8iy8n0a4He3MJOjQ');

    useEffect(() => {
        const headers = { 
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
        };
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/chats', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
                setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
            } catch (error) {
                console.error('Error fetching chats:', error);
                setLoading(false); // В случае ошибки также устанавливаем состояние загрузки в false
            }
        };

        fetchChats();
    }, [token, messages]);

    useEffect(() => {
        // Проверяем, есть ли сохраненное значение в localStorage
        const savedLastActiveUser = localStorage.getItem('lastActiveUser');
        if (savedLastActiveUser !== null) {
            setLastActiveUser(parseInt(savedLastActiveUser));
        }
    }, []);

    useEffect(() => {
        setLastActiveUser(0);
    }, [trigger])

    const handleUserClick = (index, id) => {
        setLastActiveUser(index);
        onClicked(id);
        // Сохраняем индекс активного пользователя в localStorage
        localStorage.setItem('lastActiveUser', index);
    };

    // Ожидание загрузки данных
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chat__users_container">
            <div className="chat__users_list_container">
                <ul className="chat__users-list">
                    {users.map((user, index) => (
                        <li className={`chat__users-list_item item-${index + 1} ${lastActiveUser === index ? 'active' : ''}`} key={index}>
                            <button
                                className="buttonUser"
                                onClick={() => handleUserClick(index, user.id)}
                            >
                                <UsersItem
                                    image={user.chatParticipant.avatar} 
                                    name={`${user.chatParticipant.name} ${user.chatParticipant.surname}`} 
                                    lastMessage={user.lastMessage.content} 
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
