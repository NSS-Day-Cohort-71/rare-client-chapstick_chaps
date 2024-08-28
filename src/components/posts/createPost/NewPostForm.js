import { useEffect, useState } from "react";
import "./NewPostForm.css";
import { getCategories } from "../../../managers/CategoryManager";
import { getTags } from "../../../managers/TagManager";
import { createNewPost } from "../../../managers/PostManager";
import { useNavigate } from "react-router-dom";

export const NewPostForm = ({token}) => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [postContent, setPostContent] = useState({
        "title": "",
        "imageUrl":"",
        "content":"",
        "categoryId": 0,
        "tags": [],
        "userId": token
    });
    
    const navigate = useNavigate()

   const handleCheckboxChange = (tagId) => {
        if (!postContent.tags.includes(tagId)) {
            const postCopy = {...postContent}
            postCopy.tags.push(tagId)
            setPostContent(postCopy)
        }
        else {
            const postCopy = {...postContent}
            postCopy.tags = postCopy.tags.filter(tag => tag !== tagId)
            setPostContent(postCopy)
        }
   }

   const handleSubmit = (e) => {
        e.preventDefault()
        createNewPost(postContent).then(response => 
            navigate(`/postDetails/${response.post_id}`)
        )
   }

    useEffect(()=>{
        getCategories().then((categoryArray)=> {
            setCategories(categoryArray)
        })
    },[])

    useEffect(()=>{
        getTags().then((tagsArray)=> {
            setTags(tagsArray)
        })
    },[])
    

    return (
        
        <form className="newPost" onSubmit={(e)=>{handleSubmit(e)}}>
            <h1>New Post</h1>
            <fieldset className="titleInput">
                <div className="form-group">
                <label>Title:</label>
                <input type="text" placeholder="Title" onChange={(event)=>{
                    const postCopy = {...postContent}
                    postCopy.title = event.target.value
                    setPostContent(postCopy)
                }}/>
                </div>
            </fieldset>
            <fieldset className="imgUrlInput">
                <div className="form-group">
                <label>Image URL:</label>
                <input type="text" placeholder="Image Url" onChange={(event)=>{
                    const postCopy = {...postContent}
                    postCopy.imageUrl = event.target.value
                    setPostContent(postCopy)
                }}/>
                </div>
            </fieldset>
            <fieldset className="articleContent">
                <div className="form-group">
                <label>Article Content:</label>
                <textarea type="text" placeholder="Article Content" onChange={(event)=>{
                    const postCopy = {...postContent}
                    postCopy.content = event.target.value
                    setPostContent(postCopy)
                }}/>
                </div>
            </fieldset>
            <fieldset className="form-group">
                <select onChange={(event)=>{
                    const postCopy = {...postContent}
                    postCopy.categoryId = parseInt(event.target.value)
                    setPostContent(postCopy)
                }}>
                    <option value="">Select Category</option>
                    {categories?.length > 0 ? (categories?.map((cat)=> 
                    (<option key={cat.id} value={cat.id}>{cat.label}</option>))):("")}
                </select>
            </fieldset>
            <fieldset className="form-group">
                {tags.map((tag)=>
                <label key={tag.id}>
                    <input type="checkbox" key={tag.id} value={tag.id} 
                    onChange={(event)=>{
                    handleCheckboxChange(parseInt(event.target.value))
                }}/>
                    {tag.label}</label>
                )}
            </fieldset>
            <fieldset className="form-group">
                <button type="Submit">Publish</button>
            </fieldset>
        </form>

    )}
    