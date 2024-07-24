import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./AppContainer.module.scss";
import HomePage from "../../pages/HomePage/HomePage";
import AddSuburbPage from "./../../pages/AddSuburbPage/AddSuburbPage";
import EditSuburbPage from "../../pages/EditSuburbPage/EditSuburbPage";
import SuburbPage from "../../pages/SuburbPage/SuburbPage";

const AppContainer = () => {
  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<SuburbPage />} />
            <Route path="/:id/edit" element={<EditSuburbPage />} />
            <Route path="/add" element={<AddSuburbPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AppContainer;
