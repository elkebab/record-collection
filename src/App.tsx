import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import { RecordOverview } from "./RecordOverview";
import { extractRecordData } from "./utils";
import { DropdownFilter } from "./filters";
import { useFetchRecords } from "./useFetchRecords";
import { RecordType } from "./types";

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
  loading: {
    marginTop: "5rem",
  },
});

const SignedTypes = { FALSE: "Nei", TRUE: "Ja" };

export const App = () => {
  const classes = useStyles();

  // Filters
  const [ownerFilter, setOwnerFilter] = useState("");
  const [bandFilter, setBandFilter] = useState("");
  const [albumFilter, setAlbumFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [signedFilter, setSignedFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // Records
  const [allRecords, isLoadingRecords, refetchRecords] = useFetchRecords();
  const [filteredRecords, setFilteredRecords] = useState(allRecords);

  const extractedValues = extractRecordData(allRecords);

  // Perform filtering
  useEffect(() => {
    let tempFilteredRecords = allRecords;

    if (ownerFilter) {
      tempFilteredRecords = tempFilteredRecords.filter(
        (r) => r.owner === ownerFilter
      );
    }
    if (bandFilter) {
      tempFilteredRecords = tempFilteredRecords.filter((r) =>
        r.band.toLowerCase().includes(bandFilter)
      );
    }
    if (albumFilter) {
      tempFilteredRecords = tempFilteredRecords.filter((r) =>
        r.album.toLowerCase().includes(albumFilter)
      );
    }
    if (yearFilter) {
      tempFilteredRecords = tempFilteredRecords.filter(
        (r) => r.year === yearFilter
      );
    }
    if (genreFilter) {
      tempFilteredRecords = tempFilteredRecords.filter((r) =>
        r.genre.toLowerCase().includes(genreFilter)
      );
    }

    if (signedFilter) {
      tempFilteredRecords = tempFilteredRecords.filter((r) =>
        signedFilter === SignedTypes.TRUE ? r.signed : !r.signed
      );
    }
    if (typeFilter) {
      tempFilteredRecords = tempFilteredRecords.filter(
        (r) => r.type === typeFilter
      );
    }

    setFilteredRecords(tempFilteredRecords);
  }, [
    allRecords,
    ownerFilter,
    bandFilter,
    albumFilter,
    yearFilter,
    genreFilter,
    signedFilter,
    typeFilter,
  ]);

  // Display the stuffs
  return (
    <main className={classes.main}>
      <section className={classes.filtersContainer}>
        <DropdownFilter
          title="Eier"
          items={extractedValues.allOwners}
          setFilterFunction={setOwnerFilter}
        />

        <DropdownFilter
          title="Album"
          items={extractedValues.allAlbums}
          setFilterFunction={setAlbumFilter}
        />
        <DropdownFilter
          title="Band"
          items={extractedValues.allBands}
          setFilterFunction={setBandFilter}
        />
        <DropdownFilter
          title="År"
          items={extractedValues.allYears}
          setFilterFunction={setYearFilter}
        />
        <DropdownFilter
          title="Sjanger"
          items={extractedValues.allGenres}
          setFilterFunction={setGenreFilter}
        />
        <DropdownFilter
          title="Type"
          items={Object.values(RecordType)}
          setFilterFunction={setTypeFilter}
        />
        <DropdownFilter
          title="Signert"
          items={Object.values(SignedTypes)}
          setFilterFunction={setSignedFilter}
        />
      </section>

      {isLoadingRecords ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <RecordOverview
          records={filteredRecords}
          extractedValues={extractedValues}
          refetchRecords={refetchRecords}
        />
      )}
    </main>
  );
};
