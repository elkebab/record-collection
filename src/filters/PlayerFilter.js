import React from "react";

import TextField from "@material-ui/core/TextField";

export default function PlayerFilter({ setPlayerFilter }) {
  return (
    <TextField
      label="Spiller"
      onChange={event => setPlayerFilter(event.target.value.toLowerCase())}
    />
  );
}
