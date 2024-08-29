// Category name
// save button
// save category to database
// redirect to categoryList page once saved

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateCategoryForm.css";
import { createNewCategory } from "../../../managers/CategoryManager";

export const CreateCategory = () => {
  const [postCategory, setPostCategory] = useState({
    label: "",
    categoryId: 0,
  });

  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    createNewCategory(postCategory).then(() => navigate(`/categoryManager`));
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
            placeholder="Enter New Category"
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
