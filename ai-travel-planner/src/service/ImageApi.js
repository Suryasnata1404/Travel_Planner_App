const UNSPLASH_BASE = "https://api.unsplash.com/search/photos";

export async function getPlaceImage(placeName) {
  if (!placeName) return null;
  try {
    const response = await fetch(
      `${UNSPLASH_BASE}?query=${encodeURIComponent(placeName)}&orientation=landscape&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data?.results?.[0]?.urls?.regular || null;
  } catch (err) {
    console.error("Unsplash Image Error:", err);
    return null;
  }
}
