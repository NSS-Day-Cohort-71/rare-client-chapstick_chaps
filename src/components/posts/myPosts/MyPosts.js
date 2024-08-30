import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPostsByUserId } from "../../../managers/PostManager"
import "./MyPosts.css"
export const MyPosts = ({currentUser}) => {
    const [userPosts, setUserPosts] = useState([])

    const navigate = useNavigate()

    const getAndSetUserPosts = (id) => {
        getPostsByUserId(id).then((postArr)=>{
            setUserPosts(postArr)
        })
    }
    
    const formatDate = (datetime) => {
        return datetime ? datetime.split(" ")[0] : ""; 
    };

    useEffect(()=>{
        const id = currentUser.id
        getAndSetUserPosts(id)
    },[currentUser])


    return <div className="my-post-view">
        <div className="button-box">
            <button className="button" onClick={()=> {navigate("/newPostForm")}}>New Post</button>
        </div>
        
        <div className="posts">
            {userPosts.map((post) => {
                
            return <div key={post.id} className="one-post">
                <div className="post-header">
                    <h3>{post.title}</h3>
                    <h4>{formatDate(post.publication_date)}</h4>
                </div>
                <div className="post-img">
                    <img src={post.image_url} alt={post.title}/>
                </div>
                <div className="post-footer">
                    <span>Author: {post.user.username}</span>
                    <div className="footer-buttons">
                    <span>reaction placeholder</span>
                    <button className="button">Edit</button>
                    <button className="button">Delete</button>
                    </div>
                </div>
            </div>})}
        </div>
        
        </div>
}