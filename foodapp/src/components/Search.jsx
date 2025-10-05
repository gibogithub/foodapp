import { useEffect, useState } from "react";
import styles from "./search.module.css";
const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "d2e1cfc017144109b23ed08779c5a85b";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      async function fetchFood() {
        try {
          const res = await fetch(
            `${URL}?query=${encodeURIComponent(query)}&apiKey=${API_KEY}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          setFoodData(data.results || []);
        } catch (err) {
          if (err.name !== "AbortError") {
            setFoodData([]);
            // Optionally, handle error state here
          }
        }
      }
      fetchFood();
    }, 500); // Debounce: 500ms

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query, setFoodData]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search for food..."
      />
    </div>
  );
}
