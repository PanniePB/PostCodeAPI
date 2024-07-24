import styles from "./Input.module.scss";
import { UseFormRegister } from "react-hook-form";

interface Props {
  name: string;
  type: string;
  label: string;
  register: UseFormRegister<any>;
}

const Input = ({ name, type, label, register }: Props) => {
  const inputStyle = `${type === "radio" ? styles.field__radio : styles.field}`;

  return (
    <div className={inputStyle}>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} {...register(name)} />
    </div>
  );
};

export default Input;
