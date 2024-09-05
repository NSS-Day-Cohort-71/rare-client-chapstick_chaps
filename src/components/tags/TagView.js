import { useEffect, useState } from "react"
import { createNewTag, getTags, updateTag } from "../../managers/TagManager"
import "./TagView.css"
export const TagView = ({token}) => {
    const [allTags, setAllTags]= useState([])
    const [tagInput, setTagInput] = useState("")
    const [showForm, setShowForm] = useState(false)


    const getAndSetAllTags = () => {
        getTags().then((res) => {
            setAllTags(res)
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(tagInput){
            const newTag = {
            label: tagInput
        }
            createNewTag(newTag).then(()=>{
                setTagInput("")
                getAndSetAllTags()
                changeFormVisibility()
            })
        
        } else {
            window.alert("You didn't input new tag text!")
        }
    }

    const handleEdit = (id, label) => {
        let updatedTag = window.prompt(`What would you like to change ${label} to?`)
        if (updatedTag) {
            const tag = {
                id: id,
                label: updatedTag
            }
            updateTag(tag).then(()=>{
                getAndSetAllTags()
            })
        }
    }
        
    const changeFormVisibility = () => {
        setShowForm(!showForm)
    }

    useEffect(()=>{
        getAndSetAllTags()
    },[])
    
    return <div className="tag-view">
        <ul className="tag-list-box">
            {allTags.map((tag)=>
                <li className="one-tag" key={tag.id}>
                    <button className="button" onClick={()=>{handleEdit(tag.id, tag.label)}}>Edit</button>
                    <button className="button">Delete</button>
                    {tag.label}
                </li>
            )}
        </ul>
        <div>
            {!showForm && (<button className="button new-tag-button" onClick={changeFormVisibility}>Create New Tag</button>)}
            {showForm && (
                <div className="tag-form-box">
                    <form onSubmit={(e)=>{handleSubmit(e)}} >
                        <h3>Create New Tag</h3>
                        <fieldset>
                            <input type="text" 
                                   placeholder="Add Text" 
                                   value={tagInput} 
                                   onChange={(e)=>{setTagInput(e.target.value)}}>
                            </input>
                        </fieldset>
                        <fieldset>
                            <button className="button" type="submit">Create</button>
                        </fieldset>
                    </form>
                </div>
            )}
            
        </div>
    </div>
}