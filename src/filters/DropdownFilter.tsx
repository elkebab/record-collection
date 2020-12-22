import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, Input } from "@material-ui/core";

const useStyles = makeStyles({
  select: {
    minWidth: "72px", // Avoid label extending select
  },
});

interface DropdownFilterProps {
  setFilterFunction: (filter: any) => void;
  title: string;
  items: any[];
}

export const DropdownFilter = ({
  title,
  items,
  setFilterFunction,
}: DropdownFilterProps) => {
  const filterId = `${title}-select`;
  const classes = useStyles();
  return (
    <FormControl>
      <InputLabel htmlFor={filterId}>{title}</InputLabel>
      <Select
        className={classes.select}
        native
        defaultValue=""
        input={<Input id={filterId} />}
        onChange={(event) => setFilterFunction(event.target.value)}
      >
        <option value="" />
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
