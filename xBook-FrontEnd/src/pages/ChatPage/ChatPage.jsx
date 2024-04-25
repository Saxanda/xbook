import './Styles/ChatPageStyle.scss';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Users from "../../components/Chat/Users/Users";
import Window from '../../components/Chat/Window/Window';


import testImage from '../../../public/image/send_image_black.png';

export default function ChatPage() {
    const [inputText, setInputText] = useState('');
    const [jsonData, setJsonData] = useState(null);
    const [jsonUrl, setJsonUrl] = useState("../../../public/exapmle.json");

    useEffect(() => { //получение информации из Json
        const fetchData = async () => {
            try {
                const response = await axios.get(jsonUrl);
                setJsonData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [jsonUrl]);

    const handleUrlChange = (jsonUrl) => {
        setJsonUrl(jsonUrl);
    }

    const handleMessageSend = () => { //функция отправления сообщения, доделаю, когда появятся ендпоинты
        
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div className="chat__container">
            <ul className='chat__list'>
                <li className="chat__users"><Users onClicked={handleUrlChange}/></li>
                <li className="chat__window"><Window jsonData={jsonData} />
                    <div className="chat__container_message-input">
                        <input
                            type="text"
                            name=""
                            id=""
                            className='chat__message_input'
                            value={inputText}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleMessageSend} className='chat__message_button'>
                            <img src={testImage} alt="" className='chat__message_icon' />
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
}
