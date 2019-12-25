import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  select: {
    minWidth: "72px", // Avoid label extending select
  },
});

export default function DropdownFilter({ title, items, setFilterFunction }) {
  const filterId = `${title}-select`;
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={filterId}>{title}</InputLabel>
      <Select
        className={classes.select}
        native
        defaultValue=""
        input={<Input id={filterId} />}
        onChange={event => setFilterFunction(event.target.value)}
      >
        <option value="" />
        {items.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
