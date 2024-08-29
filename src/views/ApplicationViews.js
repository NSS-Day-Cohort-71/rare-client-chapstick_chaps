import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { NewPostForm } from "../components/posts/createPost/NewPostForm"
import { MyPosts } from "../components/posts/myPosts/MyPosts"
import { TagView } from "../components/tags/TagView"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={"HOMEPAGE"}/>
        <Route path="/allPosts" element={"ALL POSTS"}/>
        <Route path="/myPosts" element={<MyPosts token={token}/>}/>
        <Route path="/categoryManager" element={"CATEGORY MANAGER"}/>
        <Route path="/tagManager" element={<TagView/>}/>
        <Route path="/userManager" element={"USER MANAGER"}/>
        <Route path="/newPostForm" element={<NewPostForm token={token} />}/>
        
      </Route>
    </Routes>
  </>
}
