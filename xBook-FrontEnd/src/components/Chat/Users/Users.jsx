import React, { useState, useEffect } from 'react';
import UsersItem from "../UserItem/UserItem";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Users({ onClicked, trigger, secondTrigger ,triggerChange, changeUserArray, token, urlID }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastActiveUser, setLastActiveUser] = useState(0);
    const [emailVer, setEmailVer] = useState(false);

    const [emptyChat, setEmptyChat] = useState(false);

    const [inputText, setInputText] = useState('');
    const navigate = useNavigate();
    useEffect(() =>{
        if(urlID === -1) 
            {
                setLastActiveUser(-1);
                localStorage.setItem('lastActiveUser', -1);
                localStorage.setItem('lastActiveChatID', -1);
            }
    }, [urlID])

    const deleteChat = async (id) => { // удаление чата
        if(users.length <=1) setLastActiveUser(-1)
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/chats/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log( "lastActive: " + localStorage.getItem("lastActiveUserId") + " id: " + id)
            if(localStorage.getItem("lastActiveUserId") == id)
                {
                   handleIdChange();
                   triggerChange();
                }
            else{
                //console.log(localStorage.getItem("lastActiveUserId"));
                //console.log(id);
                triggerChange();
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }

    const handleIdChange = () => { //changing active chat after deleting chat
        let lastIndex = parseInt(lastActiveUser);
        console.log(users.length)
        let tempId;
        if(users.length == 1) lastIndex = null
        if (lastIndex !== null) {
            if (lastIndex < users.length - 1) {
                tempId = users[lastIndex+1].id;
            } else {
                lastIndex--;
                tempId = users[lastIndex].id;
            }
        }
        else
        {
            lastIndex = 0;
            tempId = -1;
        }
        handleUserClick(lastIndex, tempId);
    };
    
    useEffect(() => { // chat list
            //console.log(localStorage.getItem("token") || sessionStorage.getItem("token"))
        const headers = { 
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            accept: "*/*",
        };
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/chats', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data.content);
                changeUserArray(response.data.content)
                setLoading(false);
                if(emptyChat)
                    {
                        const tempId = response.data.content[0].id;
                        handleUserClick(0, tempId);
                        localStorage.setItem("lastActiveUserId", tempId)
                        setEmptyChat(false);
                    }
            } catch (error) {
                console.error('Error fetching chats:', error);
                setLoading(false);
            }
        };

        fetchChats();
    }, [token, trigger, secondTrigger]);

    useEffect(() => { // saving which user was the last chat with
        const savedLastActiveUser = localStorage.getItem('lastActiveUser');
        if (savedLastActiveUser !== null) {
            setLastActiveUser(parseInt(savedLastActiveUser));
        }
    }, []);

    const [isFirstLoad, setIsFirstLoad] = useState(true);
    useEffect(() => { // Saves the first chat when the page first loads
        if (!isFirstLoad) {
            setLastActiveUser(0);
        }
        setIsFirstLoad(false);
    }, [trigger]);

    const handleUserClick = (index, id) => { // when you click on a chat, save the new last user
        setLastActiveUser(index);
        onClicked(id);
        console.log("id: " + id + " index: " + index);
        localStorage.setItem('lastActiveUser', index);
        localStorage.setItem('lastActiveUserId', id);
        navigate(`/chats/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleKeyDown = (event) => { // on press enter add chat
        if (event.key === 'Enter') {
            handleChatAdd();
        }
    };

    const handleChatAdd = async () => { // chat add
        
        try {
            const response = await axios.post(
                `http://localhost:8080/api/v1/chats/create/${inputText}`,
                {
                    email: inputText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setInputText('');
            triggerChange();
            setEmailVer(false)
            if(lastActiveUser!=0 && lastActiveUser!=-1)
            {
                localStorage.setItem('lastActiveUser', parseInt(localStorage.getItem('lastActiveUser')) + 1);
            }
            else
            {
                localStorage.setItem('lastActiveUser', 0);
                setEmptyChat(true);
            }
            
            setLastActiveUser(parseInt(localStorage.getItem('lastActiveUser')));
        } catch (error) {
            setEmailVer(true)
            console.error('Error sending message:', error);
        }
    };


    return (
        <div className="chat__users_container">
            <div className="chat__users_list_container">
                <ul className="chat__users-list">
                    <li className='chat__users-add-container'>
                        <button 
                            onClick={handleChatAdd}
                            className="chat__users-add"
                        >
                            <div >
                                <p>ADD A NEW CHAT</p>
                            </div>
                        </button>
                        <input 
                            type="text"
                            name=""
                            id=""
                            className='chat__users-add-inp'
                            value={inputText}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                            {emailVer && <p>Wrong email</p>}
                    </li>
                    {users.map((user, index) => (
                        <li className={`chat__users-list_item item-${index + 1} ${lastActiveUser === index ? 'active' : ''}`} key={index}>
                            
                                <UsersItem
                                    image={user.chatParticipant.avatar} 
                                    name={`${user.chatParticipant.name} ${user.chatParticipant.surname}`} 
                                    lastMessage={user.lastMessage ? user.lastMessage.content : "No messages yet"}
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
