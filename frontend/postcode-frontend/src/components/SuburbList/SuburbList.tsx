import { useEffect, useState } from "react";
import styles from "./SuburbList.module.scss";
import SuburbCard from "../SuburbCard/SuburbCard";
import { Suburb } from "../../scripts/interfaces";
import { deleteSuburbById, getAllSuburb } from "../../services/backend-service";

interface Props {
  searchTerm: any;
}

const SuburbList = ({ searchTerm }: Props) => {
  const [suburbs, setSuburbs] = useState<any[] | null>(null);
  const [errorMess, setErrorMess] = useState("");
  const [deleteErrorMess, setDeleteErrorMess] = useState("");
  useEffect(() => {
    // To seed the database run the following line once
    // dbSeeder.forEach((suburb) => createSuburb(suburb));
    setErrorMess(errorMess ? "" : errorMess);

    getAllSuburb()
      .then((res) => {
        setSuburbs(res);
      })
      .catch((err) => setErrorMess(err.message));
  }, []);

  useEffect(() => {
    if (searchTerm !== null && searchTerm !== "") {
      if (!isNaN(searchTerm)) {
        const filtered = suburbs?.filter(
          (suburb) => suburb.postcode === parseInt(searchTerm)
        );
        setSuburbs(filtered || []);
      } else {
        const filtered = suburbs?.filter((suburb) =>
          suburb.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setSuburbs(filtered || []);
      }
    } else {
      getAllSuburb()
        .then((res) => {
          setSuburbs(res);
        })
        .catch((err) => setErrorMess(err.message));
    }
  }, [searchTerm]);

  const handleDelete = async (id: Suburb["id"]) => {
    const currentSuburbs = suburbs;
    setSuburbs((prevSuburbs) => {
      // Save the current state in a constant

      // Optimistically update the UI by filtering out the suburb with the given id
      if (prevSuburbs) {
        return prevSuburbs.filter((suburb) => suburb.id !== id);
      } else {
        return null;
      }
    });

    try {
      setDeleteErrorMess(deleteErrorMess ? "" : deleteErrorMess);

      // Attempt to delete the suburb on the server
      await deleteSuburbById(id);

      console.log(`Suburb ${id} is deleted`);
    } catch (error) {
      // If the network request fails, handle the error
      setDeleteErrorMess((error as Error).message);
      console.error(error);

      // Revert the UI back to its previous state using the saved constant
      setSuburbs(currentSuburbs);
      alert("There was a problem in the server. Could not delete.");
    }
  };

  return (
    <div className={styles.list}>
      {suburbs?.map((suburb) => (
        <SuburbCard
          handleDelete={handleDelete}
          key={suburb.id}
          suburb={suburb}
        />
      ))}
    </div>
  );
};

export default SuburbList;
