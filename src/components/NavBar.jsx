import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-b border-white/5 backdrop-blur-xl bg-obsidian/60 ${
        scrolled ? "py-3 shadow-2xl shadow-black/50" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-bold tracking-tight text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-80"
        >
          Manga<span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">Vault</span>
        </Link>
        <div className="flex gap-2 items-center">
          <Link 
            to="/" 
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${location.pathname === '/' ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Discover
          </Link>
          <Link 
            to="/favorites" 
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${location.pathname === '/favorites' ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
