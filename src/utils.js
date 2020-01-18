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

export const sortByYear = kits => {
  const sortedKits = kits.sort((a, b) => {
    const yearsA = a.year
      .split("/")
      .map(yearString => {
        return parseInt(yearString);
      })
      .filter(year => !isNaN(year));
    const avgA = yearsA.reduce((a, b) => a + b, 0) / yearsA.length;

    const yearsB = b.year
      .split("/")
      .map(yearString => {
        return parseInt(yearString);
      })
      .filter(year => !isNaN(year));
    const avgB = yearsB.reduce((a, b) => a + b, 0) / yearsB.length;

    return avgB - avgA;
  });

  return sortedKits;
};
