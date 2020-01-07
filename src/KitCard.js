import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import fallbackImage from "./images/fallback-image.png";

const useStyles = makeStyles({
  card: {
    background: "beige",
    minWidth: "6rem",
    maxWidth: "8rem",
  },
  content: {
    padding: "0.5rem !important", // heahe :)
  },
  media: {
    height: "140px",
  },
});

export default function KitCard({ kit }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={kit.imageUrl || fallbackImage}
      />
      <CardContent classes={{ root: classes.content }}>
        {kit.club || kit.country} <br />
        {kit.playerName && <span>{kit.playerName} </span>}
        {kit.playerNumber && <span>#{kit.playerNumber}</span>}
        {(kit.playerName || kit.playerNumber) && <br />}
        {kit.version}, {kit.year}
      </CardContent>
    </Card>
  );
}
