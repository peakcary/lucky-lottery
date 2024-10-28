import React from "react";
import ScratchCardComponent from "./components/ScratchCardComponent";
import FlipCardLottery from "./components/FlipCardLottery";
import SlotMachine from "./components/SlotMachine";

const App = () => {
  const prizes = ["🎁 0", "🥈 8", "🥉 7", "🧧 2"];
  const handleFinish = (result) => {};
  return (
    <div>
      <h1>刮刮乐</h1>
      <ScratchCardComponent />

      <h1>翻牌</h1>
      <FlipCardLottery prizes={prizes} />

      <h1>老虎机</h1>
      <SlotMachine onFinish={handleFinish} />
    </div>
  );
};

export default App;
