import { useEffect, useState, useRef } from "react";
import "./App.css";

const posters = [
  "/posters/poster1.png",
  "/posters/poster2.png",
  "/posters/poster3.png",
  "/posters/poster4.jpeg",
  "/posters/poster5.jpeg",
];

const videos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
  "/videos/video6.mp4",
];

function App() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [slideTime, setSlideTime] = useState(0);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playAll, setPlayAll] = useState(false);

  const intervalRef = useRef(null);

  /* Splash Delay */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  /* Poster Auto Slide */
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (slideTime > 0 && selectedVideo === null) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, slideTime * 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [slideTime, current, selectedVideo]);

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

  /* Auto Hide Controls */
  useEffect(() => {
    let timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    timeout = setTimeout(() => setShowControls(false), 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  /* Splash Screen */
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

      {/* MAIN DISPLAY */}
      {selectedVideo === null ? (
        <img
          src={posters[current]}
          alt="Poster"
          className={`poster ${fade ? "fade-in" : "fade-out"}`}
        />
      ) : (
        <video
          key={selectedVideo}   // ⭐ IMPORTANT FIX
          src={videos[selectedVideo]}
          className="video-player"
          autoPlay
          muted
          playsInline
          loop={!playAll}       // single video infinite loop
          onEnded={() => {
            if (playAll) {
              setSelectedVideo((prev) =>
                prev === videos.length - 1 ? 0 : prev + 1
              );
            }
          }}
        />
      )}

      {/* CONTROL PANEL */}
      <div className={`video-menu ${showControls ? "show" : "hide"}`}>

        {/* Poster Controls */}
        {selectedVideo === null && (
          <>
            <button onClick={handlePrev}>◀</button>
            <button onClick={handleNext}>▶</button>

            <div className="time-control-vertical">
              <button onClick={() => setSlideTime((prev) => Math.max(0, prev - 1))}>−</button>
              <span>{slideTime === 0 ? "M" : `${slideTime}s`}</span>
              <button onClick={() => setSlideTime((prev) => prev + 1)}>+</button>
            </div>

            <button onClick={toggleFullscreen}>⛶</button>
          </>
        )}

        {/* Video Buttons */}
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPlayAll(false);
              setSelectedVideo(i);
            }}
          >
            {i + 1}
          </button>
        ))}

        {/* Play All */}
        <button
          onClick={() => {
            setPlayAll(true);
            setSelectedVideo(0);
          }}
        >
          ALL
        </button>

        <button onClick={toggleFullscreen}>⛶</button>

        {/* Back to Poster */}
        <button
          onClick={() => {
            setPlayAll(false);
            setSelectedVideo(null);
          }}
        >
          P
        </button>

      </div>
    </div>
  );
}

export default App;