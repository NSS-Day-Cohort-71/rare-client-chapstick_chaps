export const getCategories=()=>{
    return fetch("http://localhost:8000/categories").then(res => res.json())
}