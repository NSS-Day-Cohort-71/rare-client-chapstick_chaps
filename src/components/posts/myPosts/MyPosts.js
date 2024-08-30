import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPostsByUserId } from "../../../managers/PostManager"

export const MyPosts = ({currentUser}) => {
    const [userPosts, setUserPosts] = useState([])

    const navigate = useNavigate()

    const getAndSetUserPosts = (id) => {
        getPostsByUserId(id).then((postArr)=>{
            setUserPosts(postArr)
        })
    }
    
    useEffect(()=>{
        const id = parseInt(currentUser.id)
        getAndSetUserPosts(id)
    },[])
    return <button className="button" onClick={()=> {navigate("/newPostForm")}}>New Post</button>
}