import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import SuburbList from "../../components/SuburbList/SuburbList";
import styles from "./HomePage.module.scss";
import Search from "../../components/Search/Search";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<null | string>(null);

  const searchHandler = (searchTerm: string | null) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className={styles.page}>
      <section className={styles.page__topSection}>
        <h2>Australian Suburbs</h2>
        <Button
          onClick={() => navigate(`/add`)}
          className={styles.page__topSection__button}
        >
          Add New Suburb
        </Button>
      </section>
      <Search handleSearch={searchHandler} />

      <SuburbList searchTerm={searchTerm} />
    </div>
  );
};

export default HomePage;
