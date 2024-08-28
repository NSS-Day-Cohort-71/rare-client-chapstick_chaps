import { useEffect, useState } from "react";
import "./NewPostForm.css";
import { getCategories } from "../../../managers/CategoryManager";

export const NewPostForm = () => {
    const [categories, setCategories] = useState([]);
    // const [filteredCategories, setFilteredCategories] = useState([])
    // const [tags, setTags] = useState();

    // const getAndSetCategories = () => {
    //     getCategories().then((categoryArray)=> {
    //         setCategories(categoryArray)
    //     })
    // }


    useEffect(()=>{
        getCategories().then((categoryArray)=> {
            console.log(categoryArray)
            setCategories(categoryArray)
        })
    },[])

    return (
        
        <form className="newPost">
            <h1>New Post</h1>
            <fieldset className="titleInput">
                <div className="form-group">
                <label>Title:</label>
                <input type="text" placeholder="Title"/>
                </div>
            </fieldset>
            <fieldset className="imgUrlInput">
                <div className="form-group">
                <label>Image URL:</label>
                <input type="text" placeholder="Image Url"/>
                </div>
            </fieldset>
            <fieldset className="articleContent">
                <div className="form-group">
                <label>Article Content:</label>
                <textarea type="text" placeholder="Article Content"/>
                </div>
            </fieldset>
            <fieldset className="form-group">
                <select>
                    <option value="">Select Category</option>
                    {categories?.length > 0 ? (categories?.map((cat)=> 
                    (<option key={cat.id} value={cat.id}>{cat.label}</option>))):("")}
                    
                   
                </select>
            </fieldset>
        </form>

    )}
    