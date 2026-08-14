import { useEffect, useState, useRef } from "react";
import "./App.css";

const posters = [
  "/posters/poster1.png",
  "/posters/poster2.png",
  "/posters/poster3.jpeg",
  "/posters/poster4.png",
  "/posters/poster5.png",
];

const videos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
  "/videos/video6.mp4",
  "/videos/video7.mp4",
  "/videos/video8.mp4",
];

const activities = [
  "/activities/activity1.png",
  "/activities/activity2.png",
  "/activities/activity3.png",
  "/activities/activity4.png",
];

function App() {
  const [loading, setLoading] = useState(true);

  // Poster
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [slideTime, setSlideTime] = useState(0);

  // Video
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playAll, setPlayAll] = useState(false);

  // Activity
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Controls
  const [showControls, setShowControls] = useState(true);

  const intervalRef = useRef(null);

  /* =========================
     Splash Screen
  ========================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
     Poster Auto Slide
  ========================= */
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only auto-slide posters
    if (
      slideTime > 0 &&
      selectedVideo === null &&
      selectedActivity === null
    ) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, slideTime * 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slideTime, current, selectedVideo, selectedActivity]);

  /* =========================
     Next Poster
  ========================= */
  const handleNext = () => {
    setFade(false);

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % posters.length);
      setFade(true);
    }, 300);
  };

  /* =========================
     Previous Poster
  ========================= */
  const handlePrev = () => {
    setFade(false);

    setTimeout(() => {
      setCurrent((prev) =>
        prev === 0 ? posters.length - 1 : prev - 1
      );

      setFade(true);
    }, 300);
  };

  /* =========================
     Fullscreen
  ========================= */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  /* =========================
     Auto Hide Controls
  ========================= */
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

    timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  /* =========================
     Select Video
  ========================= */
  const selectVideo = (index) => {
    setSelectedActivity(null);
    setPlayAll(false);
    setSelectedVideo(index);
  };

  /* =========================
     Play All Videos
  ========================= */
  const playAllVideos = () => {
    setSelectedActivity(null);
    setPlayAll(true);
    setSelectedVideo(0);
  };

  /* =========================
     Select Activity
  ========================= */
  const selectActivity = (index) => {
    setSelectedVideo(null);
    setPlayAll(false);
    setSelectedActivity(index);
  };

  /* =========================
     Return To Posters
  ========================= */
  const showPosters = () => {
    setSelectedVideo(null);
    setPlayAll(false);
    setSelectedActivity(null);
  };

  /* =========================
     Splash Screen
  ========================= */
  if (loading) {
    return (
      <div className="splash">
        <img
          src="/icon.png"
          alt="Logo"
          className="logo-img"
        />

        <div className="spinner"></div>

        <p className="loading-text">
          Launching Event Display
        </p>

        <p className="loading-author">
          Swayam Prakash Macharla
        </p>
      </div>
    );
  }

  /* =========================
     Main UI
  ========================= */
  return (
    <div className="container">

      {/* =========================
          MAIN DISPLAY
      ========================= */}

      {/* POSTER DISPLAY */}
      {selectedVideo === null &&
        selectedActivity === null && (
          <img
            src={posters[current]}
            alt={`Poster ${current + 1}`}
            className={`poster ${
              fade ? "fade-in" : "fade-out"
            }`}
          />
        )}

      {/* VIDEO DISPLAY */}
      {selectedVideo !== null && (
        <video
          key={selectedVideo}
          src={videos[selectedVideo]}
          className="video-player"
          autoPlay
          muted
          playsInline

          // Individual videos loop forever.
          // ALL mode does NOT loop the same video.
          loop={!playAll}

          onEnded={() => {
            if (playAll) {
              setSelectedVideo((prev) => {
                if (prev === videos.length - 1) {
                  return 0;
                }

                return prev + 1;
              });
            }
          }}
        />
      )}

      {/* ACTIVITY DISPLAY */}
      {selectedActivity !== null && (
        <img
          src={activities[selectedActivity]}
          alt={`Activity ${selectedActivity + 1}`}
          className="poster fade-in"
        />
      )}

      {/* =========================
          CONTROL PANEL
      ========================= */}
      <div
        className={`video-menu ${
          showControls ? "show" : "hide"
        }`}
      >

        {/* =========================
            POSTER CONTROLS
        ========================= */}
        {selectedVideo === null &&
          selectedActivity === null && (
            <>
              {/* Previous */}
              <button onClick={handlePrev}>
                ◀
              </button>

              {/* Next */}
              <button onClick={handleNext}>
                ▶
              </button>

              {/* Slide Timer */}
              <div className="time-control-vertical">

                <button
                  onClick={() =>
                    setSlideTime((prev) =>
                      Math.max(0, prev - 1)
                    )
                  }
                >
                  −
                </button>

                <span>
                  {slideTime === 0
                    ? "M"
                    : `${slideTime}s`}
                </span>

                <button
                  onClick={() =>
                    setSlideTime((prev) => prev + 1)
                  }
                >
                  +
                </button>

              </div>

              {/* Fullscreen */}
              <button onClick={toggleFullscreen}>
                ⛶
              </button>
            </>
          )}

        {/* =========================
            VIDEO BUTTONS
        ========================= */}

        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => selectVideo(i)}
          >
            {i + 1}
          </button>
        ))}

        {/* =========================
            ALL VIDEOS
        ========================= */}

        <button onClick={playAllVideos}>
          ALL
        </button>

        {/* =========================
            FULLSCREEN
        ========================= */}

        <button onClick={toggleFullscreen}>
          ⛶
        </button>

        {/* =========================
            ACTIVITY BUTTONS
        ========================= */}

        {activities.map((_, i) => (
          <button
            key={i}
            onClick={() => selectActivity(i)}
            title={`Activity ${i + 1}`}
          >
            A{i + 1}
          </button>
        ))}

        {/* =========================
            POSTER BUTTON
        ========================= */}

        <button onClick={showPosters}>
          P
        </button>

      </div>
    </div>
  );
}

export default App;