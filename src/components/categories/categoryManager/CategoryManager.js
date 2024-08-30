import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../managers/CategoryManager";
import styles from "./CategoryManager.css";

export const CategoryManager = () => {
  const [categories, setCategories] = useState([]);

  const fetchAndSetCategories = () => {
    getCategories().then((data) => {
      const sortedCategories = data.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setCategories(sortedCategories);
    });
  };

  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  const navigate = useNavigate();

  return (
    <div className={styles.categoryView}>
      <div className={styles.header}>
        <h1>Category Manager</h1>
        <button
          className={styles.newCategoryButton}
          onClick={() => navigate("/CreateCategory")}
        >
          Add Category
        </button>
      </div>
      <ul className={styles.categoryListBox}>
        {categories.map((category) => (
          <li className={styles.oneCategory} key={category.id}>
            <button
              className={styles.button}
              onClick={() => navigate(`/editCategory/${category.id}`)}
            >
              Edit
            </button>
            <button className={styles.button}>Delete</button>
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
