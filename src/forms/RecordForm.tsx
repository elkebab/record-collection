import React, { useState } from "react";
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
import { createRecord, updateRecord } from "../api";
import { Record, RecordType } from "../types";
import { recordValidationSchema } from "./RecordValidationSchema";
import { FileUpload } from "./FileUpload";
import fallbackImage from "../images/record-outline.png";

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

const emptyRecordValues: Record = {
  id: "",
  band: "",
  album: "",
  year: "",
  genre: "",
  signed: false,
  imageUrl: "",
  owner: localStorage.getItem("owner") || "",
  type: "",
  description: "",
};

interface NewRecordFormProps {
  extractedValues: any;
  closeModal: () => void;
  selectedRecord?: Record;
  refetchRecords: () => void;
}

const NewRecordForm = ({
  extractedValues,
  closeModal,
  selectedRecord,
  refetchRecords,
}: NewRecordFormProps) => {
  const classes = useStyles();
  const [showUppy, setShowUppy] = useState(false);

  const initialValues = selectedRecord ? selectedRecord : emptyRecordValues;

  const submitRecord = async (values: Record) => {
    const response = values.id
      ? await updateRecord(values)
      : await createRecord(values);
    if (response.ok) {
      refetchRecords();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={recordValidationSchema}
      onSubmit={submitRecord}
    >
      {({ setFieldValue, isSubmitting }) => (
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

            <Field name="album">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <Autocomplete
                  fullWidth
                  options={extractedValues.allAlbums}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
                      type="text"
                      label="Album"
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
            <Field name="band">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <Autocomplete
                  fullWidth
                  options={extractedValues.allBands}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      type="text"
                      label="Band"
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
                <Autocomplete
                  fullWidth
                  options={extractedValues.allYears}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
                      required
                      type="text"
                      label="År"
                      error={!!error && touched}
                      helperText={<ErrorMessage name={field.name} />}
                    />
                  )}
                />
              )}
            </Field>
          </div>

          <div className={classes.formRow}>
            <Field name="type">
              {({
                field: { name, value },
                meta: { error, touched },
              }: FieldProps<string>) => (
                <FormControl fullWidth required error={!!error && touched}>
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup
                    value={value}
                    onChange={(event) =>
                      setFieldValue(name, event.target.value)
                    }
                    row
                  >
                    <FormControlLabel
                      control={<Radio color="primary" value={RecordType.LP} />}
                      label="LP"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" value={RecordType.EP} />}
                      label="EP"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={
                        <Radio color="primary" value={RecordType.Other} />
                      }
                      label="Annet"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            </Field>

            <Field name="signed">
              {({ field: { name, value } }: FieldProps<string>) => (
                <FormControl fullWidth required>
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
          </div>

          <div className={classes.formRow}>
            <Field name="genre">
              {({ field, meta: { error, touched } }: FieldProps<string>) => (
                <Autocomplete
                  fullWidth
                  options={extractedValues.allGenres}
                  freeSolo
                  onChange={(_, value) => setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      type="text"
                      label="Sjanger"
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

          {/* <div className={classes.formRow}>
            <FormLabel>Bilde:</FormLabel>
            <Field name="imageUrl">
              {({ field }: FieldProps<string>) => (
                <img
                  src={field.value ? field.value : fallbackImage}
                  width="10%"
                  alt="Mangler bilde"
                />
              )}
            </Field>
            <Button onClick={() => setShowUppy(true)}>Oppdater bilde</Button>
          </div>

          TODO:
          {showUppy && <FileUpload hideUppy={() => setShowUppy(false)} />} */}

          <DialogActions className={classes.formRow}>
            <Button onClick={closeModal} disabled={isSubmitting}>
              Avbryt
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Lagre
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default NewRecordForm;
