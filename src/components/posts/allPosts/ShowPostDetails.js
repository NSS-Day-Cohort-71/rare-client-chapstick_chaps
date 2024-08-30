import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../../../managers/PostManager"

export const ShowPostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        getPostById(postId).then(postData => {
            console.log(postData);
            setPost(postData)
        })
    }, [postId])

    const formatDate = (datetime) => {
        return datetime ? datetime.split(" ")[0] : ""; // Extracts the date part
    };

    return (
        <div className="PostDetails">
            <div className="post-information">
                <h2><strong>Title: {post.title}</strong></h2>
                <img src={post.image_url} alt={post.title} />
                <p><strong>Content: </strong>{post.content}</p>
                <button>View Comments</button>
                <p><strong>Publication Date: </strong>{formatDate(post.publication_date)}</p>
                <p><strong>By: </strong>{post.user?.username}</p>
                <p><strong>Category: </strong>{post.category?.label || "no category available"}</p>
            </div>
        </div>
    )
}