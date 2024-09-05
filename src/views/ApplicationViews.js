import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { NewPostForm } from "../components/posts/createPost/NewPostForm";
import { MyPosts } from "../components/posts/myPosts/MyPosts";
import { TagView } from "../components/tags/TagView";
import { CategoryManager } from "../components/categories/categoryManager/CategoryManager";
import { CreateCategory } from "../components/categories/createCategory/CreateCategoryForm";
import { ViewAllPostsForm } from "../components/posts/allPosts/ViewAllPostsForm";
import { ShowPostDetails } from "../components/posts/allPosts/ShowPostDetails";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../managers/UserManager";
import { EditPostForm } from "../components/posts/myPosts/EditPostForm";

export const ApplicationViews = ({ token, setToken }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (token) {
      getCurrentUser(token).then((userObj) => {
        setCurrentUser(userObj);
      });
    }
  }, [token]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/" element={"HOMEPAGE"} />
          <Route path="/allPosts" element={<ViewAllPostsForm />} />
          <Route
            path="/myPosts"
            element={<MyPosts currentUser={currentUser} />}
          />
          <Route path="/postDetails/:postId" element={<ShowPostDetails />} />
          <Route
            path="/categoryManager"
            element={<CategoryManager token={token} />}
          />
          <Route
            path="/CreateCategory"
            element={<CreateCategory token={token} />}
          />
          <Route path="/tagManager" element={<TagView />} />
          <Route path="/userManager" element={"USER MANAGER"} />
          <Route path="/newPostForm" element={<NewPostForm token={token} />} />
          <Route path="/editPostForm/:postId" element={<EditPostForm />} />
        </Route>
      </Routes>
    </>
  );
};
