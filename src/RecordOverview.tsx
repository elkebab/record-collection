import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { RecordCard } from "./RecordCard";
import RecordForm from "./forms/RecordForm";
import { sortByAdded, sortByYear } from "./utils";
import { Record } from "./types";

const useStyles = makeStyles({
  recordsOverview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: "1rem",
    },
  },
  closeButton: {
    position: "absolute",
    right: "1rem",
    padding: "0.4rem",
  },
});

interface RecordOverviewProps {
  records: Record[];
  extractedValues: any;
  refetchRecords: () => void;
}

const SortMethod = {
  Added: "ADDED",
  Year: "YEAR",
};

export const RecordOverview = ({
  records,
  extractedValues,
  refetchRecords,
}: RecordOverviewProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record>();
  const fullscreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const [recordsPerOwner, setRecordsPerOwner] = useState({});
  const [sortByMethod, setSortByMethod] = useState(SortMethod.Added);

  const toggleModal = () => {
    if (showModal && selectedRecord) {
      setSelectedRecord(undefined);
    }
    setShowModal(!showModal);
  };

  useEffect(() => {
    const tempRecordsPerOwner: any = {};
    records.forEach((record) => {
      if (!tempRecordsPerOwner[record.owner]) {
        tempRecordsPerOwner[record.owner] = [record];
      } else {
        tempRecordsPerOwner[record.owner].push(record);
      }
    });
    setRecordsPerOwner(tempRecordsPerOwner);
  }, [records]);

  const sortedRecords =
    sortByMethod === SortMethod.Added
      ? sortByAdded(records)
      : sortByYear(records);

  return (
    <section>
      <Dialog
        open={showModal}
        fullScreen={fullscreen}
        onClose={toggleModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedRecord ? "Oppdater plate" : "Registrer ny plate"}
          <IconButton className={classes.closeButton} onClick={toggleModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <RecordForm
            extractedValues={extractedValues}
            closeModal={toggleModal}
            selectedRecord={selectedRecord}
            refetchRecords={refetchRecords}
          />
        </DialogContent>
      </Dialog>

      <article className={classes.recordsOverview}>
        {Object.entries(recordsPerOwner)
          .sort((a: any, b: any) => b[1].length - a[1].length)
          .map(([owner, ownerRecords]: any) => (
            <span key={owner}>
              {owner}: {ownerRecords.length} treff
            </span>
          ))}
        <TextField
          select
          value={sortByMethod}
          onChange={(event) => setSortByMethod(event.target.value)}
        >
          <MenuItem value={SortMethod.Added}>Sorter på dato lagt til</MenuItem>
          <MenuItem value={SortMethod.Year}>Sorter på utgivelsesår</MenuItem>
        </TextField>
        <Button variant="outlined" onClick={toggleModal}>
          Legg til plate
        </Button>
      </article>
      <article className={classes.recordsOverview}>
        {sortedRecords.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            onClick={() => {
              setSelectedRecord(record);
              toggleModal();
            }}
          />
        ))}
      </article>
    </section>
  );
};
