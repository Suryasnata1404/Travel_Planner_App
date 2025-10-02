import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; // ✅ Add to .env

export const getPlaceImage = async (query) => {
  try {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape&per_page=1`
    );
    if (res.data.results.length > 0) {
      return res.data.results[0].urls.small;
    }
    return null;
  } catch (error) {
    console.error("Unsplash API error:", error);
    return null;
  }
};
