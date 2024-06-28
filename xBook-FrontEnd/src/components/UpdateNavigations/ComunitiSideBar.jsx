import { Box, Link, Typography, Paper, Hidden } from '@mui/material';
import { useState, useEffect } from 'react';
import "./Sidbars.scss"

const ads = [
    {
        id: 1,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-zWzN7crRVnRJCxiUORUfwChAzH3rd35njg&s',
        link: 'https://dan-it.com.ua/uk/',
        text: 'Check out our new products!',
    },
    {
        id: 2,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbH-iIjZm72iOahJ4BuyWOPcOgFsyJkofCTwitJoKbw90cGaockWig4uEpIV_bQ2y1fB4&usqp=CAU',
        link: 'https://dan-it.com.ua/uk/',
        text: 'Special offer for limited time!',
    },
    // Додайте більше об'єктів реклами, якщо потрібно
];

export default function ComunitiSideBar(){
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [currentAd, setCurrentAd] = useState(ads[currentAdIndex]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, 5000); // Змініть інтервал зміни реклами за потреби (у мілісекундах)

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setCurrentAd(ads[currentAdIndex]);
    }, [currentAdIndex]);

    return(
        
            <Hidden  lgDown>
                
            </Hidden>
        
        
        
    )
}