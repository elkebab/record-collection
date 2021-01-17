import { useState, useCallback, useEffect } from "react";
import { fetchRecordCollection } from "./api";
import { Record } from "./types";

export const useFetchRecords = (): [Record[], boolean, () => void] => {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    const recordCollection = await fetchRecordCollection();
    setRecords(recordCollection.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return [records, isLoading, fetchRecords];
};
