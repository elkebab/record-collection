import * as Yup from "yup";

const errorMsg = {
  required: "Obligatorisk",
  invalid: "Ugyldig format",
  kitNumber: "Må være mellom 1 og 99",
  invalidDate: 'Eksempel: "2015" eller "2017/2018"',
};

export const kitValidationSchema = Yup.object().shape({
  country: Yup.string().required(errorMsg.required),
  club: Yup.string(),
  version: Yup.string().required(errorMsg.required),
  longSleeve: Yup.bool(),
  year: Yup.string()
    .required(errorMsg.required)
    .test("format", errorMsg.invalidDate, (value: any) => {
      // Check that year is on format YYYY or YYYY/YYYY
      const years = value && value.split("/");
      return (
        years &&
        years.length <= 2 &&
        !years.some(
          (year: string) => year.length !== 4 || isNaN(parseInt(year))
        )
      );
    }),

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
