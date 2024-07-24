import { Suburb } from "../../scripts/interfaces";
import styles from "./SuburbView.module.scss";
import Paper from "../Paper/Paper";

interface SuburbProps {
  suburb: Suburb;
}

const SuburbView = ({ suburb }: SuburbProps) => {
  return (
    <Paper className={styles.card}>
      <p className={styles.card__item}>
        <span className={styles.card__item__label}>Full Name:</span>{" "}
        {suburb?.name} {suburb?.population} {suburb?.postcode}
      </p>
    </Paper>
  );
};

export default SuburbView;
