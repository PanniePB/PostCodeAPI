import styles from "./Button.module.scss";
import { MouseEventHandler } from "react";

interface Props {
  children: any;
  className?: any;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button = ({ children, className, onClick, type }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
