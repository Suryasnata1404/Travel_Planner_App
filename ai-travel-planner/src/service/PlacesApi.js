const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const getPlaceSuggestions = async (inputText) => {
  if (!inputText) return [];

  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    inputText
  )}&limit=5&apiKey=${GEOAPIFY_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.features || [];
  } catch (error) {
    console.error("Geoapify Autocomplete Error:", error);
    return [];
  }
};

