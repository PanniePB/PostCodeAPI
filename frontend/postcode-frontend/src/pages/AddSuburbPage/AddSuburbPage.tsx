import styles from "./AddSuburbPage.module.scss";
import SuburbForm from "../../components/SuburbForm/SuburbForm";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const AddSuburbPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <section className={styles.page__topSection}>
        <h2>Suburb Details</h2>
        <Button
          onClick={() => navigate(`/`)}
          className={styles.page__topSection__button}
        >
          Back
        </Button>
      </section>

      <SuburbForm />
    </div>
  );
};

export default AddSuburbPage;
