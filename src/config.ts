const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.log("Error: No API key found!");
}

export { API_KEY };
