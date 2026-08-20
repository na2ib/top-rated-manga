<div align="center">
  <img src="https://cdn.myanimelist.net/images/manga/1/157897l.webp" width="120" alt="MangaVault Logo" style="border-radius: 20px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(120, 50, 255, 0.3);" />
  <h1>MangaVault</h1>
  <p><strong>Discover Your Next Masterpiece.</strong></p>
  <p>A premium, AAA-grade web application for discovering and exploring manga with an ultra-modern glassmorphic interface.</p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
</div>

<br />

## 🌟 Overview & Features

MangaVault is a resilient, visually striking manga discovery platform. Built with a focus on premium aesthetics and fluid interactions, it delivers a macOS-inspired Spotlight search, dynamic deep-space gradients, and hyper-responsive 3D glass cards to create an unparalleled browsing experience.

### ✨ Key Highlights
- **Apple-inspired Glassmorphism UI**: Beautiful translucent layers, dynamic background gradient meshes, and obsidian-dark canvas aesthetics.
- **Real-time Manga Discovery**: Aggregates top-tier data via Jikan (MyAnimeList) and Kitsu APIs.
- **Resilient Fallback Engine**: Multi-tier API fetching ensures the UI never breaks. It seamlessly handles HTTP 429 rate limits by degrading gracefully to secondary APIs or local high-quality mock data.
- **Smooth CSS Micro-animations**: Snappy `cubic-bezier` timing functions for hover lifts, tilts, and sliding bottom sheets.
- **Spotlight-style Search**: An elevated, glowing search pill with keyboard shortcut integration (`Enter`).
- **Responsive Grid Architecture**: Fluid and adaptive layouts scaling from mobile to ultra-wide desktop monitors.
- **Infinite Scrolling**: Elegant IntersectionObserver-driven pagination that seamlessly appends new titles as you scroll.

## 🛠️ Tech Stack & Architecture

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (Functional Components, Hooks) |
| **Styling** | Tailwind CSS v4 (Utility-first, CSS variables) |
| **Icons** | Lucide React |
| **API Providers** | Jikan API v4 (Primary), Kitsu API (Fallback) |
| **Build Tooling** | Vite (Fast HMR, optimized production builds) |

## 🚀 Getting Started & Setup

Follow these instructions to get a local copy of MangaVault running on your machine.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mangavault.git
   cd mangavault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   *The application will be running at `http://localhost:3000`.*

4. **Build for production**
   ```bash
   npm run build
   ```

## 🛡️ API Resilience & Fallback Strategy

MangaVault implements an aggressive fail-safe pipeline to ensure 100% uptime regardless of external API instability:

1. **Primary Fetch (Jikan API)**: Tries to fetch top manga or search results via Jikan API v4.
2. **Rate Limit Intercept**: If Jikan returns a `429 Too Many Requests`, the engine automatically delays for 1 second and retries.
3. **Secondary Fallback (Kitsu API)**: If Jikan remains unresponsive, the request seamlessly pivots to the Kitsu Edge API.
4. **Offline / Hard Fallback (Local Mock)**: If both APIs fail (or CORS issues arise), the application falls back to a pristine, manually curated dataset of legendary manga (e.g., *Berserk, Steel Ball Run, Vagabond*), filtering dynamically based on active search queries. 

## 📂 Project Structure

```text
mangavault/
├── index.html              # HTML Entry Point
├── package.json            # Project Metadata & Scripts
├── vite.config.js          # Vite Configuration
├── src/
│   ├── main.jsx            # React Bootstrap
│   ├── App.jsx             # Core Layout & Routing
│   ├── components/         # Reusable UI Components
│   │   ├── NavBar.jsx      # Sticky Navigation
│   │   └── MangaCard.jsx   # 3D Glassmorphic Manga Card
│   ├── pages/              # View Controllers
│   │   ├── Home.jsx        # Main Discovery & Search Feed
│   │   └── Favorites.jsx   # Local Saved Collection
│   ├── services/           # Data Layer
│   │   ├── api.js          # Hybrid Fetch Engine
│   │   └── mockData.js     # Fallback Dataset
│   ├── css/                # Styling
│   │   └── index.css       # Tailwind Directives & Global Themes
│   └── contexts/           # Global State Management
│       └── MangaContext.jsx# Favorites Tracking
```

## ⌨️ Keyboard Shortcuts & Controls

| Action | Control / Gesture |
| :--- | :--- |
| **Search** | Type in search bar + `Enter` |
| **Clear Search** | Delete text (auto-fetches popular manga) |
| **Load More** | Scroll to bottom (Infinite Scroll) or click "Load More Manga" |
| **Card Details** | Hover over any Manga Card |
| **Save Favorite** | Click the `Heart` icon on card hover |

## 🤝 Contributing & License

### Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### License
Distributed under the MIT License. See `LICENSE` for more information.
