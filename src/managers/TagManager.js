export const getTags=()=>{
    return fetch("http://localhost:8000/tags").then((res)=>
        res.json()
 )
}