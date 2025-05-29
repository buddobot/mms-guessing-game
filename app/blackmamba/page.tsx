'use client';

import { useEffect, useState, useRef } from 'react';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState({ x: 0, y: 0 });
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);

  const gridSize = 20;
  const tileCount = 30;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      if (!running) return;

      const newSnake = [...snake];
      const head = { x: newSnake[0].x + dir.x, y: newSnake[0].y + dir.y };
      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount),
        });
        setScore(prev => prev + 1);
      } else {
        newSnake.pop();
      }

      if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount ||
        newSnake.slice(1).some(s => s.x === head.x && s.y === head.y)
      ) {
        setRunning(false);
        return;
      }

      setSnake(newSnake);

      ctx.fillStyle = '#1E045C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#2575FC'; // snake color
      newSnake.forEach(({ x, y }) => {
        ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
      });

      ctx.fillStyle = '#09FCDE'; // food color
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    };

    const interval = setInterval(gameLoop, 100);
    return () => clearInterval(interval);
  }, [snake, dir, food, running]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDir({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDir({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDir({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDir({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#270B65] bg-[url('/logo.png')] bg-repeat bg-cover">
      <h1 className="text-3xl font-bold mb-2">Snake Game</h1>
      <p className="text-white text-lg font-semibold mb-2">Score: {score}</p>
      {!running && <p className="text-red-400 mb-2">Game Over! Refresh to play again.</p>}
      <canvas
        ref={canvasRef}
        width={gridSize * tileCount}
        height={gridSize * tileCount}
        className="border border-[#6A11CB] bg-black rounded"
      ></canvas>
    </main>
  );
}
