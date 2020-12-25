import { useState, useCallback, useEffect } from "react";
import { fetchKitCollection } from "./api";
import { Kit } from "./types";

export const useFetchKits = (): [Kit[], boolean, () => void] => {
  const [kits, setKits] = useState<Kit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchKits = useCallback(async () => {
    setIsLoading(true);
    const kitCollection = await fetchKitCollection();
    setKits(kitCollection.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchKits();
  }, [fetchKits]);

  return [kits, isLoading, fetchKits];
};
