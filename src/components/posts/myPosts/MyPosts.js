import { useNavigate } from "react-router-dom"

export const MyPosts = () => {
    const navigate = useNavigate()
    return <button onClick={()=> {navigate("/newPostForm")}}>New Post</button>
}