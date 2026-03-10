import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingBackground = () => {
  // Use state with initializer to ensure random values are generated only once
  const [bubbles] = useState(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      width: Math.random() * 300 + 50,
      height: Math.random() * 300 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: i % 2 === 0 
        ? 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(217, 70, 239, 0.08) 0%, transparent 70%)',
      moveX: Math.random() * 100 - 50,
      moveY: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 15
    }));
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          style={{
            position: 'absolute',
            width: bubble.width,
            height: bubble.height,
            borderRadius: '50%',
            background: bubble.color,
            left: bubble.left,
            top: bubble.top,
          }}
          animate={{
            x: [0, bubble.moveX, 0],
            y: [0, bubble.moveY, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBackground;
