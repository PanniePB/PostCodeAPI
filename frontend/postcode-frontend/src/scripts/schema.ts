import * as yup from "yup";

// Validation using yup library
export const schema = yup.object({
  name: yup.string().required("Please enter a subrub name"),
  population: yup
    .number()
    .required("Population is required")
    .positive("Population must be positive")
    .min(1000)
    .integer("Population must be an integer"),
  postcode: yup
    .number()
    .required("Postcode is required")
    .positive("Postcode must be positive")
    .min(1000)
    .max(9999)
    .integer("Postcode must be an integer"),
});

// export interface CreateEmployeeDTO extends yup.InferType<typeof schema> {}
