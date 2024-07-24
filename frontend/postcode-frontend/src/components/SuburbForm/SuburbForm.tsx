import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { schema } from "../../scripts/schema";
import styles from "./SuburbForm.module.scss";
import {
  CreateSuburbDTO,
  Suburb,
  UpdateSuburbDTO,
} from "../../scripts/interfaces";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
// import { Suburbs } from "../../services/suburb-service";
import Paper from "../Paper/Paper";
import { createSuburb, updateSuburbById } from "../../services/backend-service";
import Button from "../Button/Button";

export interface SuburbFormProps {
  suburb?: Suburb;
}

interface FormData extends yup.InferType<typeof schema> {}

const SuburbForm: React.FC<SuburbFormProps> = ({ suburb }: SuburbFormProps) => {
  const getDefaultVal = (
    fieldName: keyof UpdateSuburbDTO | keyof CreateSuburbDTO,
    manualDefault: string | number | null | undefined = undefined
  ) => {
    if (suburb) {
      const val = suburb[fieldName];
      if (val === null) return null;
      return val;
    } else return manualDefault;
  };

  const navigate = useNavigate();

  const [errorMess, setErrorMess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSubmit = async (data: FormData) => {
    const formattedData = { ...data };
    setIsSubmitting(true);
    setErrorMess(errorMess ? "" : errorMess);

    // create suburb
    if (!suburb) {
      const toCreateData: CreateSuburbDTO = { ...formattedData };

      try {
        // await Suburbs.createSuburb(toCreateData);
        await createSuburb(toCreateData);
        console.log("New suburb created", toCreateData);
        setIsSubmitting(false);
        navigate("/");
      } catch (error) {
        setIsSubmitting(false);
        setErrorMess((error as Error).message);
        console.error(error);
      }
    }
    // edit suburb
    else {
      const toUpdateData: UpdateSuburbDTO = { ...formattedData };

      try {
        // Suburbs.updateSuburb(suburb.id, toUpdateData);
        await updateSuburbById(suburb.id, toUpdateData);
        console.log(
          Object.keys(toUpdateData).length === 0
            ? `Suburb ${suburb.id} is unchanged`
            : `Suburb ${suburb.id} is updated`
        );
        setIsSubmitting(false);
        navigate("/");
      } catch (errors) {
        // setErrorMess((errors as Error).message);
        setIsSubmitting(false);
        console.log(errors);
      }
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <Paper className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit(formSubmit)}>
        {/* ------- section ------- */}
        <div className={styles.field}>
          <label htmlFor="name">Suburb name</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            defaultValue={getDefaultVal("name") as string}
          />

          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="population">Population</label>
          <input
            id="population"
            type="number"
            {...register("population")}
            defaultValue={getDefaultVal("population", 0) as number}
          />
          {errors.population && (
            <p className={styles.error}>{errors.population.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="postcode">Postcode</label>
          <input
            id="postcode"
            type="number"
            {...register("postcode")}
            defaultValue={getDefaultVal("postcode", 0) as number}
          />
          {errors.postcode && (
            <p className={styles.error}>{errors.postcode.message}</p>
          )}
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      {errorMess && <p>{errorMess}</p>}
      {isSubmitting && <p>Submitting....</p>}
    </Paper>
  );
};

export default SuburbForm;
