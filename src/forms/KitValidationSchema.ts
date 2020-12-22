import * as Yup from "yup";

const errorMsg = {
  required: "Påkrevd",
  invalid: "Ugyldig format",
  kitNumber: "Må være mellom 1 og 99",
};

export const kitValidationSchema = Yup.object().shape({
  country: Yup.string().required(errorMsg.required),
  club: Yup.string(),
  version: Yup.string().required(errorMsg.required),
  longSleeve: Yup.bool(),
  year: Yup.string()
    .test("format", "Ugyldig format", (value: any) => {
      // Check that year is on format YYYY or YYYY/YYYY
      const years = value && value.split("/");
      return (
        years &&
        years.length <= 2 &&
        !years.some(
          (year: string) => year.length !== 4 || isNaN(parseInt(year))
        )
      );
    })
    .required(errorMsg.required),
  playerName: Yup.string(),
  playerNumber: Yup.number()
    .min(1, errorMsg.kitNumber)
    .max(99, errorMsg.kitNumber),
  signed: Yup.bool(),
  manufacturer: Yup.string().required(errorMsg.required),
  imageUrl: Yup.string().url(errorMsg.invalid),
  owner: Yup.string().required(errorMsg.required),
  description: Yup.string(),
});
