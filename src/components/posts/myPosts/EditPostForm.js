import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../../managers/PostManager";
import { getCategories } from "../../../managers/CategoryManager";
import "./myposts.css";

export const EditPostForm = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
    image_url: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((postData) => setPost(postData));
  }, [postId]);

  useEffect(() => {
    getCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (post.title && post.content && post.categoryId) {
      const editedPost = {
        id: postId,
        user_id: post.user_id,
        category_id: post.categoryId,
        title: post.title,
        publication_date: post.publication_date,
        image_url: post.image_url,
        content: post.content,
        approved: post.approved,
      };
      updatePost(editedPost).then(() => {
        navigate(`/postDetails/${postId}`);
      });
    } else {
      window.alert("select a category and change content or title please");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(`/allPosts`);
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h2>
        <strong>Edit Post Form</strong>
      </h2>
      <fieldset>
        <label htmlFor="title"> Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title || ""}
          onChange={handleInputChange}
        />
      </fieldset>
      <label htmlFor="content">Content:</label>
      <fieldset>
        <textarea
          type="text"
          id="content"
          name="content"
          value={post.content || ""}
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="categoryId">Category</label>
        <select
          value={post.categoryId || ""}
          onChange={handleInputChange}
          name="categoryId"
          id="categoryId"
        >
          <option value="">Select new Category</option>
          {categories?.length > 0
            ? categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))
            : ""}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="image_url">Image URL</label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={post.image_url || ""}
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <button type="submit" className="save-btn">
          Update Post
        </button>
      </fieldset>
      <fieldset>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </fieldset>
    </form>
  );
};
