import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Button,
  Dialog,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { KitCard } from "./KitCard";
import KitForm from "./forms/KitForm";
import { sortByYear } from "./utils";
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

export const KitsOverview = ({ kits, extractedValues }: KitsOverviewProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedKit, setSelectedKit] = useState<Kit>();
  const fullscreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const [sortedKits, setSortedKits] = useState<Kit[]>([]);
  const [kitsPerOwner, setKitsPerOwner] = useState({});

  const toggleModal = () => {
    if (showModal && selectedKit) {
      setSelectedKit(undefined);
    }
    setShowModal(!showModal);
  };

  useEffect(() => {
    // Order kits by year
    setSortedKits(sortByYear(kits));
  }, [kits]);

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
