import { Kit } from "./types";

const extractDistinctValues = (values: string[]) =>
  [...new Set(values)].filter((x) => x);

export const extractKitData = (allKits: Kit[]) => {
  const allOwners = extractDistinctValues(
    allKits.map((kit) => kit.owner)
  ).sort();
  const allClubs = extractDistinctValues(allKits.map((kit) => kit.club)).sort();
  const allCountries = extractDistinctValues(
    allKits.map((kit) => kit.country)
  ).sort();
  const allYears = extractDistinctValues(allKits.map((kit) => kit.year)).sort();
  const allVersions = extractDistinctValues(
    allKits.map((kit) => kit.version)
  ).sort();
  const allManufacturers = extractDistinctValues(
    allKits.map((kit) => kit.manufacturer)
  ).sort();
  const allNumbers = extractDistinctValues(
    allKits.map((kit) => kit.playerNumber)
  ).sort((a, b) => parseInt(a) - parseInt(b));

  return {
    allOwners,
    allClubs,
    allCountries,
    allYears,
    allVersions,
    allNumbers,
    allManufacturers,
  };
};

export const sortByYear = (kits: Kit[]) => {
  const sortedKits = kits.sort((a, b) => {
    const yearsA = a.year
      .split("/")
      .map((yearString) => {
        return parseInt(yearString);
      })
      .filter((year) => !isNaN(year));
    const avgA = yearsA.reduce((a, b) => a + b, 0) / yearsA.length;

    const yearsB = b.year
      .split("/")
      .map((yearString) => {
        return parseInt(yearString);
      })
      .filter((year) => !isNaN(year));
    const avgB = yearsB.reduce((a, b) => a + b, 0) / yearsB.length;

    return avgB - avgA;
  });

  return sortedKits;
};

export const sortByAdded = (kits: Kit[]) => {
  const sortedKits = kits.sort((a, b) => +b.id - +a.id);
  return sortedKits;
};
