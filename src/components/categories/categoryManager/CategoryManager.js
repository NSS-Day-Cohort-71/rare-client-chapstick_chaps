// Given an admin is in the app
// When they select the Category Management link in the menu
// Then they should be directed to a page that lists all the Category names ordered alphabetically
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../managers/CategoryManager";
import styles from "./CategoryManager.css"; // Import CSS module

export const CategoryManager = () => {
  const [categories, setCategories] = useState([]);

  const fetchAndSetCategories = () => {
    getCategories().then((data) => {
      // Sort categories alphabetically by label
      const sortedCategories = data.sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      setCategories(sortedCategories);
    });
  };

  // const handleDelete = (categoryId) => {
  //   deleteCategory(categoryId).then(() => {
  //     fetchAndSetCategories(); // Refresh the list after deletion
  //   });
  // };

  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  const navigate = useNavigate();

  return (
    <div className={styles.CategoryManager}>
      <h1>Category Manager</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.label}
            <div>
              <button
                onClick={() => {
                  navigate(`/editCategory/${category.id}`);
                }}
              >
                Edit
              </button>
              {/* <button onClick={() => handleDelete(category.id)}>Delete</button> */}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          navigate("/CreateCategory");
        }}
      >
        Add Category
      </button>
    </div>
  );
};
