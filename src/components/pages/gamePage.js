import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/game.css';
import Game from '../game/game';
import music from '../assets/media/music.mp3';

const GamePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { initialObstacleSpeed, initialObstacleGenerationSpeed, initialMaxHealth } = location.state || {};

    const [audio] = useState(new Audio(music));
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        audio.loop = true;
        audio.volume = 0.5;
        audio.play().catch(error => console.error('Müzik çalınırken bir hata oluştu:', error));

        return () => {
            audio.pause();
        };
    }, [audio]);

    const togglePause = () => {
        setIsPaused(prevState => !prevState);
    };

    return (
        <div className='zz-container'>
            <div className='button-container'>
                <div className='leave-button' onClick={() => navigate('/')}>Leave</div>
                <div className='leave-button' onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</div>
            </div>
            <Game
                initialObstacleSpeed={initialObstacleSpeed || 0.3}
                initialObstacleGenerationSpeed={initialObstacleGenerationSpeed || 3000}
                initialMaxHealth={initialMaxHealth || 3}
                isPaused={isPaused}
            />
        </div>
    );
};

export default GamePage;
