import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deletePost, getPostsByUserId } from "../../../managers/PostManager"
import "./MyPosts.css"
export const MyPosts = ({currentUser}) => {
    const [userPosts, setUserPosts] = useState([])

    const navigate = useNavigate()

    const getAndSetUserPosts = (id) => {
        getPostsByUserId(id).then((postArr)=>{
            setUserPosts(postArr)
        })
    }
    
    const formatDate = (dateTime) => {
        return dateTime ? dateTime.split(" ")[0] : ""; 
    };

    const handleDelete = (id, title) => {
        console.log(id, title)
        if(window.confirm(`Are you sure you want to delete ${title}?`)){
            deletePost(id).then(()=>{getAndSetUserPosts(currentUser.id)})
        }
    }

    useEffect(()=>{
        const id = currentUser.id
        getAndSetUserPosts(id)
    },[currentUser])


    return <div className="my-post-view">
        <div className="button-box">
            <button className="button" onClick={()=> {navigate("/newPostForm")}}>Add Post</button>
        </div>
        
        <div className="posts">
            {userPosts.map((post) => {
                
            return <div key={post.id} className="one-post">
                <div className="post-header">
                    <div className="title-category">
                        <h2 className="post-title">{post.title}</h2>
                        <h3 className="post-category">Category: {post.category.label}</h3>
                    </div>
                    <div className="published">
                        <h4>Publication Date: {formatDate(post.publication_date)}</h4>
                        {post.publication_date ? (<button>Unpublish</button>) : (<button>Publish</button>)}
                    </div>
                </div>
                <div className="post-img" onClick={()=>{navigate(`/postDetails/${post.id}`)}}>
                    <img src={post.image_url} alt={post.title}/>
                </div>
                <div className="post-footer">
                    <span>Author: {post.user.username}</span>
                    <div className="footer-buttons">
                        <span>reaction placeholder</span>
                        <button className="button" onClick={()=>{navigate(`/postDetails/${post.id}`)}}>View Post</button>
                        <button className="button">Edit</button>
                        <button className="button" onClick={()=>{handleDelete(post.id, post.title)}}>Delete</button>
                    </div>
                </div>
            </div>})}
        </div>
        
        </div>
}