import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime,onTimeUp }) => {
  // Timer
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeUp]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return <span>{formatTime(time)}</span>;
};

export default Timer;
