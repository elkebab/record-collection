import { makeStyles, Card, CardMedia, CardContent } from "@material-ui/core";
import React, { useState } from "react";

import fallbackImage from "./images/record-outline.png";
import { Record } from "./types";

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

interface RecordCardProps {
  record: Record;
  onClick: () => void;
}

export const RecordCard = ({ record, onClick }: RecordCardProps) => {
  const classes = useStyles();
  const [imageError, setImageError] = useState(false);

  return (
    <Card className={classes.card} onClick={onClick}>
      <CardMedia
        component="img"
        className={classes.media}
        image={!imageError ? record.imageUrl || fallbackImage : fallbackImage}
        onError={() => setImageError(true)}
      />
      <CardContent classes={{ root: classes.content }}>
        <b>{record.album}</b> <br />
        {record.band} <br />
        {record.year} <br />
        {record.type} <br />
        Eier: {record.owner}
      </CardContent>
    </Card>
  );
};
