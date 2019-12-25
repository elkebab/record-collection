import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import KitsOverview from "./KitsOverview";
import { fetchKitCollection } from "./api";
import { extractKitData } from "./utils";

import OriginFilter from "./filters/OriginFilter";
import PlayerFilter from "./filters/PlayerFilter";
import DropdownFilter from "./filters/DropdownFilter";

const useStyles = makeStyles({
  main: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: "1rem",
  },
  filtersContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    "& > *": {
      marginTop: "0,5rem",
      marginRight: "1rem",
    },
  },
  footer: {
    textAlign: "center",
  },
});

const SleeveTypes = { SHORT: "Kort", LONG: "Lang" };
const SignedTypes = { FALSE: "Nei", TRUE: "Ja" };

export default function App() {
  const classes = useStyles();

  // Filters
  const [ownerFilter, setOwnerFilter] = useState("");
  const [originFilter, setOriginFilter] = useState("");
  const [playerFilter, setPlayerFilter] = useState("");
  const [numberFilter, setNumberFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [versionFilter, setVersionFilter] = useState("");
  const [signedFilter, setSignedFilter] = useState("");
  const [sleevesFilter, setSleevesFilter] = useState("");
  const [manufacturerFilter, setManufacturerFilter] = useState("");

  // Kits
  const [allKits, setAllKits] = useState([]);
  const [filteredKits, setFilteredKits] = useState(allKits);

  const [extractedValues, setExtractedValues] = useState({
    allOwners: [],
    allClubs: [],
    allCountries: [],
    allYears: [],
    allVersions: [],
    allNumbers: [],
    allManufacturers: [],
  });

  // Fetch kits
  useEffect(() => {
    const fetchKits = async () => {
      const kitCollection = await fetchKitCollection();
      setAllKits(kitCollection.data);
    };
    fetchKits();
  }, []);

  // Perform filtering
  useEffect(() => {
    let tempFilteredKits = allKits;

    if (ownerFilter) {
      tempFilteredKits = tempFilteredKits.filter(k => k.owner === ownerFilter);
    }
    if (originFilter) {
      tempFilteredKits = tempFilteredKits.filter(k =>
        [k.club, k.country].includes(originFilter)
      );
    }
    if (playerFilter) {
      tempFilteredKits = tempFilteredKits.filter(k =>
        k.playerName.toLowerCase().includes(playerFilter)
      );
    }
    if (numberFilter) {
      tempFilteredKits = tempFilteredKits.filter(
        k => k.playerNumber === numberFilter
      );
    }
    if (yearFilter) {
      tempFilteredKits = tempFilteredKits.filter(k => k.year === yearFilter);
    }
    if (versionFilter) {
      tempFilteredKits = tempFilteredKits.filter(
        k => k.version === versionFilter
      );
    }
    if (signedFilter) {
      if (signedFilter === SignedTypes.TRUE) {
        tempFilteredKits = tempFilteredKits.filter(k => k.signed);
      } else if (signedFilter === SignedTypes.FALSE) {
        tempFilteredKits = tempFilteredKits.filter(k => !k.signed);
      }
    }
    if (sleevesFilter) {
      if (sleevesFilter === SleeveTypes.SHORT) {
        tempFilteredKits = tempFilteredKits.filter(k => !k.longSleeve);
      } else if (sleevesFilter === SleeveTypes.LONG) {
        tempFilteredKits = tempFilteredKits.filter(k => k.longSleeve);
      }
    }
    if (manufacturerFilter) {
      tempFilteredKits = tempFilteredKits.filter(
        k => k.manufacturer === manufacturerFilter
      );
    }

    setFilteredKits(tempFilteredKits);
  }, [
    allKits,
    ownerFilter,
    originFilter,
    playerFilter,
    yearFilter,
    versionFilter,
    signedFilter,
    sleevesFilter,
    numberFilter,
    manufacturerFilter,
  ]);

  // Extract data from collection
  useEffect(() => {
    const {
      allOwners,
      allClubs,
      allCountries,
      allYears,
      allVersions,
      allNumbers,
      allManufacturers,
    } = extractKitData(allKits);

    setExtractedValues({
      allOwners,
      allClubs,
      allCountries,
      allYears,
      allVersions,
      allNumbers,
      allManufacturers,
    });
  }, [allKits]);

  // Display the stuffs
  return (
    <>
      <main className={classes.main}>
        <section className={classes.filtersContainer}>
          <DropdownFilter
            title="Eier"
            items={extractedValues.allOwners}
            setFilterFunction={setOwnerFilter}
          />
          <OriginFilter
            clubs={extractedValues.allClubs}
            countries={extractedValues.allCountries}
            setOriginFilter={setOriginFilter}
          />
          <PlayerFilter setPlayerFilter={setPlayerFilter} />
          <DropdownFilter
            title="Nr"
            items={extractedValues.allNumbers}
            setFilterFunction={setNumberFilter}
          />
          <DropdownFilter
            title="År"
            items={extractedValues.allYears}
            setFilterFunction={setYearFilter}
          />
          <DropdownFilter
            title="Versjon"
            items={extractedValues.allVersions}
            setFilterFunction={setVersionFilter}
          />
          <DropdownFilter
            title="Merke"
            items={extractedValues.allManufacturers}
            setFilterFunction={setManufacturerFilter}
          />
          <DropdownFilter
            title="Ermer"
            items={Object.values(SleeveTypes)}
            setFilterFunction={setSleevesFilter}
          />
          <DropdownFilter
            title="Signert"
            items={Object.values(SignedTypes)}
            setFilterFunction={setSignedFilter}
          />
        </section>

        <KitsOverview kits={filteredKits} extractedValues={extractedValues} />
      </main>

      <hr></hr>
      <footer className={classes.footer}>
        <a href="mailto:kjetil@mokkelgjerd.no">kjetil@mokkelgjerd.no</a>
      </footer>
    </>
  );
}
