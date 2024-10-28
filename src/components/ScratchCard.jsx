import React, { useRef, useState, useEffect } from 'react';

const ScratchCard = ({
  prizeText = "🎉 恭喜中奖！",
  coverImage = "/marketing-cover.png", // 涂层图片
  onReveal,
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // 初始化 Canvas 涂层
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const image = new Image();
    image.src = coverImage;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'destination-out'; // 设置擦除模式
    };
  }, [coverImage]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    scratch(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    checkReveal();
  };

  const scratch = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let clearedPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) clearedPixels++;
    }

    const clearedPercentage = (clearedPixels / (pixels.length / 4)) * 100;
    if (clearedPercentage > 50 && !revealed) {
      setRevealed(true);
      onReveal && onReveal();
    }
  };

  return (
    <div className="scratch-card">
      <div className="prize">{prizeText}</div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={scratch}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={scratch}
        onTouchEnd={handleMouseUp}
        style={{ width: '300px', height: '150px', display: 'block' }}
      />
    </div>
  );
};

export default ScratchCard;