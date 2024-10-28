import React, { useState } from 'react';
import './index.css'; // 引入样式

const FlipCard = ({ prize, coverText = '抽奖', onFlip }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(true);
    onFlip && onFlip(prize);
  };

  return (
    <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flip-card-inner">
        {/* 卡片的正面 */}
        <div className="flip-card-front">
          <span>{coverText}</span>
        </div>

        {/* 卡片的背面 (中奖信息) */}
        <div className="flip-card-back">
          <span>{prize}</span>
        </div>
      </div>
    </div>
  );
};

const FlipCardLottery = ({ prizes }) => {
  const handleFlipResult = (prize) => {
    //alert(`🎉 你获得了: ${prize}`);
  };

  return (
    <div className="flip-card-container">
      {prizes.map((prize, index) => (
        <FlipCard key={index} prize={prize} onFlip={handleFlipResult} />
      ))}
    </div>
  );
};

export default FlipCardLottery;