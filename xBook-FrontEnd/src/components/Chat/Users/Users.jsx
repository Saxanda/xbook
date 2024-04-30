import React, { useState, useEffect } from 'react';
import UsersItem from "../UserItem/UserItem";
import axios from 'axios';

export default function Users({ onClicked, messages, currentId, trigger, triggerChange }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastActiveUser, setLastActiveUser] = useState(0);

    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE0MTI2NjE0LCJleHAiOjE3MTQ3MzE0MTR9.JwarHBhMYVirjg-khlOKMe_5CLG8iy8n0a4He3MJOjQ');

    const deleteChat = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/chats/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //console.log('Message deleted:', response.data);
            triggerChange();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }
    
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
                //console.log(response.data[0].id);
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching chats:', error);
                setLoading(false);
            }
        };

        fetchChats();
    }, [token, messages]);

    useEffect(() => {
        const savedLastActiveUser = localStorage.getItem('lastActiveUser');
        if (savedLastActiveUser !== null) {
            setLastActiveUser(parseInt(savedLastActiveUser));
        }
    }, []);

    const [isFirstLoad, setIsFirstLoad] = useState(true);
    useEffect(() => {
        if (!isFirstLoad) {
            setLastActiveUser(0);
        }
        setIsFirstLoad(false);
    }, [trigger]);

    const handleUserClick = (index, id) => {
        setLastActiveUser(index);
        onClicked(id);
        localStorage.setItem('lastActiveUser', index);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="chat__users_container">
            <div className="chat__users_list_container">
                <ul className="chat__users-list">
                    {users.map((user, index) => (
                        <li className={`chat__users-list_item item-${index + 1} ${lastActiveUser === index ? 'active' : ''}`} key={index}>
                            
                                <UsersItem
                                    image={user.chatParticipant.avatar} 
                                    name={`${user.chatParticipant.name} ${user.chatParticipant.surname}`} 
                                    lastMessage={user.lastMessage.content}
                                    id={user.id} 
                                    index={index}
                                    handleUserClick={handleUserClick}
                                    deleteChat={deleteChat}
                                />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
