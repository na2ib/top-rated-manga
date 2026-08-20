import { mockMangaList } from "./mockData.js";

const JIKAN_BASE = "https://api.jikan.moe/v4";
const KITSU_BASE = "https://kitsu.io/api/edge";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeKitsu = (kitsuData) => {
  return kitsuData.map(item => ({
    mal_id: item.id,
    title: item.attributes.canonicalTitle,
    images: {
      webp: { large_image_url: item.attributes.posterImage?.original || item.attributes.posterImage?.large },
      jpg: { large_image_url: item.attributes.posterImage?.original || item.attributes.posterImage?.large }
    },
    score: item.attributes.averageRating ? (parseFloat(item.attributes.averageRating) / 10).toFixed(2) : "N/A",
    published: { prop: { from: { year: item.attributes.startDate ? new Date(item.attributes.startDate).getFullYear() : "N/A" } } },
    genres: []
  }));
};

const fetchJikanWithRetry = async (url, retries = 1) => {
  const response = await fetch(url);
  if (response.status === 429 && retries > 0) {
    console.warn("Jikan Rate limited (429). Retrying in 1 second...");
    await delay(1000);
    return fetchJikanWithRetry(url, retries - 1);
  }
  if (!response.ok) {
    throw new Error(`Jikan HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return { results: data.data || [], pagination: data.pagination || {} };
};

const fetchKitsuFallback = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Kitsu HTTP error! status: ${response.status}`);
  }
  const json = await response.json();
  return { 
    results: normalizeKitsu(json.data || []), 
    pagination: { has_next_page: !!json.links?.next } 
  };
};

export const getPopularManga = async (page = 1) => {
  try {
    return await fetchJikanWithRetry(`${JIKAN_BASE}/top/manga?limit=25&page=${page}`);
  } catch (err) {
    console.error("Jikan failed, falling back to Kitsu for popular manga...", err);
    try {
      return await fetchKitsuFallback(`${KITSU_BASE}/manga?sort=-userCount&page[limit]=20&page[offset]=${(page - 1) * 20}`);
    } catch (kitsuErr) {
      console.error("Kitsu failed, falling back to local mock data...", kitsuErr);
      return { 
        results: page === 1 ? mockMangaList : [], 
        pagination: { has_next_page: false } 
      };
    }
  }
};

export const searchManga = async (query, page = 1) => {
  try {
    return await fetchJikanWithRetry(`${JIKAN_BASE}/manga?q=${encodeURIComponent(query.trim())}&limit=25&order_by=popularity&sort=asc&page=${page}`);
  } catch (err) {
    console.error("Jikan failed, falling back to Kitsu for search...", err);
    try {
      return await fetchKitsuFallback(`${KITSU_BASE}/manga?filter[text]=${encodeURIComponent(query.trim())}&page[limit]=20&page[offset]=${(page - 1) * 20}`);
    } catch (kitsuErr) {
      console.error("Kitsu failed, falling back to local mock data...", kitsuErr);
      const filtered = mockMangaList.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
      return { 
        results: page === 1 ? filtered : [], 
        pagination: { has_next_page: false } 
      };
    }
  }
};
