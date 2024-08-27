import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { NewPostForm } from "../components/posts/createPost/NewPostForm"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={"HOMEPAGE"}/>
        <Route path="/allPosts" element={"ALL POSTS"}/>
        <Route path="/myPosts" element={"MY POSTS"}/>
        <Route path="/categoryManager" element={"CATEGORY MANAGER"}/>
        <Route path="/tagManager" element={"TAG MANAGER"}/>
        <Route path="/userManager" element={"USER MANAGER"}/>
        <Route path="/newPostForm" element={<NewPostForm/>}/>
        
      </Route>
    </Routes>
  </>
}
