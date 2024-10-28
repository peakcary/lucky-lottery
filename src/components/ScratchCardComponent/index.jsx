import React, { useState, useEffect } from "react";
import Scratch from "react-scratch-perfect";
import "./index.css";

import imgA from "./assets/aaa.jpg";

const ScratchCardComponent = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [winningNumber, setWinningNumber] = useState(null);

  // 在组件加载时生成一个随机中奖数字
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100之间的随机数
    setWinningNumber(randomNumber);
  }, []);

  // 刮开后的回调函数
  const handleComplete = () => {
    setIsRevealed(true);
  };

  const handleChange = () => {};
  const onSuccess = () => {};
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "300px", margin: "0 auto" }}>
        <Scratch
          color="#808080"
          img={imgA}
          round={[100, 50, 100, 50]}
          size={40}
          imgRepeat="height"
          percentage={70}
          clear={false}
          mode="move"
          onChange={handleChange}
          onSuccess={onSuccess}
          onComplete={handleComplete}
          className="scratch"
        >
          <div className="s1">{winningNumber}</div>
        </Scratch>
      </div>

      {/* 刮开后显示额外内容 */}
      {isRevealed && <h2>你已经成功刮开了！</h2>}
    </div>
  );
};

export default ScratchCardComponent;

// import React, { useState, useEffect } from 'react';
// import ScratchCard from 'react-scratch-perfect';
// import imgA from './assets/aaa.jpg';
// const ScratchCardComponent = () => {
//   const [isRevealed, setIsRevealed] = useState(false);
//   const [winningNumber, setWinningNumber] = useState(null);

//   // 在组件加载时生成一个随机中奖数字
//   useEffect(() => {
//     const randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100之间的随机数
//     setWinningNumber(randomNumber);
//   }, []);

//   // 刮开后的回调函数
//   const handleComplete = () => {
//     setIsRevealed(true);
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h1>刮刮乐抽奖</h1>

//       <div style={{ width: '300px', margin: '0 auto' }}>
//         {/* 使用 react-scratch-perfect 创建刮刮乐 */}
//         <ScratchCard
//           width={300}
//           height={150}
//           cover={imgA}
//           onComplete={handleComplete}
//           percentToFinish={50} // 刮开50%后完成
//         >
//           {/* 刮开后的内容 */}
//           <div style={{ width: '300px', height: '150px', backgroundColor: '#FFD700', textAlign: 'center', lineHeight: '150px' }}>
//             <h2>{winningNumber ? `中奖号码: ${winningNumber}` : '生成中...'}</h2>
//           </div>
//         </ScratchCard>
//       </div>

//       {/* 刮开后显示额外内容 */}
//       {isRevealed && <h2>你已经成功刮开了！</h2>}
//     </div>
//   );
// };

// export default ScratchCardComponent;
