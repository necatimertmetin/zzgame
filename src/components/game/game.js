import React, { useState, useEffect, useRef } from 'react';
import upImg from '../assets/media/up.png';
import downImg from '../assets/media/down.png';
import leftImg from '../assets/media/left.png';
import rightImg from '../assets/media/right.png';
import notUpImg from '../assets/media/notUp.png';
import notDownImg from '../assets/media/notDown.png';
import notLeftImg from '../assets/media/notLeft.png';
import notRightImg from '../assets/media/notRight.png';
import { useNavigate } from 'react-router-dom';

const Game = ({
    initialObstacleSpeed,
    initialObstacleGenerationSpeed,
    initialMaxHealth,
    isPaused
}) => {
    const navigate = useNavigate();
    const winPrize = 10;
    const losePrize = 10;
    const [consecutiveLossCount, setConsecutiveLossCount] = useState(0);
    const [obstacles, setObstacles] = useState([]);
    const [score, setScore] = useState(0);
    const playerRef = useRef(null);
    const maxHealth = initialMaxHealth;
    const [obstacleSpeed, setObstacleSpeed] = useState(initialObstacleSpeed);
    const [obstacleGenerationSpeed, setObstacleGenerationSpeed] = useState(initialObstacleGenerationSpeed);
 

    
    const winPoint = () => {
        const newScore = parseInt(score) + winPrize;
        localStorage.setItem('score', newScore); // localStorage'a yeni score'u kaydet
        setScore(newScore); // State'teki score'u güncelle
        setConsecutiveLossCount(0); // Kazanma durumunda consecutiveLossCount'u sıfırla
    };

    const losePoint = () => {
        const newScore = parseInt(score) - losePrize;

        localStorage.setItem('score', newScore); // Değilse localStorage'a yeni score'u kaydet
        setScore(newScore); // State'teki score'u güncelle

        // Art arda üç kez kaybetme durumunu kontrol et
        if (consecutiveLossCount + 1 === maxHealth) {
            setConsecutiveLossCount(0); // consecutiveLossCount'u sıfırla
            navigate("/"); // Yönlendirme işlemi
        } else {
            setConsecutiveLossCount(consecutiveLossCount + 1); // consecutiveLossCount'u artır
        }

    };

    useEffect(() => {
        if (isPaused) return;
        const handleKeyDown = (event) => {
            const directions = ['left', 'right', 'up', 'down', 'not left', 'not right', 'not up', 'not down'];

            for (let direction of directions) {
                const obstaclesWithDirection = obstacles.filter(
                    obstacle =>
                        obstacle &&
                        obstacle.name === direction &&
                        obstacle.visible &&
                        obstacle.collisionChecker[0] !== obstacle.collisionChecker[1] &&
                        obstacle.collisionChecker.includes(true) &&
                        !obstacle.collisionChecker.every(check => !check)
                );

                if (obstaclesWithDirection.length > 0) {
                    // Check if the user pressed the corresponding arrow key
                    handleObstacleInteraction(direction, event, obstaclesWithDirection);
                }
            }
        };

        const handleObstacleInteraction = (direction, event, obstaclesWithDirection) => {
            switch (direction) {
                case 'left':
                    if (event.key === "ArrowLeft" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {

                        winPoint();
                    } else {

                        losePoint();
                    }
                    break;
                case 'right':
                    if (event.key === "ArrowRight" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {

                        winPoint();
                    } else {

                        losePoint();
                    }
                    break;
                case 'up':
                    if (event.key === "ArrowUp" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {

                        winPoint();
                    } else {

                        losePoint();
                    }
                    break;
                case 'down':
                    if (event.key === "ArrowDown" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {

                        winPoint();
                    } else {

                        losePoint();
                    }
                    break;
                case 'not left':
                    if (event.key !== "ArrowLeft" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {

                        winPoint();
                    } else {

                        losePoint();
                    }
                    break;
                case 'not right':
                    if (event.key !== "ArrowRight" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {

                        winPoint();
                    } else {

                        losePoint();
                    }
                    break;
                case 'not up':
                    if (event.key !== "ArrowUp" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {

                        winPoint();
                    } else {

                        losePoint();
                    }
                    break;
                case 'not down':
                    if (event.key !== "ArrowDown" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {

                        winPoint();
                    } else {

                        losePoint();
                    }
                    break;
                default:
                    break;
            }



            setObstacles(prevObstacles =>
                prevObstacles.filter(obstacle => obstacle && obstacle.id !== obstaclesWithDirection[0]?.id)
            );


        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [obstacles, winPoint, losePoint, isPaused]);









// createObstacle fonksiyonu, engel oluşturma işlemini gerçekleştirir
const createObstacle = () => {
    const directions = ['leftToRight', 'rightToLeft', 'topToBottom', 'bottomToTop'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    let newLeft, newTop;

    switch (randomDirection) {
      case 'leftToRight':
        newLeft = '0%';
        newTop = 'calc(50% - 25px)';
        break;
      case 'rightToLeft':
        newLeft = '100%';
        newTop = 'calc(50% - 25px)';
        break;
      case 'topToBottom':
        newLeft = 'calc(50% - 25px)';
        newTop = '0%';
        break;
      case 'bottomToTop':
        newLeft = 'calc(50% - 25px)';
        newTop = '100%';
        break;
      default:
        break;
    }

    const names = [
      { name: 'up', src: upImg },
      { name: 'down', src: downImg },
      { name: 'left', src: leftImg },
      { name: 'right', src: rightImg },
      { name: 'not up', src: notUpImg },
      { name: 'not down', src: notDownImg },
      { name: 'not left', src: notLeftImg },
      { name: 'not right', src: notRightImg },
    ];
    const randomNameObject = names[Math.floor(Math.random() * names.length)];

    setObstacles((prevObstacles) => [
      ...prevObstacles,
      {
        id: Date.now() + Math.random(),
        top: newTop,
        left: newLeft,
        direction: randomDirection,
        speed: obstacleSpeed,
        visible: true,
        ref: React.createRef(),
        name: randomNameObject.name,
        src: randomNameObject.src,
        collisionChecker: [false, false],
      },
    ]);

    // Her engel oluşturulduğunda generationSpeed'i azalt
    if(obstacleGenerationSpeed > 600){
        setObstacleGenerationSpeed(prevSpeed => Math.max(prevSpeed - prevSpeed/10, 600));
        console.log(obstacleGenerationSpeed)
    }
   
  };

  const startInterval = (generationSpeed) => {
    return setInterval(() => {
      createObstacle();
    }, generationSpeed);
  };

  useEffect(() => {
    if (isPaused) return;

    let intervalId = startInterval(obstacleGenerationSpeed);

    return () => clearInterval(intervalId); // Cleanup fonksiyonu
  }, [isPaused, obstacleGenerationSpeed]);
  
      

    useEffect(() => {
        if (isPaused) return;
        const animateObstacles = () => {
            setObstacles((prevObstacles) =>
                prevObstacles.map((obstacle) => {
                    if (!obstacle) return;
                    if (!obstacle.visible) return obstacle;

                    let newLeft = parseFloat(obstacle.left);
                    let newTop = parseFloat(obstacle.top);

                    switch (obstacle.direction) {
                        case 'leftToRight':
                            newLeft += obstacle.speed;
                            if (newLeft > 100) obstacle.visible = false;
                            break;
                        case 'rightToLeft':
                            newLeft -= obstacle.speed;
                            if (newLeft < 0) obstacle.visible = false;
                            break;
                        case 'topToBottom':
                            newTop += obstacle.speed;
                            if (newTop > 100) obstacle.visible = false;
                            break;
                        case 'bottomToTop':
                            newTop -= obstacle.speed;
                            if (newTop < 0) obstacle.visible = false;
                            break;
                        default:
                            break;
                    }

                    return { ...obstacle, left: `${newLeft}%`, top: `${newTop}%` };
                })
            );
        };

        const animationId = setInterval(animateObstacles, 16); // Yaklaşık 60 FPS

        return () => clearInterval(animationId);
    }, [isPaused]);

    useEffect(() => {
        if (isPaused) return;
        const checkCollision = () => {
            if (!playerRef.current) return;

            const playerRect = playerRef.current.getBoundingClientRect();

            // Deadzone'ların pozisyonlarını hesapla
            const leftDeadzone = {
                top: playerRect.top,
                left: playerRect.left - playerRect.width,
                width: playerRect.width,
                height: playerRect.height,
            };
            const rightDeadzone = {
                top: playerRect.top,
                left: playerRect.right,
                width: playerRect.width,
                height: playerRect.height,
            };
            const topDeadzone = {
                top: playerRect.top - playerRect.height,
                left: playerRect.left,
                width: playerRect.width,
                height: playerRect.height,
            };
            const bottomDeadzone = {
                top: playerRect.bottom,
                left: playerRect.left,
                width: playerRect.width,
                height: playerRect.height,
            };

            let collisionDetected = false;

            setObstacles((prevObstacles) =>
                prevObstacles && prevObstacles.map((obstacle) => {
                    if (!obstacle) return;
                    if (!obstacle || !obstacle.visible || collisionDetected) return obstacle;
                    if (!obstacle.ref.current) return;

                    const obstacleRect = obstacle.ref.current.getBoundingClientRect();
                    let collisionChecker = [...obstacle.collisionChecker];

                    // Check collision with player true ise yok oluyor????
                    if (!collisionChecker[0]) {
                        switch (obstacle.direction) {
                            case 'leftToRight':
                                collisionChecker[0] = (
                                    obstacleRect.left < rightDeadzone.left + rightDeadzone.width &&
                                    obstacleRect.right > rightDeadzone.left &&
                                    obstacleRect.top < rightDeadzone.top + rightDeadzone.height &&
                                    obstacleRect.bottom > rightDeadzone.top
                                );
                                break;
                            case 'rightToLeft':
                                collisionChecker[0] = (
                                    obstacleRect.left < leftDeadzone.left + leftDeadzone.width &&
                                    obstacleRect.right > leftDeadzone.left &&
                                    obstacleRect.top < leftDeadzone.top + leftDeadzone.height &&
                                    obstacleRect.bottom > leftDeadzone.top
                                );
                                break;
                            case 'topToBottom':
                                collisionChecker[0] = (
                                    obstacleRect.left < bottomDeadzone.left + bottomDeadzone.width &&
                                    obstacleRect.right > bottomDeadzone.left &&
                                    obstacleRect.top < bottomDeadzone.top + bottomDeadzone.height &&
                                    obstacleRect.bottom > bottomDeadzone.top
                                );
                                break;
                            case 'bottomToTop':
                                collisionChecker[0] = (
                                    obstacleRect.left < topDeadzone.left + topDeadzone.width &&
                                    obstacleRect.right > topDeadzone.left &&
                                    obstacleRect.top < topDeadzone.top + topDeadzone.height &&
                                    obstacleRect.bottom > topDeadzone.top
                                );
                                break;
                            default:
                                break;
                        }
                    }

                    // Check collision with deadzones
                    if (!collisionChecker[1]) {
                        switch (obstacle.direction) {
                            case 'leftToRight':
                                collisionChecker[1] = (
                                    obstacleRect.left < leftDeadzone.left + leftDeadzone.width &&
                                    obstacleRect.right > leftDeadzone.left &&
                                    obstacleRect.top < leftDeadzone.top + leftDeadzone.height &&
                                    obstacleRect.bottom > leftDeadzone.top
                                );
                                break;
                            case 'rightToLeft':
                                collisionChecker[1] = (
                                    obstacleRect.left < rightDeadzone.left + rightDeadzone.width &&
                                    obstacleRect.right > rightDeadzone.left &&
                                    obstacleRect.top < rightDeadzone.top + rightDeadzone.height &&
                                    obstacleRect.bottom > rightDeadzone.top
                                );
                                break;
                            case 'topToBottom':
                                collisionChecker[1] = (
                                    obstacleRect.left < topDeadzone.left + topDeadzone.width &&
                                    obstacleRect.right > topDeadzone.left &&
                                    obstacleRect.top < topDeadzone.top + topDeadzone.height &&
                                    obstacleRect.bottom > topDeadzone.top
                                );
                                break;
                            case 'bottomToTop':
                                collisionChecker[1] = (
                                    obstacleRect.left < bottomDeadzone.left + bottomDeadzone.width &&
                                    obstacleRect.right > bottomDeadzone.left &&
                                    obstacleRect.top < bottomDeadzone.top + bottomDeadzone.height &&
                                    obstacleRect.bottom > bottomDeadzone.top
                                );
                                break;
                            default:
                                break;
                        }
                    }

                    // Update obstacle visibility and collision checker
                    const updatedObstacle = {
                        ...obstacle,
                        collisionChecker,
                        visible: !(collisionChecker[0] && collisionChecker[1]),
                    };


                    // Set collisionDetected to true if either collision checker is true
                    if (collisionChecker[0] || collisionChecker[1]) {
                        collisionDetected = true;
                    }
                    if (!updatedObstacle.visible) {
                        //obstacle deleted silindi
                        losePoint();
                    }
                    return updatedObstacle;
                })
            );

        };

        const animationId = requestAnimationFrame(checkCollision); // Run checkCollision on every animation frame

        return () => cancelAnimationFrame(animationId); // Cleanup animation frame
    }, [obstacles, playerRef, isPaused]);




    return (
        <div className='game-container' style={containerStyle}>
            <div className='player-deadzone left' style={{ ...deadzoneStyle, ...leftDeadzoneStyle }} />
            <div className='player-deadzone right' style={{ ...deadzoneStyle, ...rightDeadzoneStyle }} />
            <div className='player-deadzone top' style={{ ...deadzoneStyle, ...topDeadzoneStyle }} />
            <div className='player-deadzone bottom' style={{ ...deadzoneStyle, ...bottomDeadzoneStyle }} />
            <div className='player-shooting-range' />
            {obstacles.map((obstacle) =>
                obstacle && obstacle.visible ? (
                    <div
                        key={obstacle.id}
                        ref={obstacle.ref}
                        className='obstacle'
                        style={{
                            ...obstacleStyle,
                            top: obstacle.top,
                            left: obstacle.left,
                        }}
                    >
                        <img className='obstacle-image' src={obstacle.src} alt={obstacle.name} />
                    </div>
                ) : null
            )}
            <div ref={playerRef} className='player' style={playerStyle}>{score}</div>
        </div>
    );
};

const containerStyle = {
    position: 'relative',
    height: '100vh',
    width: '100vw',
};

const deadzoneStyle = {
    position: 'absolute',
    width: '100px',
    height: '100px',
    top: '50%',
    left: '50%'
};

const obstacleStyle = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    zIndex: 10000
};

const playerStyle = {
    backgroundColor: '#555',
    height: '100px',
    width: '100px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    outline: 'none',
};

// Deadzone stilleri
const topDeadzoneStyle = {
    transform: 'translate(-50%, -150px)',
};
const leftDeadzoneStyle = {
    transform: 'translate(-150px, -50%)',
};
const rightDeadzoneStyle = {
    transform: 'translate(50px, -50%)',
};
const bottomDeadzoneStyle = {
    transform: 'translate(-50%, 50px)',
};

export default Game;
