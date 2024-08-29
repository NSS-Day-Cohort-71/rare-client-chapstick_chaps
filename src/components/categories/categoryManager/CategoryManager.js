import { useNavigate } from "react-router-dom";

export const CategoryManager = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/CreateCategory");
      }}
    >
      New Category
    </button>
  );
};
