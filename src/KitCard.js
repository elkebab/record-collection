import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import fallbackImage from "./images/fallback-image.png";

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

export default function KitCard({ kit, onClick }) {
  const classes = useStyles();
  return (
    <Card className={classes.card} onClick={onClick}>
      <CardMedia
        className={classes.media}
        image={kit.imageUrl || fallbackImage}
      />
      <CardContent classes={{ root: classes.content }}>
        <b>{kit.club || kit.country}</b> <br />
        {kit.playerName && <span>{kit.playerName} </span>}
        {kit.playerNumber && <span>#{kit.playerNumber}</span>}
        {(kit.playerName || kit.playerNumber) && <br />}
        {kit.version}, {kit.year}
      </CardContent>
    </Card>
  );
}
