import React, { useEffect } from 'react';
import HeartTree from './components/HeartTree';
import Countdown from './components/Countdown';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

function App() {
  const targetDate = React.useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const target = new Date(currentYear, 2, 8); // March is 2 (0-indexed)

    // If March 8 of this year has passed, target next year
    if (now > target) {
      target.setFullYear(currentYear + 1);
    }
    return target;
  }, []);

  useEffect(() => {
    // Initial celebration
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleTreeClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff85a1', '#ff99ac', '#ff4d6d']
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#fdf2f4] overflow-hidden relative font-sans text-gray-800">
      {/* Background soft glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-100/30 rounded-full blur-[120px]" />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-[400px] md:h-[500px] relative mb-4 cursor-pointer"
          onClick={handleTreeClick}
        >
          <HeartTree />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-pink-300 text-xs italic animate-pulse">
            Chạm vào cây để nhận bất ngờ ✨
          </div>
        </motion.div>

        <div className="space-y-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4 text-center"
          >
            <p className="text-pink-500 font-bold text-xl tracking-wide uppercase">Chào các bạn!</p>
            <p className="text-xl md:text-3xl leading-relaxed text-gray-700 font-medium">
              Ngày 8/3 chúc một nửa thế giới luôn thành công trong cuộc sống! <br />
              <span className="text-pink-600">Chúc bạn luôn duyên dáng và hạnh phúc! 🌸</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="pt-10 border-t border-pink-200/60"
          >
            <p className="text-gray-500 font-medium mb-6 text-lg italic">
              Đếm ngược đến ngày Quốc tế Phụ nữ 8/3:
            </p>

            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 inline-block">
                <Countdown targetDate={targetDate} />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Floating hearts animation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400/20 text-3xl select-none pointer-events-none"
          initial={{
            x: (i * 15) + "%",
            y: "110vh"
          }}
          animate={{
            y: "-10vh",
            x: (i * 15 + Math.sin(i) * 5) + "%"
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
        >
          ❤
        </motion.div>
      ))}

      {/* Particle effect overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
              <motion.div
                  key={`p-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                      opacity: 0
                  }}
                  animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.5, 0]
                  }}
                  transition={{
                      duration: 3 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 5
                  }}
              />
          ))}
      </div>
    </div>
  );
}

export default App;
