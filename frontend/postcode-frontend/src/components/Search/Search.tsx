import styles from "./Search.module.scss";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

interface Props {
  handleSearch: any;
}

const Search = ({ handleSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState<null | string>(null);

  useEffect(() => {
    if (searchTerm === "") {
      handleSearch(null);
    }
  }, [searchTerm]);

  const onSearch = () => {
    handleSearch(searchTerm);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.form}>
      <input
        type="text"
        placeholder="Search a Suburb or a Postcode"
        onChange={onSearchChange}
        value={searchTerm || ""}
      />
      <Button className={styles.form__button} onClick={onSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </Button>
    </div>
  );
};

export default Search;
