// FlipCardGrid.js
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './index.css';

const prizes = ['🎉 100 Coins', '⭐ 50 Points', '🍒 Bonus', '🎁 Gift', '🔔 Try Again'];
const totalCards = 9;

const FlipCardGrid = ({ maxAttempts = 3, onFinish }) => {
  const [flippedCards, setFlippedCards] = useState(Array(totalCards).fill(false));
  const [attempts, setAttempts] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);

  useEffect(() => {
    // 从本地存储中获取抽奖记录
    const playedToday = localStorage.getItem('hasPlayedToday') === 'true';
    setHasPlayedToday(playedToday);
  }, []);

  const handleFlip = (index) => {
    if (flippedCards[index] || attempts >= maxAttempts || hasPlayedToday) return;

    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = true;
    setFlippedCards(newFlippedCards);

    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    setWonPrize(prize);
    setAttempts(attempts + 1);
    
    if (prize !== '🔔 Try Again') {
      setShowConfetti(true);
      localStorage.setItem('hasPlayedToday', 'true'); // 记录今天已玩
      setHasPlayedToday(true);
    }

    setTimeout(() => {
      onFinish && onFinish(prize);
    }, 1000);
  };

  const resetGame = () => {
    setFlippedCards(Array(totalCards).fill(false));
    setAttempts(0);
    setWonPrize(null);
    setShowConfetti(false);
  };

  return (
    <div className="flip-card-grid-container">
      {showConfetti && <Confetti />}
      <h2>Flip Card Lottery</h2>
      <p>Attempts: {attempts} / {maxAttempts}</p>
      <div className="flip-card-grid">
        {Array(totalCards).fill().map((_, i) => (
          <div
            key={i}
            className={`flip-card ${flippedCards[i] ? 'flipped' : ''}`}
            onClick={() => handleFlip(i)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">?</div>
              <div className="flip-card-back">
                {flippedCards[i] ? wonPrize : 'Loading...'}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame} disabled={attempts < maxAttempts}>
        Reset Game
      </button>
      {hasPlayedToday && <p>You have already played today!</p>}
    </div>
  );
};

export default FlipCardGrid;