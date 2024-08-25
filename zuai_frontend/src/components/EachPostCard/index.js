import {Link} from "react-router-dom";
import { AiOutlineDelete } from 'react-icons/ai'

import "./index.css"

const EachPostCard = (props)=> {
    const {eachPostDetails,onDeleteBlog} =props 
    const {title,author,createdAt,postId} = eachPostDetails 
    console.log(postId)

    const deleteBlog = ()=> {
        onDeleteBlog(postId)
    }
    return (
       
        <li className="each-list">
             <Link to = {`/posts/${postId}`} >
            <h2 className="style-h2">{title}</h2> 
            
            </Link>
            <button className="delete-button" onClick={deleteBlog} >Delete</button>
            <button className="delete-icon"> <AiOutlineDelete/></button>
        </li>
        
    ) 
}


export default EachPostCard