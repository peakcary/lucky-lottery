import React, { useState, useEffect, useRef } from 'react';
import './index.css'; // 引入样式

const prizes = ['🍒', '🍋', '🍉', '⭐', '🔔', '🍇']; // 可定制奖品

const SlotMachine = ({ onFinish }) => {
  const [rolling, setRolling] = useState(false);
  const [slots, setSlots] = useState([0, 0, 0]); // 每个滚轮的当前索引
  const intervalRefs = useRef([]);

  // 开始滚动
  const handleRoll = () => {
    if (rolling) return; // 防止重复触发
    setRolling(true);

    // 启动滚轮动画
    intervalRefs.current = slots.map((_, index) =>
      setInterval(() => {
        setSlots((prev) => {
          const newSlots = [...prev];
          newSlots[index] = (newSlots[index] + 1) % prizes.length;
          return newSlots;
        });
      }, 100 + index * 100) // 每个滚轮有微小延迟
    );

    // 设置滚轮停止时间
    setTimeout(() => stopRoll(), 3000); // 所有滚轮停下时间
  };

  // 停止滚动并计算结果
  const stopRoll = () => {
    intervalRefs.current.forEach((ref) => clearInterval(ref));
    intervalRefs.current = [];
    setRolling(false);

    const result = slots.map((index) => prizes[index]);
    onFinish && onFinish(result); // 返回抽奖结果
  };

  return (
    <div className="slot-machine">
      <div className="slot-container">
        {slots.map((slot, index) => (
          <div key={index} className="slot">
            {prizes[slot]}
          </div>
        ))}
      </div>
      <button className="roll-button" onClick={handleRoll} disabled={rolling}>
        {rolling ? 'Rolling...' : 'Start'}
      </button>
    </div>
  );
};

export default SlotMachine;