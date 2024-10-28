import React from 'react';
import FlipCardLottery1 from './components/FlipCardLottery1';

const App = () => {
  const handleFinish = (prize) => {
    alert(`Congratulations! You won: ${prize}`);
  };

  return (
    <div>
      <FlipCardLottery1 maxAttempts={3} onFinish={handleFinish} />
    </div>
  );
};

export default App;