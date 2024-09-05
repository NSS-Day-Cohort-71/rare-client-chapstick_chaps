import { useEffect, useState } from "react";
import "./NewPostForm.css";
import { getCategories } from "../../../managers/CategoryManager";
import { createNewPost } from "../../../managers/PostManager";
import { useNavigate } from "react-router-dom";

export const NewPostForm = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [postContent, setPostContent] = useState({
    title: "",
    imageUrl: "",
    content: "",
    categoryId: 0,
    userId: token,
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewPost(postContent).then((response) =>
      navigate(`/postDetails/${response.post_id}`)
    );
  };

  useEffect(() => {
    getCategories().then((categoryArray) => {
      setCategories(categoryArray);
    });
  }, []);

  return (
    <form
      className="newPost"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h1>New Post</h1>
      <fieldset className="titleInput">
        <div className="form-group">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            required
            placeholder="Title"
            onChange={(event) => {
              const postCopy = { ...postContent };
              postCopy.title = event.target.value;
              setPostContent(postCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset className="imgUrlInput">
        <div className="form-group">
          <label htmlFor="imgUrlInput">Image URL:</label>
          <input
            type="text"
            id="imgUrlInput"
            placeholder="Image Url"
            onChange={(event) => {
              const postCopy = { ...postContent };
              postCopy.imageUrl = event.target.value;
              setPostContent(postCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset className="articleContent">
        <div className="form-group">
          <label htmlFor="contentInput">Article Content:</label>
          <textarea
            type="text"
            id="contentInput"
            required
            placeholder="Article Content"
            onChange={(event) => {
              const postCopy = { ...postContent };
              postCopy.content = event.target.value;
              setPostContent(postCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset className="form-group">
        <select
          id="categorySelect"
          onChange={(event) => {
            const postCopy = { ...postContent };
            postCopy.categoryId = parseInt(event.target.value);
            setPostContent(postCopy);
          }}
        >
          <option value="">Select Category</option>
          {categories?.length > 0
            ? categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))
            : ""}
        </select>
      </fieldset>
      <fieldset className="form-group">
        <button type="Submit">Publish</button>
      </fieldset>
    </form>
  );
};
