import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import { Routes, Route } from "react-router-dom";
import { MangaProvider } from "./contexts/MangaContext";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <MangaProvider>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/favorites" element={<Favorites />}/>
          </Routes>
        </main>
      </div>
    </MangaProvider>
  );
}

export default App;
