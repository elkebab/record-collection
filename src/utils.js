const extractDistinctValues = values => {
  return [...new Set(values)].filter(x => x);
};

export const extractKitData = allKits => {
  const allOwners = extractDistinctValues(allKits.map(kit => kit.owner));
  const allClubs = extractDistinctValues(allKits.map(kit => kit.club));
  const allCountries = extractDistinctValues(allKits.map(kit => kit.country));
  const allYears = extractDistinctValues(allKits.map(kit => kit.year));
  const allVersions = extractDistinctValues(allKits.map(kit => kit.version));
  const allManufacturers = extractDistinctValues(
    allKits.map(kit => kit.manufacturer)
  );
  const allNumbers = extractDistinctValues(
    allKits.map(kit => kit.playerNumber)
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
