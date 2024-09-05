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
    return fetch(`http://localhost:8000/tags/${tag.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag)
        }).then(res => res.json())
}
//Rebase with newest changes then write the code in the API for do_put with requested_resource of tags
