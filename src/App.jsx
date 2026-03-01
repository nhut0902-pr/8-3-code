import React, { useEffect } from 'react';
import HeartTree from './components/HeartTree';
import Countdown from './components/Countdown';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

function App() {
  const [name, setName] = React.useState('');
  const [wish, setWish] = React.useState('');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [clickHearts, setClickHearts] = React.useState([]);
  const audioRef = React.useRef(null);

  const wishes = [
    "Chúc bạn luôn rạng rỡ như hoa hướng dương!",
    "Chúc bạn một ngày 8/3 tràn đầy niềm vui và quà tặng.",
    "Bạn là duy nhất và tuyệt vời nhất, hãy luôn tự tin nhé!",
    "Chúc bạn hạnh phúc không chỉ hôm nay mà là mọi ngày trong năm.",
    "Gửi tới bạn những lời chúc tốt đẹp và ấm áp nhất!",
    "Chúc bạn luôn xinh đẹp, trẻ trung và thành công trong sự nghiệp."
  ];

  const generateWish = () => {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    setWish(randomWish);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ff85a1', '#ffd6e0']
    });
  };

  const handleGlobalClick = (e) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setClickHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

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

  const floatingHeartsData = React.useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      x: (i * 15) + "%",
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      sinOffset: Math.sin(i) * 5
    }));
  }, []);

  const particlesData = React.useMemo(() => {
    return [...Array(20)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5
    }));
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
    <div className="min-h-screen w-full bg-[#fdf2f4] overflow-hidden relative font-sans text-gray-800" onClick={handleGlobalClick}>
      {/* Background soft glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-100/30 rounded-full blur-[120px]" />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen text-center">

        {/* Personalized Name Input */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 z-20"
        >
          <input
            type="text"
            placeholder="Nhập tên của bạn..."
            className="px-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-400 outline-none bg-white/80 backdrop-blur-sm text-pink-600 placeholder-pink-300 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </motion.div>

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
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 text-center"
          >
            <p className="text-pink-500 font-bold text-xl tracking-wide uppercase">
              Chào {name || 'các bạn'}!
            </p>
            <p className="text-xl md:text-3xl leading-relaxed text-gray-700 font-medium">
              Ngày 8/3 chúc {name ? name : 'một nửa thế giới'} luôn thành công trong cuộc sống! <br />
              <span className="text-pink-600">Chúc bạn luôn duyên dáng và hạnh phúc! 🌸</span>
            </p>
          </motion.div>

          {/* Random Wish Section */}
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/40 space-y-4"
          >
            {wish && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-pink-600 font-serif text-2xl italic"
              >
                "{wish}"
              </motion.p>
            )}
            <button
              onClick={generateWish}
              className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-3 rounded-full font-bold shadow-pink-200 shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              Nhận lời chúc ngẫu nhiên ✨
            </button>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
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
      {floatingHeartsData.map((heart, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400/20 text-3xl select-none pointer-events-none"
          initial={{
            x: heart.x,
            y: "110vh"
          }}
          animate={{
            y: "-10vh",
            x: `calc(${heart.x} + ${heart.sinOffset}%)`
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
        >
          ❤
        </motion.div>
      ))}

      {/* Click Hearts */}
      {clickHearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 1, scale: 0, x: heart.x - 15, y: heart.y - 15 }}
          animate={{ opacity: 0, scale: 2, y: heart.y - 100 }}
          className="fixed text-red-500 text-2xl pointer-events-none z-50"
        >
          ❤
        </motion.div>
      ))}

      {/* Music Player */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        >
          {isPlaying ? '⏸' : '🎵'}
        </button>
        <audio
          ref={audioRef}
          loop
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-gray-400 text-sm text-center">
        Powered by <span className="text-pink-400 font-semibold">nhutcoder</span>
      </footer>

      {/* Particle effect overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particlesData.map((particle, i) => (
              <motion.div
                  key={`p-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                      x: particle.x,
                      y: particle.y,
                      opacity: 0
                  }}
                  animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.5, 0]
                  }}
                  transition={{
                      duration: particle.duration,
                      repeat: Infinity,
                      delay: particle.delay
                  }}
              />
          ))}
      </div>
    </div>
  );
}

export default App;
