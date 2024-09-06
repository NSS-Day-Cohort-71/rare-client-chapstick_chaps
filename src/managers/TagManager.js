export const getTags=()=>{
    return fetch("http://localhost:8000/tags").then((res)=>
        res.json()
 )
}

export const createNewTag=(tag)=>{
    return fetch("http://localhost:8000/tags",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag)
        }).then(res => res.json())
}

export const updateTag = (tag) => {
    return fetch(`http://localhost:8000/tags/${tag.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag)
        }
    )
}

export const deleteTag = (tagId) => {
    return fetch(`http://localhost:8000/tags/${tagId}`, { method: "DELETE" });
  };
