import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import KitCard from "./KitCard";
import KitForm from "./forms/KitForm";
import {
  Button,
  Dialog,
  useMediaQuery,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

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
});

export default function KitsOverview({ kits, extractedValues }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedKit, setSelectedKit] = useState(null);
  const fullscreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  const toggleModal = () => {
    if (showModal && selectedKit) {
      setSelectedKit(null);
    }
    setShowModal(!showModal);
  };

  const kitsPerOwner = {};
  kits.forEach(kit => {
    if (!kitsPerOwner[kit.owner]) {
      kitsPerOwner[kit.owner] = [kit];
    } else {
      kitsPerOwner[kit.owner].push(kit);
    }
  });

  return (
    <section>
      <Dialog
        open={showModal}
        fullScreen={fullscreen}
        onBackdropClick={toggleModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Registrer ny drakt</DialogTitle>
        <DialogContent>
          <KitForm
            extractedValues={extractedValues}
            closeModal={toggleModal}
            selectedKit={selectedKit}
          />
        </DialogContent>
      </Dialog>

      <article className={classes.kitsOverview}>
        {Object.entries(kitsPerOwner)
          .sort((a, b) => b[1].length - a[1].length)
          .map(([owner, ownerKits]) => (
            <span key={owner}>
              {owner}: {ownerKits.length} treff
            </span>
          ))}
        <Button variant="outlined" onClick={toggleModal}>
          Legg til drakt
        </Button>
      </article>
      <article className={classes.kitsOverview}>
        {kits.map((kit, i) => (
          <KitCard
            key={i}
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
}
