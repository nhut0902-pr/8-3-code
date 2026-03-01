import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-baseline space-x-3 text-3xl md:text-5xl font-bold text-gray-700">
      <div className="flex items-baseline space-x-1">
        <span>{timeLeft.days}</span>
        <span className="text-sm font-normal text-gray-500">ngày</span>
      </div>
      <div className="flex items-baseline space-x-1">
        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-sm font-normal text-gray-500">giờ</span>
      </div>
      <div className="flex items-baseline space-x-1">
        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-sm font-normal text-gray-500">phút</span>
      </div>
      <div className="flex items-baseline space-x-1">
        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-sm font-normal text-gray-500">giây</span>
      </div>
    </div>
  );
};

export default Countdown;
