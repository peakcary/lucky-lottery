import React, { useEffect, useRef, useState } from 'react';

const ScratchCard = () => {
  const canvasRef = useRef(null);
  const resultCanvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 设置画布尺寸
    canvas.width = 300;
    canvas.height = 150;

    // 获取中奖内容 Canvas 上下文
    const resultCanvas = resultCanvasRef.current;
    const resultCtx = resultCanvas.getContext('2d');
    resultCanvas.width = canvas.width;
    resultCanvas.height = canvas.height;

    // 在结果层绘制中奖文字或图片
    resultCtx.fillStyle = '#FFD700'; // 金色文字
    resultCtx.font = '30px Arial';
    resultCtx.fillText('🎉 恭喜中奖！🎉', 50, 90);

    // 绘制涂层（可以使用颜色或者图片）
    const scratchPattern = new Image();
    scratchPattern.src = 'https://www.example.com/scratch-pattern.png'; // 实际使用涂层图案
    scratchPattern.onload = () => {
      ctx.drawImage(scratchPattern, 0, 0, canvas.width, canvas.height);
    };

    // 平滑刮开路径
    const handleScratch = (e) => {
      if (!isScratching) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 设置刮开效果（平滑）
      ctx.globalCompositeOperation = 'destination-out'; // 使刮掉部分透明
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 20;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();

      checkScratchArea(ctx);
    };

    const checkScratchArea = (ctx) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let totalPixels = imageData.data.length / 4; // 总像素数
      let clearedPixels = 0; // 刮开的像素数

      for (let i = 0; i < totalPixels; i++) {
        const alpha = imageData.data[i * 4 + 3]; // 获取透明度
        if (alpha === 0) {
          clearedPixels++;
        }
      }

      const percentage = (clearedPixels / totalPixels) * 100;
      if (percentage > 50) {
        setRevealed(true);
        setIsScratching(false);
      }
    };

    // 事件监听
    const handleMouseDown = () => setIsScratching(true);
    const handleMouseUp = () => setIsScratching(false);
    
    canvas.addEventListener('mousemove', handleScratch);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousemove', handleScratch);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isScratching]);

  return (
    <div style={{ position: 'relative' }}>
      <h1>刮刮乐抽奖</h1>
      {/* 背景中奖内容 Canvas */}
      <canvas ref={resultCanvasRef} style={{ position: 'absolute', zIndex: revealed ? 1 : -1 }}></canvas>
      {/* 涂层 Canvas */}
      <canvas ref={canvasRef} style={{ border: '1px solid black', zIndex: 10 }}></canvas>
      {revealed ? <h2>恭喜你中奖！🎉</h2> : <h2>继续刮，看看有没有惊喜！</h2>}
    </div>
  );
};

export default ScratchCard;
