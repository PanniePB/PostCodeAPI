import styles from "./EditSuburb.module.scss";
import SuburbForm from "../../components/SuburbForm/SuburbForm";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Suburb } from "../../scripts/interfaces";
import { getSuburbById } from "../../services/backend-service";
// import { Suburbs } from "../../services/suburb-service";

const AddSuburbPage = () => {
  const { id } = useParams();
  const [suburb, setSuburb] = useState<Suburb>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [errorMess, setErrorMess] = useState("");

  useEffect(() => {
    setLoading(true);
    if (errorMess) {
      setErrorMess("");
    }
    if (id) {
      getSuburbById(parseInt(id))
        .then((suburb) => {
          setSuburb(suburb);
        })
        .catch((err) => setErrorMess(err.message))
        .finally(() => setLoading(false));
    } else {
      setErrorMess("There is no ID in URL");
      setLoading(false);
    }
  }, [id]);

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

      {!loading && suburb && <SuburbForm suburb={suburb} />}
    </div>
  );
};

export default AddSuburbPage;
