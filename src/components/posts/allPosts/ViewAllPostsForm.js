import { useEffect, useState } from "react";
import { getAllPosts } from "../../../managers/PostManager";
import { Link } from "react-router-dom";
import "./posts.css";

export const ViewAllPostsForm = () => {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then(allpostArray => setAllPosts(allpostArray));
    }, []);

    return (
        <>
            <h2><strong>All Posts</strong></h2>
            <div className="posts-container">
                {allPosts.map((post) => (
                    <section key={post.id} className="post-item">
                        <Link to={`/postDetails/${post.id}`}>
                            <button className="post-btn">{post.title}</button>
                        </Link>
                        <section>
                            <strong>Author: </strong>
                            {post.user?.username || "unknown"}
                        </section>
                        <section>
                            <strong>Category: </strong>
                            {post.category?.label || "no category available"}
                        </section>
                    </section>
                ))}
            </div>
        </>
    );
}
