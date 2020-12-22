import { makeStyles, Card, CardMedia, CardContent } from "@material-ui/core";
import React, { useState } from "react";

import fallbackImage from "./images/shirt-outline.png";
import { Kit } from "./types";

const useStyles = makeStyles({
  card: {
    background: "white",
    minWidth: "6rem",
    maxWidth: "8rem",
    cursor: "pointer",
  },
  content: {
    padding: "0.5rem !important", // heahe :)
  },
  media: {
    height: "140px",
  },
});

interface KitCardProps {
  kit: Kit;
  onClick: () => void;
}

export const KitCard = ({ kit, onClick }: KitCardProps) => {
  const classes = useStyles();
  const [imageError, setImageError] = useState(false);

  let yearValue = kit.year;
  if (yearValue.length > 4) {
    const years = yearValue.split("/");
    yearValue = `${years[0].slice(2, 4)}/${years[1].slice(2, 4)}`;
  }

  return (
    <Card className={classes.card} onClick={onClick}>
      <CardMedia
        component="img"
        className={classes.media}
        image={!imageError ? kit.imageUrl || fallbackImage : fallbackImage}
        onError={() => setImageError(true)}
      />
      <CardContent classes={{ root: classes.content }}>
        <b>{kit.club || kit.country}</b> <br />
        {kit.version}, {yearValue} <br />
        {kit.playerName && <span>{kit.playerName}</span>}
        {kit.playerNumber && <span> #{kit.playerNumber}</span>}
        {(kit.playerName || kit.playerNumber) && <br />}
        Eier: {kit.owner}
      </CardContent>
    </Card>
  );
};
