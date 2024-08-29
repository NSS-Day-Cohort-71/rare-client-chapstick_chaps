// Category name
// save button
// save category to database
// redirect to categoryList page once saved

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewCategory } from "../../../managers/CategoryManager";
import "./CreateCategoryForm.css";

export const CreateCategory = () => {
  const [postCategory, setPostCategory] = useState({
    label: "",
    categoryId: 0,
  });

  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    createNewCategory(postCategory).then(() => navigate(`/categoryList`));
  };

  const handleChange = (event) => {
    const copy = { ...postCategory };
    copy[event.target.id] = event.target.value;
    setPostCategory(copy);
  };

  return (
    <form className="createCategory">
      <fieldset>
        <div className="form-group">
          <label htmlFor="label">Category Name</label>
          <input
            type="text"
            id="label"
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <button type="submit" onClick={handleSave} className="btn btn-primary">
          Save
        </button>
      </fieldset>
    </form>
  );
};
