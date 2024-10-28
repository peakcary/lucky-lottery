import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import './index.css';

const prizes = ['🍒', '🍋', '🍉', '⭐', '🔔', '🍇']; // 奖品列表

const SlotMachine = ({ onFinish, controlledResult }) => {
  const [rolling, setRolling] = useState(false); // 控制滚动状态
  const [slots, setSlots] = useState([0, 0, 0]); // 每个滚轮的奖品索引

  // 使用 useSpring 为每个滚轮创建动画
  const [spring1, api1] = useSpring(() => ({ transform: 'translateY(0px)', config: config.wobbly }));
  const [spring2, api2] = useSpring(() => ({ transform: 'translateY(0px)', config: config.wobbly }));
  const [spring3, api3] = useSpring(() => ({ transform: 'translateY(0px)', config: config.wobbly }));

  // 点击按钮时的抽奖逻辑
  const handleRoll = () => {
    if (rolling) return; // 如果正在滚动，则阻止重复点击
    setRolling(true); // 设置滚动状态

    // 生成新的奖品索引（或使用受控结果）
    const target = controlledResult || Array(3).fill().map(() => Math.floor(Math.random() * prizes.length));
    setSlots(target); // 更新 slots，触发重新渲染

    // 触发每个滚轮的动画
    api1.start({ transform: `translateY(-${target[0] * 80}px)` });
    api2.start({ transform: `translateY(-${target[1] * 80}px)` });
    api3.start({ transform: `translateY(-${target[2] * 80}px)` });

    // 3 秒后停止，并触发回调函数
    setTimeout(() => {
      setRolling(false); // 重置滚动状态
      onFinish && onFinish(target.map((i) => prizes[i])); // 返回结果
    }, 3000);
  };

  return (
    <div className="slot-machine">
      <div className="slot-container">
        <animated.div className="slot" style={spring1}>
          {prizes.map((prize, i) => (
            <div key={i} className="prize">{prize}</div>
          ))}
        </animated.div>
        <animated.div className="slot" style={spring2}>
          {prizes.map((prize, i) => (
            <div key={i} className="prize">{prize}</div>
          ))}
        </animated.div>
        <animated.div className="slot" style={spring3}>
          {prizes.map((prize, i) => (
            <div key={i} className="prize">{prize}</div>
          ))}
        </animated.div>
      </div>
      <button className="roll-button" onClick={handleRoll} disabled={rolling}>
        {rolling ? 'Rolling...' : 'Start'}
      </button>
    </div>
  );
};

export default SlotMachine;