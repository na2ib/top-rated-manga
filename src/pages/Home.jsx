import MovieCard from "../components/MovieCard.jsx";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { 
    searchMovies as searchManga, 
    getPopularMovies as getTopManga 
} from "../services/api.js"; 

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [manga, setManga] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [fetchParams, setFetchParams] = useState({ query: "", page: 1 });
  const observer = useRef();

  const lastMangaElementRef = useCallback(node => {
    if (loading || isLoadingMore || error) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !error) {
        setFetchParams(prev => ({ ...prev, page: prev.page + 1 }));
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, isLoadingMore, hasNextPage, error]);

  useEffect(() => {
    const fetchManga = async () => {
      const { query, page } = fetchParams;
      if (page === 1) setLoading(true);
      else setIsLoadingMore(true);
      
      try {
        let response;
        if (query.trim()) {
          response = await searchManga(query, page);
        } else {
          response = await getTopManga(page);
        }
        
        setManga(prev => page === 1 ? response.results : [...prev, ...response.results]);
        setHasNextPage(response.pagination?.has_next_page || false);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to load manga...");
      } finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
    };
    
    fetchManga();
  }, [fetchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (loading || isLoadingMore) return;
    setFetchParams({ query: searchQuery, page: 1 });
  };
  
  return (
    <div className="flex flex-col items-center animate-in fade-in duration-500 w-full pb-20">
      
      {/* Hero Section */}
      <div className="w-full max-w-3xl flex flex-col items-center mt-12 mb-20 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-violet-500/20 blur-[100px] rounded-full pointer-events-none" />
        <h1 className="relative text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] to-[#A1A1AA] mb-8 pb-2 drop-shadow-[0_10px_20px_rgba(255,255,255,0.05)]">
          Discover Your Next <br className="hidden sm:block" /> Masterpiece
        </h1>
        
        {/* Spotlight Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl group z-10">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#8a4bff] transition-colors duration-300">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search manga, authors, or genres..."
            className="w-full pl-14 pr-[120px] py-4 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-[20px] text-white placeholder:text-white/30 outline-none focus:bg-white/[0.06] focus:border-white/[0.15] focus:shadow-[0_0_25px_rgba(138,75,255,0.3),inset_0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-lg"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim() === "") {
                setFetchParams({ query: "", page: 1 });
              }
            }}
          />
          <div className="absolute inset-y-0 right-2 flex items-center gap-2">
            <div className="hidden sm:flex items-center justify-center px-2 py-1 rounded-md border border-white/10 bg-white/5 text-[10px] font-semibold text-white/40 tracking-widest mr-2">
              ↵ ENTER
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-br from-[#7928CA] to-[#FF0080] text-white rounded-full px-6 py-2.5 font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(121,40,202,0.4)] active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error State */}
      {error && !loading && manga.length === 0 && (
        <div className="w-full max-w-md bg-white/5 border border-red-500/30 p-8 rounded-2xl mb-8 text-center backdrop-blur-xl shadow-[0_10px_40px_rgba(239,68,68,0.1)] flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Oops, something went wrong</h3>
          <p className="text-white/60 mb-6">{error}</p>
          <button 
            onClick={() => setFetchParams(prev => ({ ...prev }))}
            className="bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full px-6 py-2.5 font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-95"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Grid */}
      {loading && manga.length === 0 ? (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : (
        <>
          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
            {manga.map((item, index) => ( 
              <div 
                key={`${item.mal_id}-${index}`} 
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDuration: '600ms', animationFillMode: 'both', animationDelay: `${(index % 24) * 50}ms` }}
              >
                <MovieCard movie={item} />
              </div>
            ))}
          </div>

              {/* Infinite Scroll Sentinel & Pagination Controls */}
              {manga.length > 0 && (
                <div className="w-full mt-16 flex flex-col items-center justify-center">
                  <div ref={lastMangaElementRef} className="h-4 w-full pointer-events-none opacity-0" />
                  
                  {isLoadingMore && (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-violet-500 animate-spin" />
                        <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-[#FF0080] animate-[spin_1.5s_reverse_infinite]" />
                      </div>
                      <p className="text-sm text-white/50 font-medium">Fetching more masterpieces...</p>
                    </div>
                  )}

                  {error && !isLoadingMore && (
                    <div className="mb-4 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm backdrop-blur-sm animate-in fade-in duration-300">
                      {error}
                    </div>
                  )}

                  {!isLoadingMore && hasNextPage && (
                    <button
                      onClick={() => setFetchParams(prev => error ? { ...prev } : { ...prev, page: prev.page + 1 })}
                      className="mt-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 flex items-center gap-2"
                    >
                      {error ? "Retry Loading More" : "Load More Manga"}
                    </button>
                  )}

                  {!hasNextPage && !error && (
                    <div className="mt-8 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                      <p className="text-sm text-white/40 tracking-wide font-medium">
                        You've reached the end of the vault.
                      </p>
                    </div>
                  )}
                </div>
              )}
        </>
      )}
      
      {!loading && manga.length === 0 && !error && (
        <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl mt-12 text-center backdrop-blur-xl shadow-[0_10px_40px_rgba(255,255,255,0.05)] flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
          <p className="text-white/60">
            No manga found for '{searchQuery}'. Try another title or check your spelling.
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;