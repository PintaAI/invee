import { useState, useEffect } from "react";
import { weddingData as defaultWeddingData, WeddingInfo } from "@/lib/data/wedding";

export function useWeddingData() {
  const [data, setData] = useState<WeddingInfo>(defaultWeddingData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/wedding");
        const result = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        } else {
            // If success is false or data is null, we stick with defaultWeddingData which is already set
            console.log("Using default wedding data");
        }
      } catch (err) {
        console.error("Error fetching wedding data:", err);
        setError("Failed to fetch wedding data, using default.");
        // Stick with default data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}