export const createNewPost = (post) => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    }).then(res => res.json())
}

export const getAllPosts = () => {
    return fetch("http://localhost:8000/posts").then(res => res.json())
}