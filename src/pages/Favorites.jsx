import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Heart } from "lucide-react";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="flex flex-col animate-in fade-in duration-500 w-full pb-20 mt-12">
        <div className="mb-12 border-b border-white/10 pb-6">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Your Favorites</h2>
          <p className="text-white/50">Your personal collection of manga masterpieces.</p>
        </div>
        
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {favorites.map((movie, index) => (
            <div 
              key={movie.mal_id} 
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDuration: '600ms', animationFillMode: 'both', animationDelay: `${index * 50}ms` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500 text-center">
      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]">
        <Heart className="w-10 h-10 text-white/20" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">No Favorites Yet</h2>
      <p className="text-white/50 max-w-sm">
        Start exploring and add some manga to your collection. They will appear here!
      </p>
    </div>
  );
}

export default Favorites;
