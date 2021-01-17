import { Record } from "./types";

const extractDistinctValues = (values: string[]) =>
  [...new Set(values)].filter((x) => x);

export const extractRecordData = (allRecords: Record[]) => {
  const allOwners = extractDistinctValues(
    allRecords.map((record) => record.owner)
  ).sort();
  const allBands = extractDistinctValues(
    allRecords.map((record) => record.band)
  ).sort();
  const allAlbums = extractDistinctValues(
    allRecords.map((record) => record.album)
  ).sort();
  const allYears = extractDistinctValues(
    allRecords.map((record) => record.year)
  ).sort();
  const allGenres = extractDistinctValues(
    allRecords.map((record) => record.genre)
  ).sort();

  return {
    allOwners,
    allBands,
    allAlbums,
    allYears,
    allGenres,
  };
};

export const sortByYear = (records: Record[]) => {
  const sortedRecords = records.sort(
    (a, b) => parseInt(b.year) - parseInt(a.year)
  );
  return sortedRecords;
};

export const sortByAdded = (records: Record[]) => {
  const sortedRecords = records.sort((a, b) => +b.id - +a.id);
  return sortedRecords;
};
