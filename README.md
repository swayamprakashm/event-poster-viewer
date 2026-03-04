---

# Event Poster Viewer

A simple **Event Poster Viewer** built with **React + Vite** that displays event posters in a slideshow style with controls for navigation and automatic timing.

This viewer is ideal for digital signage, presentations, festival screens, or any event display system where you want posters to show in sequence with optional auto-advance timing and fullscreen support.

---

## 🚀 Features

* 🔄 **Slideshow View** – Navigate through posters manually.
* ⏱️ **Auto Slide Timing** – Set a slide duration in seconds.
* 🔍 **Fade Transitions** on slide change.
* 📺 **Fullscreen Mode** for immersive display.
* 👀 **Auto-hide controls** on inactivity.
* 🧠 Minimal UI and easy extendability.

---

## 📦 Tech Stack

* **React** – Frontend UI
* **Vite** – Build tooling
* **CSS** – Styling
* ⚙️ **JavaScript / JSX**

---

🔗 Live Demo

🎉 Check out the live demo of the Event Poster Viewer here:
👉 https://your-deployment-url.com

---

## 🗂️ Project Structure

```
event-poster-viewer/
├─ public/             # Static assets (posters, favicon, etc.)
├─ src/
│  ├─ App.jsx          # Main slideshow logic
│  └─ App.css          # Component styling
├─ .gitignore
├─ package.json
├─ vite.config.js
└─ README.md
```

---

## 🚀 Getting Started

### 🔧 Prerequisites

Make sure you have **Node.js (v16+)** and **npm** installed.

---

### ⬇️ Install & Run

```bash
# Clone the repo
git clone https://github.com/swayamprakashm/event-poster-viewer.git

# Go into the project directory
cd event-poster-viewer

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📸 Adding Posters

Put your poster images inside the **public/posters/** folder and update the `posters` array in **App.jsx**:

```js
const posters = [
  "/posters/poster1.png",
  "/posters/poster2.png",
  "/posters/poster3.png",
];
```

---

## 🖱 Controls

* **▶ / ◀** — Next / previous poster
* **⛶** — Toggle fullscreen
* **+ / −** — Increase or decrease auto-slide duration

---

## 📌 Customize

You can extend this project by:

* Adding **keyboard navigation** support
* Loading posters from a remote API
* Adding **duration presets**
* Preloading images for performance

---

## 📄 License

This project is open source and free to use.
Feel free to modify or adapt it for your events and presentations!

---

## 👤 Developer Profile

Swayam Prakash Macharla

🔗 GitHub: https://github.com/swayamprakashm

---
