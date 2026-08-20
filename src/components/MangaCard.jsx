import { useMangaContext } from "../contexts/MangaContext" 
import { Heart, Star } from "lucide-react";

function MangaCard({ manga }) {
    const mangaId = manga.mal_id; 

    const {isFavorite, addToFavorites, removeFromFavorites} = useMangaContext()
    const favorite = isFavorite(mangaId) 

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(mangaId)
        else addToFavorites(manga) 
    }

    const title = manga.title || manga.title_english || "Untitled";
    const imageUrl = manga.images?.webp?.large_image_url || manga.images?.jpg?.large_image_url || manga.cover_image || "/fallback.jpg";
    const publicationYear = manga.published?.prop?.from?.year || manga.year || (manga.published?.from ? new Date(manga.published.from).getFullYear() : "N/A");
    const score = manga.score || manga.rating || "N/A";
    const genres = manga.genres?.slice(0, 2).map(g => g.name).join(" • ") || "Manga";

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-[#121216]/50 border border-white/5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(138,75,255,0.15)] hover:border-white/20 flex flex-col h-full cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#121216]">
        <img
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        
        {/* Top Action Bar */}
        <div className="absolute top-0 inset-x-0 p-4 flex justify-end z-20">
          <button 
            className={`p-2.5 rounded-full backdrop-blur-[20px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 ${
              favorite 
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.4)]" 
                : "bg-black/40 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white opacity-0 group-hover:opacity-100"
            }`} 
            onClick={onFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Sleek Bottom Sheet Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 backdrop-blur-md bg-white/5 border border-white/10 w-fit px-2.5 py-1 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]" />
            <span className="text-xs font-bold text-white">{score}</span>
          </div>
          <div className="flex justify-between items-end">
            <p className="text-[11px] text-white/80 font-semibold tracking-wider uppercase">{genres}</p>
            <p className="text-[11px] text-white/50 font-medium">{publicationYear}</p>
          </div>
        </div>
      </div>
      
      {/* Default Details Box */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-white/[0.02] to-transparent group-hover:bg-white/[0.04] transition-colors duration-300">
        <h3 className="font-semibold text-white text-base leading-tight line-clamp-2 mb-1 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#A1A1AA]">
          {title}
        </h3> 
      </div>
    </div>
  );
}

export default MangaCard;