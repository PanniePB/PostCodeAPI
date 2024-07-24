import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Suburb } from "../../scripts/interfaces";
import styles from "./SuburbPage.module.scss";
import SuburbView from "../../components/SuburbView/SuburbView";
import Button from "../../components/Button/Button";
import { getSuburbById } from "../../services/backend-service";

const SuburbPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [suburb, setSuburb] = useState<Suburb>();

  const [errorMess, setErrorMess] = useState("");

  useEffect(() => {
    // setLoading(true);
    if (errorMess) {
      setErrorMess("");
    }
    if (id) {
      getSuburbById(parseInt(id))
        .then((suburb) => {
          setSuburb(suburb);
        })
        .catch((err) => setErrorMess(err.message));
      // .finally(() => setLoading(false));
    } else {
      setErrorMess("There is no ID in URL");
      // setLoading(false);
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

      {suburb && <SuburbView suburb={suburb} />}
    </div>
  );
};

export default SuburbPage;
