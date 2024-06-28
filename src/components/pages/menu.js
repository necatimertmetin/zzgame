import React, { useEffect, useState } from 'react';
import '../assets/css/menu.css';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [obstacleSpeed, setObstacleSpeed] = useState(3); // Initial single-digit value
    const [obstacleGenerationSpeed, setObstacleGenerationSpeed] = useState(3); // Initial single-digit value
    const [maxHealth, setMaxHealth] = useState(3); // Initial single-digit value

    useEffect(() => {
        const storedScore = localStorage.getItem('score');
        if (storedScore) {
            const parsedScore = parseInt(storedScore);
            setScore(parsedScore);

            const storedHighScore = localStorage.getItem('highScore');
            if (storedHighScore) {
                const parsedHighScore = parseInt(storedHighScore);
                setHighScore(parsedHighScore);

                if (parsedScore > parsedHighScore) {
                    localStorage.setItem('highScore', parsedScore.toString());
                    setHighScore(parsedScore);
                }
            } else {
                localStorage.setItem('highScore', parsedScore.toString());
                setHighScore(parsedScore);
            }
        }
    }, []);

    const startGame = () => {
        navigate('/zz', {
            state: {
                initialObstacleSpeed: (obstacleSpeed || 3) / 10, // Convert to decimal
                initialObstacleGenerationSpeed: (obstacleGenerationSpeed || 3) * 1000, // Convert to milliseconds
                initialMaxHealth: maxHealth || 3
            }
        });
    };

    return (
        <div className='menu-container zz-container'>
            <div className='menu-form'>
                <div className='menu-input-container'>
                    <label>Obstacle Speed:</label>
                    <input
                        type="number"
                        min="1"
                        max="9"
                        value={obstacleSpeed}
                        onChange={(e) => setObstacleSpeed(parseInt(e.target.value))}
                    />
                     x 10 pixels per frame
                </div>
                <div className='menu-input-container'>
                    <label>Obstacle Generation Speed:</label>
                    <input
                        type="number"
                        min="1"
                        max="9"
                        value={obstacleGenerationSpeed}
                        onChange={(e) => setObstacleGenerationSpeed(parseInt(e.target.value))}
                    />
                    seconds
                </div>
                <div className='menu-input-container'>
                    <label>Max Health:</label>
                    <input
                        type="number"
                        min="1"
                        max="9"
                        value={maxHealth}
                        onChange={(e) => setMaxHealth(parseInt(e.target.value))}
                    />
                </div>
                <div className='menu-start-button' onClick={startGame}>
                    Start
                </div>
                {score > 0 && (
                    <div className='score-display'>
                        Score: {score}
                    </div>
                )}
                {highScore > 0 && (
                    <div className='high-score-display'>
                        High Score: {highScore}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
