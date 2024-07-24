import { Suburb } from "../../scripts/interfaces";
import styles from "./SuburbCard.module.scss";
import { useNavigate } from "react-router-dom";
import Paper from "../Paper/Paper";

interface Props {
  suburb: Suburb;
  handleDelete: any;
}

const SuburbCard = ({ suburb, handleDelete }: Props) => {
  const navigate = useNavigate();

  const onDelete = (id: Suburb["id"]) => {
    handleDelete(id);
  };

  return (
    <Paper className={styles.card}>
      <section className={styles.card__info}>
        <h4>{suburb.name}</h4>
        <p>Population: {suburb.population}</p>
        <p>Postcode: {suburb.postcode}</p>
      </section>
      <section className={styles.card__actions}>
        <p onClick={() => navigate(`/${suburb.id}/edit`)}>Edit</p>
        <p
          onClick={() => {
            onDelete(suburb.id);
          }}
        >
          Delete
        </p>
      </section>
    </Paper>
  );
};

export default SuburbCard;
