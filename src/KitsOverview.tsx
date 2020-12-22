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

import { KitCard } from "./KitCard";
import KitForm from "./forms/KitForm";
import { sortByAdded, sortByYear } from "./utils";
import { Kit } from "./types";

const useStyles = makeStyles({
  kitsOverview: {
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

interface KitsOverviewProps {
  kits: Kit[];
  extractedValues: any;
}

const SortMethod = {
  Added: "ADDED", // Date kit was added
  Year: "YEAR", // Year for kit
};

export const KitsOverview = ({ kits, extractedValues }: KitsOverviewProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedKit, setSelectedKit] = useState<Kit>();
  const fullscreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const [kitsPerOwner, setKitsPerOwner] = useState({});
  const [sortByMethod, setSortByMethod] = useState(SortMethod.Added);

  const toggleModal = () => {
    if (showModal && selectedKit) {
      setSelectedKit(undefined);
    }
    setShowModal(!showModal);
  };

  useEffect(() => {
    // Find number of kits per owner
    const tempKitsPerOwner: any = {};
    kits.forEach((kit) => {
      if (!tempKitsPerOwner[kit.owner]) {
        tempKitsPerOwner[kit.owner] = [kit];
      } else {
        tempKitsPerOwner[kit.owner].push(kit);
      }
    });
    setKitsPerOwner(tempKitsPerOwner);
  }, [kits]);

  const sortedKits =
    sortByMethod === SortMethod.Added ? sortByAdded(kits) : sortByYear(kits);

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
          {selectedKit ? "Oppdater drakt" : "Registrer ny drakt"}
          <IconButton className={classes.closeButton} onClick={toggleModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <KitForm
            extractedValues={extractedValues}
            closeModal={toggleModal}
            selectedKit={selectedKit}
          />
        </DialogContent>
      </Dialog>

      <article className={classes.kitsOverview}>
        {Object.entries(kitsPerOwner)
          .sort((a: any, b: any) => b[1].length - a[1].length)
          .map(([owner, ownerKits]: any) => (
            <span key={owner}>
              {owner}: {ownerKits.length} treff
            </span>
          ))}
        <TextField
          select
          value={sortByMethod}
          onChange={(event) => setSortByMethod(event.target.value)}
        >
          <MenuItem value={SortMethod.Added}>Sorter på dato lagt til</MenuItem>
          <MenuItem value={SortMethod.Year}>Sorter på sesong</MenuItem>
        </TextField>
        <Button variant="outlined" onClick={toggleModal}>
          Legg til drakt
        </Button>
      </article>
      <article className={classes.kitsOverview}>
        {sortedKits.map((kit) => (
          <KitCard
            key={kit.id}
            kit={kit}
            onClick={() => {
              setSelectedKit(kit);
              toggleModal();
            }}
          />
        ))}
      </article>
    </section>
  );
};
