import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import {
  TextField,
  makeStyles,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  DialogActions,
  FormControl,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { createKit, updateKit } from "../api";
import { Kit } from "../types";
import { kitValidationSchema } from "./KitValidationSchema";
import { FileUpload } from "./FileUpload";
import fallbackImage from "../images/shirt-outline.png";

const useStyles = makeStyles({
  formRow: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",

    "&>*:not(:last-child)": {
      marginRight: "1rem",
    },
  },
});

const emptyKitValues: Kit = {
  id: "",
  country: "",
  club: "",
  version: "",
  longSleeve: false,
  year: "",
  playerName: "",
  playerNumber: "",
  signed: false,
  manufacturer: "",
  imageUrl: "",
  owner: localStorage.getItem("owner") || "",
  description: "",
};

interface NewKitFormProps {
  extractedValues: any;
  closeModal: () => void;
  selectedKit?: Kit;
}

export const NewKitForm = ({
  extractedValues,
  closeModal,
  selectedKit,
}: NewKitFormProps) => {
  const classes = useStyles();

  const initialValues = selectedKit ? selectedKit : emptyKitValues;

  const submitKit = async (values: Kit) => {
    const kit: Kit = {
      ...values,
      playerNumber: `${values.playerNumber}`,
    };

    // Update kit if it has an ID. Create new kit otherwise.
    const response = kit.id ? await updateKit(kit) : await createKit(kit);
    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={kitValidationSchema}
      onSubmit={submitKit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className={classes.formRow}>
            <Field name="owner">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <Autocomplete
                  fullWidth
                  options={extractedValues.allOwners}
                  freeSolo
                  defaultValue={field.value}
                  onChange={(_, value) => {
                    setFieldValue(field.name, value);
                    if (value) {
                      localStorage.setItem("owner", value);
                    } else {
                      localStorage.removeItem("owner");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      type="text"
                      label="Eier"
                      required
                      error={!!error && touched}
                      helperText={<ErrorMessage name={field.name} />}
                    />
                  )}
                />
              )}
            </Field>

            <Field name="manufacturer">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <Autocomplete
                  fullWidth
                  options={extractedValues.allManufacturers}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
                      type="text"
                      label="Leverandør"
                      required
                      error={!!error && touched}
                      helperText={<ErrorMessage name={field.name} />}
                    />
                  )}
                />
              )}
            </Field>
          </div>

          <div className={classes.formRow}>
            <Field name="country">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <Autocomplete
                  fullWidth
                  options={extractedValues.allCountries}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      type="text"
                      label="Land"
                      required
                      error={!!error && touched}
                      helperText={<ErrorMessage name={field.name} />}
                    />
                  )}
                />
              )}
            </Field>

            <Field name="club">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <Autocomplete
                  fullWidth
                  options={extractedValues.allClubs}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
                      type="text"
                      label="Lag"
                      error={!!error && touched}
                      helperText={<ErrorMessage name={field.name} />}
                    />
                  )}
                />
              )}
            </Field>
          </div>

          <div className={classes.formRow}>
            <Field name="version">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <Autocomplete
                  fullWidth
                  options={extractedValues.allVersions}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      type="text"
                      label="Versjon"
                      required
                      error={!!error && touched}
                      helperText={<ErrorMessage name={field.name} />}
                    />
                  )}
                />
              )}
            </Field>

            <Field name="year">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <TextField
                  {...field}
                  type="text"
                  label="År"
                  required
                  fullWidth
                  error={!!error && touched}
                  helperText={<ErrorMessage name={field.name} />}
                />
              )}
            </Field>
          </div>

          <div className={classes.formRow}>
            <Field name="playerName">
              {({ field }: FieldProps<string>) => (
                <TextField
                  {...field}
                  type="text"
                  label="Spillernavn"
                  fullWidth
                />
              )}
            </Field>

            <Field name="playerNumber">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <TextField
                  {...field}
                  type="number"
                  label="Spillernummer"
                  inputProps={{
                    min: "1",
                    max: "99",
                  }}
                  fullWidth
                  error={!!error && touched}
                  helperText={<ErrorMessage name={field.name} />}
                />
              )}
            </Field>
          </div>

          <div className={classes.formRow}>
            <Field name="signed">
              {({ field: { name, value } }: FieldProps<string>) => (
                <FormControl fullWidth>
                  <FormLabel component="legend">Signert</FormLabel>
                  <RadioGroup
                    row
                    value={value ? "true" : "false"}
                    onChange={(event) =>
                      setFieldValue(name, event.target.value === "true")
                    }
                  >
                    <FormControlLabel
                      control={<Radio color="primary" value="false" />}
                      label="Nei"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" value="true" />}
                      label="Ja"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            </Field>

            <Field name="longSleeve">
              {({ field: { name, value } }: FieldProps<string>) => (
                <FormControl fullWidth>
                  <FormLabel component="legend">Ermer</FormLabel>
                  <RadioGroup
                    value={value ? "true" : "false"}
                    onChange={(event) =>
                      setFieldValue(name, event.target.value === "true")
                    }
                    row
                  >
                    <FormControlLabel
                      control={<Radio color="primary" value="false" />}
                      label="Kort"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" value="true" />}
                      label="Lang"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            </Field>
          </div>

          <div className={classes.formRow}>
            <Field name="description">
              {({ field }: FieldProps<string>) => (
                <TextField
                  {...field}
                  type="text"
                  label="Beskrivelse"
                  fullWidth
                  multiline
                />
              )}
            </Field>
          </div>

          <div className={classes.formRow}>
            <FormLabel>Bilde:</FormLabel>
            <Field name="imageUrl">
              {({ field }: FieldProps<string>) => (
                <img
                  src={field.value ? field.value : fallbackImage}
                  width="10%"
                  alt=" "
                />
              )}
            </Field>
          </div>

          <FormLabel>Last opp nytt bilde:</FormLabel>
          <FileUpload />

          <DialogActions className={classes.formRow}>
            <Button onClick={closeModal}>Avbryt</Button>
            <Button type="submit" variant="contained" color="primary">
              Lagre
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default NewKitForm;
