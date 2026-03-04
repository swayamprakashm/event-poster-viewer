import { useEffect, useState, useRef } from "react";
import "./App.css";

const posters = [
  "/posters/poster1.png",
  "/posters/poster2.png",
  "/posters/poster3.png",
];

function App() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [slideTime, setSlideTime] = useState(0);
  const intervalRef = useRef(null);

  // Splash delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Auto slide
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (slideTime > 0) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, slideTime * 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [slideTime, current]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % posters.length);
      setFade(true);
    }, 300);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) =>
        prev === 0 ? posters.length - 1 : prev - 1
      );
      setFade(true);
    }, 300);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Auto hide controls
  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    timeout = setTimeout(() => setShowControls(false), 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  // 🔥 Splash Screen
  // 🔥 Splash Screen (No Box)
if (loading) {
  return (
    <div className="splash">
      <img src="/icon.png" alt="Logo" className="logo-img" />
      <div className="spinner"></div>
      <p className="loading-text">Launching Event Display</p>
      <p className="loading-author">Swayam Prakash Macharla</p>
    </div>
  );
}

  return (
    <div className="container">
      <img
        src={posters[current]}
        alt="Poster"
        className={`poster ${fade ? "fade-in" : "fade-out"}`}
      />

      <div className={`controls ${showControls ? "show" : "hide"}`}>
        <button className="fullscreen-btn" onClick={toggleFullscreen}>
          ⛶
        </button>

        <button className="prev-btn" onClick={handlePrev}>
          ◀
        </button>

        <button className="next-btn" onClick={handleNext}>
          ▶
        </button>

        <div className="time-control">
          <button onClick={() => setSlideTime((p) => Math.max(0, p - 1))}>
            −
          </button>

          <span>
            {slideTime === 0 ? "Manual" : `${slideTime}s`}
          </span>

          <button onClick={() => setSlideTime((p) => p + 1)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;